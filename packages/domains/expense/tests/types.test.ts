import { getValidOrderBy, getValidSortBy } from '../types';

describe('Expense Types', () => {
  describe('Valid SortBy parameters', () => {
    it('Should return valid sort by', () => {
      expect(getValidSortBy('date_created')).toEqual('date_created');
    });

    it('Should return default value for invalid sort by', () => {
      expect(getValidSortBy('random')).toEqual('id');
    });
  });

  describe('Valid OrderBy parameters', () => {
    it('Should return valid order by', () => {
      expect(getValidOrderBy('asc')).toEqual('asc');
	  expect(getValidOrderBy('desc')).toEqual('desc');
    });

    it('Should return default value for invalid order by', () => {
      expect(getValidOrderBy('random')).toEqual('asc');
    });
  });
});
