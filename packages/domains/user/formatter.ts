import { capitalize } from '@nc/utils/formatter';
import { UserDetails } from './types';

const publicFields = ['first_name', 'last_name', 'company_name'];

export function secureTrim(user: UserDetails): string {
  return JSON.stringify(user, publicFields);
}

export function formatAuthToken(user: UserDetails): string {
  return JSON.stringify(user, ['auth_token']);
}

export function format(rawUser): UserDetails {
  return {
    id: rawUser.id,
    first_name: capitalize(rawUser.first_name),
    last_name: capitalize(rawUser.last_name),
    company_name: rawUser.company_name,
    ssn: rawUser.ssn,
    auth_token: rawUser.auth_token,
  };
}
