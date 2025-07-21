<template>
  <div class="menu-page">
      <a-menu :data="data1" defaultActive="1"></a-menu>
      <a-infinite-menu :data="data2" defaultActive="1"></a-infinite-menu>
  </div>
</template>

<script lang="ts" setup>
const data1 = [
  {
    name: "Home",
    index: "1",
    icon: "Orange",
  },
  {
    name: "Menu",
    index: "2",
    icon: "Orange",
  },
  {
    name: "Icon Picker",
    index: "3",
    icon: "Orange",
    children: [
      {
        name: "form Plus",
        index: "3-1",
        icon: "Orange",
      },
      {
        name: "table Plus",
        index: "3-2",
        icon: "Orange",
      },
    ],
  },
];

const data2 = [
  {
    name: "Home",
    index: "1",
    icon: "Orange",
  },
  {
    name: "Menu",
    index: "2",
    icon: "Orange",
  },
  {
    name: "Icon Picker",
    index: "3",
    icon: "Orange",
    children: [
      {
        name: "form Plus",
        index: "3-1",
        icon: "Orange",
      },
      {
        name: "table Plus",
        index: "3-2",
        icon: "Orange",
        children: [
          {
            name: "form Plus",
            index: "3-2-1",
            icon: "Orange",
          },
          {
            name: "table Plus",
            index: "3-2-2",
            icon: "Orange",
            children: [
              {
                name: "form Plus",
                index: "3-2-2-1",
                icon: "Orange",
              },
              {
                name: "table Plus",
                index: "3-2-2-2",
                icon: "Orange",
              },
            ],
          },
        ],
      },
    ],
  },
];
</script>

<style scoped lang="scss">
.menu-page {
  display: flex;
  height: 100%;
  gap: 100px;
}
</style>

