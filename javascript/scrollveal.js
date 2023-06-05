const defaultProps = {
  easing: "cubic-bezier(0.5, 0, 0, 1)",
  distance: "30px",
  origin: "bottom",
  duration: 700,
  desktop: true,
  mobile: true,
  viewfactor:0.5
};

function updateProjectReveal() {
  /* Projects Section */
  ScrollReveal().clean(".project-wrapper__text");

  ScrollReveal().clean(".project-wrapper__image");

  ScrollReveal().clean(".project-wrapper__labels");
 
}

// Hero Section
ScrollReveal().reveal(".hero-title", {
  ...defaultProps,
  delay: 100,
  origin: window.innerWidth > 768 ? "left" : "bottom",
});
ScrollReveal().reveal(".name", {
  ...defaultProps,
  distance: "0px",
  delay: 500,
  scale: 0,
});
ScrollReveal().reveal(".hero-cta", {
  ...defaultProps,
  delay: 1200,
  origin: window.innerWidth > 768 ? "left" : "bottom",
});
ScrollReveal().reveal(".scroll-down-link", {
  ...defaultProps,
  delay: 2000,
  origin: "top",
});

/* About Section */
ScrollReveal().reveal(".section-title", {
  ...defaultProps,
  delay: 400,
  distance: "0px",
});
ScrollReveal().reveal(".about-wrapper__image", {
  ...defaultProps,
  delay: 600,
  scale: 0.5,
});

ScrollReveal().reveal(".about-wrapper__info", {
  ...defaultProps,
  delay: 700,
  distance: "100px",
  origin: window.innerWidth > 768 ? "left" : "top",
});

/* Projects Section */
ScrollReveal().reveal(".project-wrapper__filters-category", {
  ...defaultProps,
  delay: 300,
  origin: window.innerWidth > 768 ? "left" : "bottom",
});
ScrollReveal().reveal(".project-wrapper__text", {
  ...defaultProps,
  delay: 200,
  origin: window.innerWidth > 768 ? "left" : "bottom",
});

ScrollReveal().reveal(".project-wrapper__image", {
  ...defaultProps,
  delay: 400,
  scale: 0.9,
  origin: window.innerWidth > 768 ? "right" : "bottom",
});

ScrollReveal().reveal(".project-wrapper__labels", {
  ...defaultProps,
  delay: 500,
  scale: 0.9,
  origin: window.innerWidth > 768 ? "right" : "bottom",
});

/* Contact Section */
ScrollReveal().reveal(".contact-wrapper", {
  ...defaultProps,
  delay: 600,
});

