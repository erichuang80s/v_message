import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders' 

import path from 'path'

// https://vitejs.dev/config/
const mainName = 'vmessage'
export default defineConfig({
  plugins: [
    vue(),
    Icons({
      compiler:'vue3',
      customCollections: {
        'svg-icon': FileSystemIconLoader('./src/assets/icons')
      }
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/components/Message/index.js'),
      name: mainName,
      fileName: (format) => `${mainName}.${format}.js`,
      formats: ['umd', 'es'], 
    },
    // minify: 'terser',
    chunkSizeWarningLimit: 10,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }         
    },
  },
})
