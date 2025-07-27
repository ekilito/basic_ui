import { defineComponent as v, ref as r, watch as n, resolveComponent as s, createBlock as b, openBlock as V, mergeProps as _, withCtx as f, renderSlot as g, createVNode as I } from "vue";
const k = /* @__PURE__ */ v({
  __name: "index",
  props: {
    visible: {
      type: Boolean,
      default: !1
    },
    formItems: Array,
    formData: Object
  },
  emits: ["update:visible"],
  setup(o, { emit: i }) {
    const l = o, a = r(), d = i, t = r(l.visible);
    return n(() => l.visible, (e) => {
      t.value = e;
    }), n(() => t.value, (e) => {
      d("update:visible", e);
    }), (e, m) => {
      const u = s("a-form"), c = s("el-dialog");
      return V(), b(c, _({
        modelValue: t.value,
        "onUpdate:modelValue": m[0] || (m[0] = (p) => t.value = p)
      }, e.$attrs), {
        default: f(() => [
          I(u, {
            formItems: o.formItems,
            modelValue: o.formData,
            ref_key: "formRef",
            ref: a
          }, null, 8, ["formItems", "modelValue"])
        ]),
        footer: f(() => [
          g(e.$slots, "footer", { form: a.value })
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["modelValue"]);
    };
  }
}), y = {
  install(o) {
    o.component("a-form-dialog", k);
  }
};
export {
  y as default
};
