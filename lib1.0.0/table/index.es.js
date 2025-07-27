import { defineComponent as lt, computed as K, ref as B, watch as q, onMounted as ut, resolveComponent as w, resolveDirective as dt, createElementBlock as $, openBlock as b, Fragment as W, withDirectives as ft, createCommentVNode as te, createBlock as J, withCtx as L, createVNode as S, renderList as pt, createElementVNode as gt, renderSlot as U, mergeProps as X, withModifiers as re, createTextVNode as bt, toDisplayString as yt, resolveDynamicComponent as ht, normalizeProps as ge, normalizeStyle as vt } from "vue";
var Be = typeof global == "object" && global && global.Object === Object && global, mt = typeof self == "object" && self && self.Object === Object && self, h = Be || mt || Function("return this")(), E = h.Symbol, Le = Object.prototype, _t = Le.hasOwnProperty, jt = Le.toString, F = E ? E.toStringTag : void 0;
function Tt(e) {
  var t = _t.call(e, F), r = e[F];
  try {
    e[F] = void 0;
    var n = !0;
  } catch {
  }
  var c = jt.call(e);
  return n && (t ? e[F] = r : delete e[F]), c;
}
var wt = Object.prototype, $t = wt.toString;
function St(e) {
  return $t.call(e);
}
var Ct = "[object Null]", At = "[object Undefined]", be = E ? E.toStringTag : void 0;
function G(e) {
  return e == null ? e === void 0 ? At : Ct : be && be in Object(e) ? Tt(e) : St(e);
}
function H(e) {
  return e != null && typeof e == "object";
}
var le = Array.isArray;
function Z(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var xt = "[object AsyncFunction]", Ot = "[object Function]", Pt = "[object GeneratorFunction]", Et = "[object Proxy]";
function Ue(e) {
  if (!Z(e))
    return !1;
  var t = G(e);
  return t == Ot || t == Pt || t == xt || t == Et;
}
var ne = h["__core-js_shared__"], ye = function() {
  var e = /[^.]+$/.exec(ne && ne.keys && ne.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function It(e) {
  return !!ye && ye in e;
}
var zt = Function.prototype, Dt = zt.toString;
function A(e) {
  if (e != null) {
    try {
      return Dt.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Mt = /[\\^$.*+?()[\]{}|]/g, kt = /^\[object .+?Constructor\]$/, Bt = Function.prototype, Lt = Object.prototype, Ut = Bt.toString, Ft = Lt.hasOwnProperty, Rt = RegExp(
  "^" + Ut.call(Ft).replace(Mt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Vt(e) {
  if (!Z(e) || It(e))
    return !1;
  var t = Ue(e) ? Rt : kt;
  return t.test(A(e));
}
function Nt(e, t) {
  return e?.[t];
}
function x(e, t) {
  var r = Nt(e, t);
  return Vt(r) ? r : void 0;
}
var oe = x(h, "WeakMap"), he = Object.create, Gt = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!Z(t))
      return {};
    if (he)
      return he(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), ve = function() {
  try {
    var e = x(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
function Ht(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var Kt = 9007199254740991, qt = /^(?:0|[1-9]\d*)$/;
function Wt(e, t) {
  var r = typeof e;
  return t = t ?? Kt, !!t && (r == "number" || r != "symbol" && qt.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Jt(e, t, r) {
  t == "__proto__" && ve ? ve(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
function Fe(e, t) {
  return e === t || e !== e && t !== t;
}
var Xt = Object.prototype, Yt = Xt.hasOwnProperty;
function Zt(e, t, r) {
  var n = e[t];
  (!(Yt.call(e, t) && Fe(n, r)) || r === void 0 && !(t in e)) && Jt(e, t, r);
}
var Qt = 9007199254740991;
function Re(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Qt;
}
function er(e) {
  return e != null && Re(e.length) && !Ue(e);
}
var tr = Object.prototype;
function Ve(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || tr;
  return e === r;
}
function rr(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var nr = "[object Arguments]";
function me(e) {
  return H(e) && G(e) == nr;
}
var Ne = Object.prototype, ar = Ne.hasOwnProperty, or = Ne.propertyIsEnumerable, ir = me(/* @__PURE__ */ function() {
  return arguments;
}()) ? me : function(e) {
  return H(e) && ar.call(e, "callee") && !or.call(e, "callee");
};
function sr() {
  return !1;
}
var Ge = typeof exports == "object" && exports && !exports.nodeType && exports, _e = Ge && typeof module == "object" && module && !module.nodeType && module, cr = _e && _e.exports === Ge, je = cr ? h.Buffer : void 0, lr = je ? je.isBuffer : void 0, He = lr || sr, ur = "[object Arguments]", dr = "[object Array]", fr = "[object Boolean]", pr = "[object Date]", gr = "[object Error]", br = "[object Function]", yr = "[object Map]", hr = "[object Number]", vr = "[object Object]", mr = "[object RegExp]", _r = "[object Set]", jr = "[object String]", Tr = "[object WeakMap]", wr = "[object ArrayBuffer]", $r = "[object DataView]", Sr = "[object Float32Array]", Cr = "[object Float64Array]", Ar = "[object Int8Array]", xr = "[object Int16Array]", Or = "[object Int32Array]", Pr = "[object Uint8Array]", Er = "[object Uint8ClampedArray]", Ir = "[object Uint16Array]", zr = "[object Uint32Array]", i = {};
i[Sr] = i[Cr] = i[Ar] = i[xr] = i[Or] = i[Pr] = i[Er] = i[Ir] = i[zr] = !0;
i[ur] = i[dr] = i[wr] = i[fr] = i[$r] = i[pr] = i[gr] = i[br] = i[yr] = i[hr] = i[vr] = i[mr] = i[_r] = i[jr] = i[Tr] = !1;
function Dr(e) {
  return H(e) && Re(e.length) && !!i[G(e)];
}
function ue(e) {
  return function(t) {
    return e(t);
  };
}
var Ke = typeof exports == "object" && exports && !exports.nodeType && exports, R = Ke && typeof module == "object" && module && !module.nodeType && module, Mr = R && R.exports === Ke, ae = Mr && Be.process, I = function() {
  try {
    var e = R && R.require && R.require("util").types;
    return e || ae && ae.binding && ae.binding("util");
  } catch {
  }
}(), Te = I && I.isTypedArray, kr = Te ? ue(Te) : Dr, Br = Object.prototype, Lr = Br.hasOwnProperty;
function Ur(e, t) {
  var r = le(e), n = !r && ir(e), c = !r && !n && He(e), d = !r && !n && !c && kr(e), l = r || n || c || d, g = l ? rr(e.length, String) : [], f = g.length;
  for (var u in e)
    Lr.call(e, u) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    c && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    d && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    Wt(u, f))) && g.push(u);
  return g;
}
function qe(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Fr = qe(Object.keys, Object), Rr = Object.prototype, Vr = Rr.hasOwnProperty;
function Nr(e) {
  if (!Ve(e))
    return Fr(e);
  var t = [];
  for (var r in Object(e))
    Vr.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function Gr(e) {
  return er(e) ? Ur(e) : Nr(e);
}
var V = x(Object, "create");
function Hr() {
  this.__data__ = V ? V(null) : {}, this.size = 0;
}
function Kr(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var qr = "__lodash_hash_undefined__", Wr = Object.prototype, Jr = Wr.hasOwnProperty;
function Xr(e) {
  var t = this.__data__;
  if (V) {
    var r = t[e];
    return r === qr ? void 0 : r;
  }
  return Jr.call(t, e) ? t[e] : void 0;
}
var Yr = Object.prototype, Zr = Yr.hasOwnProperty;
function Qr(e) {
  var t = this.__data__;
  return V ? t[e] !== void 0 : Zr.call(t, e);
}
var en = "__lodash_hash_undefined__";
function tn(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = V && t === void 0 ? en : t, this;
}
function C(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
C.prototype.clear = Hr;
C.prototype.delete = Kr;
C.prototype.get = Xr;
C.prototype.has = Qr;
C.prototype.set = tn;
function rn() {
  this.__data__ = [], this.size = 0;
}
function Q(e, t) {
  for (var r = e.length; r--; )
    if (Fe(e[r][0], t))
      return r;
  return -1;
}
var nn = Array.prototype, an = nn.splice;
function on(e) {
  var t = this.__data__, r = Q(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : an.call(t, r, 1), --this.size, !0;
}
function sn(e) {
  var t = this.__data__, r = Q(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function cn(e) {
  return Q(this.__data__, e) > -1;
}
function ln(e, t) {
  var r = this.__data__, n = Q(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function _(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
_.prototype.clear = rn;
_.prototype.delete = on;
_.prototype.get = sn;
_.prototype.has = cn;
_.prototype.set = ln;
var N = x(h, "Map");
function un() {
  this.size = 0, this.__data__ = {
    hash: new C(),
    map: new (N || _)(),
    string: new C()
  };
}
function dn(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function ee(e, t) {
  var r = e.__data__;
  return dn(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function fn(e) {
  var t = ee(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function pn(e) {
  return ee(this, e).get(e);
}
function gn(e) {
  return ee(this, e).has(e);
}
function bn(e, t) {
  var r = ee(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function z(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
z.prototype.clear = un;
z.prototype.delete = fn;
z.prototype.get = pn;
z.prototype.has = gn;
z.prototype.set = bn;
function yn(e, t) {
  for (var r = -1, n = t.length, c = e.length; ++r < n; )
    e[c + r] = t[r];
  return e;
}
var hn = qe(Object.getPrototypeOf, Object);
function vn() {
  this.__data__ = new _(), this.size = 0;
}
function mn(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function _n(e) {
  return this.__data__.get(e);
}
function jn(e) {
  return this.__data__.has(e);
}
var Tn = 200;
function wn(e, t) {
  var r = this.__data__;
  if (r instanceof _) {
    var n = r.__data__;
    if (!N || n.length < Tn - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new z(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function D(e) {
  var t = this.__data__ = new _(e);
  this.size = t.size;
}
D.prototype.clear = vn;
D.prototype.delete = mn;
D.prototype.get = _n;
D.prototype.has = jn;
D.prototype.set = wn;
var We = typeof exports == "object" && exports && !exports.nodeType && exports, we = We && typeof module == "object" && module && !module.nodeType && module, $n = we && we.exports === We, $e = $n ? h.Buffer : void 0;
$e && $e.allocUnsafe;
function Sn(e, t) {
  return e.slice();
}
function Cn(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, c = 0, d = []; ++r < n; ) {
    var l = e[r];
    t(l, r, e) && (d[c++] = l);
  }
  return d;
}
function An() {
  return [];
}
var xn = Object.prototype, On = xn.propertyIsEnumerable, Se = Object.getOwnPropertySymbols, Pn = Se ? function(e) {
  return e == null ? [] : (e = Object(e), Cn(Se(e), function(t) {
    return On.call(e, t);
  }));
} : An;
function En(e, t, r) {
  var n = t(e);
  return le(e) ? n : yn(n, r(e));
}
function In(e) {
  return En(e, Gr, Pn);
}
var ie = x(h, "DataView"), se = x(h, "Promise"), ce = x(h, "Set"), Ce = "[object Map]", zn = "[object Object]", Ae = "[object Promise]", xe = "[object Set]", Oe = "[object WeakMap]", Pe = "[object DataView]", Dn = A(ie), Mn = A(N), kn = A(se), Bn = A(ce), Ln = A(oe), m = G;
(ie && m(new ie(new ArrayBuffer(1))) != Pe || N && m(new N()) != Ce || se && m(se.resolve()) != Ae || ce && m(new ce()) != xe || oe && m(new oe()) != Oe) && (m = function(e) {
  var t = G(e), r = t == zn ? e.constructor : void 0, n = r ? A(r) : "";
  if (n)
    switch (n) {
      case Dn:
        return Pe;
      case Mn:
        return Ce;
      case kn:
        return Ae;
      case Bn:
        return xe;
      case Ln:
        return Oe;
    }
  return t;
});
var Un = Object.prototype, Fn = Un.hasOwnProperty;
function Rn(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && Fn.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var Ee = h.Uint8Array;
function de(e) {
  var t = new e.constructor(e.byteLength);
  return new Ee(t).set(new Ee(e)), t;
}
function Vn(e, t) {
  var r = de(e.buffer);
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var Nn = /\w*$/;
function Gn(e) {
  var t = new e.constructor(e.source, Nn.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Ie = E ? E.prototype : void 0, ze = Ie ? Ie.valueOf : void 0;
function Hn(e) {
  return ze ? Object(ze.call(e)) : {};
}
function Kn(e, t) {
  var r = de(e.buffer);
  return new e.constructor(r, e.byteOffset, e.length);
}
var qn = "[object Boolean]", Wn = "[object Date]", Jn = "[object Map]", Xn = "[object Number]", Yn = "[object RegExp]", Zn = "[object Set]", Qn = "[object String]", ea = "[object Symbol]", ta = "[object ArrayBuffer]", ra = "[object DataView]", na = "[object Float32Array]", aa = "[object Float64Array]", oa = "[object Int8Array]", ia = "[object Int16Array]", sa = "[object Int32Array]", ca = "[object Uint8Array]", la = "[object Uint8ClampedArray]", ua = "[object Uint16Array]", da = "[object Uint32Array]";
function fa(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case ta:
      return de(e);
    case qn:
    case Wn:
      return new n(+e);
    case ra:
      return Vn(e);
    case na:
    case aa:
    case oa:
    case ia:
    case sa:
    case ca:
    case la:
    case ua:
    case da:
      return Kn(e);
    case Jn:
      return new n();
    case Xn:
    case Qn:
      return new n(e);
    case Yn:
      return Gn(e);
    case Zn:
      return new n();
    case ea:
      return Hn(e);
  }
}
function pa(e) {
  return typeof e.constructor == "function" && !Ve(e) ? Gt(hn(e)) : {};
}
var ga = "[object Map]";
function ba(e) {
  return H(e) && m(e) == ga;
}
var De = I && I.isMap, ya = De ? ue(De) : ba, ha = "[object Set]";
function va(e) {
  return H(e) && m(e) == ha;
}
var Me = I && I.isSet, ma = Me ? ue(Me) : va, Je = "[object Arguments]", _a = "[object Array]", ja = "[object Boolean]", Ta = "[object Date]", wa = "[object Error]", Xe = "[object Function]", $a = "[object GeneratorFunction]", Sa = "[object Map]", Ca = "[object Number]", Ye = "[object Object]", Aa = "[object RegExp]", xa = "[object Set]", Oa = "[object String]", Pa = "[object Symbol]", Ea = "[object WeakMap]", Ia = "[object ArrayBuffer]", za = "[object DataView]", Da = "[object Float32Array]", Ma = "[object Float64Array]", ka = "[object Int8Array]", Ba = "[object Int16Array]", La = "[object Int32Array]", Ua = "[object Uint8Array]", Fa = "[object Uint8ClampedArray]", Ra = "[object Uint16Array]", Va = "[object Uint32Array]", o = {};
o[Je] = o[_a] = o[Ia] = o[za] = o[ja] = o[Ta] = o[Da] = o[Ma] = o[ka] = o[Ba] = o[La] = o[Sa] = o[Ca] = o[Ye] = o[Aa] = o[xa] = o[Oa] = o[Pa] = o[Ua] = o[Fa] = o[Ra] = o[Va] = !0;
o[wa] = o[Xe] = o[Ea] = !1;
function Y(e, t, r, n, c, d) {
  var l;
  if (l !== void 0)
    return l;
  if (!Z(e))
    return e;
  var g = le(e);
  if (g)
    l = Rn(e);
  else {
    var f = m(e), u = f == Xe || f == $a;
    if (He(e))
      return Sn(e);
    if (f == Ye || f == Je || u && !c)
      l = u ? {} : pa(e);
    else {
      if (!o[f])
        return c ? e : {};
      l = fa(e, f);
    }
  }
  d || (d = new D());
  var M = d.get(e);
  if (M)
    return M;
  d.set(e, l), ma(e) ? e.forEach(function(y) {
    l.add(Y(y, t, r, y, e, d));
  }) : ya(e) && e.forEach(function(y, v) {
    l.set(v, Y(y, t, r, v, e, d));
  });
  var O = In, T = g ? void 0 : O(e);
  return Ht(T || e, function(y, v) {
    T && (v = y, y = e[v]), Zt(l, v, Y(y, t, r, v, e, d));
  }), l;
}
var Na = 1, Ga = 4;
function ke(e) {
  return Y(e, Na | Ga);
}
const Ha = {
  key: 0,
  class: "edit-box"
}, Ka = {
  key: 1,
  class: "action-icons"
}, qa = /* @__PURE__ */ lt({
  __name: "index",
  props: {
    options: {
      type: Array,
      required: !0
    },
    data: {
      type: Array,
      required: !0
    },
    // loading
    elementLoadingText: {
      type: String
    },
    elementLoadingSpinner: {
      type: String
    },
    elementLoadingBackground: {
      type: String
    },
    elementLoadingSvg: {
      type: String
    },
    elementLoadingSvgViewBox: {
      type: String
    },
    elementLoadingCustomClass: {
      type: String
    },
    // 可编辑单元格显示的图标
    editIcon: {
      type: String,
      default: "Edit"
    },
    // 是否可以编辑行
    isEditRow: {
      type: Boolean,
      default: !1
    },
    // 编辑行按钮的标识
    editRowIndex: {
      type: String,
      default: ""
    },
    // 分页数据
    pagination: {
      type: Boolean,
      default: !0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default: [10, 20, 30, 40]
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number
    },
    paginationAlign: {
      type: String,
      default: "right"
    }
  },
  emits: ["confirm", "cancel", "update:editRowIndex", "pageSizeChange", "currentPageChange"],
  setup(e, { emit: t }) {
    const r = e, n = K(() => r.options.filter((a) => !a.action)), c = K(() => r.options.find((a) => a.action)), d = K(() => !r.data || !r.data.length), l = K(() => r.paginationAlign === "left" ? "flex-start" : r.paginationAlign === "center" ? "center" : "flex-end"), g = t, f = B(""), u = B(ke(r.data)), M = B(r.editRowIndex), O = B(r.currentPage), T = B(r.pageSize), y = (a, j) => {
      j.label === c.value.label && r.isEditRow && M.value === r.editRowIndex && r.editRowIndex && (a.rowEdit = !a.rowEdit, u.value.map((k) => {
        k !== a && (k.rowEdit = !1);
      }), a.rowEdit || g("update:editRowIndex", ""));
    }, v = (a) => {
      f.value = a.$index + a.column.id;
    }, Ze = (a) => {
      f.value = "", g("confirm", a.row);
    }, Qe = (a) => {
      f.value = "", g("cancel", a.row);
    }, et = () => {
    }, tt = (a) => {
      T.value = a, g("pageSizeChange", a);
    }, rt = (a) => {
      O.value = a, g("currentPageChange", a);
    };
    return q(
      () => r.data,
      (a) => {
        u.value = ke(a), u.value.map((j) => {
          j.rowEdit = !1;
        });
      },
      { deep: !0 }
    ), q(
      () => r.editRowIndex,
      (a) => {
        a && (M.value = a);
      }
    ), q(
      () => r.currentPage,
      (a) => {
        O.value = a;
      }
    ), q(
      () => r.pageSize,
      (a) => {
        T.value = a;
      }
    ), ut(() => {
      u.value.map((a) => {
        a.rowEdit = !1;
      });
    }), (a, j) => {
      const k = w("el-input"), nt = w("CircleCheck"), fe = w("el-icon"), at = w("CircleClose"), pe = w("el-table-column"), ot = w("el-table"), it = w("el-pagination"), st = dt("loading");
      return b(), $(
        W,
        null,
        [
          ft((b(), J(ot, {
            data: u.value,
            "element-loading-text": e.elementLoadingText,
            "element-loading-spinner": e.elementLoadingSpinner,
            "element-loading-svg": e.elementLoadingSvg,
            "element-loading-svg-view-box": e.elementLoadingSvgViewBox,
            "element-loading-background": e.elementLoadingBackground,
            "element-loading-custom-class": e.elementLoadingCustomClass,
            onRowClick: y
          }, {
            default: L(() => [
              (b(!0), $(
                W,
                null,
                pt(n.value, (s, ct) => (b(), J(pe, {
                  key: ct,
                  label: s.label,
                  prop: s.prop,
                  align: s.align,
                  width: s.width
                }, {
                  default: L((p) => [
                    p.row.rowEdit ? (b(), J(k, {
                      key: 0,
                      size: "small",
                      modelValue: p.row[s.prop],
                      "onUpdate:modelValue": (P) => p.row[s.prop] = P
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (b(), $(
                      W,
                      { key: 1 },
                      [
                        p.$index + p.column.id === f.value ? (b(), $("div", Ha, [
                          S(k, {
                            size: "small",
                            modelValue: p.row[s.prop],
                            "onUpdate:modelValue": (P) => p.row[s.prop] = P
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          gt("div", { onClick: et }, [
                            a.$slots.editCell ? U(a.$slots, "editCell", X({
                              key: 0,
                              ref_for: !0
                            }, p), void 0, !0) : (b(), $("div", Ka, [
                              S(fe, {
                                class: "action-icons-check",
                                onClick: re((P) => Ze(p), ["stop"])
                              }, {
                                default: L(() => [
                                  S(nt)
                                ]),
                                _: 2
                                /* DYNAMIC */
                              }, 1032, ["onClick"]),
                              S(fe, {
                                class: "action-icons-close",
                                onClick: re((P) => Qe(p), ["stop"])
                              }, {
                                default: L(() => [
                                  S(at)
                                ]),
                                _: 2
                                /* DYNAMIC */
                              }, 1032, ["onClick"])
                            ]))
                          ])
                        ])) : (b(), $(
                          W,
                          { key: 1 },
                          [
                            s.slot ? U(a.$slots, s.slot, X({
                              key: 0,
                              ref_for: !0
                            }, p), void 0, !0) : U(a.$slots, "default", { key: 1 }, () => [
                              bt(
                                yt(p.row[s.prop]),
                                1
                                /* TEXT */
                              )
                            ], !0),
                            te(' <el-icon v-if="item.editable" class="edit-icon" @click="clickEdit(scope)"><Edit /></el-icon> '),
                            s.editable ? (b(), J(ht(e.editIcon), {
                              key: 2,
                              class: "edit-icon",
                              onClick: re((P) => v(p), ["stop"])
                            }, null, 8, ["onClick"])) : te("v-if", !0)
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, 1032, ["label", "prop", "align", "width"]))),
                128
                /* KEYED_FRAGMENT */
              )),
              S(pe, {
                label: c.value.label,
                align: c.value.align,
                width: c.value.width
              }, {
                default: L((s) => [
                  s.row.rowEdit ? U(a.$slots, "editRow", ge(X({ key: 0 }, s)), void 0, !0) : U(a.$slots, "action", ge(X({ key: 1 }, s)), void 0, !0)
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["label", "align", "width"])
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["data", "element-loading-text", "element-loading-spinner", "element-loading-svg", "element-loading-svg-view-box", "element-loading-background", "element-loading-custom-class"])), [
            [st, d.value]
          ]),
          e.pagination ? (b(), $(
            "div",
            {
              key: 0,
              class: "pagination",
              style: vt({ justifyContent: l.value })
            },
            [
              S(it, {
                "current-page": O.value,
                "onUpdate:currentPage": j[0] || (j[0] = (s) => O.value = s),
                "page-size": T.value,
                "onUpdate:pageSize": j[1] || (j[1] = (s) => T.value = s),
                "page-sizes": e.pageSizes,
                layout: "total, sizes, prev, pager, next, jumper",
                total: e.total,
                onSizeChange: tt,
                onCurrentChange: rt
              }, null, 8, ["current-page", "page-size", "page-sizes", "total"])
            ],
            4
            /* STYLE */
          )) : te("v-if", !0)
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
}), Wa = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, c] of t)
    r[n] = c;
  return r;
}, Ja = /* @__PURE__ */ Wa(qa, [["__scopeId", "data-v-526730a9"]]), Ya = {
  install(e) {
    e.component("a-table", Ja);
  }
};
export {
  Ya as default
};
