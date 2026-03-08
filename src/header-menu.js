const header = document.querySelector(".header");
const menuButton = document.querySelector(".header__menu-btn");
const nav = document.getElementById("header-nav");

if (header && menuButton && nav) {
    const mobileMediaQuery = window.matchMedia("(max-width: 576px)");
    const navLinks = nav.querySelectorAll(".header__link");

    function setMenuState(isOpen) {
        header.classList.toggle("is-menu-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
    }

    function closeMenu() {
        setMenuState(false);
    }

    menuButton.addEventListener("click", () => {
        if (!mobileMediaQuery.matches) {
            return;
        }

        setMenuState(!header.classList.contains("is-menu-open"));
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (mobileMediaQuery.matches) {
                closeMenu();
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    document.addEventListener("click", (event) => {
        if (!mobileMediaQuery.matches || !header.classList.contains("is-menu-open")) {
            return;
        }

        if (event.target instanceof Node && !header.contains(event.target)) {
            closeMenu();
        }
    });

    const handleViewportChange = () => {
        if (!mobileMediaQuery.matches) {
            closeMenu();
        }
    };

    if (typeof mobileMediaQuery.addEventListener === "function") {
        mobileMediaQuery.addEventListener("change", handleViewportChange);
    } else if (typeof mobileMediaQuery.addListener === "function") {
        mobileMediaQuery.addListener(handleViewportChange);
    }
}
