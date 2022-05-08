import { getUserDetails, getUserDetailsByUserNamePassword } from '@nc/domain-user/model';

describe('Users Model', () => {
  describe('getUserDetails', () => {
    describe('Failure cases', () => {
      it('Should throw 400 for null userId', () => {
        return getUserDetails(null).catch((err) => expect(err.status).toEqual(400));
      });

      it('Should throw 500 for invalid userId', () => {
        return getUserDetails('random').catch((err) => expect(err.status).toEqual(500));
      });

      it('Should throw 404 for non existing userId', () => {
        return getUserDetails('3e920f54-49df-4d0b-b11b-e6f08e3a2dca').catch((err) => expect(err.status).toEqual(404));
      });
    });

    describe('Success cases', () => {
      it('Should return user', () => {
        return getUserDetails('da140a29-ae80-4f0e-a62d-6c2d2bc8a474').then((user) => expect(user).not.toBeNull());
      });
    });
  });

  describe('getUserDetailsByUserNamePassword', () => {
    describe('Failure cases', () => {
      it('Should throw 400 for invalid credential', () => {
        return getUserDetailsByUserNamePassword(null, null).catch((err) => expect(err.status).toEqual(400));
      });

      it('Should throw 404 for non existing user', () => {
        return getUserDetailsByUserNamePassword('random', 'random').catch((err) => expect(err.status).toEqual(404));
      });
    });

    describe('Success cases', () => {
      it('Should return user', () => {
        return getUserDetailsByUserNamePassword('jeppe_rindom', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=').then((user) => expect(user).not.toBeNull());
      });
    });
  });
});
