document.querySelectorAll("[data-menu]").forEach((button) => {
  const panel = document.querySelector("[data-mobile]");
  const close = () => {
    button.setAttribute("aria-expanded", "false");
    if (panel) panel.hidden = true;
  };
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", open ? "false" : "true");
    if (panel) panel.hidden = open;
  });
  panel?.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
});
