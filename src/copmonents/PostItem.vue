<template>
  <div class="post">
    <div>
      <div><strong>Название:</strong>{{ post.id}}</div>
      <div><strong>Название:</strong>{{ post.title}}</div>
      <div><strong>Описание:</strong>{{ post.body}}</div>
    </div>
    <div>
      <app-button
          @click="$router.push(`/page/${post.id}`)"
      >
        Открыть
      </app-button>
      <app-button
          @click="$emit('removePost', post)"
      >
        Удалить
      </app-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post:{
      type: Object,
      required: true,
    }
  },
  methods: {
    removePost(){
      this.$emit('removePost', this.props)
    }
  }
}
</script>

<style scoped>
  .post{
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

</style>