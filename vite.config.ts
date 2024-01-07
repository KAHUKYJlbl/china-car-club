import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   css: {
//     modules: {
//       localsConvention: 'camelCaseOnly',
//     }
//   },
// })

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      }
    },
    plugins: [react()],
  }
})
