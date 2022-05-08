import { Api } from '../utils/api';

describe('Expenses', () => {
  describe('Invalid credentials', () => {
    xit('Should fail fetching user expenses', () => {
      return Api.get('/expenses/v1/get-user-expense').set('x-auth-token', 'random')
        .expect(401);
    });
  });

  describe('Valid credentials', () => {
    xit('Should successfully fetch user expenses', async () => {
      const authToken = await Api.post('/users/login').send({ user_name: 'jeppe_rindom', password: 'password' })
        .expect(200);
      return Api.get('/expenses/v1/get-user-expense').set('x-auth-token', authToken.body.auth_token)
        .expect(200).then((resp) => expect(resp.body).toHaveLength(3));
    });

    it('Should return sorted expenses', async () => {
      const authToken = await Api.post('/users/login').send({ user_name: 'jeppe_rindom', password: 'password' }).expect(200);
	  const expenses = await Api.get('/expenses/v1/get-user-expense').set('x-auth-token', authToken.body.auth_token).query({ sort: 'date_created asc' }).expect(200)
        .then((resp) => resp.body);
	  expect(expenses).toHaveLength(3);
	  expect(expenses[0].id).toEqual('f20866f9-7d46-45f2-822c-4b568e216a13');
    });

    it('Invalid query params should work with default values', async () => {
      const authToken = await Api.post('/users/login').send({ user_name: 'jeppe_rindom', password: 'password' }).expect(200);
	  const expenses = await Api.get('/expenses/v1/get-user-expense').set('x-auth-token', authToken.body.auth_token).query({ limit: 'random' }).expect(200)
        .then((resp) => resp.body);
	  expect(expenses).toHaveLength(3);
    });

    it('Should work with pagination', async () => {
      const authToken = await Api.post('/users/login').send({ user_name: 'jeppe_rindom', password: 'password' }).expect(200);
      const expensesPage0 = await Api.get('/expenses/v1/get-user-expense').set('x-auth-token', authToken.body.auth_token).query({ page: 0, limit: 10 }).expect(200)
        .then((resp) => resp.body);
      expect(expensesPage0).toHaveLength(3);
	  const expensesPage1 = await Api.get('/expenses/v1/get-user-expense').set('x-auth-token', authToken.body.auth_token).query({ page: 1, limit: 10 }).expect(200)
        .then((resp) => resp.body);
      expect(expensesPage1).toHaveLength(0);
	  });
  });
});
