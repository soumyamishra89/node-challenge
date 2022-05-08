import { query } from '@nc/utils/db';

export default async function dropTable() {
  await query('DROP TABLE public.expenses');
  await query('DROP TABLE public.users');
}
