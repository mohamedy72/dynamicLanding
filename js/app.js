/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
// UI elements
const sections = Array.from(document.querySelectorAll("section"));
const navbarList = document.querySelector("#navbar__list");
const navMenu = document.querySelector(".navbar__menu");
const navHamburger = document.querySelector(".navbar__hamburger");
const scrollToTopBtn = document.querySelector("#scroll__top");

// Helper variables
let sectionDataAttr = sections.map((section) => section.dataset.nav);
let sectionIDs = sections.map((section) => section.id);
let navLinks = [];
let isScrolling = false;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

/**
 * @description A function that iterates over an array of data attributes then populate the navigation menu
 *
 */

function populateTheNavigation() {
  sectionDataAttr.forEach((item, ind) => {
    // Create required elements
    const listItem = document.createElement("li");
    const anchorTag = document.createElement("a");

    // Add required attributes & content
    anchorTag.classList.add("menu__link");
    anchorTag.setAttribute("href", `#${sectionIDs[ind]}`);
    anchorTag.setAttribute("id", sectionIDs[ind]);
    anchorTag.innerHTML = item;

    // Push each created link into navLinks array
    navLinks.push(anchorTag);

    // Append elements to each other
    listItem.append(anchorTag);
    navbarList.appendChild(listItem);
  });
}

/**
 * @description A function that only works on small screen to toggle the hamburger menu
 */

function toggleNavigationOnMobile() {
  if (navMenu.classList.contains("close")) {
    navMenu.classList.remove("close");
    navMenu.classList.add("open");
  } else if (navMenu.classList.contains("open")) {
    navMenu.classList.remove("open");
    navMenu.classList.add("close");
  }
}

// Add class 'active' to section when near top of viewport
function addActiveClassToSection(section) {
  sections.forEach((section) => {
    const sectionTopValue = section.getBoundingClientRect().top;
    if (sectionTopValue < window.innerHeight - sectionTopValue + 150) {
      sections.forEach((section) => {
        section.classList.remove("active_section");
      });
      section.classList.add("active_section");
    }
  });
}

//  Scroll to anchor ID using scrollTo event
function scrollToSection() {
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      sections.forEach((section) => {
        if (section.id === link.id) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          navLinks.forEach((link) => {
            link.classList.remove("active_link");
          });
          link.classList.add("active_link");
        }
      });
    });
  });
}

/**
 * @description A function that checks wether the user is scrolling or not then hide the nav bar
 */
function hideNavigationBar() {
  setTimeout(() => {
    isScrolling = false;
    if (!isScrolling) {
      navMenu.style.display = "none";
    }
  }, 5000);
}

/**
 * End Main Functions
 * Begin Events
 *
 */

document.addEventListener("DOMContentLoaded", () => {
  populateTheNavigation();
  navbarList.addEventListener("click", (e) => {
    if (e.target.nodeName === "A") {
      e.preventDefault();
      scrollToSection();
    }
  });
  navHamburger.addEventListener("click", toggleNavigationOnMobile);
});

// Set sections as active
document.addEventListener("scroll", addActiveClassToSection);

window.addEventListener("scroll", () => {
  isScrolling = true;
  navMenu.style.display = "block";
  hideNavigationBar();
});

scrollToTopBtn.addEventListener("click", (event) => {
  document.body.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});
