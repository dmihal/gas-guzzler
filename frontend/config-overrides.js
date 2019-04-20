const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

    config.module.rules.push({
      test: /worker\.js$/,
      use: { loader: 'worker-loader' },
    });

    config.output.globalObject = 'this';

    return config;
};
