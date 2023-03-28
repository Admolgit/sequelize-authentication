const validatePassword = require('../src/middlewares/validatePassword');

test('return false given an empty string', () => {
  expect(validatePassword('')).toBe(false);
})

test('return true given a password of 8 character or longer, a letter, and a number', () => {
  expect(validatePassword('a1234567')).toBe(true);
  expect(validatePassword('A1234567')).toBe(true);
  expect(validatePassword('Aa234567')).toBe(true);
})

test('return false given a password of more than 16 character', () => {
  expect(validatePassword('a12345677666666666666')).toBe(false);
})

test('return true given a password of 16 character', () => {
  expect(validatePassword('123456789101112a')).toBe(true);
})

test('return false given a password of 8 character or longer, but no letter', () => {
  expect(validatePassword('11234567')).toBe(false);
})

test('return false given a password of 8 character or longer, but no numbers', () => {
  expect(validatePassword('abcdefgh')).toBe(false);
})

test('return false given a password of 8 character or longer with Uppercase, but no numbers', () => {
  expect(validatePassword('ABCDEFGH')).toBe(false);
})
test('return false given a password of 8 character or longer, but includes special character', () => {
  expect(validatePassword('ABCDEFG.')).toBe(false);
})

