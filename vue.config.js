module.exports = {
    publicPath: './',
    lintOnSave:false,
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://8.141.162.63:8081',
                target: 'http://localhost:8081',
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/resource':{
                // target: 'http://localhost',
                target: 'http://8.141.162.63'
            }
        }
    }
}
