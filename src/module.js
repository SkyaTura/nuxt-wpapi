const path = require('path')

module.exports = function NWPress (moduleOptions) {
  const defaultOptions = {
    baseURL: 'localhost',
    browserBaseURL: ''
  }
  const options = {
    ...defaultOptions,
    ...moduleOptions,
    ...this.options.NWPress
  }

  this.addPlugin({
    options,
    src: path.resolve(__dirname, 'wpapi.plugin.js'),
  })
}
