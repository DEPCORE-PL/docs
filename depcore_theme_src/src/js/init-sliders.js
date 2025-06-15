import { tns } from "tiny-slider/src/tiny-slider";

export function initSliders() {
    const globals = {
        autoplay: true,
        nav: false,
        controls: true,
        controlsPosition: "bottom",
        animateDelay: 600,
        autoplayButtonOutput: false,
        gutter: 40,
        loop: true,
        items: 1,
        controlsText: [
            '<svg aria-hidden="true" focusable="false" class="small-icon"><use xlink:href="#arrow"></use></svg>',
            '<svg aria-hidden="true" focusable="false" class="small-icon"><use xlink:href="#arrow"></use></svg>',
        ],
    };

    const responsive = {
        responsive: {
            640: {
                items: 2,
            },
            900: {
                items: 3,
            },
        },
    };

    let home = document.querySelector(".slider");

    if (home) {
        tns({
            container: home,
            mode: "gallery",
            nav: false,
            autoplay: true,
            controls: false,
            animateDelay: 600,
            autoplayButtonOutput: false,
        });
    }
    let carousel = document.querySelectorAll(".carousel");

    carousel.forEach((c) => {
        tns({
            container: c,
            ...globals,
        });
    });

    let gallery = document.querySelector(".gallery-carousel");
    if (gallery) {
        tns({
            container: gallery,
            ...globals,
            ...responsive,
        });
    }

    let postGallery = document.querySelector(".post-carousel");
    if (postGallery) {
        tns({
            container: postGallery,
            ...globals,
            responsive: {
                740: {
                    items: 2,
                },
            },
        });
    }
}
