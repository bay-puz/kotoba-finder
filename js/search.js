listPath = "https://raw.githubusercontent.com/bay-puz/kotobalist/main/list/"
listName = {"all": "all.txt", "buta": "buta.txt", "wikip": "wikipedia.txt", "ncpx": "nico-pixiv.txt", "yoji": "yojijukugo.txt"}

async function loadList (name) {
    const listUrl = listPath + listName[name]
    return await fetch(listUrl).then(response => response.text().then(text => text.split('\n')));
}

function finder(pattern, len, list) {
    var listLen = new Array();
    for (const word of list) {
        if (word.length > len) {
            break
        }
        if (word.length == len) {
            listLen.push(word)
        }
    }
    const regex = new RegExp("^" + pattern + "$");
    return listLen.filter(word => regex.test(word))
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
