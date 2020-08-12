var mod = require('../src/parser');
let assert = require('assert');

it('parse a single element', () => {
    let doc = mod.parseHTML("<div></div>");
    let div = doc.children[0];
    assert.equal(div.tagName, 'div');
    assert.equal(div.children.length, 0);
    assert.equal(div.type, 'element');
    assert.equal(div.attributes.length, 2);
})

it('parse a upper element', () => {
    let doc = mod.parseHTML("<DIV></DIV>");
    let div = doc.children[0];
})

it('parse a selfClosingStartTag element', () => {
    let doc = mod.parseHTML("<img/>");
    let div = doc.children[0];
    // console.log(div);
    assert.equal(div.tagName, 'img');
    assert.equal(div.children.length, 0);
    assert.equal(div.type, 'element');
    assert.equal(div.attributes.length, 3);
})


it('parse a single element with text content', () => {
    let doc = mod.parseHTML("<div>test</div>")
    let text = doc.children[0].children[0];

    assert.equal(text.content, 'test');
    assert.equal(text.type, 'text');
})

it('tag mismatch', () => {
    try {
        let doc = mod.parseHTML('<div>test</aaa>')
    } catch (error) {
        assert.equal(error.message, "Tag start end doesn't match!");    // 断言必须一致，否则 nyc 不成功
    }
})

it('tag with <', () => {
    let doc = mod.parseHTML("<div>a < b</div>")
    let text = doc.children[0].children[0];

    assert.equal(text.content, 'a < b');
    assert.equal(text.type, 'text');
})

it('tag with doubleQuotedAttributeValue', () => {
    let doc = mod.parseHTML('<div id=name class="cls" data="abc">a < b</div>')
    let div = doc.children[0];

    let count = 0;

    for(let attr of div.attributes) {
        if (attr.name === 'id') {
            count++
            assert.equal(attr.value, 'name')
        } else if (attr.name === 'class') {
            count++
            assert.equal(attr.value, 'cls')
        } else if (attr.name === 'data') {
            count++
            assert.equal(attr.value, 'abc')
        }
    }
    assert.ok(count === 3);
})

it('tag with singleQuotedAttributeValue', () => {
    let doc = mod.parseHTML("<div id=name class='cls' data='abc'>a < b</div>")
    let div = doc.children[0];

    let count = 0;

    for(let attr of div.attributes) {
        if (attr.name === 'id') {
            count++
            assert.equal(attr.value, 'name')
        } else if (attr.name === 'class') {
            count++
            assert.equal(attr.value, 'cls')
        } else if (attr.name === 'data') {
            count++
            assert.equal(attr.value, 'abc')
        }
    }
    assert.ok(count === 3);
})

it('attrs with no value', () => {
    let doc = mod.parseHTML("<div class>")
    let div = doc.children[0];
})

// it('beforeAttributeValue', () => {
//     let doc = mod.parseHTML("<div class=>")
//     let div = doc.children[0];
// })

it('before after t n f', () => {
    let doc = mod.parseHTML("<div \t\n\fclass\t\n\f=\t\n\f'cls'>")
    let div = doc.children[0];
})

it('attrs with no value', () => {
    let doc = mod.parseHTML("<div class id/>")
    let div = doc.children[0];
})

it('currentAttribute', () => {
    let doc = mod.parseHTML("<div data='abc' ></div>")
    let div = doc.children[0];
})

it('attrs with no value2', () => {
    let doc = mod.parseHTML("<div class/>")
    let div = doc.children[0];
})

it('attrs with no value3', () => {
    let doc = mod.parseHTML("<div class='aaa'/>")
    let div = doc.children[0];
})

it('attrs with no value4', () => {
    let doc = mod.parseHTML("<div id=aaa>")
    let div = doc.children[0];
})

it('attrs with no value5', () => {
    let doc = mod.parseHTML("<div id=aaa/>")
    let div = doc.children[0];
})


it('selfClosingStartTag EOF', () => {
    let doc = mod.parseHTML("<div/")
    let div = doc.children[0];
})

it('script', () => {
    let content = `<div>abcd</div>
    <span>x</span>
    /script><script
    <
    </
    </s
    </sc
    </scr
    </scri
    </scrip
    </script   `
    let doc = mod.parseHTML(`<script>${content}</script>`)
    let text = doc.children[0].children[0];    

    assert.equal(text.content, content);
    assert.equal(text.type, 'text');
})



// 单独追踪某个特殊case
// it('script 空格', () => {
//     let content = `</scri`
//     let doc = mod.parseHTML(`<script>${content}</script>`)
//     let text = doc.children[0].children[0];    

//     assert.equal(text.content, content);
//     assert.equal(text.type, 'text');
// })