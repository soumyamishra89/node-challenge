import { getExpenses } from '@nc/domain-expense/model';

describe('Expense Model', () => {
  describe('getExpenses', () => {
    describe('Failure cases', () => {
      it('Should throw 400 for null userId', () => {
        return getExpenses(null).catch((err) => expect(err.status).toEqual(400));
      });

      it('Should throw 500 for invalid userId', () => {
        return getExpenses('random').catch((err) => expect(err.status).toEqual(500));
      });

      it('Should throw 404 for non existing userId', () => {
        return getExpenses('3e920f54-49df-4d0b-b11b-e6f08e3a2dca').catch((err) => expect(err.status).toEqual(404));
      });
    });

    describe('Success cases', () => {
      it('Should return user', () => {
        return getExpenses('da140a29-ae80-4f0e-a62d-6c2d2bc8a474').then((expenses) => expect(expenses).toHaveLength(3));
      });
    });
  });
});
