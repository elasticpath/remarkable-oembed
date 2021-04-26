/**
 * Render the HTML element for oEmbed Markdown syntax.
 * @param {String[]} tokens  The list of tokens currently being processed.
 * @param {Integer} idx      The index of the token currently being processed.
 * @param {Object} options   The options given to Remarkable.
 * @param {Object} env       The key-value store created by the parsing rules.
 * @returns {String}         HTML element.
 */
const renderOembed = (tokens, idx /* , options, env */) => {
  return `<div><a href="${tokens[idx].url}">Hello world</a></div>\n`
}

module.exports = renderOembed
