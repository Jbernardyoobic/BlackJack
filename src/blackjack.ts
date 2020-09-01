import { cardSum, isBlackJack } from './helpers';
import { Deck } from './deck';
import { Player } from './player'

class Dealer {
    public cards: number[] = new Array();
    constructor() {}
}

export class BlackJack {
    public deck: Deck;
    public players: Player[];
    public dealer: Dealer;
    
    constructor(numberOfDecks: number, playersNumber: number, startMoney: number, baseStake: number) {
        this.deck = new Deck(numberOfDecks);
        this.players = [];
        for (let i = 0; i < playersNumber; ++i) {
            this.players.push(new Player(i, startMoney, baseStake, this.deck));
        }
        this.dealer = new Dealer();
    }

    // Deal one card to every player, then one to the dealer and finally another card for every player.
    deal() {
        for (let p of this.players) {
            p.payStake();
            if (p.isPlaying) {
                this.deck.drawCard(p.hands[0].cards);
            }
        }
        this.deck.drawCard(this.dealer.cards);
        for (let p of this.players) {
            if (p.isPlaying) {
                p.dealerBaseScore = cardSum(this.dealer.cards);
                this.deck.drawCard(p.hands[0].cards);
            }
        }
    }

    // Depending on their hand and the dealer's hand, the player can choose to give up and get back half the stake.
    giveUpOption() {
        for (let p of this.players) {
            if (p.isPlaying && p.shouldGiveUp()) {
                p.isPlaying = false;
                p.money += p.hands[0].stake * 0.5;
            }
        }
    }

    /**
     *  Check at the beginning if a player has won already.
     */
    blackJackCheck() {
        for (let p of this.players) {
            if (p.isPlaying && isBlackJack(p.hands[0].cards) && p.dealerBaseScore < 10) {
                p.isPlaying = false;
                p.money += p.hands[0].stake * 2.5;
            }
        }
    }

    /**
     * Dealer only hits. Stops at 17 Soft.
     */
    dealerTurn() {
        this.deck.drawCard(this.dealer.cards);
        let score = cardSum(this.dealer.cards);
        while (score < 17) {
            this.deck.drawCard(this.dealer.cards);
            score = cardSum(this.dealer.cards);
        }
    }

    /**
     * Check all the hands for results (Win, Draw, Loss).
     */
    playEnd() {
        const dealerBJ = isBlackJack(this.dealer.cards);
        const dealerScore = cardSum(this.dealer.cards);
        for (let p of this.players) {
            if (p.isPlaying) {
                for (let h of p.hands) {
                    const score = cardSum(h.cards); 
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
        }
    }

    // Remove cards from the hands.
    emptyHands() {
        for (let p of this.players) {
            p.hands = [];
        }
        this.dealer.cards = [];
    }

    /**
     * Main function for a play.
     */
    play() {
        this.deck.newDeck(); // Full deck at the beginning of every play.
        this.deal(); // Deal the cards.
        this.giveUpOption(); // Give the possibility to give up after the cards are dealt.
        this.blackJackCheck(); // Check if players already won.
        for (let p of this.players) {
            if (p.isPlaying) {
                p.handTurn(p.hands[0]);
            }
        }
        this.dealerTurn(); // Dealer plays.
        this.playEnd(); // Check for results.
        this.emptyHands();
    }
}