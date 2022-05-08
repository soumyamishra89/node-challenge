import { Api } from '../utils/api';

describe('Security', () => {
  describe('Rate limit', () => {
    it('Should limit requests', async () => {
      const responses = await Promise.all(Array.from({ length: 20 }).map(() => Api.post('/users/login').send({ user_name: 'jeppe_rindom', password: 'password' })
        .then((resp) => resp.statusCode)));
      expect(responses.some((statusCode) => statusCode === 429)).toBeTruthy();
    });
  });
});
