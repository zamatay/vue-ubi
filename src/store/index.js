import {createStore} from "vuex";
import {postStore} from "./postStore";

export default createStore({
    modules: {
        post: postStore
    }
})