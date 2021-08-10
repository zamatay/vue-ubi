import {computed, ref} from "vue";

export default function useSearchSortedPosts(sortedPosts){
    const searchQuery = ref('');

    const  searchSortedPosts = computed(()=>{
        const items = sortedPosts.value;
        return items.filter(item=>item.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })

    return {
        searchSortedPosts, searchQuery
    }
}