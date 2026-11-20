const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  toggle.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    toggle.textContent = "☰";
  }),
);
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 },
);
document
  .querySelectorAll(
    ".intro,.trip-card,.quote-content,.about-image,.about-copy,.steps article,.contact-copy,.contact-form",
  )
  .forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Travel enquiry from ${data.get("name")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
  );
  document.querySelector("#formNote").textContent = "Opening your email app…";
  document.querySelector("#formNote").classList.add("success");
  window.location.href = `mailto:abdulmueid051@gmail.com?subject=${subject}&body=${body}`;
});
