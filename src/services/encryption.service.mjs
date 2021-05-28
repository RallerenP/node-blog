import bcrypt from 'bcrypt';

export function encrypt(text) {
  return bcrypt.hash(text, 10);
}

export function check(text, hashed) {
  return bcrypt.compare(text, hashed);
}
