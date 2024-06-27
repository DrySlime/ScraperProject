const getDomainName = require('../getDomainName')

test('find the Domain Name Amazon', ()=>{
    expect(getDomainName('https://www.amazon.de')).toBe('amazon.de')
})