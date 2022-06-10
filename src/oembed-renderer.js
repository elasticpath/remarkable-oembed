const { findMatchingEndpoint, sendOembedRequest, parseOembedResponse } = require('./utils')
const providers = require('../data/providers')

/**
 * Render the HTML element for oEmbed Markdown syntax.
 * @param {String[]} tokens  The list of tokens currently being processed.
 * @param {Integer} idx      The index of the token currently being processed.
 * @param {Object} options   The options given to Remarkable.
 * @param {Object} env       The key-value store created by the parsing rules.
 * @returns {String}         HTML element.
 */
const renderOembed = (tokens, idx /* , options, env */) => {
  const consumerUrl = tokens[idx].url
  const matchingEndpointUrl = findMatchingEndpoint(providers, consumerUrl)
  const oembedUrl = matchingEndpointUrl + '?url=' + consumerUrl + '&format=json'
  const providerResponse = sendOembedRequest(oembedUrl)

  return parseOembedResponse(providerResponse)
}

module.exports = renderOembed
