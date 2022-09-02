function kataToHira (char) {
    code = char.codePointAt(0)
    if ('ァ'.codePointAt(0) <= code && code <= 'ヶ'.codePointAt(0)) {
        code -= 96
    }
    return String.fromCodePoint(code)
}

function convertChar (char) {
    charHira = kataToHira(char)

    const str_before = "ぁぃぅぇぉゕゖっゃゅょゎゐゑ〜～ゔ＾！？"
    const str_after = "あいうえおかけつやゆよわいえーーぶ^!?"
    if ( str_before.includes(charHira) ) {
        return str_after.charAt(str_before.indexOf(charHira))
    }
    return charHira
}

function isSearchChar (char) {
    if (char.length !== 1) {
        return false
    }
    const allKana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんーがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ'
    const searchSign = '^!?'

    if ( allKana.includes(char) || searchSign.includes(char) ) {
        return true
    }
    return false
}

function decodeSign (char) {
    if ( char === '!' ) {
        return "んー"
    }
    if ( char === '?' ) {
        return "^んー"
    }
    return char
}

function inputToPattern (str) {
    var pattern = ""
    for (let index = 0; index < str.length; index++) {
        var char = str.charAt(index);
        kana = convertChar(char)
        if ( isSearchChar(kana) ) {
            pattern += decodeSign(kana)
        }
    };
    if (pattern === "") {
        return "."
    }
    pattern = pattern.replaceAll('^^', '')
    pattern = pattern.replaceAll(/(.)\^.+$/g, '$1')

    return "[" + pattern + "]"
}
