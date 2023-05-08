import { capitalize } from './example';

describe('capitalize', () => {
  it('should capitalize a string', () => {
    expect(capitalize('hello')).toEqual('HELLO');
    expect(capitalize('123hello')).toEqual('123HELLO');
  });

  it('should return empty given empty', () => {
    expect(capitalize('')).toEqual('');
  });
});
