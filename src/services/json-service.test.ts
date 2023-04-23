import { stringify, removeEmptyValues } from './json-service';

describe('stringify', () => {
  test('should return the stringified JSON with 4 spaces', () => {
    const json = { name: 'John Doe', age: 30 };
    const expected = '{\n    "name": "John Doe",\n    "age": 30\n}';
    const result = stringify(json);
    expect(result).toEqual(expected);
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
