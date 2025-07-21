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
];


</script>

<style scoped lang="scss">

</style>
