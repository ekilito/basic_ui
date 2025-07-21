 <template>
  <el-button @click="handelClick" type="primary">
    <slot></slot>
  </el-button>

  <el-dialog :title="title" v-model="localVisible" width="680px">
     <div class="container">
      <div class="container-item" v-for="(item,index) in Object.keys(ELIcons)" :key="index" @click="clickItem(item)">
        <div>
          <component :is="item"></component>
        </div>
        {{ item }}
      </div>
     </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import {ref,watch} from 'vue'
import * as ELIcons from '@element-plus/icons-vue'
import { useCopy } from '../../../hooks/useCopy';

const props = defineProps<{
  visible: boolean,
  title: string
}>()

const localVisible = ref<boolean>(props.visible)

const emits = defineEmits(['update:visible'])

watch(() => props.visible, (val) => {
   localVisible.value = val
})

watch(localVisible, (val) => {
  emits('update:visible', val)
})

const handelClick = () => {
 // localVisible.value = true 
 emits('update:visible', !props.visible)
}

const clickItem = (item: string) => {
   useCopy(item)
   localVisible.value = false
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 568px;
  overflow: auto;

  &-item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 28px;
    cursor: pointer;
    font-size: 14px;
  }
}
svg {
  width: 1.2em;
  height: 1.2em;
}
</style>