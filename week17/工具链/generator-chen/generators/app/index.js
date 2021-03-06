var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  // async prompting() {
  //   this.dependency = await this.prompt([
  //     {
  //       type: "input",
  //       name: "name",
  //       message: "Would you like to enable the Cool feature?"
  //     }
  //   ]);
  // }

  // writing() {
  //   const pkgJson = {
  //     devDependencies: {
  //       [this.dependency.name]: '*'
  //     },
  //     dependencies: {
  //       react: '^16.2.0'
  //     }
  //   };

  //   // Extend or create package.json file in destination path
  //   this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  // }

  // install() {
  //   this.npmInstall();
  // }

  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: 'Templating with Yeoman' }
    );
  }
};