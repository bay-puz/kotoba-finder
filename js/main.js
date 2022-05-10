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