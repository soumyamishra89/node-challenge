import { query } from '@nc/utils/db';

export function readUser(userId) {
  return query('SELECT * FROM users WHERE id = $1', [userId])
    .then((response) => response.rows?.[0]);
}

export function readUserByUserNamePassword(userName, password) {
  return query('SELECT * FROM users WHERE user_name = $1 AND password = $2', [userName, password])
    .then((response) => response.rows?.[0]);
}

export function readUserByAuthToken(token) {
  return query('SELECT * FROM users WHERE auth_token = $1', [token])
    .then((response) => response.rows?.[0]);
}

export function updateUserAuthToken(userId, token) {
  return query('UPDATE users SET auth_token = $2 WHERE id = $1', [userId, token])
    .then((response) => response.rowCount);
}
