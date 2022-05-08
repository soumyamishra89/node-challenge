import { generateRandomToken, hash } from '../crypto';

describe('[Packages | User-domain | Crypto] hash', () => {
  it('hash should produce consistent result', () => {
    expect(hash('password')).toEqual('XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=');
  });
  it('hash should produce fixed length result', () => {
    expect(hash('password')).toHaveLength(44);
    expect(hash('really really long text')).toHaveLength(44);
  });
});

describe('[Packages | User-domain | Crypto] generateRandomToken', () => {
  it('generateRandomToken should produce fixed length result', () => {
    expect(generateRandomToken()).toHaveLength(44);
    expect(generateRandomToken()).toHaveLength(44);
  });
});
