import { cardSum, isBlackJack } from './helpers';
import { Deck } from './deck';
import { Player } from './player'

class Dealer {
    public cards: number[] = new Array();
    constructor() {}
}

export class BlackJack {
    /**
     * @property The card deck for the game.
     */
    private deck: Deck;
    /**
     * @property The dealer.
     */
    private dealer: Dealer;
    /**
     * @property The player array.
     */
    public players: Player[];
    
    /**
     * Constructor for the BlackJack class
     * @param numberOfDecks The number of 52 cards decks in the game
     * @param playersNumber The number of players
     * @param startMoney The money players start with
     * @param baseStake The base stake for each play
     */
    constructor(numberOfDecks: number, playersNumber: number, startMoney: number, baseStake: number) {
        this.deck = new Deck(numberOfDecks);
        this.players = [];
        for (let i = 0; i < playersNumber; ++i) {
            this.players.push(new Player(i, startMoney, baseStake, this.deck));
        }
        this.dealer = new Dealer();
    }

    /**
     * Deal one card to every player, then one to the dealer and finally another card for every player.
     */
    private deal(): void{
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

    /**
     * Depending on their hand and the dealer's cards, the player can choose to give up and get back half the stake.
     */
    private giveUpOption(): void {
        for (let p of this.players) {
            if (p.isPlaying && p.shouldGiveUp()) {
                p.isPlaying = false;
                p.money += p.hands[0].stake * 0.5;
            }
        }
    }

    /**
     *  Check at the beginning if a player has won already.
     *  In case of blackjack, the player stops playing and gets 2.5 * stake.
     */
    private blackJackCheck(): void {
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
    private dealerTurn(): void {
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
    private playEnd(): void {
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

    // Remove cards from hands.
    private emptyHands(): void {
        for (let p of this.players) {
            p.hands = [];
        }
        this.dealer.cards = [];
    }

    /**
     * Main function for a play.
     */
    play(): void {
        this.deck.newDeck();
        this.deal();
        this.giveUpOption();
        this.blackJackCheck();
        for (let p of this.players) {
            if (p.isPlaying) {
                p.handTurn(p.hands[0]);
            }
        }
        this.dealerTurn();
        this.playEnd();
        this.emptyHands();
    }
}