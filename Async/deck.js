const baseUrl = 'http://deckofcardsapi.com/api';

async function requestDrawCard() {
    const resp = await axios.get(`${baseUrl}/deck/new/draw/?count=1`);
    const card = resp.data.cards[0];
    const $actionHeader = $(`<h2>Drew one card from newly shuffled deck:</h2>`);
    const $cardInfo = $(`<h4> ${card.value} of ${card.suit}</h4>`);
    $cardInfo.css('background-color','blue');
    $cardInfo.css('color','white');
    deckData.append($actionHeader);
    deckData.append($cardInfo);
};

async function shuffleAndDraw(numOfDraws) {
    const shuffleResp = await axios.get(`${this.baseUrl}/deck/new/draw/?count=1&timestamp=2`);
    const card = shuffleResp.data.cards[0];
    const $shuffleActionHeader = $(`<h2>Drew one card from newly shuffled deck:</h2>`);
    const $cardInfo = $(`<h4> ${card.value} of ${card.suit}</h4>`);
    $cardInfo.css('background-color','orange');
    $cardInfo.css('color','black');
    deckData.append($shuffleActionHeader);
    deckData.append($cardInfo);
    const deck_id = shuffleResp.data.deck_id;
    const drawResp = await axios.get(`${this.baseUrl}/deck/${deck_id}/draw/?count=${numOfDraws-1}`)
    const $drawActionHeader = $(`<h2>Then, drew ${numOfDraws-1}:</h2>`);
    deckData.append($drawActionHeader);
    for (let card of drawResp.data.cards) {
        const $cardInfo = $(`<h4> ${card.value} of ${card.suit}</h4>`);
        $cardInfo.css('background-color','orange');
        $cardInfo.css('color','black');
        deckData.append($cardInfo);
    };
};

const deckData = $('<div class="deck"></div>');
$('body').append(deckData);
requestDrawCard();
shuffleAndDraw(4);