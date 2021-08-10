<template>
  <div>
    <h1>Страница с постами</h1>
    <app-input
        v-model="searchQuery"
        placeholder="Поиск..."
    />
    <div class="app_btns">
      <div>
        <app-button class="btn-create-post" @click="dialogVisible = true">Создать пост</app-button>
        <app-button class="btn-create-post" @click="fetchPost">Получить посты</app-button>
      </div>
      <app-select
          v-model="selectedSort"
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
  </div>
</template>

<script>
import PostForm from "@/copmonents/PostForm";
import PostList from "@/copmonents/PostList";
import AppInput from "@/copmonents/UI/AppInput";
import useSortedPosts from "../hooks/useSortedPosts";
import useSearchSortedPosts from "../hooks/useSearchSortedPosts";
import {usePosts} from "../hooks/usePosts";
export default {
  components: {
    AppInput,
    PostForm, PostList
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержанию'}
      ]
    }
  },

  methods: {
  },
  mounted(){
  },
  computed: {
  },
  watch: {
  },
  setup(){
    const {posts, pageTotal, isLoading} = usePosts(10)
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, searchSortedPosts} = useSearchSortedPosts(sortedPosts)

    return {
      posts, pageTotal, isLoading, selectedSort, searchQuery, sortedSearchPosts: searchSortedPosts
    }
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
