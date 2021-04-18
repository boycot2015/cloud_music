<template>
    <div ref="elRef" v-show="opened" class="message__box" :class="{'message__box-closed': closeCls}" :id="id">
        <!-- //蒙版 -->
        <div v-if="JSON.parse(shade)" :class="['anim-'+anim, type&&'popui__'+type, tipArrow]" class="message__box__overlay" @click="shadeClicked" :style="{opacity}"></div>
        <div class="message__box__wrap" :class="['anim-'+anim, type&&'popui__'+type, tipArrow]" :style="[layerStyle]">
            <div v-if="title && content" class="message__box__wrap-tit" v-html="title"></div>
            <div v-if="type=='toast'&&icon" class="message__box__toast-icon" :class="['message__box__toast-'+icon]" v-html="toastIcon[icon]"></div>
            <div class="message__box__wrap-cntbox">
                <!-- 判断插槽是否存在 -->
                <template v-if="$slots.content">
                    <div class="message__box__wrap-cnt"><slot name="content" /></div>
                </template>
                <template v-else>
                    <template v-if="content">
                        <iframe v-if="type=='iframe'" scrolling="auto" allowtransparency="true" frameborder="0" :src="content"></iframe>
                        <!-- message|notify|popover -->
                        <div v-else-if="type=='message' || type=='notify' || type=='popover'" class="message__box__wrap-cnt">
                            <i v-if="icon" class="message-msg__icon" :class="icon" v-html="messageIcon[icon]"></i>
                            <div class="message-msg__group">
                                <!-- <div v-if="title" class="message-msg__title" v-html="title"></div> -->
                                <div v-html="content"></div></div>
                        </div>
                        <div v-else class="message__box__wrap-cnt" v-html="content"></div>
                    </template>
                </template>
                <slot />
            </div>
            <div v-if="btns" class="message__box__wrap-btns">
                <span v-for="(btn,index) in btns" :key="index" class="btn" :class="btn.class" :style="btn.style" @click="btnClicked($event,index)" v-html="btn.text"></span>
            </div>
            <span v-if="xclose" class="message__box__xclose" :class="!maximize&&xposition" :style="{'color': xcolor}" @click="close"></span>
            <span v-if="maximize" class="message__box__maximize" @click="maximizeClicked($event)"></span>
            <span v-if="resize" class="message__box__resize"></span>
        </div>
        <!-- 优化拖拽卡顿 -->
        <div class="message__box__dragfix"></div>
    </div>
</template>
<style lang="less">
.message__box {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    z-index: 100000;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        &.anim-fadeIn {
            animation: anim-fadeIn 0.3s;
        }
    }
    &__wrap {
        position: relative;
        width: 300px;
        min-height: 140px;
        text-align: center;
        border-radius: 5px;
        background: @white;
        z-index: 10;
        &.anim-scaleIn {
            animation: anim-scaleIn 0.5s;
        }
        &-cntbox {
            padding: 20px;
        }
        &-tit {
            font-size: 14px;
            line-height: 32px;
            color: @c-333;
        }
        &-btns {
            position: absolute;
            bottom: 20px;
            left: 0;
            width: 100%;
            .btn {
                font-size: 12px;
                margin-right: 10px;
                border: 1px solid @c-ccc;
                padding: 5px 10px;
                border-radius: 4px;
                color: @c-666;
                cursor: pointer;
                transition: all 0.5s;
                &:last-child {
                    margin-right: 0;
                }
                &:hover {
                    border: 1px solid @primary;
                    color: @primary;
                }
                &-primary {
                    color: @white;
                    border: 1px solid @primary;
                    background: @primary;
                    &:hover {
                        opacity: 0.8;
                        color: @white;
                    }
                }
            }
        }
    }
    &__xclose {
        &::after {
            position: absolute;
            top: 5px;
            right: 10px;
            width: 15px;
            height: 15px;
            font-size: 20px;
            color: @c-666;
            z-index: 10000;
            content: '×';
            cursor: pointer;
        }
        &:hover::after {
            color: @primary;
        }
    }
}
@keyframes anim-fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes anim-scaleIn {
    0% {
        transform: scale(0);
    }
    100% {
       transform: scale(1);
    }
}
@keyframes anim-close {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    100% {
        transform: translate3d(100%, 0, 0);
        opacity: 0;
    }
}
</style>
<script>
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
/**
 * @Desc     Vue3.0桌面端弹窗组件v3layer
 * @Time     boycot by 2021-4
 * @About    Q：1134573460 wx：ZCH1848
 */
import { onMounted, onUnmounted, ref, reactive, watch, toRefs, nextTick } from 'vue'
import domUtils from '@/utils/dom.js'
// 索引，蒙层控制，定时器
let $index = 0; let $locknum = 0; const $timer = {}; let $closeTimer = null
export default {
    props: {
        // ...
        modelValue: {
            type: [Object, Boolean],
            default: true
        },
        id: {
            type: [String],
            default: ''
        },
        title: {
            type: [String],
            default: '温馨提示'
        },
        content: {
            type: [Object, String],
            default: ''
        },
        type: {
            type: [Object, String],
            default: 'message'
        },
        layerStyle: {
            type: [Object, String],
            default: () => ({})
        },
        icon: {
            type: [Object, String],
            default: () => ({})
        },
        shade: {
            type: [Object, Boolean],
            default: true
        },
        shadeClose: {
            type: [Object, Boolean],
            default: true
        },
        lockScroll: {
            type: [Object, Boolean],
            default: true
        },
        opacity: {
            type: [String, Number]
        },
        xclose: {
            type: [Object, Boolean],
            default: true
        },
        xposition: {
            type: [Object, String],
            default: () => ({})
        },
        xcolor: {
            type: [Object, String],
            default: ''
        },
        anim: {
            type: [String],
            default: 'fadeIn'
        },
        position: {
            type: [Array, String],
            default: ''
        },
        drawer: {
            type: [Object, String],
            default: () => ({})
        },
        follow: {
            type: [Object, String],
            default: () => ({})
        },
        time: {
            type: [Object, String, Number],
            default: ''
        },
        zIndex: {
            type: [Object, String, Number],
            default: 8080
        },
        teleport: {
            type: [Object, String]
        },
        topmost: {
            type: [Object, Boolean],
            default: false
        },
        area: {
            type: [Object, String],
            default: 'auto'
        },
        maxWidth: {
            type: [Object, String]
        },
        maximize: {
            type: [Object, Boolean],
            default: false
        },
        fullscreen: {
            type: [Object, Boolean],
            default: false
        },
        drag: {
            type: [Object, Boolean],
            default: false
        },
        dragOut: {
            type: [Object, Boolean],
            default: false
        },
        lockAxis: {
            type: [Object, String],
            default: ''
        },
        resize: {
            type: [Object, Boolean],
            default: false
        },
        btns: {
            type: [Array],
            default: () => ([])
        }
    },
    emits: [
        'update:modelValue'
    ],
    setup (props, context) {
        const elRef = ref(null)

        const data = reactive({
            opened: false,
            closeCls: '',
            toastIcon: {
                // ...
            },
            messageIcon: {
                // ...
            },
            vlayerOpts: {},
            tipArrow: null
        })

        onMounted(() => {
            if (props.modelValue) {
                open()
            }
            window.addEventListener('resize', autopos, false)
        })

        onUnmounted(() => {
            window.removeEventListener('resize', autopos, false)
            clearTimeout($closeTimer)
        })

        // 监听弹层v-model
        watch(() => props.modelValue, (val) => {
            // console.log('V3Layer is now [%s]', val ? 'show' : 'hide')
            if (val) {
                open()
            } else {
                close()
            }
        })

        // 打开弹窗
        const open = () => {
            if (data.opened) return
            data.opened = true
            typeof props.onSuccess === 'function' && props.onSuccess()

            const dom = elRef.value
            // 弹层挂载位置
            if (props.teleport) {
                nextTick(() => {
                    const teleportNode = document.querySelector(props.teleport)
                    teleportNode.appendChild(dom)

                    auto()
                })
            }

            callback()
        }

        // 关闭弹窗
        const close = () => {
            if (!data.opened) return

            const dom = elRef.value
            const vlayero = dom.querySelector('.message__box__wrap')
            const ocnt = dom.querySelector('.message__box__wrap-cntbox')
            const omax = dom.querySelector('.message__box__maximize')

            data.closeCls = true
            clearTimeout($closeTimer)
            $closeTimer = setTimeout(() => {
                data.opened = false
                data.closeCls = false
                if (data.vlayerOpts.lockScroll) {
                    $locknum--
                    if (!$locknum) {
                        document.body.style.paddingRight = ''
                        document.body.classList.remove('vui__body-hidden')
                    }
                }
                if (props.time) {
                    $index--
                }
                // 清除弹窗样式
                vlayero.style.width = vlayero.style.height = vlayero.style.top = vlayero.style.left = ''
                ocnt.style.height = ''
                omax && omax.classList.contains('maximized') && omax.classList.remove('maximized')

                data.vlayerOpts.isBodyOverflow && (document.body.style.overflow = '')

                context.emit('update:modelValue', false)
                typeof props.onEnd === 'function' && props.onEnd()
                context.attrs.remove()
            }, 300)
        }

        // 弹窗位置
        const auto = () => {
            // ...

            autopos()

            // 全屏弹窗
            if (props.fullscreen) {
                full()
            }

            // 弹窗拖动|缩放
            move()
        }

        const autopos = () => {
            if (!data.opened) return
            let oL, oT
            const pos = props.position
            const isFixed = JSON.parse(props.fixed)
            const dom = elRef.value
            const vlayero = dom.querySelector('.message__box__wrap')

            if (!isFixed || props.follow) {
                vlayero.style.position = 'absolute'
            }

            const area = [domUtils.client('width'), domUtils.client('height'), vlayero.offsetWidth, vlayero.offsetHeight]

            oL = (area[0] - area[2]) / 2
            oT = (area[1] - area[3]) / 2

            if (props.follow) {
                offset()
            } else {
                typeof pos === 'object' ? (
                    oL = parseFloat(pos[0]) || 0, oT = parseFloat(pos[1]) || 0
                ) : (
                    pos == 't' ? oT = 0
                        : pos == 'r' ? oL = area[0] - area[2]
                            : pos == 'b' ? oT = area[1] - area[3]
                                : pos == 'l' ? oL = 0
                                    : pos == 'lt' ? (oL = 0, oT = 0)
                                        : pos == 'rt' ? (oL = area[0] - area[2], oT = 0)
                                            : pos == 'lb' ? (oL = 0, oT = area[1] - area[3])
                                                : pos == 'rb' ? (oL = area[0] - area[2], oT = area[1] - area[3])
                                                    : null
                )

                vlayero.style.left = parseFloat(isFixed ? oL : domUtils.scroll('left') + oL) + 'px'
                vlayero.style.top = parseFloat(isFixed ? oT : domUtils.scroll('top') + oT) + 'px'
            }
        }

        // 元素跟随定位
        const offset = () => {
            const dom = elRef.value
            const vlayero = dom.querySelector('.message__box__wrap')
            const oW = vlayero.offsetWidth
            const oH = vlayero.offsetHeight
            const pS = domUtils.getFollowRect(props.follow, oW, oH)
            data.tipArrow = pS[2]

            vlayero.style.left = pS[0] + 'px'
            vlayero.style.top = pS[1] + 'px'
        }

        // 最大化弹窗
        const full = () => {
            // ...
        }

        // 恢复弹窗
        const restore = () => {
            const dom = elRef.value
            const vlayero = dom.querySelector('.message__box__wrap')
            // const otit = dom.querySelector('.message__box__wrap-tit')
            // const ocnt = dom.querySelector('.message__box__wrap-cntbox')
            // const obtn = dom.querySelector('.message__box__wrap-btns')
            const omax = dom.querySelector('.message__box__maximize')

            // const t = otit ? otit.offsetHeight : 0
            // const b = obtn ? obtn.offsetHeight : 0

            if (!data.vlayerOpts.lockScroll) {
                data.vlayerOpts.isBodyOverflow = false
                document.body.style.overflow = ''
            }

            props.maximize && omax.classList.remove('maximized')

            vlayero.style.left = parseFloat(data.vlayerOpts.rect[0]) + 'px'
            vlayero.style.top = parseFloat(data.vlayerOpts.rect[1]) + 'px'
            vlayero.style.width = parseFloat(data.vlayerOpts.rect[2]) + 'px'
            vlayero.style.height = parseFloat(data.vlayerOpts.rect[3]) + 'px'
        }

        // 拖动|缩放弹窗
        const move = () => {
            // ...
        }

        // 事件处理
        const callback = () => {
            // 倒计时关闭
            if (props.time) {
                $index++
                // 防止重复点击
                if ($timer[$index] !== null) clearTimeout($timer[$index])
                $timer[$index] = setTimeout(() => {
                    close()
                }, parseInt(props.time) * 1000)
            }
        }

        // 点击最大化按钮
        const maximizeClicked = (e) => {
            const o = e.target
            if (o.classList.contains('maximized')) {
                // 恢复
                restore()
            } else {
                // 最大化
                full()
            }
        }
        // 点击遮罩层
        const shadeClicked = () => {
            if (JSON.parse(props.shadeClose)) {
                close()
            }
        }
        // 按钮事件
        const btnClicked = (e, index) => {
            const btn = props.btns[index]
            if (!btn.disabled) {
                typeof btn.click === 'function' && btn.click(e)
            }
        }

        return {
            ...toRefs(data),
            elRef,
            close,
            maximizeClicked,
            shadeClicked,
            btnClicked
        }
    }
}
</script>
