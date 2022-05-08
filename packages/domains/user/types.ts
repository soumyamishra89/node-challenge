export interface User {
    id: string
    first_name: string
    last_name: string
    company_name: string
    ssn: string
    user_name: string
    password: string
    auth_token?: string
}

export type UserDetails = Omit<Omit<User, 'user_name'>, 'password'>
