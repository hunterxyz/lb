var runGetDiamonds = async function getDiamonds() {

    let result = await fetch('https://lootbits.io/dashboard.php');

    let page = await result.text();
    let buttonId = 'claimbtn';
    let canBeClaimed = new RegExp('id="' + buttonId + '"', 'gm').test(page);

    if (canBeClaimed) {
        let buttonRegex = new RegExp('(<a)(.*)?id="' + buttonId + '"(.*)(\/a>)', 'gm');
        let buttonArray = buttonRegex.exec(page);
        let button = buttonArray[0];
        let $button = $(button);
        let buttonHref = $button.attr('href');
        console.log('Claimed at ' + new Date().toLocaleString('it-IT'));

        return fetch('https://lootbits.io/dashboard.php' + buttonHref);
    } else {
        console.log('Not Claimed');

        return page;
    }

};

var getDiamonds = function getDiamonds() {

    runGetDiamonds();

    return setInterval(runGetDiamonds, 5 * 60 * 1000);

};
