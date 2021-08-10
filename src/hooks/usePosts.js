import axios from "axios";
import {onMounted, ref} from "vue";

export const usePosts =  (pageLimit)=>{
    const posts = ref([])
    const pageTotal = ref(0)
    const isLoading = ref(true)
    const fetching = async ()=>{
        try {
            const url = 'https://jsonplaceholder.typicode.com/posts';
            const response = await axios.get(url, {params: {
                    _page: 1,
                    _limit: pageLimit
                }});
            pageTotal.value = Math.ceil(response.headers['x-total-count']/pageLimit);
            posts.value = response.data;
        } catch (e) {
            alert(e)
        } finally {
            isLoading.value = false;
        }
    }

    onMounted(fetching)

    return {
        posts, pageTotal, isLoading
    }
}