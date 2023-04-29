import { stringify, removeEmptyValues, prettify } from './json-service';

describe('stringify', () => {
  test('should return the stringified JSON with 4 spaces', () => {
    const json = { name: 'John Doe', age: 30 };
    const expected = '{\n    "name": "John Doe",\n    "age": 30\n}';
    const result = stringify(json);
    expect(result).toEqual(expected);
  });
});

describe('prettify', () => {
  it('should return the prettified JSON string when given valid JSON', () => {
    const json = '{"name": "John Doe","age":30,"city":"New York"}';
    const expected = `{
  "name": "John Doe",
  "age": 30,
  "city": "New York"
}`;
    expect(prettify(json)).toEqual(expected);
  });

  it('should return the original string when given invalid JSON', () => {
    const json = 'not a valid json';
    expect(prettify(json)).toEqual(json);
  });
});

describe('removeEmptyValues', () => {
  test('should remove empty arrays and objects', () => {
    const arg = { foo: [], bar: {} };
    const expected = {};
    const result = removeEmptyValues(arg);
    expect(result).toEqual(expected);
  });

  test('should keep non-empty arrays and objects', () => {
    const arg = { foo: [1, 2, 3], bar: { name: 'John Doe', age: 30 } };
    const expected = { foo: [1, 2, 3], bar: { name: 'John Doe', age: 30 } };
    const result = removeEmptyValues(arg);
    expect(result).toEqual(expected);
  });
});
