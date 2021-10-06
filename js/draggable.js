function Draggable(element, callbackFn) {
    let length = 80;
    let startX = 0;
    let status = null;

    let target = document.querySelector(element.getAttribute("data-target"));
    let targetRight = element.getAttribute("data-right");
    let targetWrong = element.getAttribute("data-wrong");

    // Making it draggable
    element.draggable = true;

    // Drag start
    ["dragstart", "touchstart"].forEach((evt) => {
        element.addEventListener(evt, (e) => {
            console.log("start");
            startX = e.x;

            if (!startX) startX = e.touches[0].clientX;
        });
    });

    // Drag
    ["drag", "touchmove"].forEach((evt) => {
        element.addEventListener(evt, (e) => {
            console.log("drag");

            let userX = e.x;
            let halfScreen = window.innerWidth / 2;

            if (!userX) {
                userX = e.touches ? e.touches[0].clientX : null;
                return;
            }

            if (userX === 0) {
                return;
            }

            if (userX > halfScreen && userX >= startX + length) {
                // console.log("right: ", userX, window.innerWidth / 2);
                target.classList.add(targetRight);
                target.classList.remove(targetWrong);
                status = true;
            } else if (userX < halfScreen && userX <= startX - length) {
                // console.log("left: ", userX, window.innerWidth / 2);
                target.classList.add(targetWrong);
                target.classList.remove(targetRight);
                status = false;
            } else {
                target.classList.remove(targetRight);
                target.classList.remove(targetWrong);
                status = null;
            }
        });
    });

    // Drag end
    ["dragend", "touchend"].forEach((evt) => {
        element.addEventListener(evt, (e) => {
            if (callbackFn) callbackFn(status);

            setTimeout(() => {
                target.classList.remove(targetRight);
                target.classList.remove(targetWrong);
            }, 100);
        });
    });
}
