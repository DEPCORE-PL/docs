import baguetteBox from "baguettebox.js";
baguetteBox.run(".baguetteBoxOne");

export function initGallery(selector = ".gallery") {
    baguetteBox.run(selector);
}
