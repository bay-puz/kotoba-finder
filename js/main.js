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
        return
    }
    setForm(param);
    const pattern = getPattern(param);
    const list = await loadList();
    const findList = finder(pattern, list);
    showList(pattern, findList)
}
main();