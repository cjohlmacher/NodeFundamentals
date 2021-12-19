class Deck {
    constructor() {
        this.deckContainer = $("<div class='deck'></div>");
        this.deck_id = null;
        this.start();
    }
    start() {
        this.renderDeck();
        this.shuffleDeck();
        $('body').append(this.deckContainer);
    }
    shuffleDeck() {
        axios.get(`http://deckofcardsapi.com/api/deck/new/draw/?count=1&timestamp=2`).then(resp => {
        this.deck_id = resp.data.deck_id;
        $("button").css('display','block');
        });
    }
    renderDeck() {
        this.deckContainer.css('background-color','pink');
        const drawCardButton = $("<button style='display: none'>Draw a card</button>");
        drawCardButton.on('click',this.drawCard.bind(this));
        this.deckContainer.append(drawCardButton);
    }
    drawCard() {
        axios.get(`http://deckofcardsapi.com/api/deck/${this.deck_id}/draw/?count=1&timestamp=${Date.now()}`).then(resp => {
        this.renderCard(resp.data.cards[0])
        }).catch(err => {
            $("button").css('display','none');
            this.deckContainer.css('background-color','lavender');
            const $endDeck = $("<div>Deck is out of cards</div>");
            this.deckContainer.prepend($endDeck);
        });
    }
    renderCard(card) {
        const $cardHTML = $('<div class="card"></div>');
        const $cardImage = $('<img></img>');
        $cardImage.attr('src',card.image);
        const randomNumber = Math.random()*100;
        $cardImage.css('transform',`rotate(${randomNumber}deg)`)
        $cardImage.css('-webkit-transform', `rotate(${randomNumber}deg)`)
        $cardImage.css('-moz-transform', `rotate(${randomNumber}deg)`)
        $cardImage.css('-o-transform', `rotate(${randomNumber}deg)`)
        $cardImage.css('-ms-transform', `rotate(${randomNumber}deg)`)
        $cardHTML.append($cardImage);
        this.deckContainer.append($cardHTML);
    }
};

const deck = new Deck();