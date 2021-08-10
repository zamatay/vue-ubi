import axios from "axios";

export const postStore = {
    state: ()=>({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state){
            const items = [...state.posts];
            const sortItems = items.sort((post1, post2)=>post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
            return sortItems;
        },

        sortedSearchPosts(state, getters){
            const items = getters.sortedPosts;
            return items.filter(item=>item.title.includes(state.searchQuery))
        }

    },
    mutations: {
        setPosts(state, posts){
            state.posts = posts
        },
        setIsLoading(state, isLoading){
            state.isLoading = isLoading
        },
        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort
        },
        setSearchQuery(state, searchQuery){
            state.searchQuery = searchQuery
        },
        setPage(state, page){
            state.page = page
        },
        setPageLimit(state, pageLimit){
            state.pageLimit = pageLimit
        },
        setPageTotal(state, pageTotal){
            state.pageTotal = pageTotal
        },
        setSortOptions(state, sortOptions){
            state.sortOptions = sortOptions
        },
    },
    actions: {
        async fetchPost({state, commit}){
            commit('setIsLoading',  true);
            try {
                const url = 'https://jsonplaceholder.typicode.com/posts';
                const response = await axios.get(url, {params: {
                        _page: state.page,
                        _limit: state.pageLimit
                    }});
                commit('setPageTotal', Math.ceil(response.headers['x-total-count']/state.pageLimit));
                commit('setPosts', response.data);
            } catch (e) {
                alert(e)
            } finally {
                commit('setIsLoading',  false);
            }
        },
        async loadMorePost({state, commit}){
            commit('setPage', state.page + 1)
            try {
                const url = 'https://jsonplaceholder.typicode.com/posts';
                const response = await axios.get(url, {params: {
                        _page: state.page,
                        _limit: state.pageLimit
                    }});
                commit('setPageTotal', Math.ceil(response.headers['x-total-count']/state.pageLimit));
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e) {
                alert(e)
            }
        },

    },
    namespaced: true

}