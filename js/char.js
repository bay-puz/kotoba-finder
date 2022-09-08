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

function decodeSign (str) {
    str = str.replaceAll('!', 'んー').replaceAll('?', '^んー')
    str = str.replaceAll('^^', '')
    str = str.replace(/^([^^]+)\^.+$/g, '$1') // [あい^うえ] => [あい]
    setStr = new Set(str) // 重複排除
    str = [...setStr].sort().join('') // 並び替え
    return str
}

function convertSearchString (str) {
    var searchStr = ""
    for (let index = 0; index < str.length; index++) {
        var char = str.charAt(index);
        kana = convertChar(char)
        if ( isSearchChar(kana) ) {
            searchStr += kana
        }
    }
    return decodeSign(searchStr)
}

function inputToPattern (str) {
    if ( str === null || str.length === 0 ) {
        return "."
    }
    const searchStr = convertSearchString(str)
    if (searchStr.length === 0) {
        return "."
    }
    return "[" + searchStr + "]"
}
