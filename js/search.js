listPath = "https://raw.githubusercontent.com/bay-puz/kotobalist/main/list/"
listName = {"all": "all.txt", "buta": "buta.txt", "wikip": "wikipedia.txt", "ncpx": "nico-pixiv.txt", "yoji": "yojijukugo.txt"}

async function loadList (name) {
    const listUrl = listPath + listName[name]
    return await fetch(listUrl).then(response => response.text().then(text => text.split('\n')));
}

function finder(pattern, list) {
    var finds = new Array();
    const regex = new RegExp("^" + pattern + "$");
    list.forEach(word => {
        if (regex.test(word)) {
            finds.push(word)
        }
    });
    return finds;
}

function getPattern(param) {
    var pattern = ""
    if (! param.has("n")) {
        return null
    }
    const len = param.get("n")
    if (len <= 1) {
        return null
    }
    for (let index = 1; index <= len; index++) {
        const key = "c" + index;
        if (param.has(key)) {
            pattern += "[" + param.get(key) + "]"
        } else {
            pattern += "."
        }
    }
    return pattern
}