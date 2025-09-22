/*===============MENU=============*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));
/*===============SKILLS ACCORDION=============*/
const skillsContent = document.getElementsByClassName("skills__content");
const skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  const itemClass = this.parentNode.className;

  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});
/*===============QUALIFICATION=============*/
const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});
/*===============PORTFOLIO FILTER=============*/
const portfolioFilters = document.querySelectorAll(".portfolio__filter");
const portfolioItems = document.querySelectorAll(".portfolio__item");

portfolioItems.forEach((item) => item.classList.add("portfolio__item--show"));

portfolioFilters.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.filter;

    portfolioFilters.forEach((btn) => btn.classList.remove("active-filter"));
    button.classList.add("active-filter");

    portfolioItems.forEach((item) => {
      const rawCategory = item.dataset.category || "";
      const categories = rawCategory.split(",").map((cat) => cat.trim());
      if (target === "all" || categories.includes(target)) {
        item.classList.remove("portfolio__item--hide");
        item.classList.add("portfolio__item--show");
      } else {
        item.classList.add("portfolio__item--hide");
        item.classList.remove("portfolio__item--show");
      }
    });
  });
});

/*===============TESTIMONIALS SLIDER=============*/
const testimonialContainer = document.querySelector(".testimonial__container");
if (testimonialContainer) {
  new Swiper(testimonialContainer, {
    loop: true,
    grabCursor: true,
    spaceBetween: 24,
    pagination: {
      el: ".testimonial__container .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      568: {
        slidesPerView: 1.1,
      },
      768: {
        slidesPerView: 1.2,
      },
      1024: {
        slidesPerView: 1.4,
      },
    },
  });
}
/*===============SCROLL=============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");
    const navElement = document.querySelector(
      ".nav__menu a[href*=" + sectionId + "]"
    );

    if (!navElement) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navElement.classList.add("active__link");
    } else {
      navElement.classList.remove("active__link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*===============CHANGE BACKGROUND HEADER=============*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== SCROLL PROGRESS ====================*/
const scrollProgress = document.getElementById("scroll-progress");

const updateScrollProgress = () => {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
};

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== EMAIL ====================*/
const contactForm = document.getElementById("contact-form");
const contactUser = document.getElementById("contact-user");
const contactName = document.getElementById("contact-name");
const contactText = document.getElementById("contact-text");
const contactMessage = document.getElementById("contact-message");
const copyEmailButton = document.getElementById("copy-email");
const copyMessage = document.getElementById("copy-message");

const copyTextToClipboard = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-99999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  return new Promise((resolve, reject) => {
    if (document.execCommand("copy")) {
      resolve();
    } else {
      reject(new Error("Copy command failed"));
    }
    document.body.removeChild(textArea);
  });
};

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email || "";
    if (!email) return;

    try {
      await copyTextToClipboard(email);
      if (copyMessage) {
        copyMessage.textContent = "Email copied to clipboard ✔️";
        setTimeout(() => {
          copyMessage.textContent = "";
        }, 2500);
      }
    } catch (error) {
      if (copyMessage) {
        copyMessage.textContent = "Couldn't copy automatically. Please copy it manually.";
        setTimeout(() => {
          copyMessage.textContent = "";
        }, 3000);
      }
    }
  });
}

const sendEmail = (e) => {
  e.preventDefault();

  if (contactUser.value === "") {
    contactMessage.classList.add("color");
    contactMessage.textContent = "Please add your email so I can respond.";

    setTimeout(() => {
      contactMessage.textContent = "";
      contactMessage.classList.remove("color");
    }, 3000);
  } else {
    emailjs
      .sendForm(
        "service_pbvz1yv",
        "template_wdm4pvd",
        "#contact-form",
        "Wugs0cNQVpPUfkjVr"
      )
      .then(
        () => {
          contactMessage.classList.remove("color");
          contactMessage.textContent =
            "Thanks for reaching out! I'll respond within one business day.";

          setTimeout(() => {
            contactMessage.textContent = "";
          }, 3000);
        },
        (error) => {
          alert("OOPS! Something has failed...", error);
        }
      );
    contactUser.value = "";
    contactName.value = "";
    contactText.value = "";
  }
};

if (contactForm) {
  contactForm.addEventListener("submit", sendEmail);
}
