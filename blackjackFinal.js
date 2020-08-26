/**
 * @author Jacob Bernard <jbernard@yoobic.com>
 */

// Number of card decks in the deck.
const DECKS = 6;
// Number of players in the game.
const PLAYERSNUMBER = 7;
// Money the players start with.
const STARTMONEY = 200;
// Base stake for each play.
const STAKE = 20;
// Number of plays in the game.
const NUMBEROFPLAYS = 50;

/**
 * Strategies :
 * 1. Give up : Should the player give up or not.
 * 2. Hard : Hit, Hold or Double.
 * 3. Soft : When the cards contain an Ace. Hit or Hold.
 * 4. Split : When the cards are the same. Hit, Hold, Double or Split.
 * 5. Ace split : Strategy for (1, 1) pair. Hit or Split.
 * 
 * Actions :
 * 0 = Hold
 * 1 = Hit
 * 2 = Double
 * 3 = Split
 * 9 = Impossible (error)
 * 
 * Each row represents the score of the player's hand.
 * Each column represents the base score of the dealer (1 card)
 */
const GIVEUPSTRAT = [ //   2  3  4  5  6  7  8  9 10 11
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 5
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 6
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 7
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 8
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 11
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 12
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 13
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // 14
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // 15
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 16
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 17
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 18
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 19
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 20
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 21
];

const HARDSTRAT = [ // 2  3  4  5  6  7  8  9 10 11
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 4
                [9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 5
                [9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 6
                [9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 7
                [9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 8
                [9, 9, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1], // 9
                [9, 9, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1], // 10
                [9, 9, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1], // 11
                [9, 9, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1], // 12
                [9, 9, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], // 13
                [9, 9, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], // 14
                [9, 9, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], // 15
                [9, 9, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], // 16
                [9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 17
                [9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 18
                [9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 19
                [9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 20
                [9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 21
];

const SOFTSTRAT = [ // 2  3  4  5  6  7  8  9 10 11
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 4
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 5
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 6
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 7
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 8
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 9
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 10
                [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 11
                [9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 12
                [9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 13
                [9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 14
                [9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 15
                [9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 16
                [9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 17
                [9, 9, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 18
                [9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 19
                [9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 20
                [9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 21
];

const SPLITSTRAT = [ //    2  3  4  5  6  7  8  9 10 11
                    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                    [9, 9, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1], // 4 (2,2)
                    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 5
                    [9, 9, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1], // 6 (3,3)
                    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 7
                    [9, 9, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1], // 8 (4,4)
                    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 9
                    [9, 9, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1], // 10 (5,5)
                    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 11
                    [9, 9, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1], // 12 (6,6)
                    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 13
                    [9, 9, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1], // 14 (7,7)
                    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 15
                    [9, 9, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1], // 16 (8,8)
                    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 17
                    [9, 9, 3, 3, 3, 3, 3, 0, 3, 3, 0, 0], // 18 (9,9)
                    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 19
                    [9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 20 (10,10)
                    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]  // 21
];

                //      2  3  4  5  6  7  8  9 10 11
const ACESTRAT = [9, 9, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1];

// Represents a player
class Player {
    /**
     * Player constructor.
     * @param {Number} id - id to distinguish players between them. 
     */
    constructor(id) {
        // Id of the player.
        this.id = id;
        // Money of the player.
        this.money = STARTMONEY;
        // Array of Hand objects.
        this.hands = [];
        // In the case the player gives up or does not have enough money to play.
        this.isPlaying = true;
    }
};

// Represents a hand.
class Hand {
    constructor() {
        // Cards of the hand.
        this.cards = [];
        // Stake of the hand.
        this.stake = STAKE;
    }
}

// Represents the dealer.
class Dealer {
    constructor() {
        // Score of the first card (for strategies).
        this.baseScore = 0;
        // Cards of the dealer.
        this.hand = [];
    }
}

// Simple array containing DECKS * 52 cards.
let deck = [];

// Array of players.
let players = [];
for (let i = 0; i < PLAYERSNUMBER; ++i) {
    players.push(new Player(i));
}

// The dealer object.
let dealer = new Dealer();

/**
 * The deck is composed of numbers from 1 to 10 representing the value of the card and not the card itself.
 */
function newDeck() {
    let d = [];
    const heads = ['J', 'Q', 'K'];
    for (let a = 0; a < DECKS; ++a) {
        for (let j = 0; j < 4; ++j) {
            for (let i = 2; i < 11; ++i) {
                d.push(i);
            }
            for (h of heads) {
                d.push(10);
            }
            d.push(1);
        }
    }
    return d;
}

// Random shuffling of the deck.
function shuffle() {
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Return the value of a hand
function cardSum(cards) {
    let sum = 0;
    let numberOfAces = 0;
    for (n of cards) {
        if (n === 1) {
            numberOfAces++;
            sum += 11;
        } else {
            sum += n;
        }
    }
    for (let i = 0; i < numberOfAces; i++) {
        if (sum > 21) {
            sum -= 10;
        }
    }
    return sum;
}

// Remove stake money from the players and mark them as 'playing'.
function payStake() {
    for (p of players) {
        if (p.money >= STAKE) {
            p.hands.push(new Hand());
            p.money -= STAKE;
            p.isPlaying = true;
        } else {
            p.isPlaying = false;
        }
    }
}

/**
 * Draw a card from the deck and put it in the designated hand.
 * @param {[Number]} cards - The hand in which the new card will be added.
 */
function drawCard(cards) {
    cards.push(deck.shift());
}

// Deal one card to every player, then one to the dealer and finally another card for every player.
function deal() {
    for (p of players) {
        if (p.isPlaying) {
            drawCard(p.hands[0].cards);
        }
    }
    drawCard(dealer.hand);
    for (p of players) {
        if (p.isPlaying) {
            drawCard(p.hands[0].cards);
        }
    }
}

// Depending on their hand and the dealer's hand, the player can choose to give up and get back half the stake.
function giveUp() {
    for (p of players) {
        if (p.isPlaying) {
            let score = cardSum(p.hands[0].cards);
            if (GIVEUPSTRAT[score][dealer.baseScore] === 1) {
                p.isPlaying = false;
                p.money += p.hands[0].stake * 0.5;
            }
        }
    }
}

/**
 *  Check at the beginning if a player has won already.
 * @param {Player} player - The player to check.
 */
function blackJackCheck(player) {
    if (player.isPlaying && player.hands[0].cards.length === 2 && cardSum(player.hands[0].cards) === 21 && dealer.baseScore < 10) {
        player.isPlaying = false;
        player.money += player.hands[0].stake * 2.5;
    } 
}

/**
 * Check if a hand is a blackjack.
 * @param {[Number]} cards - Cards to check. 
 */
function isBlackJack(cards) {
    return cardSum(cards) === 21 && cards.length === 2;
}

/**
 * Returns if whether or not a hand can be splitted.
 * @param {[Number]} cards - Hand of a player.
 */
function canSplit(player, cards) {
    return player.hands.length < 3 && cards.length === 2 && cards[0] === cards[1];
}

/**
 * Check if a hand exceeds 21.
 * @param {[Number]} cards - Hand of a player 
 */
function isBust(cards) {
    return cardSum(cards) > 21;
}

/**
 * Draw a card or more.
 * @param {[Number]} cards - Cards we hit with.
 */
function hit(cards) {
    let stop = false;
    while (!stop) {
        drawCard(cards);
        let score = cardSum(cards);
        if (isBust(cards)) {
            return;
        }
        let action = 9;
        if (cards.includes(1)) {
            action = SOFTSTRAT[score][dealer.baseScore];
        } else {
            action = HARDSTRAT[score][dealer.baseScore];
        }
        stop = action === 0;
    }
}

/**
 * Double the stake on the current hand and draw one card.
 * @param {Player} player - The player
 * @param {Hand} hand - The hand the player plays with. 
 */
function double(player, hand) {
    if (player.money >= STAKE) {
        player.money -= STAKE;
        hand.stake *= 2;
        drawCard(hand.cards);
    } else {
        hit(hand.cards);
    }
}

/**
 * Split the hand in two and add a stake to the new hand.
 * @param {Player} player - The player
 * @param {Hand} hand - The hand the player plays with. 
 */
function split(player, hand) {
    if (player.money >= STAKE) {
        player.money -= STAKE;
        player.hands.push(new Hand());
        let l = player.hands.length;
        player.hands[l - 1].cards.push(hand.cards.pop());
        drawCard(hand.cards);
        handTurn(player, hand);
        drawCard(player.hands[l - 1].cards);
        handTurn(player, player.hands[l - 1]);
    } else {
        hit(hand.cards);
    }
}

/**
 * Main function for the player choices when playing.
 * @param {Hand} hand - The .
 */
function handTurn(player, hand) {
    let score = cardSum(hand.cards);
    let action = 9; // Error value for an action.
    if (canSplit(player, hand.cards)) {
        if (hand.cards[0] === '1' && hand.cards[1] === '1') {
            action = ACESTRAT[dealer.baseScore];
        } else {
            action = SPLITSTRAT[score][dealer.baseScore];
        }
    } else {
        if (hand.cards.includes(1)) {
            action = SOFTSTRAT[score][dealer.baseScore];
        } else {
            action = HARDSTRAT[score][dealer.baseScore];
        }
    }
    switch(action) {
        case 0:
            return;
        case 1:
            hit(hand.cards);
            break;
        case 2:
            double(player, hand);
            break;
        case 3:
            split(player, hand);
            break;
        case 9:
            console.error('WTF : 9 received');
            break;
        default:
            console.error('SOMETHING IS SERIOUSLY WRONG');
    }
}

/**
 * Dealer only hits. Stops at 17 Soft.
 */
function dealerTurn() {
    let score = dealer.baseScore;
    while (score < 17) {
        drawCard(dealer.hand);
        score = cardSum(dealer.hand);
    }
}

/**
 * Check all the hands for results (Win, Draw, Loss).
 * Remove cards from the hands.
 */
function playEnd() {
    let dealerBJ = isBlackJack(dealer.hand);
    let dealerScore = cardSum(dealer.hand);
    for (p of players) {
        if (p.isPlaying) {
            for (h of p.hands) {
                let score = cardSum(h.cards); 
                if (score < 22) {
                    if (dealerScore > 21) {
                        p.money += 2 * h.stake;
                    } else if (score > dealerScore) {
                        p.money += 2 * h.stake;
                    } else if (score === dealerScore) {
                        if (isBlackJack(h.cards) && dealerBJ) {
                            p.money += h.stake;
                        } else if (isBlackJack(h.cards) && !dealerBJ) {
                            p.money += 2 * h.stake;
                        } else if (!isBlackJack(h.cards) && dealerBJ) {
                            p.money += h.stake;
                        }
                    }
                }
            }
        }
        p.hands = []; // Remove the cards from the hand.
    }
    dealer.hand = []; // Remove the cards from the dealer's hand
}

/**
 * Main function for a play.
 */
function play() {
    deck = newDeck(); // Full deck at the beginning of every play.
    shuffle(); // Shuffle the deck.
    payStake(); // Pay the stake required to play.
    deal(); // Deal the cards.
    dealer.baseScore = cardSum(dealer.hand);
    giveUp(); // Give the possibility to give up after the cards are dealt.
    for (p of players) {
        blackJackCheck(p) // Check if players already won.
        if (p.isPlaying) {
            handTurn(p, p.hands[0]); // Player turn.
        }
    }
    dealerTurn(); // Dealer plays.
    playEnd(); // Check for results.
}

/**
 * Show the stats of the n plays of the game.
 */
function showStats() {
    let s = 0;
    let max = 0;
    let min = 99999999999999;
    for (p of players) {
        console.log('PLAYER', p.id, ':', p.money);
        max = Math.max(max, p.money);
        min = Math.min(min, p.money);
        s += p.money;
    }
    max = max - STARTMONEY;
    min = min - STARTMONEY;
    let avg = Math.floor(s / PLAYERSNUMBER - STARTMONEY);
    let rate = Math.floor(avg * 100 / STARTMONEY) + 100;
    let maxRate = Math.floor(max * 100 / STARTMONEY) + 100;
    let minRate = Math.floor(min * 100 / STARTMONEY) + 100;
    console.log('AVG RATE :', rate, '%');
    console.log('MAX RATE :', maxRate, '%');
    console.log('MIN RATE :', minRate, '%');
}

/**
 * Call the play() function n times.
 * @param {Number} n - Number of times to call play().
 */
function game(n) {
    for (let i = 0; i < n; ++i) {
        play();
    }
    showStats();
}

game(NUMBEROFPLAYS);