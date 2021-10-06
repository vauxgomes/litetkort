function InputReader(element, callbackFn) {
    element.addEventListener(
        "change",
        (e) => {
            if (
                !window.File ||
                !window.FileReader ||
                !window.FileList ||
                !window.Blob
            ) {
                console.log(
                    "The File APIs are not fully supported in this browser."
                );

                return;
            }

            if (!element.files) {
                console.log(
                    "This browser doesn't seem to support the `files` property of file inputs."
                );
            } else if (!element.files[0]) {
                console.log("No file selected.");
            } else {
                let fr = new FileReader();

                fr.onload = receivedText;
                fr.readAsText(element.files[0]);

                function receivedText() {
                    callbackFn(fr.result);
                }
            }
        },
        false
    );
}

function DownloadButton(element, getDataFn) {
    element.addEventListener("click", (e) => {
        let data = getDataFn();

        if (!data || data.length === 0) {
            console.warn("No file was loaded or created");
            return;
        }

        let payload = `data:text/json;charset=utf-8, ${encodeURIComponent(
            JSON.stringify(data)
        )}`;

        e.target.setAttribute("href", payload);
        e.target.setAttribute("download", "litetkort-project.json");
        // e.target.click();
    });
}
