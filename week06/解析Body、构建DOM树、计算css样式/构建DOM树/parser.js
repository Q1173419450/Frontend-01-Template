let currentToken = null;   // 标签
let currentAttribute = null;  // 属性
let currentTextNode = null; // 文本

let stack = [{type: 'document', children: []}]; // 构造 DOM 树

function emit(token) {
  let top = stack[stack.length - 1];

  if (token.type == 'startTag') { //开始标签
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }

    element.tagName = token.tagName;
    for (let p in token) {
      if (p != "type" && p != "tagName") {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }
  
    // element.parent = top
    top.children.push(element)
  
    if (!token.isSelfClosing) {   //自封必标签
      stack.push(element)
    }
    currentTextNode = null;
  } else if (token.type == 'endTag') {  // 结束标签
    if (top.tagName != token.tagName) {
      throw new Error('Tag start end doesn\'t match' )
    } else {
      stack.pop();
    }
    currentTextNode == null
  } else if (token.type == 'text') {   // 文本节点
    if (currentTextNode == null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }

  console.log(token)
}

const EOF = Symbol('EOF') // EOF: End of File

function data(current) {
  if (current === '<') {
    return tagOpen;
  } else if ( current == EOF ) {
    emit({
      type: 'EOF'
    })
    return ;
  } else {
    emit({
      type: 'text',
      content: current
    })
    return data
  }
}

function tagOpen(current) {
  if (current === '/') {  // 结束标签
    return endTagOpen;
  } else if (current.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(current) // reconsume 将当前词传到下一个状态
  } else {
    return ;
  }
}

function endTagOpen(current) {
  if (current.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(current)
  } else if (current == '>') {
    return data;
  } else if(current == EOF) {
    return ;
  } else {
    return ;
  }
}

function tagName(current) {
  if(current.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (current == '/') {
    return selfClosingStartTag;
  } else if (current.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += current//.toLowerCase();
    return tagName
  } else if(current == '>') {
    emit(currentToken)
    return data
  } else {
    return tagName
  }
}

function beforeAttributeName(current) {
  if (current.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (current == '>' || current == '/' || current == EOF) {
    return afterAttributeName(current)
  } else if (current == '=') {
  } else {
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(current)
  }
}

function attributeName(current) {
  if(current.match(/^[\t\n\f]$/) || current == '/' || current == '>' || current == EOF) {
    return attributeName(current)
  } else if(current == '=') {
    return beforeAttributeValue;
  } else if(current == '\u0000') {

  } else if (current == "\"" || current == "'" || current == "<") {

  } else {
    currentAttribute.name += current;
    return attributeName
  }
}

function afterAttributeName(current) {
  if (current.match(/^[\t\n\f]$/)) {
    return beforeAttributeName;
  } else if (current == '/') {
    return selfClosingStartTag
  } else if (current == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (current == '=') {
    return beforeAttributeValue
  } else if (current == EOF) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(current)
  }
}

function beforeAttributeValue(current) {
  if (current.match(/^[\t\n\f]$/) || current == '/' || current == '>' || current == EOF) {
    return beforeAttributeValue;
  } else if (current == '\"') {
    return doubleQuotedAttributeValue;
  } else if (current == '\'') {
    return singleQuotedAttributeValue;
  } else if (current == '>') {

  } else {
    return UnquotedAttributeValue(current);
  }
}

function doubleQuotedAttributeValue(current) {
  if (current == '\"') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (current == '\u0000') {

  } else if (current == EOF) {

  } else {
    currentAttribute.value += current;
    return doubleQuotedAttributeValue
  }
}

function singleQuotedAttributeValue(current) {
  if (current == '\'') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (current == '\u0000') {

  } else if (current == EOF) {

  } else {
    currentAttribute.value += current;
    return singleQuotedAttributeValue
  }
}

function afterQuotedAttributeValue(current) {
  if (current.match(/^[\t\n\f]$/)) {
    return beforeAttributeName;
  } else if (current == '/') {
    return selfClosingStartTag
  } else if (current == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (current == EOF) {

  } else {
    currentAttribute.value += current;
    return doubleQuotedAttributeValue
  }
}

function UnquotedAttributeValue(current) {
  if (current.match(/^[\t\n\f]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (current == '/') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (current == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken)
    return data;
  } else if (current == '\u0000') {

  } else if (current == '\"' || current == '\'' || current == '<' || current == '=' || current == "`") {

  } else if (current == EOF) {

  } else {
    currentAttribute.value += current;
    return UnquotedAttributeValue
  }
}

function selfClosingStartTag(current) {
  if (current == '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken)
    return data
  } else if (current == EOF) {

  } else {

  }
}

module.exports.parserHTML = function parserHTML(html) {
  let state = data;
  for(let current of html) {
    state = state(current)
  }
  // 标识文件结束
  state = state(EOF);

  console.log(stack[0])
}