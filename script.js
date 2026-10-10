// JavaScriptが読み込まれたことをCSSへ伝えます。
document.documentElement.classList.add("js");

// スマートフォン用のメニューを開閉します。
const menuButton = document.querySelector(".menu-toggle");
const globalNav = document.querySelector("#global-nav");

if (menuButton && globalNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "メニューを開く" : "メニューを閉じる");
    globalNav.classList.toggle("is-open", !isOpen);
  });

  // メニューのリンクを押したら、ページ内を移動してメニューを閉じます。
  globalNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "メニューを開く");
      globalNav.classList.remove("is-open");
    });
  });
}

// フッターの年号を、閲覧した年に合わせて表示します。
const yearLabel = document.querySelector("#current-year");
if (yearLabel) {
  yearLabel.textContent = new Date().getFullYear();
}

// セクションが画面に入ったとき、ふわりと表示します。
const revealItems = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  // 古いブラウザーや「視差効果を減らす」設定では、常に表示しておきます。
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
