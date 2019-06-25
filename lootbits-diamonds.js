var getDiamonds = async function getDiamonds() {

    var result = await fetch('https://lootbits.io/dashboard.php');

    var page = await result.text();
    var buttonId = 'claimbtn';
    var canBeClaimed = new RegExp('id="' + buttonId + '"', 'gm').test(page);

    if (canBeClaimed) {
        var buttonRegex = new RegExp('(<a)(.*)?id="' + buttonId + '"(.*)(\/a>)', 'gm');
        var buttonArray = buttonRegex.exec(page);
        var button = buttonArray[0];
        var $button = $(button);
        var buttonHref = $button.attr('href');
        console.log('Claimed');

        return fetch('https://lootbits.io/dashboard.php' + buttonHref);
    } else {
        console.log('Not Claimed');
        return page;
    }

};

setInterval(getDiamonds, 5 * 60 * 1000);
