<template>
  <div>
    <h1>Страница с постами</h1>
    <app-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
    />
    <div class="app_btns">
      <div>
        <app-button class="btn-create-post" @click="dialogVisible = true">Создать пост</app-button>
        <app-button class="btn-create-post" @click="fetchPost">Получить посты</app-button>
      </div>
      <app-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>
    <app-dialog v-model:show="dialogVisible">
      <post-form
          @createPost="createPost"
      />
    </app-dialog>
    <post-list
        v-if="!isLoading"
        :posts="sortedSearchPosts"
        @removePost="removePost"
    />
    <div
        v-else
    >
      Идет загрузка...
    </div>
    <div
        v-intersection="{funcExec: loadMorePosts, funcCheck: isLoadNext}"
        class="observer">
    </div>
  </div>
</template>

<script>
import PostForm from "@/copmonents/PostForm";
import PostList from "@/copmonents/PostList";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
export default {
  components: {
    PostForm, PostList
  },
  data() {
    return {
      dialogVisible: false
    }
  },

  methods: {
    isLoadNext(){
      return this.$store.state.post.page < this.$store.state.post.pageLimit;
    },
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePost',
      fetchPost: 'post/fetchPost'
    }),
    createPost(post){
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post){
      this.posts = this.posts.filter(item=>item.id !== post.id)
    },

  },
  mounted(){
    this.fetchPost()
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isLoading: state => state.post.isLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      pageLimit: state => state.post.pageLimit,
      pageTotal: state => state.post.pageTotal,
      sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedSearchPosts: 'post/sortedSearchPosts'
    })
  },
  watch: {
  }
}
</script>

<style>
.btn-create-post{
  margin-top: 15px;
  margin-left: 15px;
}
.app_btns{
  display: flex;
  justify-content: space-between;
}
.observer{
  height: 30px;
  background: green;
}

</style>
