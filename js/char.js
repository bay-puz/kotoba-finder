function kataToHira (char) {
    if (char.length === 0) {
        return ''
    }
    if ( char.length > 1 ) {
        return kataToHira(char.slice(0,1)) + kataToHira(char.slice(1))
    }
    code = char.codePointAt(0)
    if ('ァ'.codePointAt(0) <= code && code <= 'ヶ'.codePointAt(0)) {
        code -= 96
    }
    return String.fromCodePoint(code)
}

function convertHira (char) {
    if (char.length === 0) {
        return ''
    }
    if ( char.length > 1 ) {
        return convertHira(char.slice(0,1)) + convertHira(char.slice(1))
    }

    const str_before = "ぁぃぅぇぉゕゖっゃゅょゎゐゑ〜～ゔ"
    const str_after = "あいうえおかけつやゆよわいえーーぶ"

    if ( str_before.includes(char) ) {
        return str_after.charAt(str_before.indexOf(char))
    }
    return char
}

function normalizeKana (str) {
    return convertHira(kataToHira(str))
}

function charToPattern (char) {
    if ( char.length == 0 ) {
        return "."
    }
    return "[" + normalizeKana(char) + "]"
}
