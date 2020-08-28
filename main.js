const { BlackJack } = require("./blackjack");

/**
 * Show the stats of the n plays of the game.
 * @param {[Players]} players - The list of players.
 */
function showStats(players, startMoney) {
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
 * Call the play() function n times.
 * @param {Number} n - Number of times to call play().
 */
function game(numberOfPlays, numberOfDecks, playersNumber, startMoney, baseStake) {
    const bj = new BlackJack(numberOfDecks, playersNumber, startMoney, baseStake);
    for (let i = 0; i < numberOfPlays; ++i) {
        bj.play();
    }
    showStats(bj.players, startMoney);
}

game(200, 6, 7, 500, 2);