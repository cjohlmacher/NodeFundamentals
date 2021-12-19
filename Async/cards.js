class Deck {
    constructor() {
        this.deckContainer = $("<div class='deck'></div>");
        this.deck_id = null;
        this.start();
        this.baseUrl = 'http://deckofcardsapi.com/api';
    }
    start() {
        this.renderDeck();
        this.shuffleDeck();
        $('body').append(this.deckContainer);
    }
    async shuffleDeck() {
        const resp = axios.get(`${this.baseUrl}/deck/new/draw/?count=1&timestamp=2`);
        this.deck_id = resp.data.deck_id;
        $("button").css('display','block');
    }
    renderDeck() {
        this.deckContainer.css('background-color','pink');
        const drawCardButton = $("<button style='display: none'>Draw a card</button>");
        drawCardButton.on('click',this.drawCard.bind(this));
        this.deckContainer.append(drawCardButton);
    }
    async drawCard() {
        try {
            const resp = await axios.get(`${this.baseUrl}/deck/${this.deck_id}/draw/?count=1&timestamp=${Date.now()}`);
            this.renderCard(resp.data.cards[0]);
        }
        catch(err) {
            $("button").css('display','none');
            this.deckContainer.css('background-color','lavender');
            const $endDeck = $("<div>Deck is out of cards</div>");
            this.deckContainer.prepend($endDeck);
        };
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