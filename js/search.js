listUrl = "https://raw.githubusercontent.com/bay-puz/kotobalist/main/list/all.txt"

async function loadList () {
    return await fetch(listUrl).then(response => response.text().then(text => text.split('\n')));
}

function finder(pattern, list) {
    var finds = new Array();
    const regex = new RegExp(pattern);
    list.forEach(word => {
        if (regex.test(word)) {
            finds.push(word)
        }
    });
    return finds;
}

