module.exports = {
  entry: ["./index.js"],
  output: {
    path: __dirname,
    publicPath: '.',
    filename: './bundle.js'
  },
  devServer: {
    "port": 8000,
    "browser": ["chrome", '--allow-file-access-from-files', '--disable-web-security', '--user-data-dir=./userdata'],
    "watch_js": ['./index.js'],
    "watch_html": ['*.html'],
    "w2t": false
  }
};