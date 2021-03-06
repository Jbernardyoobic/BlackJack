export class Deck {
    /**
     * @property The number of 52 cards decks in the deck.
     */
    public decksNumber: number;
    /**
     * @property The deck containing the cards for the play.
     */
    public deck: number[] = new Array();
    /**
     * @property The occurences of each card in the deck.
     */
    public occurences: number[] = new Array();

    /**
     * Constructor for the Deck class.
     * @param decksNumber The number of 52 cards decks in the deck
     */
    constructor(decksNumber: number) {
        this.decksNumber = decksNumber;
        this.newDeck();
    }

    /**
    * The deck is composed of numbers from 1 to 10 representing the value of the card and not the card itself.
    */
    newDeck(): void {
        this.deck = new Array();
        this.occurences = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const heads = ['J', 'Q', 'K'];
        for (let a = 0; a < this.decksNumber; a++) {
            for (let j = 0; j < 4; j++) {
                for (let i = 1; i < 11; i++) {
                    this.deck.push(i);
                    this.occurences[i - 1]++;
                }
                for (let _h of heads) {
                    this.deck.push(10);
                    this.occurences[9]++
                }
            }
        }
        this.shuffle();
    }

    /**
     * Random shuffling of the deck.
     */
    private shuffle(): void {
        for (let i = this.deck.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    /**
     * Draw a card from the deck and put it in the designated hand.
     * @param cards The hand in which the new card will be added.
     */
    drawCard(cards: number[]): void {
        let c = this.deck.shift();
        cards.push(c);
        this.occurences[c - 1]--;
    }
}