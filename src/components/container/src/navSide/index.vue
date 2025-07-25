<template>
  <a-menu :data="data" router :defaultActive="$route.path" :collapse="isCollapse"></a-menu>
</template>

<script lang="ts" setup>
defineProps<{
  isCollapse: boolean;
}>();

const data = [
  {
    icon: "House",
    name: "Home",
    index: "/",
  },
  {
    icon: "CreditCard",
    name: "Menu",
    index: "/menu",
  },
  {
    icon: "CreditCard",
    name: "AForm",
    index: "/form",
  },
  {
    icon: "CreditCard",
    name: "AFormDialog",
    index: "/aFormDialog",
  },
  {
    icon: "CreditCard",
    name: "ATable",
    index: "/table",
  },
  {
    icon: "CreditCard",
    name: "mForm",
    index: "/mForm",
  },
  {
    icon: "Camera",
    name: "chooseIcon",
    index: "/chooseIcon",
  },
  {
    icon: "Watermelon",
    name: "chooseArea",
    index: "/chooseArea",
  },
  {
    icon: "Watermelon",
    name: "mars3D",
    index: "/mars3D",
  },
];
</script>

<style scoped lang="scss"></style>

