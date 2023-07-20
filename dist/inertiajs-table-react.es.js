import { queryBuilder as K } from "@lifespikes/cogent-ts";
import { router as j, usePage as T } from "@inertiajs/react";
function M(e, r) {
  return Object.fromEntries(
    Object.entries(e).filter(([t]) => r(t))
  );
}
function C(e, r) {
  return M(e, (t) => !r.includes(t));
}
function B(e, r) {
  const t = { ...e };
  return Object.keys(t).length === 0 || r.forEach((s) => {
    const a = s.split("."), l = a.pop();
    if (!l)
      return;
    const o = a.reduce((i, c) => i[c], t);
    o && delete o[l];
  }), t;
}
function O(e, r = "default") {
  return r === "default" ? e : `${r}_${e}`;
}
const E = (e, r = "") => Object.entries(e).flatMap(([t, s]) => typeof s == "object" && s !== null ? r ? E(s, `${r}[${t}]`) : E(s, `${t}`) : r ? [`${r}[${t}]=${s}`] : [`${t}=${s}`]);
function V(e) {
  const r = new URLSearchParams(e || window.location.search), t = {};
  for (const [s, a] of r.entries()) {
    const l = s.split("[").map((i) => i.endsWith("]") ? i.slice(0, -1) : i);
    let o = t;
    for (let i = 0; i < l.length; i++) {
      const c = l[i];
      o[c] || (i === l.length - 1 ? o[c] = a : o[c] = {}), o = o[c];
    }
  }
  return t;
}
function U() {
  const e = V(), r = (s, a = void 0) => e[s] || a, t = window.location.origin + window.location.pathname;
  return {
    getParam: r,
    params: e,
    currentPath: t
  };
}
function H(e) {
  const { tableName: r = "default", queryKey: t, filters: s } = e || {}, { params: a, currentPath: l } = U(), o = t || O("filter", r), i = t || O("page", r), h = K({
    baseUrl: l
  })(), d = (n) => B({ ...a }, [
    ...n,
    e != null && e.ignorePagination ? i : ""
  ]), y = (n, u) => {
    let f = d([`${o}.${n}`]);
    u && (f = {
      ...a,
      [`${o}[${n}]`]: u
    }), p(f);
  }, w = (n, u) => {
    const f = Object.keys(n).map((b) => `${o}.${b}`);
    let P = d([
      ...f,
      ...u ? u.map((b) => `${o}.${b}`) : []
    ]);
    f.length && (P = Object.entries(n).reduce((b, [x, S]) => S ? {
      ...b,
      [`${o}[${x}]`]: S
    } : b, P)), p(P);
  }, g = (n, u) => {
    let f = d([`${o}.${n == null ? void 0 : n.name}`]);
    u && (f = {
      ...f,
      [`${o}[${n == null ? void 0 : n.name}]`]: u
    }), p(f);
  }, q = (n, u) => {
    const f = s == null ? void 0 : s.find((P) => P.name === n);
    if (!f)
      throw new Error(`Filter with name ${n} not found`);
    g(f, u);
  }, F = (n) => {
    const u = {
      ...B(a, [`${o}.${n.name}`])
    };
    p(u);
  }, m = () => {
    const n = C(a, [o]);
    p(n);
  }, $ = (n) => {
    var u;
    return (u = a[o]) == null ? void 0 : u[n];
  }, p = (n) => {
    j.visit(h.params(n).get(), {
      method: "get",
      preserveState: !0
    });
  };
  return {
    onFilter: g,
    onFilterByName: y,
    onMultiFilterByObject: w,
    onFilterFor: q,
    filterValue: $,
    removeFilter: F,
    clearFilters: m
  };
}
function k(e) {
  const { tableProps: r } = T().props;
  return r[e];
}
function L({ tableName: e, queryKey: r, column: t }) {
  const s = r || O("sort", e), a = k(e), { params: l, currentPath: o } = U(), c = K({
    baseUrl: o,
    queryParams: {
      sort: s
    }
  })(), h = a.sort, d = C(l, [s]), y = (m) => {
    c.sort([m.name]);
  }, w = (m) => {
    c.sort([`-${m.name}`]);
  }, g = () => {
    c.sort([]);
  };
  return { onSortBy: (m) => {
    const $ = m || t;
    if (!$)
      throw new Error("Column is required");
    Object.keys(d).length > 0 && c.params(d), h === $.name ? w($) : h === `-${$.name}` ? g() : y($), j.visit(c.get(), {
      method: "get"
    });
  }, onSort: (m = "desc") => {
    if (!t)
      throw new Error("Column is required");
    Object.keys(d).length > 0 && c.params(d), m === "asc" && t.sorted !== "asc" ? y(t) : m === "desc" && t.sorted !== "desc" ? w(t) : g(), j.visit(c.get(), {
      method: "get"
    });
  } };
}
function Q({ name: e = "default", resource: r }) {
  const t = T().props, s = r ? t[r] : t[e], a = t.tableProps[e];
  if (!a)
    throw new Error(`Table ${e} does not exist`);
  const l = (o) => {
    var i;
    return ((i = a.columns.find((c) => c.name === o)) == null ? void 0 : i.hidden) ?? !1;
  };
  return {
    tableName: e,
    tableProps: {
      name: e,
      ...a,
      ...s
    },
    isHiddenColumn: l
  };
}
export {
  M as filterObject,
  E as flattenKeyValueParams,
  V as getParamsObject,
  C as omit,
  B as omitNotation,
  O as queryKeyFor,
  H as useFiltering,
  U as useParams,
  L as useSorting,
  Q as useTable,
  k as useTableProps
};
