import { createVNode, render } from "vue";
import MessageConstructor from './Message.vue'

let seed = 0
const instances = []

export function message(options)  {
    
    if(typeof options === 'string') {
        options = { message: options }
    }

    let verticalOffset = options.offset || 20
    let duration = options.duration
    console.log(duration)
    const onClose = () => {
        close(id)
    }
    
    instances.forEach(vm => {        
        verticalOffset += (vm.el.offsetHeight || 0) + 16
    })

    verticalOffset += 16

    const id = `v_message_${seed++}`
    const props = {
        id,
        ...options,
        offset: verticalOffset,
        duration,
        onClose,
    }
    const container = document.createElement('div')

    const _message = options.message
    const vm = createVNode(
        MessageConstructor,
        props,
        message ? {default: () => _message} : null
    )

    if(vm.props.onDestroy) {
        vm.props.onDestroy = () => {
            render(null, container)
        }
    }

    render(vm, container)

    instances.push(vm)
    document.body.appendChild(container.firstElementChild)
    
    return {
        close: () => {
            vm.component.proxy.close()
        }
    }

}

export function close(id) {
    
    const index = instances.findIndex(vm => vm.component.props.id === id)
    if(index === -1) return

    const vm = instances[index]

    if(!vm) return
    vm.component.proxy.close()

    const removedHeight = vm.el.offsetHeight

    instances.splice(index, 1)[0]

    let len = instances.length
    for(let i = index; i < len; i++) {
        const instance = instances[i]
        const pos = parseInt(instance.el.style.top, 10) - (removedHeight + 16)
        instance.component.props.offset = pos
    }
    
}
