export type ExpenseStatus =
'pending'| 'processed'

export interface Expense {
  id: string
  merchant_name: string
  amount_in_cents: number
  currency: string
  user_id: string
  date_created: string
  status: ExpenseStatus
}

const SortBy = ['id', 'merchant_name', 'amount_in_cents', 'currency', 'user_id',
  'date_created',
  'status'] as const;

export type ExpenseSort = typeof SortBy[number]
export type OrderBy = 'asc' | 'desc';

function isValidSortBy(sortBy: string): sortBy is ExpenseSort { return SortBy.includes(sortBy as ExpenseSort); }
export function getValidSortBy(sortBy: string): ExpenseSort { return (isValidSortBy(sortBy) ? sortBy : 'id'); }
export function getValidOrderBy(orderBy: string = ''): OrderBy { return orderBy.toLowerCase() === 'desc' ? 'desc' : 'asc'; }
