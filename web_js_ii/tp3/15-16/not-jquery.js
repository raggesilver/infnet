// @ts-nocheck

// Codigo copiado de https://unpkg.com/@raggesilver/not-jquery@0.0.4/dist/not-jquery.js
// Essa biblioteca foi desenvolvida por mim.

const f = "data-njq-list-key",
  b = (o, n, c, l = []) => {
    const h = (t, s) => {
        const e = c(t, s);
        return e.setAttribute(f, `${t[n]}`), e;
      },
      y = (t, s = 0) => {
        for (let e = s; e < t.length; e++) {
          const i = o.children[e];
          if (!i) continue;
          const r = h(t[e], e);
          i.replaceWith(r);
        }
      },
      u = (t, s, e) => {
        if (o.querySelector(`[${f}="${t[n]}"]`)) return;
        const r = h(t, e);
        o.insertBefore(r, o.children[e] ?? null), y(s, e + 1);
      },
      q = (t, s, e) => {
        var i;
        (i = o.querySelector(`[${f}="${t[n]}"]`)) == null || i.remove(),
          y(s, e);
      },
      $ = (t, s, e) => {
        var i;
        for (const r of t)
          (i = o.querySelector(`[${f}="${r[n]}"]`)) == null || i.remove();
        y(s, e);
      },
      p = new Proxy(l, {
        get(t, s) {
          return s === "push"
            ? (e) => {
                const i = t.push(e);
                return u(e, t, i - 1), i;
              }
            : s === "unshift"
              ? (e) => {
                  const i = t.unshift(e);
                  return u(e, t, 0), i;
                }
              : s === "pop"
                ? () => {
                    const e = t.pop();
                    return e && q(e, t, t.length - 1), e;
                  }
                : s === "splice"
                  ? (e, i, ...r) => {
                      const m = t.splice(e, i);
                      $(m, t, e), t.splice(e, 0, ...r);
                      for (let d = 0; d < r.length; d++) u(r[d], t, e + d);
                      return m;
                    }
                  : Reflect.get(t, s);
        },
      });
    for (const [t, s] of l.entries()) u(s, p, t);
    return p;
  },
  A = (o) => {
    const n = document.querySelector(o),
      c = n == null ? void 0 : n.addEventListener.bind(n);
    return {
      el: n,
      on(...l) {
        return c == null || c(...l), this;
      },
      html(l) {
        return n && (n.innerHTML = l), this;
      },
      show() {
        return (
          (n == null ? void 0 : n.style.display) === "none" &&
            ((n.style.display =
              n.getAttribute("data-not-jquery-old-display") ?? ""),
            n.removeAttribute("data-not-jquery-old-display")),
          this
        );
      },
      hide() {
        return (
          n &&
            (n.style.display &&
              n.setAttribute("data-not-jquery-old-display", n.style.display),
            (n.style.display = "none")),
          this
        );
      },
    };
  },
  S = Object.assign(A, {
    // JSDoc annotations must be added here.
    /**
     * Create a reactive list.
     *
     * Reactive lists allow you to append items to a list and have them
     * automatically rendered in the DOM.
     *
     * @param root The root element of the list. This must already exist in the
     * DOM.
     * @param key The key to use to identify each item in the list.
     * @param builder A callback that returns an HTMLElement for each item in the
     * list.
     * @param array Initial values to append to the list.
     * @returns A reactive array that you can use to manipulate the list. Keep in
     * mind that the only supported methods are `push`, `unshift`, `pop`, and
     * `splice`. Any other method will not update the DOM.
     */
    reactiveList: b,
  });
export { S as $ };
