// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// // const TerserPlugin = require("terser-webpack-plugin");
// const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: '/',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

module.exports = {
  poweredByHeader: false,
}

// module.exports = {
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//       // Note: we provide webpack above so you should not `require` it
//       // Perform customizations to webpack config
//       config.plugins.push(
//           new TerserPlugin()
//       )

//       // Important: return the modified config
//       return config
//   },
// }

// module.exports = {
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//       // Note: we provide webpack above so you should not `require` it
//       // Perform customizations to webpack config
//       config.plugins.push(
//         new CompressionPlugin({
//           algorithm: 'gzip',
//           test: /.js$|.css$/,
//         })
//       )

//       // Important: return the modified config
//       return config
//   },
// }