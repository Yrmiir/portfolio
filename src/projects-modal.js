const projectScreens = {
    "matcha-landing": [
        "assets/projects/matcha-landing/matcha1.png",
        "assets/projects/matcha-landing/matcha2.png",
        "assets/projects/matcha-landing/matcha3.png",
        "assets/projects/matcha-landing/mactha4.png",
        "assets/projects/matcha-landing/matcha5.png",
        "assets/projects/matcha-landing/matcha6.png",
        "assets/projects/matcha-landing/matcha7.png",
        "assets/projects/matcha-landing/matcha8.png",
        "assets/projects/matcha-landing/matcha9.png",
    ],
    "cozy-winter": [
        "assets/projects/cozy-winter/slide1.png",
        "assets/projects/cozy-winter/slide2.png",
        "assets/projects/cozy-winter/slide3.png",
        "assets/projects/cozy-winter/slide4.png",
        "assets/projects/cozy-winter/slide5.png",
        "assets/projects/cozy-winter/slide6.png",
        "assets/projects/cozy-winter/slide7.png",
        "assets/projects/cozy-winter/slide8.png",
        "assets/projects/cozy-winter/slide9.png",
    ],
    cuture: [
        "assets/projects/cuture/screen1.png",
        "assets/projects/cuture/screen2.png",
        "assets/projects/cuture/screen3.png",
        "assets/projects/cuture/screen4.png",
        "assets/projects/cuture/screen5.png",
        "assets/projects/cuture/screen6.png",
        "assets/projects/cuture/screen7.png",
        "assets/projects/cuture/screen8.png",
        "assets/projects/cuture/screen9.png",
    ],
    massachusetts: [
        "assets/projects/massachusetts/Slide1.png",
        "assets/projects/massachusetts/Slide2.png",
        "assets/projects/massachusetts/Slide3.png",
        "assets/projects/massachusetts/Slide4.png",
        "assets/projects/massachusetts/Slide5.png",
        "assets/projects/massachusetts/Slide6.png",
        "assets/projects/massachusetts/Slide7.png",
        "assets/projects/massachusetts/Slide8.png",
        "assets/projects/massachusetts/Slide9.png",
        "assets/projects/massachusetts/Slide10.png",
        "assets/projects/massachusetts/Slide11.png",
        "assets/projects/massachusetts/Slide12.png",
    ],
    "memorial-and-patriots": [
        "assets/projects/memorial-and-patriots/Slide1.png",
        "assets/projects/memorial-and-patriots/Slide2.png",
        "assets/projects/memorial-and-patriots/Slide3.png",
        "assets/projects/memorial-and-patriots/Slide4.png",
        "assets/projects/memorial-and-patriots/Slide5.png",
        "assets/projects/memorial-and-patriots/Slide6.png",
    ],
    posters: [
        "assets/projects/posters/shapes.png",
        "assets/projects/posters/type.png",
        "assets/projects/posters/colors.png",
    ],
};

const projectCards = document.querySelectorAll(".project-card[data-project-id]");
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("project-modal-title");
const modalGallery = document.getElementById("project-modal-gallery");
const closeButton = modal ? modal.querySelector(".project-modal__close") : null;
const screenViewer = document.getElementById("screen-viewer");
const screenViewerImage = document.getElementById("screen-viewer-image");

let previousFocusedElement = null;

const isReady = modal && modalTitle && modalGallery && closeButton;
const isViewerReady = screenViewer && screenViewerImage;

function openModal(card) {
    if (!isReady) {
        return;
    }

    const projectId = card.dataset.projectId;
    const screenshots = projectScreens[projectId] || [];
    const titleEl = card.querySelector(".project-card__title");
    const projectTitle = titleEl ? titleEl.textContent.trim() : "Проект";

    modalTitle.textContent = projectTitle;
    modalGallery.innerHTML = "";

    screenshots.forEach((src, index) => {
        const item = document.createElement("li");
        item.className = "project-modal__item";

        const image = document.createElement("img");
        image.className = "project-modal__image";
        image.src = src;
        image.alt = `${projectTitle}: скриншот ${index + 1}`;
        image.loading = "lazy";

        item.appendChild(image);
        modalGallery.appendChild(item);
    });

    if (!screenshots.length) {
        const empty = document.createElement("li");
        empty.className = "project-modal__empty";
        empty.textContent = "Скриншоты для этого проекта пока не добавлены.";
        modalGallery.appendChild(empty);
    }

    previousFocusedElement = document.activeElement;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeButton.focus();
}

function closeModal() {
    if (!isReady || !modal.classList.contains("is-open")) {
        return;
    }

    closeViewer();
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (previousFocusedElement instanceof HTMLElement) {
        previousFocusedElement.focus();
    }
}

function openViewer(image) {
    if (!isViewerReady) {
        return;
    }

    screenViewerImage.src = image.src;
    screenViewerImage.alt = image.alt || "Скриншот проекта";
    screenViewer.classList.add("is-open");
    screenViewer.setAttribute("aria-hidden", "false");
}

function closeViewer() {
    if (!isViewerReady || !screenViewer.classList.contains("is-open")) {
        return;
    }

    screenViewer.classList.remove("is-open");
    screenViewer.setAttribute("aria-hidden", "true");
    screenViewerImage.src = "";
}

projectCards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));

    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openModal(card);
        }
    });
});

if (isReady) {
    modal.addEventListener("click", (event) => {
        if (event.target instanceof HTMLImageElement && event.target.classList.contains("project-modal__image")) {
            openViewer(event.target);
            return;
        }

        if (event.target instanceof HTMLElement && event.target.closest("[data-modal-close]")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isViewerReady && screenViewer.classList.contains("is-open")) {
            closeViewer();
            return;
        }

        if (event.key === "Escape") {
            closeModal();
        }
    });
}

if (isViewerReady) {
    screenViewer.addEventListener("click", (event) => {
        if (event.target instanceof HTMLElement && event.target.closest("[data-viewer-close]")) {
            closeViewer();
        }
    });
}
