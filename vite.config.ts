import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 相对路径产物：可直接丢到 GitHub Pages 子目录、对象存储或任意静态服务器
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    // 产物名带 hash，不清空也能安全覆盖；同时避免在受限环境里删除目录失败
    emptyOutDir: false,
  },
})
