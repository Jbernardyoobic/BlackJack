const { BlackJack } = require("./blackjack");
const globals = require("./globals");

const bj = new BlackJack();

/**
 * Show the stats of the n plays of the game.
 */
function showStats() {
    let s = 0;
    let max = 0;
    let min = 99999999999999;
    for (let p of bj.players) {
        console.log('PLAYER', p.id, ':', p.money);
        max = Math.max(max, p.money);
        min = Math.min(min, p.money);
        s += p.money;
    }
    max = max - globals.STARTMONEY;
    min = min - globals.STARTMONEY;
    let avg = Math.floor(s / globals.PLAYERSNUMBER - globals.STARTMONEY);
    let rate = Math.floor(avg * 100 / globals.STARTMONEY) + 100;
    let maxRate = Math.floor(max * 100 / globals.STARTMONEY) + 100;
    let minRate = Math.floor(min * 100 / globals.STARTMONEY) + 100;
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
        bj.play();
    }
    showStats();
}

game(globals.NUMBEROFPLAYS);