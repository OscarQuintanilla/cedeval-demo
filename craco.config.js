const CracoAlias = require('craco-alias');
reactHotReloadPlugin = require('craco-plugin-react-hot-reload');

module.exports = {
  plugins: [
    {
      plugin: reactHotReloadPlugin,
    },
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: '.',
        /* tsConfigPath should point to the file where "baseUrl" and "paths" 
             are specified*/
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
};
