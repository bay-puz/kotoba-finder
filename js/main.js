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
    setResultList(["探しています…"])
    setForm(param);
    const pattern = getPattern(param);
    const len = getLen();
    const listName = getListName(param);
    const list = await loadList(listName);
    const findList = finder(pattern, len, list);
    showList(pattern, findList)
}
main();