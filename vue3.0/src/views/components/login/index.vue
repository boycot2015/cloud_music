<template>
    <div class="login-form flexbox-v align-c" @dblclick.stop>
        <i class="icon-music-close btn-close" @click.stop="onClose"></i>
        <div class="logo">
            <img src="" alt="">
        </div>
        <div class="wrap">
            <div class="login-form-item flexbox-h">
                <label for="phone" class="phone">
                    <i class="icon-music-phone"></i>
                    <span>+86</span>
                </label>
                <input type="text" maxlength="11" v-model="form.phone" id="phone" class="phone flex-3" placeholder="请输入手机号">
            </div>
            <div class="login-form-item flexbox-h align-c">
                <label for="password" class="password">
                    <i class="icon-music-eyes"></i>
                </label>
                <input type="password" id="password" class="password flex-2" v-model="form.password" placeholder="请输入密码">
                <span class="reset flex-1" @click="form.password = ''">重设密码</span>
            </div>
        </div>
        <div class="login-form-item flexbox-h align-c">
            <input id="remember" type="checkbox" v-model="form.remember">
            <label for="remember">自动登录</label>
        </div>
        <div class="login-form-item tc">
            <input type="button" @click="onSubmit" value="登录">
        </div>
        <div class="login-form-item tc">
            <router-link to="/register">注册</router-link>
        </div>
        <div class="login-form-item tc flexbox-h align-c">
            <input id="proxy" type="checkbox" v-model="form.aggress">
            <label for="proxy">
                同意
                <router-link to="/register">《服务条款》</router-link>
                <router-link to="/register">《隐私政策》</router-link>
                <router-link to="/register">《儿童隐私政策》</router-link>
            </label>
        </div>
    </div>
</template>
<style lang="less" scoped>
.login {
    &-form {
        width: 300px;
        min-height: 400px;
        padding: 30px;
        box-shadow: 0 10px 10px @c-ccc;
        background: @white;
        position: absolute;
        top: -12px;
        left: -120px;
        z-index: 10000;
        .wrap {
            border: 1px solid @c-e8;
            border-radius: 3px;
            margin-bottom: 20px;
            width: 100%;
            .login-form-item {
                margin-bottom: 0;
                input {
                    height: 40px;
                    line-height: 40px;
                }
                label {
                    padding: 0 10px;
                    height: 40px;
                    line-height: 40px;
                    border-right: 1px solid @c-e8;
                }
                label.password {
                    padding-right: 0;
                    border-right: 0;
                }
            }
            .login-form-item:first-child {
                padding-right: 0;
                border-bottom: 1px solid @c-e8;
            }
        }
        .logo {
            width: 200px;
            height: 100px;
            background: @c-ccc;
            margin: 30px auto;
        }
        .btn-close {
            position: absolute;
            right: 20px;
            top: 20px;
            cursor: pointer;
        }
        &-item {
            margin-bottom: 20px;
            width: 100%;
            &:last-child {
                margin-bottom: 0;
            }
            input {
                width: auto;
                color: @c-333;
            }
            label,span {
                color: @c-999;
            }
            input[type="checkbox"] {
                margin-right: 5px;
            }
            input[type="button"] {
                width: 100%;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                color: @white;
                border-radius: 3px;
                cursor: pointer;
                background: @primary;
            }
            label {
                color: @c-999;
                font-size: 12px;
            }
            .reset {
                padding-left: 10px;
            }
            a {
                color: deepskyblue;
            }
        }
    }
}
</style>
<script>
import {
    // ref,
    // computed,
    // watch,
    reactive,
    toRefs
    // getCurrentInstance
} from 'vue'
import {
    useStore
} from 'vuex'
import {
    useRouter
} from 'vue-router'
export default {
    name: 'login',
    setup (props, { emit }) {
        const store = useStore()
        const state = reactive({
            form: {
                aggress: false
            }
        })
        const router = useRouter()
        const onClose = () => {
            emit('on-close', true)
        }
        const onSubmit = () => {
            store.dispatch('user/loginByPhone', state.form).then(res => {
                emit('on-close', true)
                emit('on-success', true)
            })
        }
        return {
            router,
            onClose,
            onSubmit,
            ...toRefs(state)
        }
    }
}
</script>
