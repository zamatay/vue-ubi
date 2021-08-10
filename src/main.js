import { createApp } from "vue";
import App from "./App.vue";
import components from "./copmonents/UI"
import directives from "@/directives/index.js"
import router from "./router/router";
import store from "@/store";

const app = createApp(App);
components.forEach((item)=>{
    app.component(item.name, item)
})

directives.forEach((directive)=>{
    app.directive(directive.name, directive)
})

app
    .use(store)
    .use(router)
    .mount("#app");
