import { capitalize } from '../formatter';

describe('[Packages | User-domain | Formatter] capitalize', () => {
  test('capitalize should make the first character as a capital letter', () => {
    return expect(capitalize('mario')).toEqual('Mario');
  });

  test('capitalize should do nothing on already capitalized word', () => {
    return expect(capitalize('Mario')).toEqual('Mario');
  });

  test('capitalize should do nothing on numbers', () => {
    return expect(capitalize(123)).toEqual('123');
  });

  test('capitalize should do nothing on strings of numbers', () => {
    return expect(capitalize('123')).toEqual('123');
  });
});
