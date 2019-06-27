var getHref = function getHref(buttonId, page) {
    let buttonRegex = new RegExp('(<a)(.*)?id="' + buttonId + '"(.*)(\/a>)', 'gm');
    let buttonArray = buttonRegex.exec(page);
    let button = buttonArray[0];
    let $button = $(button);

    return $button.attr('href');
};

var getDiamonds = async function getDiamonds() {

    let result = await fetch('https://lootbits.io/dashboard.php');

    let page = await result.text();
    let buttonId = 'claimbtn';
    let canBeClaimed = new RegExp(`id="${buttonId}"`, 'gm').test(page);

    if (canBeClaimed) {
        await fetch(`https://lootbits.io/dashboard.php${getHref(buttonId, page)}`);

        console.log('Claimed at ' + new Date().toLocaleString('it-IT'));
    } else {
        console.log('Not Claimed');
    }

    return setTimeout(getDiamonds, 5 * 60 * 1000);
};
