
function HelloWorldPlugin(options) {
}

HelloWorldPlugin.prototype.apply = function (compiler) {

  compiler.plugin('this-compilation', function (compilation) {
    console.log('this-compilation');
  });

  compiler.plugin('compilation', function (compilation, params) {
    console.log('compilation');
    params.normalModuleFactory.plugin('parser', function (parser, parserOptions) {
      parser.plugin('expression Button', function (expr) {
        console.log(expr);
      });
    });
  });

  compiler.plugin('done', function () {
    console.log('hello world');
  });
}

module.exports = HelloWorldPlugin;
