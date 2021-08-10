<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
      <app-button class="navbar-btn" @click="$router.push('/pages')">Посты</app-button>
      <app-button class="navbar-btn" @click="$router.push('/about')">О Приложении</app-button>
      <app-button class="navbar-btn" @click="$router.push('/store')">Посты с хранилищем</app-button>
      <app-button class="navbar-btn" @click="$router.push('/composition')">Посты с композицией</app-button>
    </div>
  </div>
</template>

<script>
import AppButton from "./UI/AppButton";
export default {
  name: "Navbar",
  components: {AppButton},
}
</script>

<style scoped>
  .navbar{
    height: 50px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
  }
  .navbar__btns{
    margin-left: auto;
  }

  .navbar-btn{
    margin-left: 15px;
  }
</style>