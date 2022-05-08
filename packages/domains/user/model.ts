import { format } from './formatter';
import { to } from '@nc/utils/async';
import { UserDetails } from './types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';
import { readUser, readUserByAuthToken, readUserByUserNamePassword, updateUserAuthToken } from './data/db-user';

export async function getUserDetails(userId): Promise<UserDetails> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawUser] = await to(readUser(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawUser) {
    throw NotFound(`Could not find user with id ${userId}`);
  }

  return format(rawUser);
}

export async function getUserDetailsByUserNamePassword(userName, password): Promise<UserDetails> {
  if (!userName || !password) {
    throw BadRequest('username or password is missing.');
  }

  const [dbError, rawUser] = await to(readUserByUserNamePassword(userName, password));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawUser) {
    throw NotFound('Could not find user');
  }

  return format(rawUser);
}

export async function getUserDetailsByAuthToken(token): Promise<UserDetails> {
  if (!token) {
    throw BadRequest('No auth token.');
  }

  const [dbError, rawUser] = await to(readUserByAuthToken(token));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawUser) {
    throw NotFound('Could not find user');
  }

  return format(rawUser);
}

export async function updateAuthToken(userId, token): Promise<number> {
  const [dbError, updateCount] = await to(updateUserAuthToken(userId, token));

  if (dbError) {
    throw InternalError(`Error updating data from the DB: ${dbError.message}`);
  }

  if (updateCount !== 1) {
    throw InternalError('Could not update token');
  }

  return updateCount;
}
