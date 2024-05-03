(function () {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) n(e);
  new MutationObserver((e) => {
    for (const l of e)
      if (l.type === "childList")
        for (const s of l.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && n(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(e) {
    const l = {};
    return (
      e.integrity && (l.integrity = e.integrity),
      e.referrerPolicy && (l.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : e.crossOrigin === "anonymous"
        ? (l.credentials = "omit")
        : (l.credentials = "same-origin"),
      l
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    const l = a(e);
    fetch(e.href, l);
  }
})();
let c = document.querySelector(".multi-select"),
  _ = c.querySelector("#filter"),
  E = document.querySelector("#search"),
  d = c.querySelector(".select"),
  C = document.querySelector("#app"),
  o = [],
  i = [],
  y = [];
async function v() {
  y = await (await fetch("./assets/main.php")).json();
}
function g(t) {
  y.forEach((r) => {
    let a = document.querySelector(
        `#${r.title.toLowerCase().replace(" ", "")}`
      ),
      n = !1;
    if (t.length == 0 || r.title.toLowerCase().includes(t)) {
      if (o.length == 0) n = !0;
      else
        for (let e of o)
          if (r.language.includes(e)) {
            n = !0;
            break;
          }
    }
    n ? (a.style.display = "grid") : (a.style.display = "none");
  });
}
function b(t) {
  let r = document.createElement("div"),
    a = document.createElement("svg"),
    n = document.createElement("label"),
    e = document.createElement("input");
  return (
    r.classList.add("options"),
    e.setAttribute("type", "checkbox"),
    (n.textContent = t),
    e.addEventListener("change", () => {
      if (e.checked == !0) o.push(t);
      else {
        let s = o.indexOf(t);
        o.splice(s, 1);
      }
      let l = E.value.toLowerCase();
      g(l);
    }),
    fetch(`./assets/icons/${t.toLowerCase()}.svg`)
      .then((l) => l.text())
      .then((l) => {
        (l = l.replace("<svg>", "")),
          (l = l.replace("</svg>", "")),
          (a.innerHTML = l),
          r.append(a, n, e);
      }),
    r
  );
}
function w(t, r, a) {
  let n = document.createElement("div"),
    e = document.createElement("header"),
    l = document.createElement("main"),
    s = document.createElement("div"),
    u = document.createElement("div"),
    p = document.createElement("a"),
    f = document.createElement("h2"),
    m = document.createElement("p");
  return (
    (n.classList = "card"),
    n.setAttribute("id", `${t.toLowerCase().replace(" ", "")}`),
    f.classList.add("card__title"),
    m.classList.add("card__description"),
    s.classList.add("card__languageUse"),
    p.setAttribute("href", `./assets/projects/${t.toLowerCase()}/index.html`),
    u.classList.add("card__buttonStart"),
    (f.textContent = t),
    e.appendChild(f),
    (m.textContent = r),
    l.appendChild(m),
    a.forEach((L) => {
      let h = document.createElement("p");
      (h.textContent = L),
        h.classList.add("card__languageUse__name"),
        s.appendChild(h);
    }),
    (p.textContent = "START"),
    u.appendChild(p),
    n.appendChild(e),
    n.appendChild(l),
    n.appendChild(s),
    n.appendChild(u),
    n
  );
}
await v();
y.forEach((t) => {
  t.language.forEach((a) => {
    i.includes(a) || i.push(a);
  });
  let r = w(t.title, t.description, t.language);
  C.appendChild(r);
});
i.sort();
i.forEach((t) => {
  let r = b(t);
  d.appendChild(r);
});
E.addEventListener("input", (t) => {
  let r = t.target.value.toLowerCase();
  g(r);
});
_.addEventListener("input", (t) => {
  d.querySelectorAll(".options").forEach((r) => {
    let a = r.querySelector("label").textContent.toLowerCase(),
      n = t.target.value.toLowerCase();
    a.includes(n) ? (r.style.display = "flex") : (r.style.display = "none");
  });
});
c.addEventListener("mouseover", () => {
  d.style.display = "flex";
});
c.addEventListener("mouseout", () => {
  d.style.display = "none";
});
