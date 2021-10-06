let data = null;

InputReader(document.querySelector("#file"), (text) => {
    data = JSON.parse(text);
});

DownloadButton(document.querySelector("#btn-download-file"), () => data);

Draggable(document.querySelector(".flip-card"), (status) => {
    console.log(status);
});
