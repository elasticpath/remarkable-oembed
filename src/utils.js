const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

/**
 * Find the matching endpoint if any in all the oEmbed providers.
 * @param {Object[]} providers  An array of oEmbed providers.
 * @param {String} consumerUrl  The source url passed into the oembed Markdown syntax.
 * @returns {String}            The matching endpoint url to the source url.
 */
const findMatchingEndpoint = (providers, consumerUrl) => {
  let matchingEndpointUrl

  const hasMatchingEndpoint = providers.some(provider => {
    const providerUrl = provider.provider_url
    const endpoints = provider.endpoints

    return endpoints.some(endpoint => {
      const schemes = endpoint.schemes

      // endpoint url could be like https://www.ted.com/services/v1/oembed.{format}
      const endpointUrl = endpoint.url.replace('{format}', 'json')

      if (schemes) { // 'schemes' property is defined for endpoint object
        return schemes.some(scheme => {
          const schemePattern = scheme.replace(/\./g, '[.]')
            .replace(/\*/g, '.+')
          const schemeRegex = new RegExp(schemePattern)
          const schemeMatch = consumerUrl.match(schemeRegex)

          if (schemeMatch) {
            matchingEndpointUrl = trimTrailingSlash(endpointUrl)
            return true
          }

          return false
        })
      } else {
        if (consumerUrl.startsWith(providerUrl)) {
          matchingEndpointUrl = trimTrailingSlash(endpointUrl)
          return true
        }

        return false
      }
    })
  })

  if (!hasMatchingEndpoint) {
    throw new Error(
      'The provider does not support the oEmbed format for the' +
      ' source URL you passed in the oembed markdown syntax OR the provider' +
      ' does not support oEmbed.'
    )
  }

  return matchingEndpointUrl
}

const trimTrailingSlash = (endpointUrl) => {
  if (endpointUrl.endsWith('/')) {
    return endpointUrl.substring(0, endpointUrl.length - 1)
  }
  return endpointUrl
}

/**
 * Get the reponse text from the oEmbed URL.
 * @param {String} oembedUrl  The oEmbed URL to get the response from.
 * @returns {String}          The reponse text.
 */
const sendOembedRequest = (oembedUrl) => {
  const request = new XMLHttpRequest()
  request.open('GET', oembedUrl, false)
  request.send()

  const statusCode = request.status

  if (statusCode === 404) {
    throw new Error('404 Not Found: The provider has no response for the requested url parameter.')
  }

  if (statusCode === 501) {
    throw new Error('501 Not Implemented: The provider cannot return a response in the requested format.')
  }

  if (statusCode === 401) {
    throw new Error('401 Unauthorized: The specified URL contains a private (non-public) resource.')
  }

  return request.responseText
}

/**
 * Render the HTML from the Video or Rich Media type oEmbed response.
 * @param {Object} response  The oEmbed response.
 * @returns {String}         HTML for the source Video or Rich Media.
 */
const renderVideoRichHtml = (response) => {
  if (response.html && response.height && response.width) {
    return `<div class="oembed oembed-${response.type}">${response.html}</div>\n`
  } else {
    throw new Error('The oEmbed response returned by the provider does not contain required "html", "height", or "width" parameters. It is not a valid "Video" or "Rich Media" type response.')
  }
}

/**
 * Parse the response text get from the oEmbed URL.
 * @param {String} providerResponse  The reponse text get from the oEmbed URL.
 * @returns {String}                 The HTML output to be returned by md.render() function.
 */
const parseOembedResponse = (providerResponse) => {
  const response = JSON.parse(providerResponse)

  // Validate oembed response according to oembed specs
  // Ref: [2.3.4 Response parameters](https://oembed.com/)
  if (response.type && response.version) {
    if (response.type === 'video' || response.type === 'rich') {
      return renderVideoRichHtml(response)
    } else {
      throw new Error('Your source format is not in Video or Rich Media. It is currently not supported by the remarkable-oembed plugin.')
    }
  } else {
    throw new Error('The response returned by the provider does not contain required "type" or "version" parameters. It is not a valid oEmbed response.')
  }
}

exports.findMatchingEndpoint = findMatchingEndpoint
exports.sendOembedRequest = sendOembedRequest
exports.parseOembedResponse = parseOembedResponse
