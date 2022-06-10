const assert = require('chai').assert
const { Remarkable } = require('remarkable')
const oembedPlugin = require('../src/index')

const md = new Remarkable()
md.use(oembedPlugin)

/* ------- Tests for when oEmbed Markdown syntax is a block content by itself -------- */
const oembedBlockTests = [
  { // oEmbed Markdown syntax test
    md: '!oembed[A Youtube video about Elastic Path Commerce Cloud](https://www.youtube.com/watch?v=7ALwNmwYxBg "What is Elastic Path Commerce Cloud")',
    html: '<div class="oembed oembed-video"><iframe width="200" height="113" src="https://www.youtube.com/embed/7ALwNmwYxBg?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>\n'
  },
  { // oEmbed Markdown syntax test
    md: '!oembed[A Youtube video about Elastic Path Commerce Cloud](https://www.youtube.com/watch?v=7ALwNmwYxBg      "What is Elastic Path Commerce Cloud")',
    html: '<div class="oembed oembed-video"><iframe width="200" height="113" src="https://www.youtube.com/embed/7ALwNmwYxBg?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>\n'
  },
  { // oEmbed Markdown syntax test
    md: '!oembed[](https://www.youtube.com/watch?v=7ALwNmwYxBg)',
    html: '<div class="oembed oembed-video"><iframe width="200" height="113" src="https://www.youtube.com/embed/7ALwNmwYxBg?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>\n'
  },
  { // oEmbed Markdown syntax test
    md: '!oembed[](https://www.youtube.com/watch?v=7ALwNmwYxBg           )',
    html: '<p>!oembed<a href="https://www.youtube.com/watch?v=7ALwNmwYxBg"></a></p>\n'
  },
  { // oEmbed Markdown syntax test
    md: '!oembed[]()',
    html: '<p>!oembed<a href=""></a></p>\n'
  },
  { // oEmbed Markdown syntax test
    md: '!oembed[](not a url)',
    html: '<p>!oembed[](not a url)</p>\n'
  },
  { // oEmbed Markdown syntax test
    md: '!oembed[](https://www.youtube.com/watch?v=7ALwNmwYxBg)\n!oembed[](https://www.youtube.com/watch?v=7ALwNmwYxBg)',
    html: '<div class="oembed oembed-video"><iframe width="200" height="113" src="https://www.youtube.com/embed/7ALwNmwYxBg?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>\n<div class="oembed oembed-video"><iframe width="200" height="113" src="https://www.youtube.com/embed/7ALwNmwYxBg?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>\n'
  },
  { // oEmbed Markdown syntax test
    md: '  !oembed[](https://www.youtube.com/watch?v=7ALwNmwYxBg)    ',
    html: '<div class="oembed oembed-video"><iframe width="200" height="113" src="https://www.youtube.com/embed/7ALwNmwYxBg?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>\n'
  },
  { // oEmbed Markdown syntax test
    md: '  !oembed[](https://www.youtube.com/watch?v=7ALwNmwYxBg)    \n',
    html: '<div class="oembed oembed-video"><iframe width="200" height="113" src="https://www.youtube.com/embed/7ALwNmwYxBg?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>\n'
  },
  { // Provider does not have a scheme specified
    md: '!oembed[](https://www.edumedia-sciences.com/en/media/696-human-body)',
    html: '<div class="oembed oembed-rich"><iframe width=550 height=440 src="https://www.edumedia-sciences.com/en/media/frame/696/" frameborder=0></iframe></div>\n'
  },
  { // Provider endpoint url contains '{format}', e.g. https://www.ted.com/services/v1/oembed.{format}
    md: '!oembed[](https://www.ted.com/talks/brittany_young_how_dirt_bikes_and_stem_ignite_ingenuity_in_baltimore)',
    html: '<div class="oembed oembed-video"><iframe src="https://embed.ted.com/talks/brittany_young_how_dirt_bikes_and_stem_ignite_ingenuity_in_baltimore" width="560" height="316" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>\n'
  },
  { // Provider endpoint url ends with a trailing slash
    md: '!oembed[](https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO)',
    html: '<div class="oembed oembed-rich"><iframe style="border-radius: 12px" width="100%" height="380" title="Spotify Embed: Peaceful Piano" frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=oembed"></iframe></div>\n'
  }
]

describe('When oEmbed Markdown syntax is a block content by itself', function () {
  this.timeout(10000)

  oembedBlockTests.forEach(test => {
    it(`Markdown = "${test.md}"`, () => {
      assert.equal(md.render(test.md), test.html)
    })
  })
})

/* ----------- Tests for when oEmbed Markdown syntax is inline ---------- */
const oembedInlineTests = [
  {
    md: 'text before !oembed[](https://www.youtube.com/watch?v=7ALwNmwYxBg)',
    html: '<p>text before !oembed<a href="https://www.youtube.com/watch?v=7ALwNmwYxBg"></a></p>\n'
  },
  {
    md: '!oembed[]text in middle(https://www.youtube.com/watch?v=7ALwNmwYxBg)',
    html: '<p>!oembed[]text in middle(https://www.youtube.com/watch?v=7ALwNmwYxBg)</p>\n'
  },
  {
    md: '!oembed[](https://www.youtube.com/watch?v=7ALwNmwYxBg) text after',
    html: '<p>!oembed<a href="https://www.youtube.com/watch?v=7ALwNmwYxBg"></a> text after</p>\n'
  }
]

describe('When oEmbed Markdown syntax is inline', () => {
  oembedInlineTests.forEach(test => {
    it(`Markdown = "${test.md}"`, () => {
      assert.equal(md.render(test.md), test.html)
    })
  })
})

/* ---------- Tests for when oEmbed Markdown syntax should throw an error ------------ */
const oembedErrorTests = [
  { // Elastic Path is not a provider of oEmbed framework
    md: '!oembed[Elastic Path is not a valid provider of oembed format](https://www.elasticpath.com/)',
    error: 'The provider does not support the oEmbed format for the source URL you passed in the oembed markdown syntax OR the provider does not support oEmbed.'
  }
  // http request error: 404 Not Found
  // http request error: 501 Not Implemented
  // http request error: 401 Unauthorized
]

describe('The following oEmbed Markdown syntax should throw errors', () => {
  oembedErrorTests.forEach(test => {
    it(`Markdown = "${test.md}"`, () => {
      assert.throws(() => { md.render(test.md) }, test.error)
    })
  })
})
