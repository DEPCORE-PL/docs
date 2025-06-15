console.log(
    "%c This site has been created by DEPCORE | depcore.pl ",
    "background: #ffe400; color: #121212; padding: 30px 20px"
);
// import Headroom from "headroom.js";
import hljs from "highlight.js"

import {
    initThemeSwitch,
    initToggleButtons,
    setScrollPadding,
    initAccordions,
} from "./helper-functions";



const siteHeader = document.getElementById("masthead");

// let headroom = new Headroom(document.querySelector(".site-header"));
// headroom.init();

const domReady = function (callback) {
    if (
        document.readyState === "interactive" ||
        document.readyState === "complete"
    ) {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
};

let delayTimer = 1000;

domReady(function () {
 document.querySelectorAll('pre code').forEach((codeBlock) => {
        hljs.highlightElement(codeBlock);

        const pre = codeBlock.closest('pre');

        // Create the copy button
        const button = document.createElement('button');
        button.innerText = '📋 Copy';
        button.className = 'copy-button';

        // Click event to copy code
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(codeBlock.innerText).then(() => {
                button.innerText = '✅ Copied!';
                setTimeout(() => (button.innerText = '📋 Copy'), 2000);
            });
        });

        // Wrap pre in a relative container
        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        wrapper.appendChild(button);
    });
    
    // initToggleButtons();
    // initAccordions(".accordion-trigger");
    // setScrollPadding(siteHeader);
    // initThemeSwitch();
});
