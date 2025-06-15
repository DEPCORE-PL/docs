export function initPopups() {
    let buttons = document
        .querySelectorAll(".popup-button")
        .forEach((button) => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                closeOtherPopups();
                showPopup(button);
                return false;
            });
        });
}

export function closeOtherPopups() {
    let openPopup = document.querySelector(".modal-dialog.visible");
    if (openPopup) {
        openPopup.classList.remove("visible");
    }
}

function showPopup(button) {
    if (button.dataset.toggle) {
        let popup = document.getElementById(button.dataset.toggle);
        if (popup) {
            popup.classList.toggle("visible");
            popup.setAttribute("aria-hidden", "false");
            document.body.classList.add("popup-toggled");
        }
    }
}

export function closePopupInit() {
    document
        .querySelectorAll(".modal-dialog .close,.modal-dialog .backdrop")
        .forEach((button) => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                button.closest(".modal-dialog").classList.remove("visible");
                button
                    .closest(".modal-dialog")
                    .setAttribute("aria-hidden", "true");
                document.body.classList.remove("popup-toggled");
            });
        });
}
