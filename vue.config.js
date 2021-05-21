module.exports = {
    devServer: {
        // proxy: 'http://localhost:8081'
        proxy: {
            // '/': {
            //     target: 'http://localhost:8081',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/': ''
            //     }
            // },
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}