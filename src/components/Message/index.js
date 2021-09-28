import MessageConstructor from './Message.vue'
import {message} from './methods'

export const useMessage = message
export default {
    install(app) {
   
        app.component(MessageConstructor.name, MessageConstructor)
        app.config.globalProperties.$useMessage  = useMessage
    
    }
}



