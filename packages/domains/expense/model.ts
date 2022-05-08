import { format } from './formatter';
import { readExpenses } from './data/db-expense';
import { to } from '@nc/utils/async';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';
import { Expense, ExpenseSort, OrderBy } from './types';

export async function getExpenses(userId, sortBy: ExpenseSort = 'id', orderBy: OrderBy = 'asc', page = 0, limit = 10): Promise<Expense[]> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawExpenses] = await to(readExpenses(userId, sortBy, orderBy, isNaN(page) ? 0 : page, isNaN(limit) ? 10 : limit));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpenses) {
    throw NotFound(`Could not find expenses for user_id ${userId}`);
  }

  return format(rawExpenses);
}
