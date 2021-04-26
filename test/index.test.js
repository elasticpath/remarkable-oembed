const assert = require('chai').assert
const { Remarkable } = require('remarkable')
const oembedPlugin = require('../src/index')

const md = new Remarkable()
md.use(oembedPlugin)

const oembedBlockTests = [
  {
    md: '@[ep](https://elasticpath.com)',
    html: '<div><a href="https://elasticpath.com">Hello world</a></div>\n'
  },
  {
    md: '*[ep](https://elasticpath.com)',
    html: '<p>*<a href="https://elasticpath.com">ep</a></p>\n'
  },
  {
    md: '@(ep](https://elasticpath.com)',
    html: '<p>@(ep](https://elasticpath.com)</p>\n'
  },
  {
    md: '@[](https://elasticpath.com)',
    html: '<p>@<a href="https://elasticpath.com"></a></p>\n'
  },
  {
    md: '@[ep)(https://elasticpath.com)',
    html: '<p>@[ep)(https://elasticpath.com)</p>\n'
  },
  {
    md: '@[ep]()',
    html: '<p>@<a href="">ep</a></p>\n'
  },
  {
    md: '@[ep](not a valid url)',
    html: '<p>@[ep](not a valid url)</p>\n'
  },
  {
    md: '@[ep](wrong-protocal://elasticpath.com)',
    html: '<p>@<a href="wrong-protocal://elasticpath.com">ep</a></p>\n'
  },
  {
    md: '@[ep][https://elasticpath.com)',
    html: '<p>@[ep][https://elasticpath.com)</p>\n'
  },
  {
    md: '@[ep](https://elasticpath.com]',
    html: '<p>@[ep](https://elasticpath.com]</p>\n'
  },
  {
    md: '@[ep](https://elasticpath.com)\n@[ep](https://elasticpath.com)',
    html: '<div><a href="https://elasticpath.com">Hello world</a></div>\n<div><a href="https://elasticpath.com">Hello world</a></div>\n'
  },
  {
    md: '  @[ep](https://elasticpath.com)    ',
    html: '<div><a href="https://elasticpath.com">Hello world</a></div>\n'
  },
  {
    md: '  @[ep](https://elasticpath.com)    \n',
    html: '<div><a href="https://elasticpath.com">Hello world</a></div>\n'
  }
]

const oembedInlineTests = [
  {
    md: 'text before @[ep](https://elasticpath.com)',
    html: '<p>text before @<a href="https://elasticpath.com">ep</a></p>\n'
  },
  {
    md: '@[ep]text in middle(https://elasticpath.com)',
    html: '<p>@[ep]text in middle(https://elasticpath.com)</p>\n'
  },
  {
    md: '@[ep](https://elasticpath.com) text after',
    html: '<p>@<a href="https://elasticpath.com">ep</a> text after</p>\n'
  }
]

describe('When oEmbed Markdown syntax is a block content by itself', () => {
  oembedBlockTests.forEach(test => {
    it(`Markdown = "${test.md}"`, () => {
      assert.equal(md.render(test.md), test.html)
    })
  })
})

describe('When oEmbed Markdown syntax is inline', () => {
  oembedInlineTests.forEach(test => {
    it(`Markdown = "${test.md}"`, () => {
      assert.equal(md.render(test.md), test.html)
    })
  })
})
