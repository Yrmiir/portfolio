const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    const emailInput = contactForm.querySelector('input[name="email"]');
    const emailError = document.getElementById("email-error");
    const formStatus = document.getElementById("contact-form-status");
    let statusTimeoutId = null;

    const allowedLocalPartPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/;

    function getEmailError(value) {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
            return "Введите email";
        }

        if (trimmedValue !== value) {
            return "Уберите пробелы в начале или в конце email";
        }

        if (/\s/.test(value)) {
            return "Email не должен содержать пробелы";
        }

        if (value.length < 6) {
            return "Email слишком короткий";
        }

        if (value.length > 254) {
            return "Email слишком длинный";
        }

        const atParts = value.split("@");

        if (atParts.length !== 2) {
            return "Email должен содержать один символ @";
        }

        const [localPart, domainPart] = atParts;

        if (!localPart || !domainPart) {
            return "Укажите имя ящика и домен";
        }

        if (localPart.length > 64) {
            return "Часть email до @ не должна быть длиннее 64 символов";
        }

        if (
            localPart.startsWith(".") ||
            localPart.endsWith(".") ||
            localPart.includes("..")
        ) {
            return "В части до @ нельзя ставить точку в начале, в конце или подряд";
        }

        if (!allowedLocalPartPattern.test(localPart)) {
            return "В части до @ есть недопустимые символы";
        }

        if (!domainPart.includes(".")) {
            return "После @ должен быть домен с точкой";
        }

        const domainLabels = domainPart.split(".");

        if (domainLabels.some((label) => !label)) {
            return "В домене не должно быть пустых частей";
        }

        const hasInvalidDomainLabel = domainLabels.some((label) => {
            return (
                label.startsWith("-") ||
                label.endsWith("-") ||
                !/^[A-Za-z0-9-]+$/.test(label)
            );
        });

        if (hasInvalidDomainLabel) {
            return "Домен может содержать только буквы, цифры и дефис";
        }

        const topLevelDomain = domainLabels[domainLabels.length - 1];

        if (!/^[A-Za-z]{2,24}$/.test(topLevelDomain)) {
            return "Доменная зона должна состоять из 2-24 латинских букв";
        }

        return "";
    }

    function renderEmailState() {
        const errorMessage = getEmailError(emailInput.value);

        emailInput.classList.toggle("is-invalid", Boolean(errorMessage));
        emailInput.setAttribute("aria-invalid", String(Boolean(errorMessage)));
        emailError.textContent = errorMessage;

        return !errorMessage;
    }

    function clearEmailState() {
        emailInput.classList.remove("is-invalid");
        emailInput.setAttribute("aria-invalid", "false");
        emailError.textContent = "";
    }

    function clearFormStatus() {
        if (statusTimeoutId) {
            clearTimeout(statusTimeoutId);
            statusTimeoutId = null;
        }

        if (formStatus) {
            formStatus.textContent = "";
        }
    }

    function showFormStatus(message) {
        if (!formStatus) {
            return;
        }

        clearFormStatus();
        formStatus.textContent = message;
        statusTimeoutId = window.setTimeout(() => {
            formStatus.textContent = "";
            statusTimeoutId = null;
        }, 3000);
    }

    emailInput.addEventListener("input", () => {
        clearFormStatus();
        renderEmailState();
    });

    emailInput.addEventListener("blur", () => {
        renderEmailState();
    });

    contactForm.addEventListener("input", (event) => {
        if (event.target !== emailInput) {
            clearFormStatus();
        }
    });

    contactForm.addEventListener("submit", (event) => {
        if (renderEmailState()) {
            event.preventDefault();
            contactForm.reset();
            clearEmailState();
            showFormStatus("Форма отправлена");
            return;
        }

        event.preventDefault();
        clearFormStatus();
        emailInput.focus();
    });
}
