export function setScrollPadding(banner) {
    document.documentElement.style.setProperty(
        "--scroll-padding",
        `${banner.offsetHeight}px`
    );
}

export function initToggleButtons() {
    const toggleButtons = document.querySelectorAll(".data-toggle");

    toggleButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(
                this.getAttribute("data-toggle-target")
            );

            const remove = this.getAttribute("data-toggle-remove-class");

            if (this.getAttribute("data-toggle-class")) {
                target.classList.toggle(this.getAttribute("data-toggle-class"));
            }

            if (remove) {
                remove.split(" ").forEach((element) => {
                    target.classList.remove(element);
                });
            }
        });
    });
}

export function initThemeSwitch() {
    const themeSwitch = document.getElementById("themeSwitch");

    if (themeSwitch) {
        initTheme();
        themeSwitch.addEventListener("click", function (event) {
            event.preventDefault();
            resetTheme();
        });
    }

    function initTheme() {
        let darkThemeSelected =
            localStorage.getItem("themeSwitch") !== null &&
            localStorage.getItem("themeSwitch") === "dark";

        darkThemeSelected
            ? document.body.classList.add("dark")
            : document.body.classList.remove("dark");
    }

    function resetTheme() {
        if (document.body.classList.contains("dark")) {
            document.body.classList.remove("dark");
            localStorage.removeItem("themeSwitch");
        } else {
            document.body.classList.add("dark");
            localStorage.setItem("themeSwitch", "dark");
        }
    }
}

export function scrollToTopButton(button) {
    button.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

    window.onscroll = () =>
        window.scrollY > 500
            ? (button.style.opacity = 1)
            : (button.style.opacity = 0);
}

export function initMenuDoubleClick() {
    document.querySelectorAll(".has-submenu").forEach((submenuButton) => {
        submenuButton.addEventListener("click", (e) => {
            if (!submenuButton.classList.contains("open")) {
                e.preventDefault();
                submenuButton.closest("li").classList.toggle("open");
                return false;
            }
        });
    });
}

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   Simple accordion pattern example
 */

("use strict");

class Accordion {
    constructor(domNode) {
        this.rootEl = domNode;
        this.buttonEl = this.rootEl.querySelector("button[aria-expanded]");

        const controlsId = this.buttonEl.getAttribute("aria-controls");
        this.contentEl = document.getElementById(controlsId);

        this.open = this.buttonEl.getAttribute("aria-expanded") === "true";

        this.buttonEl.addEventListener("click", this.onButtonClick.bind(this));
    }

    onButtonClick() {
        this.toggle(!this.open);
    }

    toggle(open) {
        if (open === this.open) {
            return;
        }

        this.open = open;

        this.buttonEl.setAttribute("aria-expanded", `${open}`);
        if (open) {
            this.contentEl.removeAttribute("hidden");
        } else {
            this.contentEl.setAttribute("hidden", "");
        }
    }

    open() {
        this.toggle(true);
    }

    close() {
        this.toggle(false);
    }
}

export function initAccordions(selector = ".accordion h3") {
    const accordions = document.querySelectorAll(selector);
    accordions.forEach((accordionEl) => {
        new Accordion(accordionEl);
    });
}

export function countDownClock(number = 100, format = "seconds") {
    const d = document;
    const daysElement = d.querySelector(".days");
    const hoursElement = d.querySelector(".hours");
    const minutesElement = d.querySelector(".minutes");
    const secondsElement = d.querySelector(".seconds");
    let countdown;
    convertFormat(format);

    function convertFormat(format) {
        switch (format) {
            case "seconds":
                return timer(number);
            case "minutes":
                return timer(number * 60);
            case "hours":
                return timer(number * 60 * 60);
            case "days":
                return timer(number * 60 * 60 * 24);
        }
    }

    function timer(seconds) {
        const now = Date.now();
        const then = now + seconds * 1000;

        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);

            if (secondsLeft <= 0) {
                clearInterval(countdown);
                return;
            }

            displayTimeLeft(secondsLeft);
        }, 1000);
    }

    function displayTimeLeft(seconds) {
        daysElement.textContent = Math.floor(seconds / 86400);
        hoursElement.textContent = Math.floor((seconds % 86400) / 3600);
        minutesElement.textContent = Math.floor(
            ((seconds % 86400) % 3600) / 60
        );
        secondsElement.textContent =
            seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
    }
}
export function initTocActiveOnScroll(tocSelector = '#toc-list a', activeClass = 'active-toc', offset = 100) {
    const tocLinks = document.querySelectorAll(tocSelector);
    const headingAnchors = Array.from(tocLinks).map(link => {
        const id = decodeURIComponent(link.getAttribute('href')).replace(/^#/, '');
        return document.getElementById(id);
    });

    function onScroll() {
        let activeIndex = -1;
        for (let i = 0; i < headingAnchors.length; i++) {
            const anchor = headingAnchors[i];
            if (anchor && anchor.getBoundingClientRect().top <= offset && i < headingAnchors.length-1) {
                activeIndex = i;
            }
        }
        tocLinks.forEach((link, i) => {
            if (i === activeIndex) {
                link.classList.add(activeClass);
            } else {
                link.classList.remove(activeClass);
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

export function initNavSectionFolding() {
    document.querySelectorAll('.nav-section-title').forEach(title => {
        title.addEventListener('click', (e) => {
            const button = title.querySelector('.nav-fold-button');
            const section = title.nextElementSibling;
            const isExpanded = !section.classList.contains('folded');
            
            // Toggle the folded state
            section.classList.toggle('folded');
            
            // Animate the arrow
            if (button) {
                button.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
                button.textContent = isExpanded ? '▶' : '▼';
            }
        });
    });

    // Initially expand active sections with animation
    const activeItems = document.querySelectorAll('.active');
    activeItems.forEach(activeItem => {
        let parent = activeItem.closest('.nav-section');
        while (parent) {
            const button = parent.previousElementSibling && parent.previousElementSibling.querySelector('.nav-fold-button');
            parent.classList.remove('folded');
            if (button) {
                button.textContent = '▼';
                button.style.transform = 'rotate(90deg)';
            }
            parent = parent.parentElement && parent.parentElement.closest('.nav-section');
        }
    });
}