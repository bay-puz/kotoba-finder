document.getElementById("length").addEventListener("change", function(){changeFormSize(getLen())})
document.getElementById("input").addEventListener("submit", disableEmptyInputs)

async function main() {
    setTweetUrl("言葉を探しています")
    const param = new URLSearchParams(location.search);
    if (! param.has("n") || param.get("n") < 2){
        changeFormSize(getLen())
        return
    }
    setForm(param);
    setResultList(["リストを読み込んでいます…"])
    const listName = getListName();
    const len = getLen();
    const list = await load(listName, len);
    setResultList(["言葉を探しています…"])
    const pattern = getPattern(param);
    const findList = finder(pattern, list);
    if (findList === null) {
        setResultList(["入力に誤りがあります"])
        return
    }
    showList(pattern, findList)
}
main();