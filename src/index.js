const tokenizeOembed = require('./oembed-parser')
const renderOembed = require('./oembed-renderer')

/**
 * Add the remarkable-oembed plugin to the Remarkable prototype.
 * @param {Remarkable} md  Instance of the Remarkable prototype.
 * @param {Object} options The options given to Remarkable.
 */
const oembedPlugin = (md /* , options */) => {
  md.block.ruler.before('paragraph', 'oembed', tokenizeOembed /* , options */)
  md.renderer.rules.oembed = renderOembed
}

module.exports = oembedPlugin
