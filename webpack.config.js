module.exports = {
  entry: ["./example/index.js"],
  output: {
    path: __dirname,
    publicPath: './example',
    filename: './example/bundle.js'
  },
  devServer: {
    "port": 8000,
    "open": true,
    "browser": ["chrome", '--allow-file-access-from-files', '--disable-web-security', '--user-data-dir=./userdata'],
    "watch_js": ['./example/index.js'],
    "watch_html": ['./example/*.html'],
    "w2t": false
  }
};