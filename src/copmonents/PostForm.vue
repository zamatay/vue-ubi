<template>
  <form @submit.prevent>
    <h4>Создать пост</h4>
    <app-input
        v-focus
        v-model="post.title"
        type="text"
        placeholder="Название"/>
    <app-input
        v-model="post.body"
        type="text"
        placeholder="Описание"/>
    <app-button
        class="btn"
        @click="createPost"
    >Создать</app-button>
  </form>
</template>

<script>
export default {
  name: "PostForm",
  methods: {
    createPost(){
      this.post.id = Date.now();
      this.$emit('createPost', this.post);
      this.post = {title: "", body: ""}
    },
  },
  data(){
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  watch: {
    post: {
      handler(newValue){
        console.log(newValue);
      },
      deep: true
    }
  }
}

</script>

<style scoped>
  form{
    display: flex;
    flex-direction: column;
  }
  .btn{
    margin-top: 15px;
    align-self: flex-end;
  }

</style>