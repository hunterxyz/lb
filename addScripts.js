async function addScript(page, id) {
    var appendInPage = async function(result) {

        var text = await result.text();
        var existingScript = $('script#' + id);
        var script;

        if (existingScript.length === 0) {

            script = $('<script/>').attr('type', 'text/javascript').attr('id', id);

            script.appendTo('head');
        } else {
            script = existingScript;
        }

        script.text(text);

    };
    await fetch('https://raw.githubusercontent.com/hunterxyz/lb/master/' + page).then(appendInPage);
};

await addScript('lootbits.js?v=' + new Date().getTime(), 'open-boxes');
await addScript('lootbits-diamonds.js?v=' + new Date().getTime(), 'get-diamonds');

