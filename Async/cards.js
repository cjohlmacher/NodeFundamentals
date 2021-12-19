class Deck {
    constructor() {
        this.deckContainer = $("<div class='deck'></div>");
        this.deck_id = null;
        this.start();
    }
    start() {
        this.shuffleDeck();
    }
    async shuffleDeck() {
        axios.get(`http://deckofcardsapi.com/api/deck/new/draw/?count=1&timestamp=2`).then(resp => {
        this.deck_id = resp.data.deck_id;
        });
    }
    renderDeck() {
        this.deckContainer.css('background-color','pink');
        const drawCardButton = $("<button>Draw a card</button>");
        drawCardButton.on('click',this.drawCard.bind(this));
    }
    async drawCard() {
        
    }
};

class Card {

};

const deck = new Deck();