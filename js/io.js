function getForm (){
    const charCount = 3
    var param = new URLSearchParams()
    param.append("n", charCount)
    for (let index = 1; index <= charCount; index++) {
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
    if ( ! param.has("n")) {
        return
    }
    var charCount = param.get("n")
    for (let index = 1; index <= charCount; index++) {
        const key = "c" + index
        if (param.has(key)) {
            const elementId = "char" + index
            document.getElementById(elementId).value = param.get(key)
        }
    }
}
