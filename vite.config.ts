import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@ui', replacement: '/src/components/ui' },
      { find: '@components', replacement: '/src/components' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@router', replacement: '/src/router' },
      // { find: '@validations', replacement: '/src/validations' },
      // { find: '@modals', replacement: '/src/components/modals' },


      // { find: '@coocse', replacement: '/src/utils/cocies.ts' },
      // { find: '@globol-interface', replacement: '/src/types/globol-interface' },

      // { find: '@category', replacement: '/src/service/category' },
      // { find: '@worker', replacement: '/src/service/worker' },
      // { find: '@product', replacement: '/src/service/product' },



      // { find: '@store-categors', replacement: '/src/store/categors'},
      // { find: '@store-worker', replacement: '/src/store/worker'},
      // { find: '@store-product', replacement: '/src/store/products'},

    ]
  }
})
