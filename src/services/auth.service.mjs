import User from '../entities/user.entity.mjs';
import { encrypt, check } from './encryption.service.mjs';

export async function login(email, password) {
  // check credentials towards users in db
  const user = await User.findOne({ email }).exec();

  if (user) { // if match
    // Check credentials match
    if (await check(password, user.password)) {
      return user;
    }
  }
  return false;
}

export async function signup(email, password) {
  const exists = await User.findOne({ email }).exec();

  if (exists) {
    return 'USER_EXISTS';
  }
  const user = new User({ email, password: await encrypt(password) });
  await user.save();

  return 'SUCCESS';
}
