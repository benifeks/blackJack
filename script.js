let score, scoreBank, card, p;
let openСards = [];
////////////////////
class Card {
    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }
}
////////////////
class Deck {

    constructor() {

        this.cards = [];
        this.suits = ['&clubs;', '&diams;', '&hearts;', '&spades;'];
        this.ranks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.values = [6, 7, 8, 9, 10, 2, 3, 4, 11];

    }

    createDeck() {

        this.suits.map(item =>
            this.ranks.map((elem, i) =>
                this.cards.push(new Card(item, this.ranks[i], this.values[i]))
            ));
        return this.cards;
    }

    shuffleDeck() {

        deck.createDeck().sort(() => Math.random() - 0.5);
        return this.cards;
    }
}

let deck = new Deck();

function tosovka() {
    document.querySelector('#btn1').innerHTML = 'взять';
    document.querySelector('#btn2').innerHTML = 'пас';
    openСards.length = 0;
    score = 0;
    scoreBank = 0;
    deck.cards = [];
    card = 0;
    document.querySelector('#result').innerHTML = 'идёт игра';
    document.querySelector('#pl').innerHTML = '';
    document.querySelector('#bank').innerHTML = '';
    document.querySelector('#score').innerHTML = '';
    document.querySelector('#scoreBank').innerHTML = '';
    deck.shuffleDeck();
}
/////////////////////////////////////////////////////

function bankir() {

    openСards.push(Object.values(deck.cards[0]));
    scoreBank = scoreBank + deck.cards[0].value;

    let divCard = document.querySelector('#bank');
    p = document.createElement('div');

    p.classList.add("coloda");

    p.style.background = 'radial-gradient(#000 0%, #7B1672 100%)';

    divCard.append(p);

    deck.cards.shift();

    if (scoreBank > 21) {

        document.querySelector('#scoreBank').innerHTML = `перебор ${scoreBank}`;
        document.querySelector('#result').innerHTML = 'вы выиграли';
        showСards();

    } else if (scoreBank > 14 && scoreBank <= 21) {

        document.querySelector('#scoreBank').innerHTML = `пас`;
    }

}

function launchBankir() {

    if (scoreBank < 15) {

        bankir();
        launchBankir();

    }
}

function take() {

    card = Object.entries(deck.cards[0]);

    card = card.map(elem => elem[1]);

    let divCard = document.querySelector('#pl');

    let p = document.createElement('div');
    p.classList.add("coloda");
    p.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)';
    p.innerHTML = `<div>${card[0]}<br>${card[1]}</div>`;
    divCard.append(p);

    deck.cards.shift();
    score = score + card[2];

    if (score === 21) {
        document.querySelector('#score').innerHTML = score;
        pasLaunch();

    } else if (score < 21) {
        document.querySelector('#score').innerHTML = score;
    } else {

        showСards();

        document.querySelector('#score').innerHTML = `перебор ${score}`;
        document.querySelector('#result').innerHTML = 'вы проиграли';
        let cardBankir = '';
        card = '';
    }

    if (scoreBank < 15 && score <= 21) {

        bankir();

    }

}


function launchTake() {

    if (card !== '') {

        take();

    }

}


function pas() {

    document.querySelector('#score').innerHTML = `пас ${score}`;
    card = '';

    launchBankir();

    showСards();

    function compare() {


        if (score > scoreBank || scoreBank > 21) {

            document.querySelector('#result').innerHTML = 'вы выиграли';
            p.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)';
        } else if (score < scoreBank) {

            document.querySelector('#result').innerHTML = 'вы проиграли';
            p.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)';
        } else {

            document.querySelector('#result').innerHTML = 'ничья';
            p.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)';
        }

    }
    compare();

}

function pasLaunch() {

    if (score <= 21 && score !== 0) {

        pas();

    }

}

function showСards() {

    let divCard = document.querySelector('#bank');
    divCard.innerHTML = '';

    if (scoreBank > 21) {

        document.querySelector('#scoreBank').innerHTML = `перебор ${scoreBank}`;

    } else {

        document.querySelector('#scoreBank').innerHTML = scoreBank;
    }

    openСards.forEach((elem) => {

        let p = document.createElement('div');
        p.classList.add("coloda");
        p.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)';
        p.innerHTML = `<div>${elem[0]}<br>${elem[1]}</div>`;
        divCard.append(p);
    });

}