const minLen = 2
const maxLen = 30

function getLen() {
    const lengthValue = document.getElementById("length").value
    const len = Number(lengthValue)
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
    const inputElementName = "c" + index
    const formElementId = "form" + index
    const suppleElementId = "supple" + index

    var inputElement = document.createElement("input")
    inputElement.id = inputElementId
    inputElement.name = inputElementName
    inputElement.type = "text"
    inputElement.classList.add("inputChar")
    inputElement.addEventListener("change", function(){inputElement.value = convertSearchString(inputElement.value)})

    var labelElement = document.createElement("label")
    labelElement.for = inputElementId
    labelElement.innerText = index + "文字目"
    labelElement.classList.add("charLabel")

    var suppleElement = document.createElement("span")
    suppleElement.id = suppleElementId
    suppleElement.classList.add("charSupple")

    var element = document.createElement("p")
    element.id = formElementId
    element.appendChild(labelElement)
    element.appendChild(inputElement)
    element.appendChild(suppleElement)

    document.getElementById("inputCharErea").appendChild(element)
}

function showList(len, pattern, list) {
    const titleMessage = "ことばファインダー " + pattern + "（" + list.length + "件）"
    setTitle(titleMessage)

    if (list.length === 0) {
        summaryMessage = "「" + pattern + "」は見つかりませんでした"
    } else {
        summaryMessage = "「" + pattern + "」は" + list.length + "件あります"
    }
    setResultSummary(summaryMessage)
    setTweetUrl(summaryMessage)

    if (list.length > 1000) {
        setResultList(["数が多すぎるため表示しません"])
    } else {
        setResultList(list)
    }

    showCharSupple(len, list)
}

function setTitle(message) {
    document.getElementsByTagName("title")[0].innerText = message
}

function setResultList(list) {
    var resultElement = document.getElementById("result")
    resultElement.innerText = ""
    list.forEach(word => {
        var element = document.createElement("p")
        element.innerText = word
        element.classList.add("word")
        resultElement.appendChild(element)
    });
}

function setResultSummary(message) {
    document.getElementById("resultSummary").innerText = message
}

function showCharSupple(len, list) {
    let charArray = Array(len).fill('')
    for (const word of list) {
        for (let index = 0; index < len; index++) {
            charArray[index] += word[index]
        }
    }

    for (let index = 0; index < len; index++) {
        var str = uniqStr(charArray[index])
        if ( str.length > 9 ) {
            str = "10+"
        }
        setCharSupple(index, str)
    }
}

function setCharSupple(index, str) {
    const num = index + 1
    const element = document.getElementById("supple" + num)
    if ( element != null ) {
        element.innerText = str
    }
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

function disableEmptyInputs() {
    var inputElements = document.getElementsByClassName("inputChar")
    for (var input of inputElements) {
        if ( input.value.length === 0 ) {
            input.disabled = true
        }
    }
}