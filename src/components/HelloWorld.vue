<script setup>
import { ref } from 'vue'
import {useMessage} from './Message'

  defineProps({
    msg: String
  })

  const ms = []
  function addMessage () {
    const m = useMessage( {
      type: 'danger',
      message: 'test',
      duration: 2000,
      showClose: true
    })
    ms.push(m)
  }

  function closeMessage() {
    ms.forEach(m => m.close())
  }


  const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a
      href="https://code.visualstudio.com/"
      target="_blank"
    >VSCode</a>
    +
    <a
      href="https://github.com/johnsoncodehk/volar"
      target="_blank"
    >Volar</a>
  </p>

  <p>
    <a
      href="https://vitejs.dev/guide/features.html"
      target="_blank"
    >
      Vite Documentation
    </a>
    |
    <a
      href="https://v3.vuejs.org/"
      target="_blank"
    >Vue 3 Documentation</a>
  </p>

  <button
    type="button"
    @click="count++"
  >
    count is: {{ count }}
  </button>
  <button
    type="button"
    @click="addMessage"
  >
    add Message
  </button>
  <button
    type="button"
    @click="closeMessage"
  >
    close Message
  </button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>
<style scoped>
a {
  color: #42b983;
}
</style>
