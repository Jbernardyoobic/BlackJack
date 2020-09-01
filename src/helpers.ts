/**
 * Return the value of a hand
 * @param {number[]} cards 
 */
export function cardSum(cards: any[]): number {
    let sum = 0;
    let numberOfAces = 0;
    for (let n of cards) {
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
 * @param {number[]} cards - Cards to check. 
 */
export function isBlackJack(cards: number[]): boolean {
    return cardSum(cards) === 21 && cards.length === 2;
}

/**
 * Check if a hand exceeds 21.
 * @param {number[]} cards - Hand of a player 
 */
export function isBust(cards: number[]): boolean {
    return cardSum(cards) > 21;
}

/**
 * Return if a hand can be splitted.
 * @param {number[]} cards - Cards of a hand.
 * @param {number} - Number of hands of a player
 */
export function canSplit(cards: number[], handsLength: number): boolean {
    return handsLength > 0 && handsLength < 3 && cards.length === 2 && cards[0] === cards[1];
}