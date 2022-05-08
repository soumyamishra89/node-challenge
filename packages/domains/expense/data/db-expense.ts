import { query } from '@nc/utils/db';
import { ExpenseSort, OrderBy } from '../types';

export function readExpenses(userId, sortBy: ExpenseSort, orderBy: OrderBy, page: number, limit: number) {
  return query(`SELECT * FROM expenses WHERE user_id = $1 ORDER BY ${sortBy} ${orderBy} LIMIT $3 OFFSET $2`, [userId, page * limit, limit])
    .then((response) => response.rows);
}
