<template>
  <div class="timer-picker">
    <el-input-number :controls="false" v-model.number="hours" :min="0" :max="maxHours" @change="validateHours"></el-input-number>
    <span>:</span>
    <el-input-number :controls="false" v-model.number="minutes" :min="0" :max="59" @change="validateMinutes"></el-input-number>
    <span>:</span>
    <el-input-number :controls="false" v-model.number="seconds" :min="0" :max="59" @change="validateSeconds"></el-input-number>
  </div>
</template>


<script setup>
import {ref , watch , computed} from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: "00:00:00"
  },
  maxHours: {
    type: Number,
    default: 10000,
  }
})

const emits = defineEmits(["update:modelValue"])

const parseTime = (timeStr) => {
  const [h,m,s] = timeStr.split(":").map((num) => parseInt(num,10) || 0)
  return {h , m ,s}
}

const {h,m,s } = parseTime(props.modelValue)

const hours = ref(h)
const minutes = ref(m)
const seconds = ref(s)

watch(() => props.modelValue , (newVal) => {
  const {h,m,s} = parseTime(newVal)
  hours.value = h
  minutes.value = m
  seconds.value = s
})

const formattedTime = computed(() => {
  return `${pad(hours.value)}:${pad(minutes.value)}:${pad(seconds.value)}`
})

// 监听内部变量的变化，更新 modelValue
watch([hours, minutes, seconds] , () => {
  console.log(formattedTime.value)
  emits("update:modelValue" , formattedTime.value)
})

const pad = (num) => String(num).padStart(2, '0')

const validateHours = () => {
  if(hours.value < 0) hours.value = 0
  if(hours.value > props.maxHours) hours.value = props.maxHours
}

const validateMinutes = () => {
  if(minutes.value < 0) minutes.value = 0
  if(minutes.value > 59) minutes.value = 59
}

const validateSeconds = () => {
  if(seconds.value < 0) seconds.value = 0
  if(seconds.value > 59) seconds.value = 59
}
</script>

<style scoped lang="scss">
.timer-picker {
  display: flex;
  align-items: center;

  .el-input-number {
    width: 100px;
    padding: 5px;
    margin: 0 5px;
    border-radius: 4px;
    text-align: center;
  }

  span {
    margin: 0 5px;
  }
}
</style>