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
    <!--    <app-paginator-->
    <!--        v-model="page"-->
    <!--        :page-total="pageTotal"-->
    <!--    />-->
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
    <div v-intersection="{funcExec: loadMorePost, funcCheck: isLoadNext}" class="observer">

    </div>
    <!--    <app-paginator-->
    <!--        v-model="page"-->
    <!--        :page-total="pageTotal"-->
    <!--    />-->
  </div>
</template>

<script>
import PostForm from "@/copmonents/PostForm";
import PostList from "@/copmonents/PostList";
import axios from "axios";
import AppInput from "@/copmonents/UI/AppInput";
export default {
  components: {
    AppInput,
    PostForm, PostList
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isLoading: false,
      selectedSort: '',
      searchQuery:'',
      page: 1,
      pageLimit: 10,
      pageTotal: 0,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержанию'}
      ]
    }
  },

  methods: {
    isLoadNext(){
      return this.page < this.pageTotal;
    },
    changePage(item){
      this.page = item;
    },
    createPost(post){
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post){
      this.posts = this.posts.filter(item=>item.id !== post.id)
    },
    async fetchPost(){
      this.isLoading = true;
      try {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const response = await axios.get(url, {params: {
            _page: this.page,
            _limit: this.pageLimit
          }});
        this.pageTotal = Math.ceil(response.headers['x-total-count']/this.pageLimit);
        this.posts = response.data;
        this.isLoading = false;
      } catch (e) {
        alert(e)
      } finally {
        this.isLoading = false;
      }
    },
    async loadMorePost(){
      this.page += 1;
      try {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const response = await axios.get(url, {params: {
            _page: this.page,
            _limit: this.pageLimit
          }});
        this.pageTotal = Math.ceil(response.headers['x-total-count']/this.pageLimit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert(e)
      }
    },

  },
  mounted(){
    this.fetchPost()
  },
  computed: {
    sortedPosts(){
      const items = [...this.posts];
      const sortItems = items.sort((post1, post2)=>post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
      return sortItems;
    },

    sortedSearchPosts(){
      const items = this.sortedPosts;
      return items.filter(item=>item.title.includes(this.searchQuery))
    }
  },
  watch: {
    // page(){
    //   this.fetchPost()
    // }
    // selectedSort(newValue){
    //   this.posts.sort((post1, post2)=>{
    //     return post1[newValue]?.localeCompare(post2[this.selectedSort])
    //   })
    // }
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
