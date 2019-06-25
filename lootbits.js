var openBoxes = function(diamonds, totBTC) {

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

    totBTC = totBTC || 0;

    if (diamonds === 0) {
        console.log(`Totale BTC guadagnati: ${totBTC.toFixed(8)}`);
    } else {
        var regexp = /'porto.php\?uhash=(\d*)/gm;
        var pageText = $(document).text();
        var userHash = regexp.exec(pageText)[1];

        setTimeout(async function() {
            var result = await fetch(`https://lootbits.io/porto.php?uhash=${userHash}`, options).then(
                async function(result) {
                    var textResult = await result.text();
                    var arrayResult = textResult.split('::');

                    diamonds--;

                    var total = parseFloat(arrayResult[4]);
                    var percentage = parseInt((100 * total) / 0.049);

                    console.log(`Hai consumato un diamante! Ne mancano ${diamonds}, Percentuale: ${percentage}%`);

                    return parseFloat(arrayResult[2]);
                }
            );

            openBoxes(diamonds, totBTC + result)
        }, 2000);
    }
};
