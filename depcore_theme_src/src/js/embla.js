export const addDotBtnsAndClickHandlers = (emblaApi, dotsNode) => {
    let dotNodes = [];

    const addDotBtnsWithClickHandlers = () => {
        dotsNode.innerHTML = emblaApi
            .scrollSnapList()
            .map(() => '<button class="embla__dot" type="button"></button>')
            .join("");

        const scrollTo = (index) => {
            emblaApi.scrollTo(index);
        };

        dotNodes = Array.from(dotsNode.querySelectorAll(".embla__dot"));
        dotNodes.forEach((dotNode, index) => {
            dotNode.addEventListener("click", () => scrollTo(index), false);
        });
    };

    const toggleDotBtnsActive = () => {
        const previous = emblaApi.previousScrollSnap();
        const selected = emblaApi.selectedScrollSnap();
        dotNodes[previous].classList.remove("embla__dot--selected");
        dotNodes[selected].classList.add("embla__dot--selected");
    };

    emblaApi
        .on("init", addDotBtnsWithClickHandlers)
        .on("reInit", addDotBtnsWithClickHandlers)
        .on("init", toggleDotBtnsActive)
        .on("reInit", toggleDotBtnsActive)
        .on("select", toggleDotBtnsActive);

    return () => {
        dotsNode.innerHTML = "";
    };
};

const addTogglePrevNextBtnsActive = (emblaApi, prevBtn, nextBtn) => {
    const togglePrevNextBtnsState = () => {
        if (emblaApi.canScrollPrev()) prevBtn.removeAttribute("disabled");
        else prevBtn.setAttribute("disabled", "disabled");

        if (emblaApi.canScrollNext()) nextBtn.removeAttribute("disabled");
        else nextBtn.setAttribute("disabled", "disabled");
    };

    emblaApi
        .on("select", togglePrevNextBtnsState)
        .on("init", togglePrevNextBtnsState)
        .on("reInit", togglePrevNextBtnsState);

    return () => {
        prevBtn.removeAttribute("disabled");
        nextBtn.removeAttribute("disabled");
    };
};

export const addPrevNextBtnsClickHandlers = (emblaApi, prevBtn, nextBtn) => {
    const scrollPrev = () => {
        emblaApi.scrollPrev();
    };
    const scrollNext = () => {
        emblaApi.scrollNext();
    };
    prevBtn.addEventListener("click", scrollPrev, false);
    nextBtn.addEventListener("click", scrollNext, false);

    const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(
        emblaApi,
        prevBtn,
        nextBtn
    );

    return () => {
        removeTogglePrevNextBtnsActive();
        prevBtn.removeEventListener("click", scrollPrev, false);
        nextBtn.removeEventListener("click", scrollNext, false);
    };
};

export const addThumbBtnsClickHandlers = (emblaApiMain, emblaApiThumb) => {
    const slidesThumbs = emblaApiThumb.slideNodes();

    const scrollToIndex = slidesThumbs.map(
        (_, index) => () => emblaApiMain.scrollTo(index)
    );

    slidesThumbs.forEach((slideNode, index) => {
        slideNode.addEventListener("click", scrollToIndex[index], false);
    });

    return () => {
        slidesThumbs.forEach((slideNode, index) => {
            slideNode.removeEventListener("click", scrollToIndex[index], false);
        });
    };
};

export const addToggleThumbBtnsActive = (emblaApiMain, emblaApiThumb) => {
    const slidesThumbs = emblaApiThumb.slideNodes();

    const toggleThumbBtnsState = () => {
        emblaApiThumb.scrollTo(emblaApiMain.selectedScrollSnap());
        const previous = emblaApiMain.previousScrollSnap();
        const selected = emblaApiMain.selectedScrollSnap();
        slidesThumbs[previous].classList.remove(
            "embla-thumbs__slide--selected"
        );
        slidesThumbs[selected].classList.add("embla-thumbs__slide--selected");
    };

    emblaApiMain.on("select", toggleThumbBtnsState);
    emblaApiThumb.on("init", toggleThumbBtnsState);

    return () => {
        const selected = emblaApiMain.selectedScrollSnap();
        slidesThumbs[selected].classList.remove(
            "embla-thumbs__slide--selected"
        );
    };
};
