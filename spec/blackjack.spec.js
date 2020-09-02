const { BlackJack } = require('../built/blackjack');
const { cardSum } = require('../built/helpers');

describe('The blackjack object', () => {

    it('should deal correctly', () => {
        let bj = new BlackJack(2, 4, 100, 2);
        bj.deal();
        expect(bj.dealer.cards.length).toEqual(1);
        for (let p of bj.players) {
            expect(p.money).toEqual(98);
            expect(p.hands.length).toEqual(1);
            expect(p.hands[0].cards.length).toEqual(2);
        }
    })

    it('should have a good dealer', () => {
        let bj = new BlackJack(2, 4, 100, 2);
        bj.deal();
        bj.dealerTurn();
        let score = cardSum(bj.dealer.cards);
        expect(score).toBeGreaterThanOrEqual(17);
        expect(score).toBeLessThanOrEqual(26);
    })
})