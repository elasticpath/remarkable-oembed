const hello = require('../src/hello')
const expect = require('chai').expect

it('Should return "hello"', () => {
  expect(hello()).to.equal('hello')
})
