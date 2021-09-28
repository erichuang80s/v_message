<template>
  <transition
    name="v-message-fade"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :class="[
        'v-message',
        customClass
      ]"
      :style="customStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="v-message__container">
        <!-- icon -->
        <span 
          :class="[
            'v-message__icon',
            {
              'v-message__icon--danger': type === 'danger',
              'v-message__icon--warning': type === 'warning',
            }
          ]"
        >
          <WarningSvg v-if="type === 'warning'" />
          <DangerSvg v-else-if="type === 'danger'" />
          <InfoSvg v-else />
        </span>
        <!-- content -->
        <span class="v-message__content">
          <slot />
        </span>
        <!-- close button -->
        <span class="v-message__end">
          <button
            v-if="showClose"
            type="button"
            class="v-message__close"
            @click="close"
          >
            <CloseSvg />
          </button>
        </span>
      </div>
    </div>
  </transition>
</template>
<script>
    import {defineComponent, computed, onMounted, ref, onBeforeUnmount} from 'vue'
    import InfoSvg from '~icons/svg-icon/info_black_24dp'
    import WarningSvg from '~icons/svg-icon/warning_black_24dp'
    import DangerSvg from '~icons/svg-icon/error_black_24dp'
    import CloseSvg from '~icons/svg-icon/close_black_24dp'
 
    export default defineComponent({
        name: 'VMessage',
        components: {
            InfoSvg,
            WarningSvg,
            DangerSvg,
            CloseSvg
        },
        props: {
            duration: {
                type: Number,
                default: 3000,
            },
            id: {
                type: String,
                default: '',
            },
            type: {
                type: String,
                default: 'info'
            },
            message: {
                type: String,
                default: ''
            },
            customClass: {
                type: String,
                default: ''
            },
            offset: {
                type: Number,
                default: 20,
            }, 
            onClose: {
                type: Function,
                default: () => {},
                required: false,
            }, 
            showClose: Boolean
        },
        emits: {
            destroy: () => true
        },
        setup(props) {
            const visible = ref(false)

            let timer = null
            function startTimer() {
                if (props.duration > 0) {
                    timer = setTimeout(() => {
                       if(visible.value) close()
                    }, props.duration)
                }
            }
            function clearTimer() {
                clearTimeout(timer)
            }

            function keydown({code}) {
                if(code === 'Escape') {
                    if(visible.value) close()
                }
            }

            function close() {
                visible.value = false
            }
            

            
            
            onMounted(() => {
                document.addEventListener('keydown', keydown)
                startTimer()
                visible.value = true
            })

            onBeforeUnmount(() => {
                document.removeEventListener('keydown', keydown)
            })

            const customStyle = computed(() => {
                return {
                    top: `${props.offset}px`
                }
            })

            return {
                visible,
                customStyle,
                startTimer,
                clearTimer,
                close
            }
        }
    })
</script>

<style lang="scss" scoped>

    $bgColor: #1F2937;
    .v-message {
        box-sizing: border-box;
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        overflow: hidden;
        border-radius: 4px;
        border: solid 1px rgba(white, .75);
        background-color: rgba($bgColor, .95);
        backdrop-filter: blur(2px);
        box-shadow: 0 2px 12px rgba(black, .03), 0 3px 6px rgba(black, .25);
        color: white;
        
        transition: opacity 0.3s, transform 0.4s, top 0.4s;
        width: 320px;

        &__container {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            box-sizing: border-box;
        }

        &__icon {
            color: white;
            margin-right: 10px;
            line-height: 0;
        }
        &__icon--danger {
            color: #EF4444;
        }
        &__icon--warning {
            color: #FBBF24;
        }

        &__content {
            flex: 1 1 70%;
            align-self: stretch;
            word-break: break-word;
            line-height: 1.5;
        }

        &__end {
            flex: 0 0 auto;
        }
        
        &__close {
            color: rgba(white, .75);
            border: none;
            background-color: transparent;
            cursor: pointer;
            width: 24px;
            height: 24px;
            padding: 0;
            line-height: 0;
            margin-left: 4px;
            border-radius: 50%;

            &:hover {
                color: white;
                background-color: rgba(white, .25);
                
            }
            &:active {
                background-color: rgba(white, .35);
            }
        }

        
        #{&}-fade-enter-from,
        #{&}-fade-leave-to {
            opacity: 0;
            transform: translate(-50%, -100%);
        }        
    }
</style>