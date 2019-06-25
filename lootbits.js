var openBoxes = function(diamonds, totBTC) {

    var regexp = /uhash=(\d*)/gm;
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

    totBTC = totBTC || 0;

    if (diamonds === 0) {
        console.log(`Totale BTC guadagnati: ${totBTC}`);
    } else {
        setTimeout(async function() {
            var result = await fetch("https://lootbits.io/porto.php?uhash=" + userHash, options).then(
                async function(result) {
                    var textResult = await result.text();
                    var arrayResult = textResult.split('::');

                    diamonds--;
                    console.log(`Hai consumato un diamantino! Ne mancano ${diamonds}`);

                    return parseFloat(arrayResult[2]);
                }
            );

            openBoxes(diamonds, totBTC + result)
        }, 2000);
    }
};

// openBoxes(5);
