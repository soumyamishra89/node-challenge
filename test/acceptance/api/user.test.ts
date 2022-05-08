import { Api } from '../utils/api';

describe('Users', () => {
  describe('Invalid credentials', () => {
    it('Should fail fetching user details', () => {
      return Api.get('/users/v1/get-user-details').set('x-auth-token', 'random')
        .expect(401);
    });
  });

  describe('Valid credentials', () => {
    it('Should successfully fetch user credentials', async () => {
      const authToken = await Api.post('/users/login').send({ user_name: 'jeppe_rindom', password: 'password' })
        .expect(200);
      return Api.get('/users/v1/get-user-details').set('x-auth-token', authToken.body.auth_token)
        .expect(200).then((resp) => expect(resp.body.id).not.toEqual('da140a29-ae80-4f0e-a62d-6c2d2bc8a474'));
    });
  });
});
