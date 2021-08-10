export default {
    props: {
      visible:{
          type: Boolean,
          default: false
      }
    },
    methods: {
        hideDialog(){
            this.$emit('update:visible', false);
        }

    },
    mounted() {
    }
}