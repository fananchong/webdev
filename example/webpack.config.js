module.exports = {
  entry: ["./index.js"],
  output: {
    path: __dirname,
    publicPath: '.',
    filename: './bundle.js'
  },
  devServer: {
    "port": 8000,
    "open": true,
    "browser": ["chrome", '--allow-file-access-from-files', '--disable-web-security', '--user-data-dir=./userdata'],
    "watch": ['./index.js']
  },
  node: {
    fs: 'empty'
  }
};