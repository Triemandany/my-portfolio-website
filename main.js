/* =========================================================
   TRI EMANDANY PORTFOLIO
   FINAL GLOBAL JAVASCRIPT
   ========================================================= */


/* =========================================================
   DOM
   ========================================================= */

const body =
    document.body;

const header =
    document.querySelector(
        ".site-header"
    );

const menuToggle =
    document.querySelector(
        ".menu-toggle"
    );

const navigation =
    document.querySelector(
        ".navigation"
    );

const navDropdown =
    document.querySelector(
        ".nav-dropdown"
    );

const navDropdownButton =
    document.querySelector(
        ".nav-dropdown-button"
    );

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".navigation > a.nav-link"
    );

const videoCategories =
    document.querySelectorAll(
        ".video-category"
    );

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


/* =========================================================
   MOBILE MENU
   ========================================================= */

function openMobileMenu() {

    if (
        !navigation ||
        !menuToggle
    ) {
        return;
    }


    navigation.classList.add(
        "open"
    );


    menuToggle.classList.add(
        "open"
    );


    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );


    menuToggle.setAttribute(
        "aria-label",
        "Close navigation"
    );


    body.classList.add(
        "menu-open"
    );

}


function closeMobileMenu() {

    if (
        !navigation ||
        !menuToggle
    ) {
        return;
    }


    navigation.classList.remove(
        "open"
    );


    menuToggle.classList.remove(
        "open"
    );


    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
    );


    body.classList.remove(
        "menu-open"
    );

}


menuToggle?.addEventListener(
    "click",
    () => {

        const isOpen =
            navigation?.classList.contains(
                "open"
            );


        if (isOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    }
);


/* =========================================================
   NAVIGATION LINKS
   ========================================================= */

navigation?.querySelectorAll(
    "a"
).forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

                closePortfolioDropdown();

            }
        );

    }
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


    navDropdown.classList.add(
        "open"
    );


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


    navDropdown.classList.remove(
        "open"
    );


    navDropdownButton.setAttribute(
        "aria-expanded",
        "false"
    );

}


navDropdownButton?.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();


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
);


/* =========================================================
   DESKTOP PORTFOLIO HOVER
   ========================================================= */

if (
    navDropdown &&
    window.matchMedia(
        "(hover:hover) and (pointer:fine)"
    ).matches
) {

    navDropdown.addEventListener(
        "mouseenter",
        openPortfolioDropdown
    );


    navDropdown.addEventListener(
        "mouseleave",
        closePortfolioDropdown
    );

}


/* =========================================================
   CLICK OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    (event) => {

        if (
            navDropdown &&
            !navDropdown.contains(
                event.target
            )
        ) {

            closePortfolioDropdown();

        }


        if (
            navigation &&
            menuToggle &&
            navigation.classList.contains(
                "open"
            ) &&
            !navigation.contains(
                event.target
            ) &&
            !menuToggle.contains(
                event.target
            )
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


    const position =
        window.scrollY + 220;


    sections.forEach(
        (section) => {

            if (
                position >=
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


            if (
                !href ||
                !href.startsWith("#")
            ) {
                return;
            }


            link.classList.toggle(
                "active",
                href ===
                `#${currentSection}`
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

                    const targetID =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const headerHeight =
                        header?.offsetHeight ||
                        0;


                    const targetPosition =
                        target
                            .getBoundingClientRect()
                            .top
                        +
                        window.scrollY
                        -
                        headerHeight
                        -
                        12;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initializeReveal() {

    if (
        !revealElements.length
    ) {
        return;
    }


    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            (
                entries,
                currentObserver
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            currentObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold:
                    .12,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   VIDEO CATEGORY ACCORDION
   ========================================================= */

function closeAllVideoCategories() {

    videoCategories.forEach(
        (category) => {

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


                closeAllVideoCategories();


                if (!wasOpen) {

                    openVideoCategory(
                        category
                    );

                }

            }
        );

    }
);


/* =========================================================
   VIDEO CAROUSEL
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


            const previous =
                carousel.querySelector(
                    ".carousel-prev"
                );


            const next =
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


            previous?.addEventListener(
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


            next?.addEventListener(
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
             * Desktop mouse-wheel
             * horizontal scrolling.
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
                    passive:
                        false
                }
            );

        }
    );

}


/* =========================================================
   IMAGE FALLBACK
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


                    image.parentElement?.classList.add(
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


                    image.parentElement?.classList.add(
                        "image-error"
                    );

                }
            );

        }
    );


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key !==
            "Escape"
        ) {
            return;
        }


        closeMobileMenu();

        closePortfolioDropdown();

        closeAllVideoCategories();

    }
);


/* =========================================================
   RESIZE
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

initializeReveal();

initializeVideoCarousels();

updateHeader();

updateActiveNavigation();