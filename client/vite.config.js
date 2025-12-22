import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs";

export default defineConfig({
    plugins: [react()],
    server: {
        https: {
            cert: fs.readFileSync("ssl/client.cert"),
            key: fs.readFileSync("ssl/client.key"),
        },
        secure:true,
        open: true,
        port: "443",
        host:"127.0.0.1",
    }
})
