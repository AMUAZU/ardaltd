(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var menuItem = document.querySelector(".has-menu");
  var menuButton = menuItem ? menuItem.querySelector(".nav-link") : null;
  var desktop = window.matchMedia("(min-width: 961px)");
  var canHover = window.matchMedia("(hover: hover)");

  // Header shadow once the page has scrolled
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // "What we do" panel (desktop)
  function setMenu(open) {
    if (!menuItem) return;
    menuItem.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (menuItem) {
    var closeTimer;
    menuButton.addEventListener("click", function () {
      if (desktop.matches) setMenu(!menuItem.classList.contains("open"));
    });
    menuItem.addEventListener("mouseenter", function () {
      if (desktop.matches && canHover.matches) { clearTimeout(closeTimer); setMenu(true); }
    });
    menuItem.addEventListener("mouseleave", function () {
      if (desktop.matches && canHover.matches) closeTimer = setTimeout(function () { setMenu(false); }, 120);
    });
    menuItem.addEventListener("focusout", function (e) {
      if (desktop.matches && !menuItem.contains(e.relatedTarget)) setMenu(false);
    });
    document.addEventListener("click", function (e) {
      if (desktop.matches && !menuItem.contains(e.target)) setMenu(false);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (menuItem && menuItem.classList.contains("open")) { setMenu(false); menuButton.focus(); }
    if (nav && nav.classList.contains("open")) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
})();

// Enquiry form
// PLACEHOLDER: the form has no backend yet. Set data-endpoint on the <form>
// in contact.html to a form-handling URL that accepts a POST of the fields.
(function () {
  var form = document.getElementById("enquiry-form");
  if (!form) return;
  var status = document.getElementById("enquiry-status");
  function say(msg) { status.textContent = msg; status.hidden = false; status.focus(); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var endpoint = form.getAttribute("data-endpoint");
    if (!endpoint) {
      say("Placeholder: this form is not connected to an inbox yet, so your enquiry has not been sent. Please use the contact details on this page.");
      return;
    }
    var button = form.querySelector("button[type=submit]");
    button.disabled = true;
    fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        form.reset();
        say("Thank you. Your enquiry has been sent and we will reply by email.");
      })
      .catch(function () {
        say("Your enquiry could not be sent. Check your connection and try again, or use the contact details on this page.");
      })
      .finally(function () { button.disabled = false; });
  });
})();
