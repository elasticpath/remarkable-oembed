/**
 * A block rule that tokenize oEmbed Markdown syntax.
 * @param {StateBlock} state   Instance of the StateBlock prototype.
 * @param {Integer} startLine  Index of the first line in state.src.
 * @param {Integer} endLine    Index of the last line in state.src.
 * @param {Boolean} silent     Whether to silence tokenizing the oEmbed syntax.
 * @returns {Boolean}          True if the line is in the proper oEmbed syntax; otherwise false.
 */
const tokenizeOembed = (state, startLine /* , endLine , silent */) => {
  // Markdown: '  @[string](url)'
  // pos:         ^
  const pos = state.bMarks[startLine] + state.tShift[startLine]
  let max = state.eMarks[startLine]

  // cut trailing spaces from the end of the line: '@[string](url)      \n'
  // max:                                                         ^  <-  ^
  max = state.skipCharsBack(max, 0x20 /* space */, pos)

  const oembedRegex = /^@\[.+\]\((?<url>(https|http):\/\/.+)\)$/
  const oembedMatch = state.src.slice(pos, max).match(oembedRegex)
  if (!oembedMatch) { return false }

  // update the line index to parse next in the Markdown document
  state.line = startLine + 1

  state.tokens.push({
    type: 'oembed',
    url: oembedMatch.groups.url
  })

  return true
}

module.exports = tokenizeOembed
