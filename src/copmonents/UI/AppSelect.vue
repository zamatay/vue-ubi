<template>
  <select
      @change="$emit('update:modelValue', $event.target.value)">
    <option disabled name="dis">Выберите из списка</option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
    >{{ option.name }}</option>
  </select>
</template>

<script>
export default {
  name: "app-select",
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: ()=>[]
    }
  },
  methods: {
    changeSelect(event){
      console.log(event.target.value);
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>

</style>