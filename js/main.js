/* THE FOUL & ONE — interactions */
(function () {
  "use strict";

  /* ---------- Sticky header ---------- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll(".num[data-count]");
  const runCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const dur = 1400;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            runCounter(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Reel wall ---------- */
  const grid = document.getElementById("reelGrid");
  if (grid && Array.isArray(window.REELS)) {
    const frag = document.createDocumentFragment();
    window.REELS.forEach((r, i) => {
      const a = document.createElement("a");
      a.className = "reel-card reveal";
      a.href = r.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.style.setProperty("--d", (i % 4) * 0.08 + "s");
      a.innerHTML =
        '<div class="reel-bg" style="background:linear-gradient(150deg,' +
        r.grad[0] +
        "," +
        r.grad[1] +
        ')"></div>' +
        '<span class="reel-icon" aria-hidden="true">' + r.icon + "</span>" +
        '<span class="reel-open" aria-hidden="true">↗</span>' +
        '<div class="reel-overlay">' +
        '<p class="reel-caption">' + r.caption + "</p>" +
        '<p class="reel-meta"><span>♥ ' + r.likes + "</span><span>" + r.date + "</span></p>" +
        "</div>";
      frag.appendChild(a);
    });
    grid.appendChild(frag);
    // observe newly added reveals
    if ("IntersectionObserver" in window) {
      const io2 = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              io2.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      grid.querySelectorAll(".reveal").forEach((el) => io2.observe(el));
    } else {
      grid.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    }
  }

  /* ---------- Contact form (demo handler) ---------- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const required = ["name", "email", "message"];
      let valid = true;
      required.forEach((id) => {
        const el = form.elements[id];
        const ok = el.value.trim() !== "" && (id !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
        el.classList.toggle("invalid", !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        note.textContent = "Check your details — name, valid email and message are required.";
        note.classList.add("error");
        return;
      }
      note.classList.remove("error");
      note.textContent = "Asante! Message noted — for a fast reply, DM us on Instagram 🏀";
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
