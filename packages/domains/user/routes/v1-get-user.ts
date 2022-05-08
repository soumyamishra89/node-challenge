import { ApiError } from '@nc/utils/errors';
import { getUserDetails } from '../model';
import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';
import { UserDetails } from '../types';

export const router = Router();

router.get('/get-user-details', async (req, res, next) => {
  const user = req.user as UserDetails;
  const [userError, userDetails] = await to(getUserDetails(user.id));

  if (userError) {
    return next(new ApiError(userError, userError.status, `Could not get user details: ${userError}`, userError.title, req));
  }

  if (!userDetails) {
    return res.json({});
  }

  return res.json(JSON.parse(secureTrim(userDetails)));
});
