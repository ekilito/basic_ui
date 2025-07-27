import { defineComponent as Qe, ref as Y, onMounted as et, watch as tt, resolveComponent as k, createBlock as w, createCommentVNode as J, unref as j, openBlock as h, mergeProps as G, withCtx as x, createElementBlock as Z, createVNode as rt, Fragment as Q, renderList as pe, resolveDynamicComponent as ee, renderSlot as te } from "vue";
function nt() {
  this.__data__ = [], this.size = 0;
}
function De(e, t) {
  return e === t || e !== e && t !== t;
}
function H(e, t) {
  for (var r = e.length; r--; )
    if (De(e[r][0], t))
      return r;
  return -1;
}
var ot = Array.prototype, at = ot.splice;
function st(e) {
  var t = this.__data__, r = H(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : at.call(t, r, 1), --this.size, !0;
}
function it(e) {
  var t = this.__data__, r = H(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function ct(e) {
  return H(this.__data__, e) > -1;
}
function ut(e, t) {
  var r = this.__data__, n = H(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function m(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
m.prototype.clear = nt;
m.prototype.delete = st;
m.prototype.get = it;
m.prototype.has = ct;
m.prototype.set = ut;
function lt() {
  this.__data__ = new m(), this.size = 0;
}
function pt(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function ft(e) {
  return this.__data__.get(e);
}
function dt(e) {
  return this.__data__.has(e);
}
var Fe = typeof global == "object" && global && global.Object === Object && global, gt = typeof self == "object" && self && self.Object === Object && self, y = Fe || gt || Function("return this")(), P = y.Symbol, Ue = Object.prototype, bt = Ue.hasOwnProperty, ht = Ue.toString, D = P ? P.toStringTag : void 0;
function yt(e) {
  var t = bt.call(e, D), r = e[D];
  try {
    e[D] = void 0;
    var n = !0;
  } catch {
  }
  var i = ht.call(e);
  return n && (t ? e[D] = r : delete e[D]), i;
}
var _t = Object.prototype, vt = _t.toString;
function jt(e) {
  return vt.call(e);
}
var Tt = "[object Null]", mt = "[object Undefined]", fe = P ? P.toStringTag : void 0;
function V(e) {
  return e == null ? e === void 0 ? mt : Tt : fe && fe in Object(e) ? yt(e) : jt(e);
}
function q(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var $t = "[object AsyncFunction]", wt = "[object Function]", At = "[object GeneratorFunction]", Ot = "[object Proxy]";
function Be(e) {
  if (!q(e))
    return !1;
  var t = V(e);
  return t == wt || t == At || t == $t || t == Ot;
}
var re = y["__core-js_shared__"], de = function() {
  var e = /[^.]+$/.exec(re && re.keys && re.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function St(e) {
  return !!de && de in e;
}
var xt = Function.prototype, Pt = xt.toString;
function O(e) {
  if (e != null) {
    try {
      return Pt.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Ct = /[\\^$.*+?()[\]{}|]/g, Et = /^\[object .+?Constructor\]$/, It = Function.prototype, Mt = Object.prototype, Dt = It.toString, Ft = Mt.hasOwnProperty, Ut = RegExp(
  "^" + Dt.call(Ft).replace(Ct, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Bt(e) {
  if (!q(e) || St(e))
    return !1;
  var t = Be(e) ? Ut : Et;
  return t.test(O(e));
}
function Vt(e, t) {
  return e?.[t];
}
function S(e, t) {
  var r = Vt(e, t);
  return Bt(r) ? r : void 0;
}
var U = S(y, "Map"), B = S(Object, "create");
function zt() {
  this.__data__ = B ? B(null) : {}, this.size = 0;
}
function Rt(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Nt = "__lodash_hash_undefined__", Gt = Object.prototype, Lt = Gt.hasOwnProperty;
function Ht(e) {
  var t = this.__data__;
  if (B) {
    var r = t[e];
    return r === Nt ? void 0 : r;
  }
  return Lt.call(t, e) ? t[e] : void 0;
}
var qt = Object.prototype, Kt = qt.hasOwnProperty;
function Wt(e) {
  var t = this.__data__;
  return B ? t[e] !== void 0 : Kt.call(t, e);
}
var Xt = "__lodash_hash_undefined__";
function Yt(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = B && t === void 0 ? Xt : t, this;
}
function A(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
A.prototype.clear = zt;
A.prototype.delete = Rt;
A.prototype.get = Ht;
A.prototype.has = Wt;
A.prototype.set = Yt;
function kt() {
  this.size = 0, this.__data__ = {
    hash: new A(),
    map: new (U || m)(),
    string: new A()
  };
}
function Jt(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function K(e, t) {
  var r = e.__data__;
  return Jt(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function Zt(e) {
  var t = K(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Qt(e) {
  return K(this, e).get(e);
}
function er(e) {
  return K(this, e).has(e);
}
function tr(e, t) {
  var r = K(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function E(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
E.prototype.clear = kt;
E.prototype.delete = Zt;
E.prototype.get = Qt;
E.prototype.has = er;
E.prototype.set = tr;
var rr = 200;
function nr(e, t) {
  var r = this.__data__;
  if (r instanceof m) {
    var n = r.__data__;
    if (!U || n.length < rr - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new E(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function I(e) {
  var t = this.__data__ = new m(e);
  this.size = t.size;
}
I.prototype.clear = lt;
I.prototype.delete = pt;
I.prototype.get = ft;
I.prototype.has = dt;
I.prototype.set = nr;
function or(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var ge = function() {
  try {
    var e = S(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
function ar(e, t, r) {
  t == "__proto__" && ge ? ge(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var sr = Object.prototype, ir = sr.hasOwnProperty;
function cr(e, t, r) {
  var n = e[t];
  (!(ir.call(e, t) && De(n, r)) || r === void 0 && !(t in e)) && ar(e, t, r);
}
function ur(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
function z(e) {
  return e != null && typeof e == "object";
}
var lr = "[object Arguments]";
function be(e) {
  return z(e) && V(e) == lr;
}
var Ve = Object.prototype, pr = Ve.hasOwnProperty, fr = Ve.propertyIsEnumerable, dr = be(/* @__PURE__ */ function() {
  return arguments;
}()) ? be : function(e) {
  return z(e) && pr.call(e, "callee") && !fr.call(e, "callee");
}, ce = Array.isArray;
function gr() {
  return !1;
}
var ze = typeof exports == "object" && exports && !exports.nodeType && exports, he = ze && typeof module == "object" && module && !module.nodeType && module, br = he && he.exports === ze, ye = br ? y.Buffer : void 0, hr = ye ? ye.isBuffer : void 0, Re = hr || gr, yr = 9007199254740991, _r = /^(?:0|[1-9]\d*)$/;
function vr(e, t) {
  var r = typeof e;
  return t = t ?? yr, !!t && (r == "number" || r != "symbol" && _r.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var jr = 9007199254740991;
function Ne(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= jr;
}
var Tr = "[object Arguments]", mr = "[object Array]", $r = "[object Boolean]", wr = "[object Date]", Ar = "[object Error]", Or = "[object Function]", Sr = "[object Map]", xr = "[object Number]", Pr = "[object Object]", Cr = "[object RegExp]", Er = "[object Set]", Ir = "[object String]", Mr = "[object WeakMap]", Dr = "[object ArrayBuffer]", Fr = "[object DataView]", Ur = "[object Float32Array]", Br = "[object Float64Array]", Vr = "[object Int8Array]", zr = "[object Int16Array]", Rr = "[object Int32Array]", Nr = "[object Uint8Array]", Gr = "[object Uint8ClampedArray]", Lr = "[object Uint16Array]", Hr = "[object Uint32Array]", s = {};
s[Ur] = s[Br] = s[Vr] = s[zr] = s[Rr] = s[Nr] = s[Gr] = s[Lr] = s[Hr] = !0;
s[Tr] = s[mr] = s[Dr] = s[$r] = s[Fr] = s[wr] = s[Ar] = s[Or] = s[Sr] = s[xr] = s[Pr] = s[Cr] = s[Er] = s[Ir] = s[Mr] = !1;
function qr(e) {
  return z(e) && Ne(e.length) && !!s[V(e)];
}
function ue(e) {
  return function(t) {
    return e(t);
  };
}
var Ge = typeof exports == "object" && exports && !exports.nodeType && exports, F = Ge && typeof module == "object" && module && !module.nodeType && module, Kr = F && F.exports === Ge, ne = Kr && Fe.process, C = function() {
  try {
    var e = F && F.require && F.require("util").types;
    return e || ne && ne.binding && ne.binding("util");
  } catch {
  }
}(), _e = C && C.isTypedArray, Wr = _e ? ue(_e) : qr, Xr = Object.prototype, Yr = Xr.hasOwnProperty;
function kr(e, t) {
  var r = ce(e), n = !r && dr(e), i = !r && !n && Re(e), p = !r && !n && !i && Wr(e), u = r || n || i || p, _ = u ? ur(e.length, String) : [], g = _.length;
  for (var f in e)
    Yr.call(e, f) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
    (f == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (f == "offset" || f == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    p && (f == "buffer" || f == "byteLength" || f == "byteOffset") || // Skip index properties.
    vr(f, g))) && _.push(f);
  return _;
}
var Jr = Object.prototype;
function Le(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || Jr;
  return e === r;
}
function He(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Zr = He(Object.keys, Object), Qr = Object.prototype, en = Qr.hasOwnProperty;
function tn(e) {
  if (!Le(e))
    return Zr(e);
  var t = [];
  for (var r in Object(e))
    en.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function rn(e) {
  return e != null && Ne(e.length) && !Be(e);
}
function nn(e) {
  return rn(e) ? kr(e) : tn(e);
}
var qe = typeof exports == "object" && exports && !exports.nodeType && exports, ve = qe && typeof module == "object" && module && !module.nodeType && module, on = ve && ve.exports === qe, je = on ? y.Buffer : void 0;
je && je.allocUnsafe;
function an(e, t) {
  return e.slice();
}
function sn(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, i = 0, p = []; ++r < n; ) {
    var u = e[r];
    t(u, r, e) && (p[i++] = u);
  }
  return p;
}
function cn() {
  return [];
}
var un = Object.prototype, ln = un.propertyIsEnumerable, Te = Object.getOwnPropertySymbols, pn = Te ? function(e) {
  return e == null ? [] : (e = Object(e), sn(Te(e), function(t) {
    return ln.call(e, t);
  }));
} : cn;
function fn(e, t) {
  for (var r = -1, n = t.length, i = e.length; ++r < n; )
    e[i + r] = t[r];
  return e;
}
var dn = He(Object.getPrototypeOf, Object);
function gn(e, t, r) {
  var n = t(e);
  return ce(e) ? n : fn(n, r(e));
}
function bn(e) {
  return gn(e, nn, pn);
}
var oe = S(y, "DataView"), ae = S(y, "Promise"), se = S(y, "Set"), ie = S(y, "WeakMap"), me = "[object Map]", hn = "[object Object]", $e = "[object Promise]", we = "[object Set]", Ae = "[object WeakMap]", Oe = "[object DataView]", yn = O(oe), _n = O(U), vn = O(ae), jn = O(se), Tn = O(ie), T = V;
(oe && T(new oe(new ArrayBuffer(1))) != Oe || U && T(new U()) != me || ae && T(ae.resolve()) != $e || se && T(new se()) != we || ie && T(new ie()) != Ae) && (T = function(e) {
  var t = V(e), r = t == hn ? e.constructor : void 0, n = r ? O(r) : "";
  if (n)
    switch (n) {
      case yn:
        return Oe;
      case _n:
        return me;
      case vn:
        return $e;
      case jn:
        return we;
      case Tn:
        return Ae;
    }
  return t;
});
var mn = Object.prototype, $n = mn.hasOwnProperty;
function wn(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && $n.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var Se = y.Uint8Array;
function le(e) {
  var t = new e.constructor(e.byteLength);
  return new Se(t).set(new Se(e)), t;
}
function An(e, t) {
  var r = le(e.buffer);
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var On = /\w*$/;
function Sn(e) {
  var t = new e.constructor(e.source, On.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var xe = P ? P.prototype : void 0, Pe = xe ? xe.valueOf : void 0;
function xn(e) {
  return Pe ? Object(Pe.call(e)) : {};
}
function Pn(e, t) {
  var r = le(e.buffer);
  return new e.constructor(r, e.byteOffset, e.length);
}
var Cn = "[object Boolean]", En = "[object Date]", In = "[object Map]", Mn = "[object Number]", Dn = "[object RegExp]", Fn = "[object Set]", Un = "[object String]", Bn = "[object Symbol]", Vn = "[object ArrayBuffer]", zn = "[object DataView]", Rn = "[object Float32Array]", Nn = "[object Float64Array]", Gn = "[object Int8Array]", Ln = "[object Int16Array]", Hn = "[object Int32Array]", qn = "[object Uint8Array]", Kn = "[object Uint8ClampedArray]", Wn = "[object Uint16Array]", Xn = "[object Uint32Array]";
function Yn(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case Vn:
      return le(e);
    case Cn:
    case En:
      return new n(+e);
    case zn:
      return An(e);
    case Rn:
    case Nn:
    case Gn:
    case Ln:
    case Hn:
    case qn:
    case Kn:
    case Wn:
    case Xn:
      return Pn(e);
    case In:
      return new n();
    case Mn:
    case Un:
      return new n(e);
    case Dn:
      return Sn(e);
    case Fn:
      return new n();
    case Bn:
      return xn(e);
  }
}
var Ce = Object.create, kn = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!q(t))
      return {};
    if (Ce)
      return Ce(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
function Jn(e) {
  return typeof e.constructor == "function" && !Le(e) ? kn(dn(e)) : {};
}
var Zn = "[object Map]";
function Qn(e) {
  return z(e) && T(e) == Zn;
}
var Ee = C && C.isMap, eo = Ee ? ue(Ee) : Qn, to = "[object Set]";
function ro(e) {
  return z(e) && T(e) == to;
}
var Ie = C && C.isSet, no = Ie ? ue(Ie) : ro, Ke = "[object Arguments]", oo = "[object Array]", ao = "[object Boolean]", so = "[object Date]", io = "[object Error]", We = "[object Function]", co = "[object GeneratorFunction]", uo = "[object Map]", lo = "[object Number]", Xe = "[object Object]", po = "[object RegExp]", fo = "[object Set]", go = "[object String]", bo = "[object Symbol]", ho = "[object WeakMap]", yo = "[object ArrayBuffer]", _o = "[object DataView]", vo = "[object Float32Array]", jo = "[object Float64Array]", To = "[object Int8Array]", mo = "[object Int16Array]", $o = "[object Int32Array]", wo = "[object Uint8Array]", Ao = "[object Uint8ClampedArray]", Oo = "[object Uint16Array]", So = "[object Uint32Array]", a = {};
a[Ke] = a[oo] = a[yo] = a[_o] = a[ao] = a[so] = a[vo] = a[jo] = a[To] = a[mo] = a[$o] = a[uo] = a[lo] = a[Xe] = a[po] = a[fo] = a[go] = a[bo] = a[wo] = a[Ao] = a[Oo] = a[So] = !0;
a[io] = a[We] = a[ho] = !1;
function L(e, t, r, n, i, p) {
  var u;
  if (u !== void 0)
    return u;
  if (!q(e))
    return e;
  var _ = ce(e);
  if (_)
    u = wn(e);
  else {
    var g = T(e), f = g == We || g == co;
    if (Re(e))
      return an(e);
    if (g == Xe || g == Ke || f && !i)
      u = f ? {} : Jn(e);
    else {
      if (!a[g])
        return i ? e : {};
      u = Yn(e, g);
    }
  }
  p || (p = new I());
  var R = p.get(e);
  if (R)
    return R;
  p.set(e, u), no(e) ? e.forEach(function(b) {
    u.add(L(b, t, r, b, e, p));
  }) : eo(e) && e.forEach(function(b, v) {
    u.set(v, L(b, t, r, v, e, p));
  });
  var W = bn, N = _ ? void 0 : W(e);
  return or(N || e, function(b, v) {
    N && (v = b, b = e[v]), cr(u, v, L(b, t, r, v, e, p));
  }), u;
}
var xo = 1, Po = 4;
function Me(e) {
  return L(e, xo | Po);
}
const Co = /* @__PURE__ */ Qe({
  __name: "index",
  props: {
    // 表单的配置项
    options: {
      type: Array,
      required: !0
    },
    // 用户自定义上传
    httpRequest: {
      type: Function
    }
  },
  emits: [
    "on-preview",
    "on-remove",
    "on-success",
    "on-error",
    "on-progress",
    "on-change",
    "on-exceed",
    "before-upload",
    "before-remove"
  ],
  setup(e, { emit: t }) {
    const r = t;
    let n = e, i = Y(null), p = Y(null), u = Y();
    const _ = () => {
      if (n.options && n.options.length) {
        let o = {}, l = {};
        n.options.map((d) => {
          o[d.prop] = d.value, l[d.prop] = d.rules;
        }), i.value = Me(o), p.value = Me(l);
      }
    };
    et(() => {
      _();
    }), tt(
      () => n.options,
      () => {
        _();
      },
      { deep: !0 }
    );
    const g = (o) => {
      r("on-preview", o);
    }, f = (o, l) => {
      r("on-remove", { uploadFile: o, uploadFiles: l });
    }, R = (o, l, d) => {
      let M = n.options.find((X) => X.type == "upload");
      i.value[M.prop] = { response: o, uploadFile: l, uploadFiles: d }, r("on-success", { response: o, uploadFile: l, uploadFiles: d });
    }, W = (o, l, d) => {
      r("on-error", { error: o, uploadFile: l, uploadFiles: d });
    }, N = (o, l, d) => {
      r("on-progress", { evt: o, uploadFile: l, uploadFiles: d });
    }, b = (o, l) => {
      r("on-change", { uploadFile: o, uploadFiles: l });
    }, v = (o, l) => {
      r("on-exceed", { files: o, uploadFiles: l });
    }, Ye = (o) => {
      r("before-upload", o);
    }, ke = (o, l) => {
      r("before-remove", { uploadFile: o, uploadFiles: l });
    };
    return (o, l) => {
      const d = k("el-upload"), M = k("el-form-item"), X = k("el-form");
      return j(i) ? (h(), w(X, G({
        key: 0,
        ref_key: "formRef",
        ref: u,
        model: j(i),
        rules: j(p)
      }, o.$attrs, { "validate-on-rule-change": !1 }), {
        default: x(() => [
          (h(!0), Z(
            Q,
            null,
            pe(e.options, (c, Je) => (h(), Z(
              Q,
              { key: Je },
              [
                !c.children || !c.children.length ? (h(), w(M, {
                  key: 0,
                  label: c.label,
                  prop: c.prop
                }, {
                  default: x(() => [
                    c.type !== "upload" ? (h(), w(ee(`el-${c.type}`), G({
                      key: 0,
                      placeholder: c.placeholder
                    }, { ref_for: !0 }, c.attrs, {
                      modelValue: j(i)[c.prop],
                      "onUpdate:modelValue": ($) => j(i)[c.prop] = $
                    }), null, 16, ["placeholder", "modelValue", "onUpdate:modelValue"])) : (h(), w(d, G({
                      key: 1,
                      ref_for: !0
                    }, c.uploadAttrs, {
                      "on-preview": g,
                      "on-remove": f,
                      "on-success": R,
                      "on-error": W,
                      "on-progress": N,
                      "on-change": b,
                      "on-exceed": v,
                      "before-upload": Ye,
                      "before-remove": ke,
                      "http-request": e.httpRequest
                    }), {
                      default: x(() => [
                        te(o.$slots, "uploadArea"),
                        te(o.$slots, "uploadTip")
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1040, ["http-request"]))
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, 1032, ["label", "prop"])) : J("v-if", !0),
                c.children && c.children.length ? (h(), w(M, {
                  key: 1,
                  label: c.label,
                  prop: c.prop
                }, {
                  default: x(() => [
                    (h(), w(ee(`el-${c.type}`), G({
                      placeholder: c.placeholder
                    }, { ref_for: !0 }, c.attrs, {
                      modelValue: j(i)[c.prop],
                      "onUpdate:modelValue": ($) => j(i)[c.prop] = $
                    }), {
                      default: x(() => [
                        (h(!0), Z(
                          Q,
                          null,
                          pe(c.children, ($, Ze) => (h(), w(ee(`el-${$.type}`), {
                            key: Ze,
                            label: $.label,
                            value: $.value
                          }, null, 8, ["label", "value"]))),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1040, ["placeholder", "modelValue", "onUpdate:modelValue"]))
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, 1032, ["label", "prop"])) : J("v-if", !0)
              ],
              64
              /* STABLE_FRAGMENT */
            ))),
            128
            /* KEYED_FRAGMENT */
          )),
          rt(M, null, {
            default: x(() => [
              te(o.$slots, "action", {
                form: j(u),
                model: j(i)
              })
            ]),
            _: 3
            /* FORWARDED */
          })
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["model", "rules"])) : J("v-if", !0);
    };
  }
}), Io = {
  install(e) {
    e.component("m-form", Co);
  }
};
export {
  Io as default
};
