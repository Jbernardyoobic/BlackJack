const helpers = require('./helpers');
const globals = require('./globals');

const SOFTSTRAT = globals.SOFTSTRAT;
const HARDSTRAT = globals.HARDSTRAT;
const SPLITSTRAT = globals.SPLITSTRAT;
const ACESTRAT = globals.ACESTRAT;
const GIVEUPSTRAT = globals.GIVEUPSTRAT;

// Represents a hand.
class Hand {
    constructor() {
        // Cards of the hand.
        this.cards = [];
        // Stake of the hand.
        this.stake = globals.STAKE;
    }
}

// Represents a player
class Player {
    /**
     * Player constructor.
     * @param {Number} id - id to distinguish players between them. 
     */
    constructor(id, startMoney, deck) {
        // Id of the player.
        this.id = id;
        // Money of the player.
        this.money = startMoney;
        // Array of Hand objects.
        this.hands = [];
        // In the case the player gives up or does not have enough money to play.
        this.isPlaying = true;
        // Reference to the deck.
        this.deck = deck;
    }

    /**
     * Draw a card or more.
     * @param {Hand} hand - The hand the player plays with. 
     */
    hit(hand, dealerBaseScore) {
        let stop = false;
        while (!stop) {
            this.deck.drawCard(hand.cards);
            let score = helpers.cardSum(hand.cards);
            if (helpers.isBust(hand.cards)) {
                return;
            }
            let action = 9;
            if (hand.cards.includes(1)) {
                action = SOFTSTRAT[score][dealerBaseScore];
            } else {
                action = HARDSTRAT[score][dealerBaseScore];
            }
            stop = action === 0;
        }
    }

    /**
     * Double the stake on the current hand and draw one card.
     * @param {Hand} hand - The hand the player plays with. 
     */
    double(hand, dealerBaseScore) {
        if (this.money >= hand.stake) {
            this.money -= hand.stake;
            hand.stake *= 2;
            this.deck.drawCard(hand.cards);
        } else {
            this.hit(hand, dealerBaseScore);
        }
    }

    /**
    * Split the hand in two and add a stake to the new hand.
    * @param {Hand} hand - The hand the player plays with. 
    */
    split(hand, dealerBaseScore) {
        if (this.money >= globals.STAKE) {
            this.money -= globals.STAKE;
            this.hands.push(new Hand());
            let l = this.hands.length;
            this.hands[l - 1].cards.push(hand.cards.pop());
            this.deck.drawCard(hand.cards);
            this.handTurn(hand, dealerBaseScore);
            this.deck.drawCard(this.hands[l - 1].cards);
            this.handTurn(this.hands[l - 1], dealerBaseScore);
        } else {
            this.hit(hand, dealerBaseScore);
        }
    }

    // Return whether the player should give up or not.
    shouldGiveUp(dealerBaseScore) {
        let score = helpers.cardSum(this.hands[0].cards);
        return GIVEUPSTRAT[score][dealerBaseScore] === 1;
    }

    /**
     * Main method for the player when playing a hand.
     * @param {Hand} hand - The hand the player plays with.
     */
    handTurn(hand, dealerBaseScore) {
        let score = helpers.cardSum(hand.cards);
        let action = 9; // Error value for an action.
        if (helpers.canSplit(hand.cards, this.hands.length)) {
            if (hand.cards[0] === '1' && hand.cards[1] === '1') {
                action = ACESTRAT[dealerBaseScore];
            } else {
                action = SPLITSTRAT[score][dealerBaseScore];
            }
        } else {
            if (hand.cards.includes(1)) {
                action = SOFTSTRAT[score][dealerBaseScore];
            } else {
                action = HARDSTRAT[score][dealerBaseScore];
            }
        }
        switch(action) {
            case 0:
                return;
            case 1:
                this.hit(hand, dealerBaseScore);
                break;
            case 2:
                this.double(hand, dealerBaseScore);
                break;
            case 3:
                this.split(hand, dealerBaseScore);
                break;
            case 9:
                console.error('WTF : 9 received');
                break;
            default:
                console.error('SOMETHING IS SERIOUSLY WRONG');
        }
    }
};

exports.Player = Player;
exports.Hand = Hand;