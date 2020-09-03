import { Deck } from "./deck";

class PNode {
    public value: number;
    public prob: number;
    public children: PNode[] = new Array();

    constructor(value: number, prob: number) {
        this.value = value;
        this.prob = prob;
    }
}

class TestDeck {
    public occurences: number[] = new Array();
    public len: number = 0;

    constructor() {}
}

class ProbabilityCalculator {
    private testDeck: TestDeck;

    constructor(deck: Deck, value: number, isDealer: boolean) {
        this.testDeck = new TestDeck();
        this.testDeck.len = deck.deck.length;
        this.testDeck.occurences = Object.assign([], deck.occurences);
    }

    generateTree(n: PNode, isDealer: boolean) {
        if (isDealer && n.value > 16) {
            return;
        }
        if (n.value >= 21) {
            return;
        }
        for (let i = 1; i < 11; ++i) {
            let newValue = n.value;
            let newProb = this.testDeck.occurences[i] / this.testDeck.len;
            if (i === 1 && (n.value + 11 < 22)) {
                newValue += 11;
            } else {
                newValue += i;
            }
            this.testDeck.occurences[i]--;
            this.testDeck.len--;
            n.children.push(new PNode(newValue, newProb));
        }
        for (let c of n.children) {
            this.generateTree(c, isDealer);
        }
    }

    generateNextCardTree(n: PNode) {
        for (let i = 1; i < 11; ++i) {
            let newValue = n.value;
            let newProb = this.testDeck.occurences[i] / this.testDeck.len;
            if (i === 1 && (n.value + 11 < 22)) {
                newValue += 11;
            } else {
                newValue += i;
            }
            this.testDeck.occurences[i]--;
            this.testDeck.len--;
            n.children.push(new PNode(newValue, newProb));
        }
    }

    bustProb(n: PNode): number {
        if (n.value < 22 && n.children.length === 0) {
            return 0;
        }
        if (n.children.length === 0) {
            return n.prob;
        }
        let p = 0;
        for (let c of n.children) {
            let tmp = this.bustProb(c);
            p += n.prob * tmp;
        }
        return p;
    }


    mainBustProb(root: PNode, isDealer: boolean): number {
        if (root.value > 21) {
            return 1;
        }
        if (root.value > 16 && isDealer) {
            return 0;
        }
        let s = 0;
        for (let c of root.children) {
            let tmp = this.bustProb(c);
            s += tmp;
        }
        return s;
    }

    valueProb(value: number, n: PNode): number {
        if (n.value > value) {
            return 0;
        }
        if (n.value === value) {
            return n.prob;
        }
        let p = 0;
        for (let c of n.children) {
            let tmp = this.valueProb(value, c);
            p += n.prob * tmp;
        }
        return p;
    }

    mainValueProb(value: number, root: PNode): number {
        if (value === root.value) return 1;
        if (value < root.value) return 0;
        let s = 0;
        for (let c of root.children) {
            let tmp = this.valueProb(value, c);
            s += tmp;
        }
        return s;
    }

    probToPercentage(p: number) {
        return Math.round(p * 10000)/100;
    }

    drawProb(playerTree: PNode, dealerTree: PNode) {
        let p = 0;
        for (let i = 17; i < 22; ++i) {
            p += this.mainValueProb(i, playerTree) * this.mainValueProb(i, dealerTree);
        }
        return p;
    }

}