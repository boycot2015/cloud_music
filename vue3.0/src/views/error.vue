<template>
    <div class="err-content flexbox-v align-c just-c">
        <login-form class="login-box" :showClose="false" v-if="isLogin" @on-success="onLogin"></login-form>
        <div class="error-box flexbox-v align-c" v-else>
            <div class="img"><img src="@/assets/images/error.jpg" alt=""></div>
            <div class="error-text" >{{message}}</div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .err-content {
        height: 100%;
        background-color: @white;
        .error-box {
            .img {
                width: 600px;
                margin: 0 auto;
            }
            .error-text {
                margin-top: 30px;
                font-size: 16px;
                color: @c-666;
            }
        }
    }
</style>
<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import loginForm from '@/views/components/login'
export default {
    name: 'error',
    components: {
        loginForm
    },
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
