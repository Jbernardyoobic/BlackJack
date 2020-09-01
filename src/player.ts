import { canSplit, cardSum, isBust } from './helpers';
import { Deck } from './deck';
import { SOFTSTRAT, HARDSTRAT, SPLITSTRAT, ACESTRAT, GIVEUPSTRAT } from './strats';

// Represents a hand.
export class Hand {
    public cards: number[] = new Array();
    public stake: number;

    constructor(baseStake: number) {
        // Stake of the hand.
        this.stake = baseStake;
    }
}

// Represents a player
export class Player {
    public id: number;
    public money: number;
    public hands: Hand[] = new Array();
    public isPlaying: boolean = true;
    public baseStake: number;
    public dealerBaseScore: number = 0;
    private deck: Deck;

    /**
     * Player constructor.
     * @param {Number} id - id to distinguish players between them. 
     */
    constructor(id: number, startMoney: number, baseStake: number, deck: Deck) {
        // Id of the player.
        this.id = id;
        // Money of the player.
        this.money = startMoney;
        // Base stake for each play.
        this.baseStake = baseStake;
        // Reference to the deck.
        this.deck = deck;
    }

    /**
     * Draw a card or more.
     * @param {Hand} hand - The hand the player plays with. 
     */
    private hit(hand: Hand) {
        let stop = false;
        while (!stop) {
            this.deck.drawCard(hand.cards);
            let score = cardSum(hand.cards);
            if (isBust(hand.cards)) {
                return;
            }
            let action = 9;
            if (hand.cards.includes(1)) {
                action = SOFTSTRAT[score - 12][this.dealerBaseScore - 2];
            } else {
                action = HARDSTRAT[score - 4][this.dealerBaseScore - 2];
            }
            stop = action === 0;
        }
    }

    /**
     * Double the stake on the current hand and draw one card.
     * @param {Hand} hand - The hand the player plays with. 
     */
    private double(hand: Hand) {
        if (this.money >= hand.stake) {
            this.money -= hand.stake;
            hand.stake *= 2;
            this.deck.drawCard(hand.cards);
        } else {
            this.hit(hand);
        }
    }

    /**
    * Split the hand in two and add a stake to the new hand.
    * @param {Hand} hand - The hand the player plays with. 
    */
    private split(hand: Hand) {
        if (this.money >= this.baseStake) {
            this.money -= this.baseStake;
            this.hands.push(new Hand(this.baseStake));
            let l = this.hands.length;
            this.hands[l - 1].cards.push(hand.cards.pop());
            this.deck.drawCard(hand.cards);
            this.handTurn(hand);
            this.deck.drawCard(this.hands[l - 1].cards);
            this.handTurn(this.hands[l - 1]);
        } else {
            this.hit(hand);
        }
    }

    // Return whether the player should give up or not.
    shouldGiveUp(): boolean {
        let score = cardSum(this.hands[0].cards);
        return GIVEUPSTRAT[score - 4][this.dealerBaseScore - 2] === 1;
    }

    // Remove stake money from the player.
    payStake() {
        if (this.money >= this.baseStake * 2) {
            this.hands.push(new Hand(this.baseStake));
            this.money -= this.baseStake;
            this.isPlaying = true;
        } else {
            this.isPlaying = false;
        }
    }

    /**
     * Main method for the player when playing a hand.
     * @param {Hand} hand - The hand the player plays with.
     */
    handTurn(hand: Hand) {
        let score = cardSum(hand.cards);
        let action = 9; // Error value for an action.
        if (canSplit(hand.cards, this.hands.length)) {
            if (hand.cards[0] === 1 && hand.cards[1] === 1) {
                action = ACESTRAT[this.dealerBaseScore - 2];
            } else {
                action = SPLITSTRAT[score - 4][this.dealerBaseScore - 2];
            }
        } else {
            if (hand.cards.includes(1)) {
                action = SOFTSTRAT[score - 12][this.dealerBaseScore - 2];
            } else {
                action = HARDSTRAT[score - 4][this.dealerBaseScore - 2];
            }
        }
        switch(action) {
            case 0:
                return;
            case 1:
                this.hit(hand);
                break;
            case 2:
                this.double(hand);
                break;
            case 3:
                this.split(hand);
                break;
            case 9:
                console.error('WTF : 9 received');
                break;
            default:
                console.error('SOMETHING IS SERIOUSLY WRONG');
        }
    }
};