document.getElementById("find").addEventListener("click", setUrl);
document.getElementById("length").addEventListener("change", function(){changeFormSize(getLen())})

function setUrl() {
    var url = new URL(location.href)
    url.search = getForm()
    location.href = url.href
}

async function main() {
    const param = new URLSearchParams(location.search);
    if (! param.has("n") || param.get("n") < 2){
        changeFormSize(getLen())
        setTweetUrl("言葉を探しています")
        return
    }
    setForm(param);
    setResultList(["リストを読み込みます…"])
    const listName = getListName(param);
    const list = await loadList(listName);
    setResultList(["言葉を探しています…"])
    const pattern = getPattern(param);
    const len = getLen();
    const findList = finder(pattern, len, list);
    if (findList === null) {
        setResultList(["入力に誤りがあります"])
        return
    }
    showList(pattern, findList)
}
main();