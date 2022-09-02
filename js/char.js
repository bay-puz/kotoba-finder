function kataToHira (char) {
    code = char.codePointAt(0)
    if ('ァ'.codePointAt(0) <= code && code <= 'ヶ'.codePointAt(0)) {
        code -= 96
    }
    return String.fromCodePoint(code)
}

function convertHira (char) {
    const str_before = "ぁぃぅぇぉゕゖっゃゅょゎゐゑ〜～ゔ"
    const str_after = "あいうえおかけつやゆよわいえーーぶ"

    if ( str_before.includes(char) ) {
        return str_after.charAt(str_before.indexOf(char))
    }
    return char
}

function isSearchChar (char) {
    if (char.length !== 1) {
        return false
    }
    const allKana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんーがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ'
    const searchSign = '^'

    if ( allKana.includes(char) || searchSign.includes(char) ) {
        return true
    }
    return false
}

function inputToPattern (str) {
    var pattern = ""
    for (let index = 0; index < str.length; index++) {
        var char = str.charAt(index);
        kana = convertHira(kataToHira(char))
        if ( isSearchChar(kana) ) {
            pattern += kana
        }
    };
    if (pattern === "") {
        return "."
    }
    return "[" + pattern + "]"
}
