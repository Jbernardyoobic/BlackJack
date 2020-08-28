/**
 * Return the value of a hand
 * @param {[Number]} cards 
 */
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

/**
 * Check if a hand is a blackjack.
 * @param {[Number]} cards - Cards to check. 
 */
function isBlackJack(cards) {
    return cardSum(cards) === 21 && cards.length === 2;
}

/**
 * Check if a hand exceeds 21.
 * @param {[Number]} cards - Hand of a player 
 */
function isBust(cards) {
    return cardSum(cards) > 21;
}

/**
 * Return if a hand can be splitted.
 * @param {[Number]} cards - Cards of a hand.
 * @param {Number} - Number of hands of a player
 */
function canSplit(cards, handsLength) {
    return handsLength > 0 && handsLength < 3 && cards.length === 2 && cards[0] === cards[1];
}

exports.canSplit = canSplit;
exports.isBust = isBust;
exports.isBlackJack = isBlackJack;
exports.cardSum = cardSum;