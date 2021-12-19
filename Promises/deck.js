const requestDrawCard = () => {
    axios.get(`http://deckofcardsapi.com/api/deck/new/draw/?count=1`).then(resp => {
        const card = resp.data.cards[0];
        const $actionHeader = $(`<h2>Drew one card from newly shuffled deck:</h2>`);
        const $cardInfo = $(`<h4> ${card.value} of ${card.suit}</h4>`);
        console.log(`${card.value} of ${card.suit}`);
        $cardInfo.css('background-color','blue');
        $cardInfo.css('color','white');
        deckData.append($actionHeader);
        deckData.append($cardInfo);
    });
};

const shuffleAndDraw = (numOfDraws) => {
    axios.get(`http://deckofcardsapi.com/api/deck/new/draw/?count=1&timestamp=2`).then(resp => {
        const card = resp.data.cards[0];
        const $actionHeader = $(`<h2>Drew one card from newly shuffled deck:</h2>`);
        const $cardInfo = $(`<h4> ${card.value} of ${card.suit}</h4>`);
        console.log(`${card.value} of ${card.suit}`);
        $cardInfo.css('background-color','orange');
        $cardInfo.css('color','black');
        deckData.append($actionHeader);
        deckData.append($cardInfo);
        const deck_id = resp.data.deck_id;
        return axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${numOfDraws-1}`)
    }).then(resp => {
        const $actionHeader = $(`<h2>Then, drew ${numOfDraws-1}:</h2>`);
        deckData.append($actionHeader);
        for (let card of resp.data.cards) {
            const $cardInfo = $(`<h4> ${card.value} of ${card.suit}</h4>`);
            console.log(`${card.value} of ${card.suit}`);
            $cardInfo.css('background-color','orange');
            $cardInfo.css('color','black');
            deckData.append($cardInfo);
        }
    });
};

// const requestManyFacts = (interestingNumber,numOfFacts) => {
//     const promiseList = [];
//     for (let i=0; i<numOfFacts; i++) {
//         const timestamp = Math.random()*1000;
//         const newRequest = axios.get(`http://numbersapi.com/${interestingNumber}?json&timestamp=${timestamp}`)
//         promiseList.push(newRequest);
//     };    
//     console.log(promiseList);
//     Promise.all(promiseList).then(numberFacts => {
//         const $numbersHeader = $(`<h2>${numOfFacts} facts about ${interestingNumber}:</h2>`);
//         deckData.append($numbersHeader);
//         for (let fact of numberFacts) {
//                 $favNumberInfo = $(`<h4>${fact.data.text}</h4>`)
//                 deckData.append($favNumberInfo);
//         }
//     });
// };

const deckData = $('<div class="deck"></div>');
$('body').append(deckData);
requestDrawCard();
shuffleAndDraw(4);