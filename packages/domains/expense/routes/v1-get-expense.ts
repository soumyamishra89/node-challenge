import { ApiError } from '@nc/utils/errors';
import { getExpenses } from '../model';
import { getUserDetails } from '@nc/domain-user/model';
import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';
import { UserDetails } from '@nc/domain-user/types';
import { getValidOrderBy, getValidSortBy } from '../types';

export const router = Router();

router.get('/get-user-expense', async function(req, res, next) {
  const user = req.user as UserDetails;
  const [userError, userDetails] = await to(getUserDetails(user.id));
  if (userError) {
    return next(
      new ApiError(
        userError,
        userError.status,
        `Could not get user details: ${userError}`,
        userError.title,
        req
      )
    );
  }

  if (!userDetails) {
    return next(
      new ApiError(
        new Error('User does not exist'),
        404,
        'Could not get user details',
        '',
        req
      )
    );
  }
  const { sort = '', limit, page } = req.query;
  const [sortBy, orderBy] = typeof sort === 'string' ? sort.split(' ') : [];
  const [expenseError, userExpenses] = await to(getExpenses(user.id, getValidSortBy(sortBy), getValidOrderBy(orderBy), parseInt(String(page)), parseInt(String(limit))));
  if (expenseError) {
    return next(
      new ApiError(
        expenseError,
        expenseError.status,
        `Could not get user expenses: ${expenseError}`,
        expenseError.title,
        req
      )
    );
  }

  if (!userExpenses) {
    return res.json([]);
  }
  return res.json(JSON.parse(secureTrim(userExpenses)));
});
