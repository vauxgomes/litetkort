let data = null;

InputReader(document.querySelector("#file"), (text) => {
    data = JSON.parse(text);
});

Draggable(document.querySelector(".flip-card"), (status) => {
    console.log(status);
});

document.querySelector("#btn-download-file").addEventListener("click", (e) => {
    // e.preventDefault();

    if (!data) {
        console.warn("No file was loaded or created");
        return;
    }

    let payload = `data:text/json;charset=utf-8, ${encodeURIComponent(
        JSON.stringify(data)
    )}`;

    e.target.setAttribute("href", payload);
    e.target.setAttribute("download", "litetkort-project.json");
    e.target.click();
});
