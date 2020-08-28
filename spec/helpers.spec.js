const helpers = require('../helpers');

describe('The cardSum helper', () => {
    it('should return 4', () => {
        expect(helpers.cardSum([2,2])).toEqual(4);
    })
    it('should return 5', () => {
        expect(helpers.cardSum([2,3])).toEqual((5));
    })
    it('should return 6', () => {
        expect(helpers.cardSum([3,3])).toEqual(6);
    })
    it('should return 7', () => {
        expect(helpers.cardSum([2,5])).toEqual(7);
        expect(helpers.cardSum([3,4])).toEqual(7);
    })
    it('should return 8', () => {
        expect(helpers.cardSum([2,6])).toEqual(8);
        expect(helpers.cardSum([3,5])).toEqual(8);
        expect(helpers.cardSum([4,4])).toEqual(8);
    })
    it('should return 9', () => {
        expect(helpers.cardSum([2,7])).toEqual(9);
        expect(helpers.cardSum([3,6])).toEqual(9);
        expect(helpers.cardSum([4,5])).toEqual(9);
    })
    it('should return 10', () => {
        expect(helpers.cardSum([2,8])).toEqual(10);
        expect(helpers.cardSum([3,7])).toEqual(10);
        expect(helpers.cardSum([4,6])).toEqual(10);
        expect(helpers.cardSum([5,5])).toEqual(10);
    })
    it('should return 11', () => {
        expect(helpers.cardSum([2,9])).toEqual(11);
        expect(helpers.cardSum([3,8])).toEqual(11);
        expect(helpers.cardSum([4,7])).toEqual(11);
        expect(helpers.cardSum([5,6])).toEqual(11);
    })
    it('should return 12', () => {
        expect(helpers.cardSum([1,1])).toEqual(12);
        expect(helpers.cardSum([2,10])).toEqual(12);
        expect(helpers.cardSum([3,9])).toEqual(12);
        expect(helpers.cardSum([4,8])).toEqual(12);
        expect(helpers.cardSum([5,7])).toEqual(12);
        expect(helpers.cardSum([6,6])).toEqual(12);
    })
    it('should return 13', () => {
        expect(helpers.cardSum([1,2])).toEqual(13)
        expect(helpers.cardSum([3,10])).toEqual(13);
        expect(helpers.cardSum([4,9])).toEqual(13);
        expect(helpers.cardSum([5,8])).toEqual(13);
        expect(helpers.cardSum([6,7])).toEqual(13);
    })
    it('should return 14', () => {
        expect(helpers.cardSum([1,3])).toEqual(14);
        expect(helpers.cardSum([4,10])).toEqual(14);
        expect(helpers.cardSum([5,9])).toEqual(14);
        expect(helpers.cardSum([6,8])).toEqual(14);
        expect(helpers.cardSum([7,7])).toEqual(14);
    })
    it('should return 15', () => {
        expect(helpers.cardSum([1,4])).toEqual(15);
        expect(helpers.cardSum([5,10])).toEqual(15);
        expect(helpers.cardSum([6,9])).toEqual(15);
        expect(helpers.cardSum([7,8])).toEqual(15);
    })
    it('should return 16', () => {
        expect(helpers.cardSum([1,5])).toEqual(16);
        expect(helpers.cardSum([6,10])).toEqual(16);
        expect(helpers.cardSum([7,9])).toEqual(16);
        expect(helpers.cardSum([8,8])).toEqual(16);
    })
    it('should return 17', () => {
        expect(helpers.cardSum([1,6])).toEqual(17);
        expect(helpers.cardSum([7,10])).toEqual(17);
        expect(helpers.cardSum([8,9])).toEqual(17);
    })
    it('should return 18', () => {
        expect(helpers.cardSum([1,7])).toEqual(18);
        expect(helpers.cardSum([8,10])).toEqual(18);
        expect(helpers.cardSum([9,9])).toEqual(18);
    })
    it('should return 19', () => {
        expect(helpers.cardSum([1,8])).toEqual(19);
        expect(helpers.cardSum([9,10])).toEqual(19);
    })
    it('should return 20', () => {
        expect(helpers.cardSum([10,10])).toEqual(20);
    })
    it('should return 21', () => {
        expect(helpers.cardSum([1,10])).toEqual(21);
    })
});

describe('The isBlackJack helper', () => {
    it('should return false', () => {
        expect(helpers.isBlackJack([9,10])).toBeFalse();
        expect(helpers.isBlackJack([9,10,2])).toBeFalse();
    })
    it('should return true', () => {
        expect(helpers.isBlackJack([1,10])).toBeTrue();
    })
});

describe('The isBust helper', () => {
    it('should return false', () => {
        expect(helpers.isBust([3,2,1,1,1,1,1,1,1])).toBeFalse();
        expect(helpers.isBust([9,10,2])).toBeFalse();
    })
    it('should return true', () => {
        expect(helpers.isBust([10,10,2])).toBeTrue();
    })
});

describe('The canSplit helper', () => {
    it('should return false', () => {
        expect(helpers.canSplit([10,2,10], 1)).toBeFalse();
        expect(helpers.canSplit([3,2], 2)).toBeFalse();
        expect(helpers.canSplit([4,4], 3)).toBeFalse();
        expect(helpers.canSplit([7,7], 0)).toBeFalse();
    })
    it('should return true', () => {
        expect(helpers.canSplit([10,10], 2)).toBeTrue();
        expect(helpers.canSplit([1,1], 1)).toBeTrue();
    })
})