import { Api } from '../utils/api';

describe('Login', () => {
  describe('Login success', () => {
    it('Should login with valid credentials', () => {
      return Api.post('/users/login').send({ user_name: 'jeppe_rindom', password: 'password' })
        .expect(200).then((res) => {
          return expect(res.body.auth_token).not.toBeNull();
        });
    });
  });

  describe('Login fail', () => {
    it('Should not login with invalid credentials', () => {
      return Api.post('/users/login').send({ user_name: 'random', password: 'password' })
        .expect(404);
    });
  });
});
