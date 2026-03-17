import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs";

export default defineConfig(({mode}) => {

    const env = loadEnv(mode, process.cwd(),'')
    console.log(env.VITE_URL)
    return {
        define: {
            __SERVER_URL__: JSON.stringify(env.VITE_URL),
        },
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
    }
})
