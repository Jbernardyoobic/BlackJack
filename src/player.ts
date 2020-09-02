import { canSplit, cardSum, isBust } from './helpers';
import { Deck } from './deck';
import { SOFTSTRAT, HARDSTRAT, SPLITSTRAT, ACESTRAT, GIVEUPSTRAT } from './strats';

// Represents a hand.
export class Hand {
    /**
     * @property The cards of the hand.
     */
    public cards: number[] = new Array();
    /**
     * @property The stake of the hand.
     */
    public stake: number;

    /**
     * Constructor for the Hand class.
     * @param baseStake The base stake value.
     */
    constructor(baseStake: number) {
        this.stake = baseStake;
    }
}

export class Player {
    /**
     * @property Id of the player.
     */
    public id: number;
    /**
     * @property Money of the player.
     */
    public money: number;
    /**
     * @property Array of Hand objects.
     */
    public hands: Hand[] = new Array();
    /**
     * @property Whether the player is playing or not.
     */
    public isPlaying: boolean = true;
    /**
     * @property Base stake for every hand.
     */
    public baseStake: number;
    /**
     * @property Score of the first card drawn by the dealer.
     */
    public dealerBaseScore: number = 0;
    /**
     * @property The deck for the game.
     */
    private deck: Deck;

    /**
     * Constructor for the Player class.
     * @param id Id of the player.
     * @param startMoney Start money of the player.
     * @param baseStake Base stake for every hand.
     * @param deck The deck for the game.
     */
    constructor(id: number, startMoney: number, baseStake: number, deck: Deck) {
        this.id = id;
        this.money = startMoney;
        this.baseStake = baseStake;
        this.deck = deck;
    }

    /**
     * Draw a card or more.
     * @param hand The hand the player plays with. 
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
     * @param hand The hand the player plays with. 
     */
    private double(hand: Hand): void {
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
    * @param hand The hand the player plays with. 
    */
    private split(hand: Hand): void {
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
    payStake(): void {
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
     * @param hand The hand the player plays with.
     */
    handTurn(hand: Hand): void {
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