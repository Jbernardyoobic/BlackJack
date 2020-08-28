const { Player, Hand } = require('../player');
const { Deck } = require('../deck');
const { STAKE } = require('../globals');

describe('The player', () => {
    let p = new Player(1, 100, new Deck(2));

    beforeEach(() => {
        p.hands = [];
        p.hands.push(new Hand());
    }, 0)
    
    it('should hit', () => {
        p.hands[0].cards = [2,4];
        p.handTurn(p.hands[0], 9);
        expect(p.hands[0].stake).toEqual(STAKE);
        expect(p.hands.length).toEqual(1);
    })

    it('should double', () => {
        p.hands[0].cards = [9,2];
        p.handTurn(p.hands[0], 6);
        expect(p.hands[0].stake).toEqual(STAKE * 2);
        expect(p.hands.length).toEqual(1);
    })

    it('should split', () => {
        p.hands[0].cards = [8,8];
        p.handTurn(p.hands[0], 5);
        expect(p.hands[0].stake).toEqual(STAKE);
        expect(p.hands.length).toBeGreaterThanOrEqual(2);
        expect(p.hands.length).toBeLessThanOrEqual(3);
        expect(p.hands[1].stake).toEqual(STAKE);
    })
})