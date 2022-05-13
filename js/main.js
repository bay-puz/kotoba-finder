document.getElementById("find").addEventListener("click", setUrl);

function setUrl() {
    const charCount = 3
    var param = new URLSearchParams()
    param.append("n", charCount)
    for (let index = 1; index <= charCount; index++) {
        const elementId = "char" + index
        const elementValue = document.getElementById(elementId).value
        if ( elementValue.length > 0 ) {
            const key = "c" + index
            char = elementValue
            param.append(key, char)
        }
    }
    var url = new URL(location.href)
    url.search = param
    location.href = url.href
}

function parseRegex() {
    var pattern = "^"
    const param = new URLSearchParams(location.search);
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
    pattern += "$"
    return pattern
}

async function main() {
    const pat = parseRegex();
    if (pat === null) {
        return null
    }
    const data = await loadList();
    const finds = finder(pat, data);
    console.log(finds)
}
main();