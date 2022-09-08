listPath = "https://raw.githubusercontent.com/bay-puz/kotobalist/index/list/"
indexUrl = listPath + "index.json"

async function loadList (name) {
    const listUrl = listPath + name + ".txt"
    return await fetch(listUrl).then(response => response.text().then(text => text.split('\n')));
}

async function loadIndex () {
    return await fetch(indexUrl).then(response => response.json())
}

async function load (name, len) {
    const index = await loadIndex()
    const start = index[name][len]["start"]
    const count = index[name][len]["count"]

    const list = await loadList(name)
    return list.slice(start, start + count)
}

function finder(pattern, list) {
    try {
        const regex = new RegExp("^" + pattern + "$");
        return list.filter(word => regex.test(word))
    }
    catch (err) {
        return null
    }
}

function getPattern(param) {
    if (! param.has("n")) {
        return null
    }
    const len = param.get("n")
    if (len <= 1) {
        return null
    }
    var pattern = ""
    for (let index = 1; index <= len; index++) {
        const key = "c" + index;
        if (param.has(key) ) {
            pattern += inputToPattern(param.get(key))
        }
    }
    return pattern
}