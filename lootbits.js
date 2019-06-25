var parseResult = async function parseResult(diamonds, result) {
    let textResult = await result.text();
    let arrayResult = textResult.split('::');

    let total = parseFloat(arrayResult[4]);
    let percentage = parseInt((100 * total) / 0.049);
    let nextPercentage = percentage + 1;
    let remainingBTC = (0.049 * nextPercentage / 100) - total;

    console.log(`Hai consumato un diamante! Ne mancano ${diamonds}, Percentuale: ${percentage}%\n Mancano: ${remainingBTC.toFixed(8)}BTC al ${nextPercentage}%`);

    return parseFloat(arrayResult[2]);
};

var openBoxes = function (diamonds, totBTC = 0) {
    var regexp = /'porto.php\?uhash=(\d*)/gm;
    var pageText = $(document).text();
    var userHash = regexp.exec(pageText)[1];

    var options = {
        "credentials":    "include",
        "headers":        {
            "accept":           "/",
            "accept-language":  "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6",
            "content-type":     "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer":       "https://lootbits.io/dashboard.php",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body":           "uhash=" + userHash,
        "method":         "POST",
        "mode":           "cors"
    };

    if (diamonds === 0) {
        console.log(`Totale BTC guadagnati: ${totBTC.toFixed(8)}`);
    } else {
        setTimeout(async function () {

            var result = await fetch(`https://lootbits.io/porto.php?uhash=${userHash}`, options).then(parseResult.bind(null, diamonds--));

            openBoxes(diamonds, totBTC + result);

        }, 2000);
    }
};
