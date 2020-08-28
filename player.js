const helpers = require('./helpers');
const { SOFTSTRAT, HARDSTRAT, SPLITSTRAT, ACESTRAT, GIVEUPSTRAT } = require('./strats');

// Represents a hand.
class Hand {
    constructor(baseStake) {
        // Cards of the hand.
        this.cards = [];
        // Stake of the hand.
        this.stake = baseStake;
    }
}

// Represents a player
class Player {
    /**
     * Player constructor.
     * @param {Number} id - id to distinguish players between them. 
     */
    constructor(id, startMoney, baseStake, deck) {
        // Id of the player.
        this.id = id;
        // Money of the player.
        this.money = startMoney;
        // Array of Hand objects.
        this.hands = [];
        // In the case the player gives up or does not have enough money to play.
        this.isPlaying = true;
        // Base stake for each play.
        this.baseStake = baseStake;
        // Reference to the deck.
        this.deck = deck;
        // Score of the first card of the dealer (for strategies).
        this.dealerBaseScore = 0;
    }

    /**
     * Draw a card or more.
     * @param {Hand} hand - The hand the player plays with. 
     */
    hit(hand) {
        let stop = false;
        while (!stop) {
            this.deck.drawCard(hand.cards);
            let score = helpers.cardSum(hand.cards);
            if (helpers.isBust(hand.cards)) {
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
    double(hand) {
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
    split(hand) {
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
    shouldGiveUp() {
        let score = helpers.cardSum(this.hands[0].cards);
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
    handTurn(hand) {
        let score = helpers.cardSum(hand.cards);
        let action = 9; // Error value for an action.
        if (helpers.canSplit(hand.cards, this.hands.length)) {
            if (hand.cards[0] === '1' && hand.cards[1] === '1') {
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

exports.Player = Player;
exports.Hand = Hand;