import { ApiError } from '@nc/utils/errors';

import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';
import { generateRandomToken, hash } from '@nc/utils/crypto';
import { getUserDetailsByUserNamePassword, updateAuthToken } from '../model';

export const router = Router();

router.post('/login', async (req, res, next) => {
  const { user_name: userName, password } = req.body;

  const [userError, userDetails] = await to(getUserDetailsByUserNamePassword(userName, hash(password)));

  if (userError) {
    return next(new ApiError(userError, userError.status, `Could not get user details: ${userError}`, userError.title, req));
  }

  if (!userDetails) {
    return res.json({});
  }

  if (!userDetails.auth_token) {
    userDetails.auth_token = generateRandomToken();
    await updateAuthToken(userDetails.id, userDetails.auth_token);
  }

  return res.json(secureTrim(userDetails));
});
