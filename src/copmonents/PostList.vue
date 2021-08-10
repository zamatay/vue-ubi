<template>
  <div v-if="posts.length > 0">
    <transition-group name="post-list">
      <post-item
          v-for="post in posts"
          :post="post"
          :key="post.id"
          @removePost="$emit('removePost', post)"
      />
    </transition-group>
  </div>
  <h2 v-else style="color: red">Пусто</h2>
</template>

<script>
import PostItem from "./PostItem";
export default {
  props: {
    posts: {
      type: Array,
      required: true,
    }
  },
  name: "PostList",
  components:{
    PostItem
  },
  methods: {
    removePost(post){
      console.log(post);
    }
  }
}
</script>

<style scoped>
  .post-list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .post-list-enter-active,
  .post-list-leave-active {
    transition: all .3s ease;
  }
  .post-list-enter-from,
  .post-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
  }
  .post-list-move {
    transition: transform 0.5s ease;
  }
</style>