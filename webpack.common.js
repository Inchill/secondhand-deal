const path = require('path');
// 实现从html模板自动生成最终html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 实现每次编译前自动清空dist目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
// vue-loader was used without the corresponding plugin. 
// Make sure to include VueLoaderPlugin in your webpack config. 
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: {
        index: './client/user/index.ts'
    },
    output: {
        // js生成到dist/js，[name]表示保留原js文件名
        filename: 'js/[name].js',
        // 输出路径为dist
        path: path.resolve(__dirname, './server/public/dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 设置html模板生成路径
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './static/index.html',
            chunks: ['index']
        }),
        // 需要和vue-loader配合使用，否则会报错
        new VueLoaderPlugin(),
        new ExtractTextPlugin('style.css'),
        // vue开启gzip压缩
        new CompressionWebpackPlugin({
            test: /\.(js|css)$/,
            threshold: 10240  // 这里对大于10k的js和css文件进行压缩
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                exclude: /\/excludes/
            }),
            new OptimizeCSSAssetsPlugin({
                // 生效范围，只压缩匹配到的资源
                assetNameRegExp: /\.optimize\.css$/g,
                // 压缩处理器，默认为cssnsno
                cssProcessor: require('cssnano'),
                // 压缩处理器的配置
                cssProcessorPluginOptions: {
                    discardComments: { removeAll: true }
                },
                // 是否展示log
                canPrint: true
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.styl(us)$/,
                use: ['style-loader', 'css-loader', 'stylus-loader']
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(png|jpg|gif|eot|woff|ttf|svg|webp|PNG)$/,
                loader: 'url-loader',
                options: {
                    name: '[name]-[hash:6].[ext]',
                    esModule: false,  // 否则src为object module
                    limit: 10000,
                    puplicPath: './static'
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-transform-modules-commonjs'
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    // 配置文件扩展名
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json']
    },
    mode: process.env.NODE_ENV === 'production' ? 'production':'development'
}