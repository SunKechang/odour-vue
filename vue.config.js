const target = 'http://127.0.0.1:8081'
// let target = 'http://8.141.162.63:8081'
module.exports = {
    publicPath: './',
    lintOnSave:false,
    devServer: {
        proxy: {
            '/api': {
                target: target,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/resource':{
                // target: 'http://localhost',
                target: 'http://8.141.162.63'
            }
        }
    },
}
