class Project {
    constructor(number, title, description, tags, image) {
        this.number = number;
        this.title = title;
        this.description = description;
        this.tags = tags;
        this.image = image;
    }

    createCard() {
        const card = document.createElement("article");
        card.className = "project-card";

        const tags = this.tags
            .map(tag => `<span>${tag}</span>`)
            .join("");

        card.innerHTML = `
            <img
                class="project-image"
                src="${this.image}"
                alt="${this.title} project screenshot"
                loading="lazy"
            >

            <div class="project-card-body">

                <div class="project-number">
                    ${this.number}
                </div>

                <h3>${this.title}</h3>

                <p>${this.description}</p>

                <div class="project-tags">
                    ${tags}
                </div>

            </div>
        `;

        return card;
    }
}

const projects = [

    new Project(
        "01",
        "Thrive — Weather Companion",

        "A weather and disaster-preparedness web project designed to help users monitor weather conditions, access advisories, and find emergency resources.",

        [
            "HTML",
            "CSS",
            "JavaScript",
            "Weather API",
            "Leaflet"
        ],

        "Thrive.jpg"
    ),

    new Project(
        "02",
        "Unwind",

        "A mobile application designed to help users destress and relax through a calm and user-friendly digital experience.",

        [
            "Mobile App",
            "UI Design",
            "Wellness"
        ],

        "meditate.jpg"
    ),

    new Project(
        "03",
        "Ponggal Restaurant Management System",

        "A restaurant management system project designed to organize restaurant operations and provide a more efficient digital workflow.",

        [
            "System Analysis",
            "UI Design",
            "Database",
            "Team Project"
        ],

        "ponggal.jpg"
    )

];

const projectsGrid = document.getElementById("projectsGrid");

projects.forEach(project => {
    projectsGrid.appendChild(project.createCard());
});


// ------------------------------
// Navigation
// ------------------------------

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const navMenu = document.getElementById("navMenu");
const menuToggle = document.getElementById("menuToggle");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
    });
});

// Highlight the navigation item based on the section currently visible.
const sectionObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove("active"));

                const activeLink = document.querySelector(
                    `.nav-link[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    },
    { threshold: 0.45 }
);

sections.forEach(section => sectionObserver.observe(section));


// ------------------------------
// Contact Form Validation
// ------------------------------

class ContactForm {
    constructor(form) {
        this.form = form;
        this.name = document.getElementById("name");
        this.email = document.getElementById("email");
        this.message = document.getElementById("message");
        this.status = document.getElementById("formStatus");

        this.form.addEventListener("submit", event => this.submit(event));
    }

    clearErrors() {
        document.querySelectorAll(".error").forEach(error => {
            error.textContent = "";
        });

        this.status.textContent = "";
    }

    validate() {
        this.clearErrors();

        let valid = true;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (this.name.value.trim().length < 2) {
            document.getElementById("nameError").textContent =
                "Please enter your name.";
            valid = false;
        }

        if (!emailPattern.test(this.email.value.trim())) {
            document.getElementById("emailError").textContent =
                "Please enter a valid email address.";
            valid = false;
        }

        if (this.message.value.trim().length < 10) {
            document.getElementById("messageError").textContent =
                "Message must be at least 10 characters.";
            valid = false;
        }

        return valid;
    }

    submit(event) {
        event.preventDefault();

        if (!this.validate()) {
            this.status.textContent = "Please correct the highlighted fields.";
            return;
        }

        this.status.textContent =
            "Message validated successfully! Thank you for reaching out.";

        this.form.reset();
    }
}

new ContactForm(document.getElementById("contactForm"));


// ------------------------------
// Small UI interactions
// ------------------------------

document.getElementById("year").textContent = new Date().getFullYear();

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
