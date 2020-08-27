class Node {
    constructor(value, prob) {
        this.value = value;
        this.prob = prob;
        this.children = [];
    }
}

const DECKS = 6;
const CARDPROB = 24 / (DECKS * 52);
const TENPROB = 96 / (DECKS * 52);

function generateChildren(n) {
    if (n.value > 16) {
        return;
    }
    for (let i = 1; i < 11; ++i) {
        let newValue = n.value;
        let newProb = i === 10 ? TENPROB : CARDPROB;
        if (i === 1 && (n.value + 11 < 22)) {
            newValue += 11;
        } else {
            newValue += i;
        }
        n.children.push(new Node(newValue, newProb));
    }
    for (c of n.children) {
        generateChildren(c);
    }
}

function bustProb(n) {
    if (n.value < 22 && n.children.length === 0) {
        return 0;
    }
    if (n.children.length === 0) {
        return n.prob;
    }
    let p = 0;
    for (c of n.children) {
        let tmp = bustProb(c);
        p += n.prob * tmp;
    }
    return p;
}

function mainBustProb(root) {
    if (root.value > 21) {
        return 1;
    }
    if (root.value > 16) {
        return 0;
    }
    let s = 0;
    for (c of root.children) {
        let tmp = bustProb(c);
        s += tmp;
    }
    return s;
}

for (let i = 2; i < 22; ++i) {
    let t = new Node(i, 1);
    generateChildren(t);
    let p = Math.round(mainBustProb(t) * 10000)/100;
    console.log(i + ' -> ' + p + '%');
}