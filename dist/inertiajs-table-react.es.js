import { router as x } from "@inertiajs/core";
import { queryBuilder as S } from "@lifespikes/cogent-ts";
import { usePage as E, router as M } from "@inertiajs/react";
function V(t, e) {
  return Object.fromEntries(
    Object.entries(t).filter(([r]) => e(r))
  );
}
function K(t, e) {
  return V(t, (r) => !e.includes(r));
}
function F(t, e) {
  const r = { ...t };
  return Object.keys(r).length === 0 || e.forEach((s) => {
    const a = s.split("."), l = a.pop();
    if (!l)
      return;
    const o = a.reduce((c, i) => c[i], r);
    o && delete o[l];
  }), r;
}
function j(t, e = "default") {
  return e === "default" ? t : `${e}_${t}`;
}
const B = (t, e = "") => Object.entries(t).flatMap(([r, s]) => typeof s == "object" && s !== null ? e ? B(s, `${e}[${r}]`) : B(s, `${r}`) : e ? [`${e}[${r}]=${s}`] : [`${r}=${s}`]);
function A(t) {
  const e = new URLSearchParams(t || window.location.search), r = {};
  for (const [s, a] of e.entries()) {
    const l = s.split("[").map((c) => c.endsWith("]") ? c.slice(0, -1) : c);
    let o = r;
    for (let c = 0; c < l.length; c++) {
      const i = l[c];
      o[i] || (c === l.length - 1 ? o[i] = a : o[i] = {}), o = o[i];
    }
  }
  return r;
}
function C() {
  const t = A(), e = (s, a = void 0) => t[s] || a, r = window.location.origin + window.location.pathname;
  return {
    getParam: e,
    params: t,
    currentPath: r
  };
}
function R(t) {
  const { tableName: e = "default", queryKey: r, filters: s } = t || {}, { params: a, currentPath: l } = C(), o = r || j("filter", e), c = r || j("page", e), y = S({
    baseUrl: l
  })(), $ = (n) => F({ ...a }, [
    ...n,
    t != null && t.ignorePagination ? c : ""
  ]), g = (n, u) => {
    let m = $([`${o}.${n}`]);
    u && (m = {
      ...a,
      [`${o}[${n}]`]: u
    }), p(m);
  }, w = (n, u) => {
    const m = Object.keys(n).map((b) => `${o}.${b}`);
    let P = $([
      ...m,
      ...u ? u.map((b) => `${o}.${b}`) : []
    ]);
    m.length && (P = Object.entries(n).reduce((b, [U, q]) => q ? {
      ...b,
      [`${o}[${U}]`]: q
    } : b, P)), p(P);
  }, h = (n, u) => {
    let m = $([`${o}.${n == null ? void 0 : n.name}`]);
    u && (m = {
      ...m,
      [`${o}[${n == null ? void 0 : n.name}]`]: u
    }), p(m);
  }, O = (n, u) => {
    const m = s == null ? void 0 : s.find((P) => P.name === n);
    if (!m)
      throw new Error(`Filter with name ${n} not found`);
    h(m, u);
  }, f = (n) => {
    const u = {
      ...F(a, [`${o}.${n.name}`])
    };
    p(u);
  }, d = () => {
    const n = K(a, [o]);
    p(n);
  }, T = (n) => {
    var u;
    return (u = a[o]) == null ? void 0 : u[n];
  }, p = (n) => {
    x.visit(y.params(n).get(), {
      method: "get",
      preserveState: !0
    });
  };
  return {
    onFilter: h,
    onFilterByName: g,
    onMultiFilterByObject: w,
    onFilterFor: O,
    filterValue: T,
    removeFilter: f,
    clearFilters: d
  };
}
function D(t) {
  const { tableProps: e } = E().props;
  return e[t];
}
function W({ tableName: t, queryKey: e, column: r }) {
  const s = e || j("sort", t), a = D(t), { params: l, currentPath: o } = C(), i = S({
    baseUrl: o,
    queryParams: {
      sort: s
    }
  })(), y = a.sort, $ = K(l, [s]), g = (f) => {
    i.sort([f.name]);
  }, w = (f) => {
    i.sort([`-${f.name}`]);
  }, h = () => {
    i.sort([]);
  };
  return { onSortBy: (f) => {
    const d = f || r;
    if (!d)
      throw new Error("Column is required");
    Object.keys($).length > 0 && i.params($), y === d.name ? w(d) : y === `-${d.name}` ? h() : g(d), M.visit(i.get(), {
      method: "get"
    });
  } };
}
function _({ name: t = "default", resource: e }) {
  const r = E().props, s = e ? r[e] : r[t], a = r.tableProps[t];
  if (!a)
    throw new Error(`Table ${t} does not exist`);
  const l = (o) => {
    var c;
    return ((c = a.columns.find((i) => i.name === o)) == null ? void 0 : c.hidden) ?? !1;
  };
  return {
    tableName: t,
    tableProps: {
      name: t,
      ...a,
      ...s
    },
    isHiddenColumn: l
  };
}
export {
  V as filterObject,
  B as flattenKeyValueParams,
  A as getParamsObject,
  K as omit,
  F as omitNotation,
  j as queryKeyFor,
  R as useFiltering,
  C as useParams,
  W as useSorting,
  _ as useTable,
  D as useTableProps
};
