const menuTrigger = document.querySelector<HTMLButtonElement>(".menu-trigger");
const menu = document.querySelector<HTMLDivElement>(".menu");
const mobileQuery = getComputedStyle(document.body).getPropertyValue("--phoneWidth");
const isMobile = (): boolean => window.matchMedia(mobileQuery).matches;
const isMobileMenu = (): void => {
  if (menuTrigger) {
    menuTrigger.classList.toggle("hidden", !isMobile());
  }
  if (menu) {
    menu.classList.toggle("hidden", isMobile());
  }
};

isMobileMenu();

if (menuTrigger) {
  menuTrigger.addEventListener("click", () => {
    if (menu) {
      menu.classList.toggle("hidden");
    }
  });
}

window.addEventListener("resize", isMobileMenu);
