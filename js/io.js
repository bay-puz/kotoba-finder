const minLen = 2
const maxLen = 30

function getLen() {
    var len = document.getElementById("length").value
    if (len < minLen) {
        return minLen
    }
    if (len > maxLen) {
        return maxLen
    }
    return len
}

function getListName() {
    return document.getElementById("listName").value
}

function getForm (){
    var param = new URLSearchParams()
    const len = getLen()
    param.append("n", len)
    param.append("l", getListName())
    for (let index = 1; index <= len; index++) {
        const elementId = "char" + index
        const char = document.getElementById(elementId).value
        if ( char.length > 0 ) {
            const key = "c" + index
            param.append(key, char)
        }
    }
    return param
}

function setForm (param) {
    if ( param.has("l")) {
        document.getElementById("listName").value = param.get("l")
    }
    if ( ! param.has("n")) {
        return
    }
    var charCount = param.get("n")
    changeFormSize(charCount)
    for (let index = 1; index <= charCount; index++) {
        const key = "c" + index
        if (param.has(key)) {
            const elementId = "char" + index
            document.getElementById(elementId).value = param.get(key)
        }
    }
}

function changeFormSize (len) {
    len = Number(len)
    document.getElementById("length").value = len
    for (let index = 1; index <= len; index++) {
        const elementId = "char" + index
        var inputElement = document.getElementById(elementId)
        if (inputElement === null) {
            setFormElement(index);
        }
    }
    for (let index = len + 1; index <= maxLen; index++) {
        const elementId = "form" + index
        var formElement = document.getElementById(elementId)
        if (formElement === null) {
            break
        }
        formElement.remove()
    }
}

function setFormElement(index) {
    const inputElementId = "char" + index
    const formElementId = "form" + index

    var inputElement = document.createElement("input")
    inputElement.id = inputElementId
    inputElement.type = "text"
    inputElement.classList.add("inputChar")

    var labelElement = document.createElement("label")
    labelElement.for = inputElementId
    labelElement.innerText = index + "文字目"

    var element = document.createElement("p")
    element.id = formElementId
    element.appendChild(labelElement)
    element.appendChild(inputElement)

    document.getElementById("inputCharErea").appendChild(element)
}

function showList(pattern, list) {
    const titleMessage = " " + pattern + " - " + list.length + "件"
    document.getElementsByTagName("title")[0].innerText += titleMessage

    if (list.length === 0) {
        summaryMessage = "「" + pattern + "」は見つかりませんでした"
    } else {
        summaryMessage = "「" + pattern + "」は" + list.length + "件あります"
    }
    document.getElementById("resultSummary").innerText = summaryMessage
    setTweetUrl(summaryMessage)

    var resultElement = document.getElementById("result")
    resultElement.innerText = ""
    if (list.length > 1000) {
        resultElement.innerText = "数が多すぎるため表示しません"
        return
    }
    list.forEach(word => {
        var element = document.createElement("p")
        element.innerText = word
        element.classList.add("word")
        resultElement.appendChild(element)
    });
}

function setTweetUrl(message) {
    var params = new URLSearchParams();
    params.append("text", message);
    params.append("hashtags", "ことばファインダー");
    params.append("url", location.href);
    var url = new URL("https://twitter.com/intent/tweet");
    url.search = params.toString();
    var elements = document.getElementsByClassName("tweet")
    for(var element of elements) {
        element.href = url.href
    }
}