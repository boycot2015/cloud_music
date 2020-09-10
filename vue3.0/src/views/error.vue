<template>
  <div class="error">{{message}}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
    name: 'error',
    props: {
        msg: {
            type: String,
            default: '访问失败，请重试~'
        }
    },
    setup (props, context) {
        const state = reactive({
            message: props.msg
        })
        return {
            ...toRefs(state)
        }
    }
}
</script>

<style>

</style>
