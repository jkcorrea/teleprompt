import react from '@vitejs/plugin-react-swc'
import teleprompt from 'teleprompt/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [teleprompt(), react()],
})
