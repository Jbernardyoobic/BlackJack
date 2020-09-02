import { BlackJack } from './blackjack';
import { Player } from './player';

/**
 * Show the stats of the n plays of the game.
 * @param players The list of players.
 */
function showStats(players: Player[], startMoney: number): void {
    let s = 0;
    let max = 0;
    let min = 99999999999999;
    for (let p of players) {
        console.log('PLAYER', p.id, ':', p.money);
        max = Math.max(max, p.money);
        min = Math.min(min, p.money);
        s += p.money;
    }
    max = max - startMoney;
    min = min - startMoney;
    let avg = Math.floor(s / players.length - startMoney);
    let rate = Math.floor(avg * 100 / startMoney) + 100;
    let maxRate = Math.floor(max * 100 / startMoney) + 100;
    let minRate = Math.floor(min * 100 / startMoney) + 100;
    console.log('AVG RATE :', rate, '%');
    console.log('MAX RATE :', maxRate, '%');
    console.log('MIN RATE :', minRate, '%');
}

/**
 * Start the game.
 * @param numberOfPlays Number of times the play() function will be called.
 * @param numberOfDecks Number of 52 cards decks in the game.
 * @param playersNumber Number of players in the game.
 * @param startMoney Start money for every player.
 * @param baseStake Base stake for every play.
 */
function game(numberOfPlays: number, numberOfDecks: number, playersNumber: number, startMoney: number, baseStake: number): void {
    const bj = new BlackJack(numberOfDecks, playersNumber, startMoney, baseStake);
    for (let i = 0; i < numberOfPlays; ++i) {
        bj.play();
    }
    showStats(bj.players, startMoney);
}

game(200, 6, 7, 500, 2);