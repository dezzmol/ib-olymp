import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path"
import dotenv from "dotenv"
// https://vitejs.dev/config/

dotenv.config()

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{find: "@", replacement: path.resolve(__dirname, "src")}],
    },
})
