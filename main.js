/* =========================================================
   TRI EMANDANY PORTFOLIO
   GLOBAL JAVASCRIPT
   ========================================================= */


/* =========================================================
   DOM
   ========================================================= */

const body = document.body;

const header =
    document.querySelector(".site-header");

const menuToggle =
    document.querySelector(".menu-toggle");

const navigation =
    document.querySelector(".navigation");

const navDropdown =
    document.querySelector(".nav-dropdown");

const navDropdownButton =
    document.querySelector(".nav-dropdown-button");

const navDropdownMenu =
    document.querySelector(".nav-dropdown-menu");

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(
        ".navigation > a.nav-link"
    );

const videoCategories =
    document.querySelectorAll(
        ".video-category"
    );

const backToTop =
    document.getElementById("backToTop");


/* =========================================================
   DEVICE CHECK
   ========================================================= */

function isMobileNavigation() {
    return window.innerWidth <= 700;
}

function supportsHover() {
    return window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function openMobileMenu() {

    if (!navigation || !menuToggle) {
        return;
    }

    navigation.classList.add("open");

    menuToggle.classList.add("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    body.classList.add("menu-open");
}


function closeMobileMenu() {

    if (!navigation || !menuToggle) {
        return;
    }

    navigation.classList.remove("open");

    menuToggle.classList.remove("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    body.classList.remove("menu-open");
}


function toggleMobileMenu() {

    if (!navigation) {
        return;
    }

    const isOpen =
        navigation.classList.contains(
            "open"
        );

    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}


menuToggle?.addEventListener(
    "click",
    toggleMobileMenu
);


/* =========================================================
   PORTFOLIO DROPDOWN
   ========================================================= */

function openPortfolioDropdown() {

    if (
        !navDropdown ||
        !navDropdownButton
    ) {
        return;
    }

    navDropdown.classList.add("open");

    navDropdownButton.setAttribute(
        "aria-expanded",
        "true"
    );
}


function closePortfolioDropdown() {

    if (
        !navDropdown ||
        !navDropdownButton
    ) {
        return;
    }

    navDropdown.classList.remove("open");

    navDropdownButton.setAttribute(
        "aria-expanded",
        "false"
    );
}


function togglePortfolioDropdown(event) {

    if (!navDropdown) {
        return;
    }

    event?.preventDefault();

    event?.stopPropagation();

    const isOpen =
        navDropdown.classList.contains(
            "open"
        );

    if (isOpen) {

        closePortfolioDropdown();

    } else {

        openPortfolioDropdown();

    }
}


navDropdownButton?.addEventListener(
    "click",
    togglePortfolioDropdown
);


/* =========================================================
   DESKTOP HOVER
   ========================================================= */

if (navDropdown) {

    navDropdown.addEventListener(
        "mouseenter",
        () => {

            if (
                !isMobileNavigation() &&
                supportsHover()
            ) {

                openPortfolioDropdown();

            }

        }
    );


    navDropdown.addEventListener(
        "mouseleave",
        () => {

            if (
                !isMobileNavigation() &&
                supportsHover()
            ) {

                setTimeout(
                    () => {

                        if (
                            !navDropdown.matches(
                                ":hover"
                            )
                        ) {

                            closePortfolioDropdown();

                        }

                    },
                    150
                );

            }

        }
    );

}


/* =========================================================
   PORTFOLIO SUBMENU LINKS
   ========================================================= */

if (navDropdownMenu) {

    navDropdownMenu
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    /*
                     * Do NOT preventDefault.
                     * Browser must navigate normally.
                     */

                    event.stopPropagation();

                    closePortfolioDropdown();

                    closeMobileMenu();

                }
            );

        });

}


/* =========================================================
   ALL NAVIGATION LINKS
   ========================================================= */

navigation
    ?.querySelectorAll("a")
    .forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

                closePortfolioDropdown();

            }
        );

    });


/* =========================================================
   CLICK OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    (event) => {

        const target =
            event.target;


        /*
         * Close Portfolio dropdown
         * when clicking outside.
         */

        if (
            navDropdown &&
            !navDropdown.contains(target)
        ) {

            closePortfolioDropdown();

        }


        /*
         * Close mobile navigation
         * when clicking outside.
         */

        if (
            navigation &&
            menuToggle &&
            navigation.classList.contains(
                "open"
            ) &&
            !navigation.contains(target) &&
            !menuToggle.contains(target)
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   HEADER SCROLL
   ========================================================= */

function updateHeader() {

    if (!header) {
        return;
    }

    header.classList.toggle(
        "scrolled",
        window.scrollY > 20
    );

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function updateActiveNavigation() {

    if (
        !sections.length ||
        !navLinks.length
    ) {
        return;
    }

    let currentSection =
        sections[0]?.id ||
        "home";

    const scrollPosition =
        window.scrollY + 220;


    sections.forEach(
        (section) => {

            if (
                scrollPosition >=
                section.offsetTop
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    navLinks.forEach(
        (link) => {

            const href =
                link.getAttribute(
                    "href"
                );

            const targetId =
                href?.startsWith("#")
                    ? href.substring(1)
                    : "";

            link.classList.toggle(
                "active",
                targetId ===
                currentSection
            );

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link
                            .getAttribute(
                                "href"
                            )
                            ?.substring(1);

                    if (!targetId) {
                        return;
                    }

                    const target =
                        document.getElementById(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    closeMobileMenu();

                    closePortfolioDropdown();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


/* =========================================================
   VIDEO PROJECT ACCORDION
   ========================================================= */

function closeAllVideoCategories() {

    videoCategories.forEach(
        (category) => {

            /*
             * Work Project uses popup,
             * not accordion.
             */

            if (
                category.dataset.category ===
                "work"
            ) {
                return;
            }

            category.classList.remove(
                "open"
            );


            const heading =
                category.querySelector(
                    ".video-category-heading"
                );


            heading?.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );

}


function openVideoCategory(
    category
) {

    if (!category) {
        return;
    }


    /*
     * Work Project uses popup.
     */

    if (
        category.dataset.category ===
        "work"
    ) {
        return;
    }


    closeAllVideoCategories();


    category.classList.add(
        "open"
    );


    const heading =
        category.querySelector(
            ".video-category-heading"
        );


    heading?.setAttribute(
        "aria-expanded",
        "true"
    );

}


videoCategories.forEach(
    (category) => {

        /*
         * IMPORTANT:
         * Work Project is handled
         * by popup below.
         */

        if (
            category.dataset.category ===
            "work"
        ) {
            return;
        }


        const heading =
            category.querySelector(
                ".video-category-heading"
            );


        heading?.addEventListener(
            "click",
            () => {

                const wasOpen =
                    category.classList.contains(
                        "open"
                    );


                if (wasOpen) {

                    category.classList.remove(
                        "open"
                    );

                    heading.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                } else {

                    openVideoCategory(
                        category
                    );

                }

            }
        );

    }
);


/* =========================================================
   WORK PROJECT SOURCE POPUP
   ========================================================= */

const workProjectCategory =
    document.querySelector(
        ".work-project-category"
    );

const workProjectTrigger =
    document.querySelector(
        ".work-project-trigger"
    );

const workProjectModal =
    document.querySelector(
        ".work-project-modal"
    );

const workProjectModalBackdrop =
    document.querySelector(
        ".work-project-modal-backdrop"
    );

const workProjectModalClose =
    document.querySelector(
        ".work-project-modal-close"
    );

const workProjectOptions =
    document.querySelectorAll(
        ".work-project-option"
    );

const workSourceDropdowns =
    document.querySelectorAll(
        ".work-source-dropdown"
    );

const workSourceCloseButtons =
    document.querySelectorAll(
        "[data-close-work-source]"
    );


/* =========================================================
   CLOSE WORK SOURCE
   ========================================================= */

function closeAllWorkSources() {

    workSourceDropdowns.forEach(
        (panel) => {

            panel.hidden = true;

        }
    );

}


/* =========================================================
   OPEN WORK MODAL
   ========================================================= */

function openWorkProjectModal() {

    if (
        !workProjectModal ||
        !workProjectTrigger
    ) {
        return;
    }


    closeAllVideoCategories();

    closeAllWorkSources();


    workProjectModal.classList.add(
        "is-open"
    );


    workProjectModal.setAttribute(
        "aria-hidden",
        "false"
    );


    workProjectTrigger.setAttribute(
        "aria-expanded",
        "true"
    );


    body.classList.add(
        "work-modal-open"
    );

}


/* =========================================================
   CLOSE WORK MODAL
   ========================================================= */

function closeWorkProjectModal() {

    if (
        !workProjectModal ||
        !workProjectTrigger
    ) {
        return;
    }


    workProjectModal.classList.remove(
        "is-open"
    );


    workProjectModal.setAttribute(
        "aria-hidden",
        "true"
    );


    workProjectTrigger.setAttribute(
        "aria-expanded",
        "false"
    );


    body.classList.remove(
        "work-modal-open"
    );

}


/* =========================================================
   OPEN WORK SOURCE
   ========================================================= */

function openWorkSource(
    source
) {

    if (!source) {
        return;
    }


    closeAllVideoCategories();

    closeAllWorkSources();

    closeWorkProjectModal();


    const activePanel =
        document.querySelector(
            '[data-work-panel="' +
            source +
            '"]'
        );


    if (!activePanel) {
        return;
    }


    activePanel.hidden = false;


    /*
     * Re-process Instagram embeds
     * after panel becomes visible.
     */

    if (
        source === "kantah" &&
        window.instgrm &&
        window.instgrm.Embeds
    ) {

        window.instgrm.Embeds.process();

    }


    /*
     * Scroll to selected source.
     */

    setTimeout(
        () => {

            activePanel.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        100
    );

}


/* =========================================================
   WORK PROJECT TRIGGER
   ========================================================= */

workProjectTrigger?.addEventListener(
    "click",
    (event) => {

        event.preventDefault();

        event.stopPropagation();

        openWorkProjectModal();

    }
);


/* =========================================================
   WORK MODAL BACKDROP
   ========================================================= */

workProjectModalBackdrop?.addEventListener(
    "click",
    () => {

        closeWorkProjectModal();

    }
);


/* =========================================================
   WORK MODAL CLOSE
   ========================================================= */

workProjectModalClose?.addEventListener(
    "click",
    () => {

        closeWorkProjectModal();

    }
);


/* =========================================================
   WORK SOURCE OPTIONS
   ========================================================= */

workProjectOptions.forEach(
    (option) => {

        option.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();


                const source =
                    option.dataset.workSource;


                openWorkSource(
                    source
                );

            }
        );

    }
);


/* =========================================================
   WORK SOURCE CLOSE
   ========================================================= */

workSourceCloseButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                closeAllWorkSources();

                if (
                    workProjectCategory
                ) {

                    workProjectCategory.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }
);


/* =========================================================
   HORIZONTAL VIDEO CAROUSEL
   ========================================================= */

function initializeVideoCarousels() {

    const carousels =
        document.querySelectorAll(
            ".video-carousel"
        );


    carousels.forEach(
        (carousel) => {

            const track =
                carousel.querySelector(
                    ".video-track"
                );


            const previousButton =
                carousel.querySelector(
                    ".carousel-prev"
                );


            const nextButton =
                carousel.querySelector(
                    ".carousel-next"
                );


            if (!track) {
                return;
            }


            function getScrollAmount() {

                const card =
                    track.querySelector(
                        ".showcase-video"
                    );


                if (!card) {
                    return 400;
                }


                const cardWidth =
                    card.getBoundingClientRect()
                        .width;


                const styles =
                    window.getComputedStyle(
                        track
                    );


                const gap =
                    parseFloat(
                        styles.gap
                    ) || 20;


                return (
                    cardWidth +
                    gap
                );

            }


            previousButton?.addEventListener(
                "click",
                () => {

                    track.scrollBy({
                        left:
                            -getScrollAmount(),
                        behavior:
                            "smooth"
                    });

                }
            );


            nextButton?.addEventListener(
                "click",
                () => {

                    track.scrollBy({
                        left:
                            getScrollAmount(),
                        behavior:
                            "smooth"
                    });

                }
            );


            /*
             * Desktop mouse wheel
             */

            track.addEventListener(
                "wheel",
                (event) => {

                    if (
                        track.scrollWidth <=
                        track.clientWidth
                    ) {
                        return;
                    }


                    if (
                        Math.abs(
                            event.deltaY
                        ) <=
                        Math.abs(
                            event.deltaX
                        )
                    ) {
                        return;
                    }


                    event.preventDefault();


                    track.scrollLeft +=
                        event.deltaY;

                },
                {
                    passive: false
                }
            );

        }
    );

}


/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

document
    .querySelectorAll(
        ".experience-logo img"
    )
    .forEach(
        (image) => {

            image.addEventListener(
                "error",
                () => {

                    image.style.display =
                        "none";


                    image.parentElement
                        ?.classList.add(
                            "image-error"
                        );

                }
            );

        }
    );


document
    .querySelectorAll(
        ".gallery-image img"
    )
    .forEach(
        (image) => {

            image.addEventListener(
                "error",
                () => {

                    image.style.display =
                        "none";


                    image.parentElement
                        ?.classList.add(
                            "image-error"
                        );

                }
            );

        }
    );


/* =========================================================
   BACK TO TOP
   ========================================================= */

function updateBackToTop() {

    if (!backToTop) {
        return;
    }


    backToTop.classList.toggle(
        "show",
        window.scrollY > 500
    );

}


backToTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


window.addEventListener(
    "scroll",
    updateBackToTop,
    {
        passive: true
    }
);


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        closeMobileMenu();

        closePortfolioDropdown();

        closeAllVideoCategories();

        closeWorkProjectModal();

        closeAllWorkSources();

    }
);


/* =========================================================
   RESPONSIVE RESET
   ========================================================= */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                () => {

                    if (
                        window.innerWidth >
                        700
                    ) {

                        closeMobileMenu();

                    }

                },
                150
            );

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

updateHeader();

updateActiveNavigation();

updateBackToTop();

initializeVideoCarousels();