const WPAPI = require('wpapi')

export default (ctx, inject) => {
  const baseURL = `${options.baseURL}`
  const _browserBaseURL = `${options.browserBaseURL}`
  const browserBaseURL = _browserBaseURL || baseURL
  const endpoint = process.browser ? browserBaseURL : baseURL

  const wp = WPAPI({ endpoint })
  ctx.$wp = wp
  inject('wp', wp)
}
