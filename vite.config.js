const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
import path from 'path'

module.exports = {
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            '@/Jetstream': path.resolve(__dirname, './Jetstream'),
        },
    },
}
