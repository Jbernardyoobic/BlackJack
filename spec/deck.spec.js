const { Deck } = require('../built/deck');

it('Should return a complete deck', () => {
    let d = new Deck(6);
    let expected = [24, 24, 24, 24, 24, 24, 24, 24, 24, 96];
    expect(JSON.stringify(d.occurences)).toEqual(JSON.stringify(expected));
})

it('Should remove the first card of the deck', () => {
    let d = new Deck(1);
    let expected = d.deck[0];
    let nextCard = d.deck[1];
    let cards = [];
    d.drawCard(cards);
    expect(cards[0]).toEqual(expected);
    expect(d.deck[0]).toEqual(nextCard);
    expect(d.occurences[expected - 1]).toEqual(expected === 10 ? 15 : 3);
}) 

it('Should empty the deck', () => {
    let d = new Deck(2);
    let dump = [];
    for (let i = 0; i < 2 * 52; i++) {
        d.drawCard(dump);
    }
    expect(d.deck.length).toEqual(0);
    let expected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(JSON.stringify(d.occurences)).toEqual(JSON.stringify(expected));
})