async function requestFavNumber(number) {
    const resp = await axios.get(`http://numbersapi.com/${number}?json`);
    const $favNumberHeader = $(`<h2>One Fav Number Fact:</h2>`);
    const $favNumberInfo = $(`<h4> ${resp.data.text}</h4>`);
    $favNumberInfo.css('background-color','purple');
    $favNumberInfo.css('color','white');
    numberData.append($favNumberHeader);
    numberData.append($favNumberInfo);
};

async function requestNumbers(numbersArray) {
    let numberString = "";
    for (let number of numbersArray) {
        numberString += number;
        numberString += ',';
    };
    numberString = numberString.slice(0,-1);
    const resp = await axios.get(`http://numbersapi.com/${numberString}`);
    const $numbersHeader = $(`<h2>Other Number Facts:</h2>`);
    numberData.append($numbersHeader);
    for (let key of Object.keys(resp.data)) {
        const numberFact = resp.data[key];
        const numberInfo = $(`<h4>${numberFact}</h4>`);
        numberData.append(numberInfo);
    };
};

async function requestManyFacts(interestingNumber,numOfFacts) {
    const promiseList = [];
    for (let i=0; i<numOfFacts; i++) {
        const timestamp = Math.random()*1000;
        const newRequest = axios.get(`http://numbersapi.com/${interestingNumber}?json&timestamp=${timestamp}`)
        promiseList.push(newRequest);
    };    
    const numberFacts = await Promise.all(promiseList);
    const $numbersHeader = $(`<h2>${numOfFacts} facts about ${interestingNumber}:</h2>`);
    numberData.append($numbersHeader);
    for (let fact of numberFacts) {
            $favNumberInfo = $(`<h4>${fact.data.text}</h4>`)
            numberData.append($favNumberInfo);
    }
};

const numberData = $('<div class="numbers"></div>');
$('body').append(numberData);
requestFavNumber(7);
requestNumbers([1,2,3,4,5]);
requestManyFacts(7,4);