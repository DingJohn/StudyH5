const path = require('path')
const {NamedModulesPlugin, HotModuleReplacementPlugin} = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, './dist/'),
        filename: 'bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html'
        }),
        new NamedModulesPlugin(),
        new HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        hot: true
    },
    externals: { 
        vue: 'Vue',
        'vue-router': 'VueRouter'
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['env'],
                        plugins: ['transform-runtime']
                    }
                }
            },
            {
                test: /.vue$/,
                use: [
                    'vue-loader'
                ]
            }
        ]
    }
}