export default {
    mounted(el, binding) {
        const options = {
          rootMargin: '0px',
          threshold: 1.0
        }
        const callback = (entries)=>{
            if (entries[0].isIntersecting && binding.value.funcCheck && binding.value.funcCheck()){
                binding.value.funcExec()
          }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    },
    name:'intersection'
}