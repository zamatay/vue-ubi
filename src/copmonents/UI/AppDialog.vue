<template>
  <div class="dialog" v-if="show" @click="$emit('update:show', false)">
    <div class="dialog__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ToggleMixin from "../../mixins/ToggleMixin";

export default {
  name: "app-dialog",
  mixins: [ToggleMixin]
}
</script>

<style scoped>
  .dialog{
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0, 0.5);
    position: fixed;
    display: flex;
  }
  .dialog__content{
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 350px;
    padding: 20px;
  }
</style>