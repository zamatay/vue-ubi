<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" type="text">
</template>

<script>
export default {
  name: "app-input",
  props: {
    modelValue: [String, Number]
  },
}
</script>

<style scoped>
  input{
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>