function HelloWorldPlugin(options) {
  // { size: 'xxxx' }
  this.options = options;
}

HelloWorldPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', function (compilation, params) {
    let currentModule = null;
    let insertionMap = new Map();

    function addInsertion (value) {
      if(insertionMap.get(currentModule)) {
        insertionMap.get(currentModule).push(value);
      } else {
        insertionMap.set(currentModule, [value]);
      }
    }

    compilation.plugin('build-module', function (module) {
      currentModule = module;
    });

    params.normalModuleFactory.plugin('parser', (parser, parserOptions) => {
      parser.plugin('call React.createElement', (expr) => {
        const { arguments } = expr;
        const first = arguments[0];
        const second = arguments[1];
        if (arguments.length > 1) {
          if (second.type === 'ObjectExpression') {
            const props = second.properties;
            // whether the `prop` has been set
            let hasSet = props.some((prop) => prop.key.name === Object.keys(this.options)[0]);
            debugger;
            if (!hasSet) {
              addInsertion(first.range);
            } else {

            }
          } else if (second.type === 'Literal') {
            addInsertion(first.range);
          }
        } else {
          addInsertion(first.range);
        }
      });
    });

    compilation.plugin('succeed-module', function (module) {
      let insertions = [];
      if (insertions = insertionMap.get(module)) {
        insertions.forEach(insertion => {
          console.log(module._source._value.substring(insertion[0], insertion[1]));
        });
      }
    });
  });


  compiler.plugin('done', function () {
    console.log('hello world');
  });
}

module.exports = HelloWorldPlugin;
