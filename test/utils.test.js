const assert = require('chai').assert
const utils = require('../src/utils')

describe('Unit tests for trimTrailingSlash()', function () {
  describe('Should trim trailing slash', function () {
    it('When a trailing slash is present', function () {
      assert.equal(utils.trimTrailingSlash('url.com/'), 'url.com')
    })

    it('When there are multiple subdirectories before the trailing slash', function () {
      assert.equal(utils.trimTrailingSlash('url.com/path-1/path-2/'), 'url.com/path-1/path-2')
    })

    it('When there are query parameters before the trailing slash', function () {
      assert.equal(utils.trimTrailingSlash('url.com/path-1/?param=value/'), 'url.com/path-1/?param=value')
    })
  })

  describe('Should return original url', function () {
    it('When a trailing slash is not present', function () {
      assert.equal(utils.trimTrailingSlash('url.com'), 'url.com')
    })

    it('When the url ends with multiple subdirectories', function () {
      assert.equal(utils.trimTrailingSlash('url.com/path-1/path-2'), 'url.com/path-1/path-2')
    })

    it('When the url ends with query parameters', function () {
      assert.equal(utils.trimTrailingSlash('url.com/path-1/?param=value'), 'url.com/path-1/?param=value')
    })
  })
})

describe('Unit tests for findMatchingEndpoint()', function () {
  const providers = [
    {
      provider_name: 'provider',
      provider_url: 'https://www.provider.com',
      endpoints: [
        {
          schemes: [
            'http://provider.com/talks/*',
            'https://provider.com/talks/*',
            'https://www.provider.com/talks/*'
          ],
          url: 'https://www.provider.com/services/v1/oembed.{format}',
          discovery: true
        }
      ]
    },
    {
      provider_name: 'no-scheme',
      provider_url: 'https://www.no-scheme.com/',
      endpoints: [
        {
          url: 'https://www.no-scheme.com/oembed.json',
          discovery: true
        }
      ]
    }
  ]

  const errorMsg = 'The provider does not support the oEmbed format for the source URL you passed in the oembed markdown syntax OR the provider does not support oEmbed.'

  it('Should throw an error when the provider is not supported', function () {
    const fn = () => utils.findMatchingEndpoint(providers, 'url.com')
    assert.throws(fn, errorMsg)
  })

  it('Should return a matching endpoint url with json format when the provider endpoint url has trailing ".{format}"', function () {
    const matchingEndpointUrl = utils.findMatchingEndpoint(providers, 'http://provider.com/talks/abc')
    assert.equal(matchingEndpointUrl, 'https://www.provider.com/services/v1/oembed.json')
  })

  it('Should throw an error when there is no matching scheme from the provider', function () {
    const fn = () => utils.findMatchingEndpoint(providers, 'http://provider.com/a')
    assert.throws(fn, errorMsg)
  })

  it('Should return a matching endpoint url with json format when the provider does not have a scheme property', function () {
    const matchingEndpointUrl = utils.findMatchingEndpoint(providers, 'https://www.no-scheme.com/abc/')
    assert.equal(matchingEndpointUrl, 'https://www.no-scheme.com/oembed.json')
  })
})

describe('Unit tests for sendOembedRequest()', function () {
  // TODO: Should fake the server and XHR using Sinon
  it('Should return the respose text when the oEmbed url is valid', function () {
    const oembedUrl = 'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=7ALwNmwYxBg'
    const responseText = utils.sendOembedRequest(oembedUrl)

    assert.equal(responseText, '{"title":"John Bruno Explains Elastic Path Commerce Cloud","author_name":"Elastic Path Software","author_url":"https://www.youtube.com/c/Elasticpathsoftware","type":"video","height":113,"width":200,"version":"1.0","provider_name":"YouTube","provider_url":"https://www.youtube.com/","thumbnail_height":360,"thumbnail_width":480,"thumbnail_url":"https://i.ytimg.com/vi/7ALwNmwYxBg/hqdefault.jpg","html":"\\u003ciframe width=\\u0022200\\u0022 height=\\u0022113\\u0022 src=\\u0022https://www.youtube.com/embed/7ALwNmwYxBg?feature=oembed\\u0022 frameborder=\\u00220\\u0022 allow=\\u0022accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\\u0022 allowfullscreen\\u003e\\u003c/iframe\\u003e"}')
  })

  // TODO: Should fake the server and XHR using Sinon
  it('Should throw a 404 Not Found error when the request source url does not have a response', function () {
    const oembedUrl = 'https://www.youtube.com/oembed?url=https://abc'
    const fn = () => utils.sendOembedRequest(oembedUrl)

    assert.throws(fn, '404 Not Found: The provider has no response for the requested url parameter.')
  })

  it('Test case for 501 error')
  it('Test case for 401 error')
})

describe('Unit tests for renderVideoRichHtml()', function () {
  it('Should return the html ouput when the response from the endpoint url is in correct video or rich media format', function () {
    const response = {
      type: 'video',
      height: 150,
      width: 200,
      html: 'hello'
    }

    const htmlOutput = utils.renderVideoRichHtml(response)
    assert.equal(htmlOutput, '<div class="oembed oembed-video">hello</div>\n')
  })

  it('Should throw an error when the response from the endpoint url is not in correct video or rich media format', function () {
    const response = {
      type: 'video',
      width: 200,
      html: 'hello'
    }

    const fn = () => utils.renderVideoRichHtml(response)
    assert.throws(fn, 'The oEmbed response returned by the provider does not contain required "html", "height", or "width" parameters. It is not a valid "Video" or "Rich Media" type response.')
  })
})

describe('Unit tests for parseOembedResponse()', function () {
  it('Should return the html ouput when the response from the endpoint url is in correct video or rich media format', function () {
    const providerResponse = '{"type": "video","version": 1,"height": 150,"width": 200,"html":"hello"}'

    const htmlOutput = utils.parseOembedResponse(providerResponse)
    assert.equal(htmlOutput, '<div class="oembed oembed-video">hello</div>\n')
  })

  it('Should throw an error when the response from the endpoint url is not in video or rich media format', function () {
    const providerResponse = '{"type": "image","version": 1,"height": 150,"width": 200,"html":"hello"}'

    const fn = () => utils.parseOembedResponse(providerResponse)
    assert.throws(fn, 'Your source format is not in Video or Rich Media. It is currently not supported by the remarkable-oembed plugin.')
  })

  it('Should throw an error when the response from the endpoint url does not contain all required oEmbed response parameters', function () {
    const providerResponse = '{"height": 150,"width": 200,"html":"hello"}'

    const fn = () => utils.parseOembedResponse(providerResponse)
    assert.throws(fn, 'The response returned by the provider does not contain required "type" or "version" parameters. It is not a valid oEmbed response.')
  })
})
