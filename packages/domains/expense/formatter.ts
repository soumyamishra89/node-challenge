import { capitalize } from '@nc/utils/formatter';
import { Expense } from './types';

const publicFields = ['id', 'merchant_name', 'amount_in_cents', 'currency', 'date_created', 'status'];

export function secureTrim(expenses: Expense[]): string {
  return JSON.stringify(expenses, publicFields);
}

export function format(rawExpenses: any[]): Expense[] {
  return rawExpenses.map((expense) => ({
    id: expense.id,
    merchant_name: capitalize(expense.merchant_name),
    amount_in_cents: expense.amount_in_cents,
    user_id: expense.user_id,
    currency: expense.currency,
    date_created: expense.date_created,
    status: expense.status,
  }));
}
