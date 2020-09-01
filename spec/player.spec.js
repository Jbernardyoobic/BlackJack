const { Player, Hand } = require('../built/player');
const { Deck } = require('../built/deck');

describe('The player', () => {
    let p = new Player(1, 100, 2, new Deck(2));
    p.dealerBaseScore = 6;

    beforeEach(() => {
        p.hands = [];
        p.hands.push(new Hand(p.baseStake));
    }, 0)
    
    it('should hit', () => {
        p.hands[0].cards = [2,4];
        p.handTurn(p.hands[0], 6);
        expect(p.hands[0].stake).toEqual(p.baseStake);
        expect(p.hands.length).toEqual(1);
    })

    it('should double', () => {
        p.hands[0].cards = [9,2];
        p.handTurn(p.hands[0], 6);
        expect(p.hands[0].stake).toEqual(p.baseStake * 2);
        expect(p.hands.length).toEqual(1);
    })

    it('should split', () => {
        p.hands[0].cards = [8,8];
        p.handTurn(p.hands[0], 6);
        expect(p.hands.length).toBeGreaterThanOrEqual(2);
        expect(p.hands.length).toBeLessThanOrEqual(3);
    })
})