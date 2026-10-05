// ===== スマートフォンのメニュー開閉 =====
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#nav");

function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.querySelector(".visually-hidden").textContent = open ? "メニューを閉じる" : "メニューを開く";
  nav.classList.toggle("is-open", open);
  document.body.style.overflow = open ? "hidden" : "";
}

toggle.addEventListener("click", () => {
  setMenu(toggle.getAttribute("aria-expanded") !== "true");
});

// メニュー内のリンクを押したら閉じる
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

// ===== スクロールしたらヘッダーに下線を出す =====
const header = document.querySelector(".header");
window.addEventListener(
  "scroll",
  () => header.classList.toggle("is-scrolled", window.scrollY > 8),
  { passive: true }
);

// ===== フォームの入力チェック（見本のため送信はしない） =====
const form = document.querySelector("#contact-form");
const done = document.querySelector("#form-done");

function validateField(field) {
  const row = field.closest(".form__row");
  const valid = field.checkValidity();
  row.classList.toggle("is-invalid", !valid);
  field.setAttribute("aria-invalid", String(!valid));
  return valid;
}

form.querySelectorAll("[required]").forEach((field) => {
  // 一度エラーが出た欄は、入力し直した時点でエラーを消す
  field.addEventListener("input", () => {
    if (field.closest(".form__row").classList.contains("is-invalid")) validateField(field);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = [...form.querySelectorAll("[required]")];
  const results = fields.map(validateField);
  const firstInvalid = fields[results.indexOf(false)];

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  form.querySelector("button[type=submit]").disabled = true;
  done.hidden = false;
});

// ===== フッターの年を自動で更新 =====
document.querySelector("#year").textContent = new Date().getFullYear();
