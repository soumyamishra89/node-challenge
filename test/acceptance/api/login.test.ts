import { Api } from '../utils/api';
import { dropTable, setupData } from '../utils/mock-data';

describe('Login', () => {
  beforeAll(setupData);
  afterAll(dropTable);
  describe('Login success', () => {
    it('Login with valid credentials', () => {
      return Api.post('/users/login').send({ user_name: 'jeppe_rindom', password: 'password' })
        .expect(200).then((res) => {
          return expect(res.body.auth_token).not.toBeNull();
        });
    });
  });

  describe('Login fail', () => {
    it('Login with invalid credentials', () => {
      return Api.post('/users/login').send({ user_name: 'random', password: 'password' })
        .expect(404);
    });
  });
});
