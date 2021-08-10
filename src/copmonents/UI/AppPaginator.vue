<template>
  <div class="page__wrapper">
    <div
        v-for="item in pageTotal"
        :key="item"
        class="page"
        :data-id="item"
        :class="{
              'current-page': item == modelValue
            }"
        @click="clickItem"
    >{{item}}</div>
  </div>

</template>

<script>
export default {
  name: "AppPaginator",
  props: {
    pageTotal: {
      type: Number,
      defaults: 0,
    },
    modelValue: {
      type: Number,
    }
  },
  methods: {
    clickItem(event){
      console.log(event.target.dataset.id);
      this.$emit('update:modelValue', event.target.dataset.id)
    }
  }
}
</script>

<style scoped>
  .page__wrapper{
    display: flex;
    margin-top: 15px;
  }
  .page{
    border: 1px solid black;
    padding: 10px;
  }
  .current-page{
    border: solid 2px teal;
  }
</style>