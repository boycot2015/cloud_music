<template>
    <div class="empty-content flexbox-v align-c just-c">
        <div class="empty-box flexbox-v align-c">
            <div class="img"><img src="@/assets/images/empty.jpg" alt=""></div>
            <div class="empty-text" >{{message}}</div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .empty-content {
        height: 100%;
        min-height: 599px;
        background-color: @white;
        .empty-box {
            .img {
                width: 150px;
                margin: 0 auto;
                img {
                    max-width: 100%;
                }
            }
            .empty-text {
                margin-top: 30px;
                font-size: 12px;
                color: @c-999;
            }
        }
    }
</style>
<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default {
    name: 'error',
    props: {
        msg: {
            type: String,
            default: '访问失败，请重试~'
        }
    },
    setup (props, context) {
        const router = useRouter()
        const state = reactive({
            message: props.msg,
            isLogin: router.currentRoute.value.query.isLogin || false
        })
        const onLogin = () => {
            router.push('/')
        }
        return {
            onLogin,
            ...toRefs(state)
        }
    }
}
</script>
