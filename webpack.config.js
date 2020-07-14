const PATH = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');  // webpack 4版本之后加的，之前的版本不需要这个
const HtmlWebpackPlugin = require('html-webpack-plugin');//模板页面
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//单独抽离css文件
const Webpack = require('webpack');
// 判断环境
const DEVELOPMENT = process.env.NODE_ENV === 'development';//运行命令可以得出当前的环境，通过cross-env,用来判断是否是开发环境


const config = {
    target: 'web',//编译的是web项目

    entry: PATH.resolve(__dirname, './src/index.js'), // 以join拼接path的形式配置绝对路径,相对路径打包后找不到会报错

    output: {
        filename: 'js/vendor.build.js',
        path: PATH
            .join(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/css/',
                        },
                    },
                    // 'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png)|(jpg)|(gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024, // 判断图片的大小   如果小于1024就会转换成base64
                        name: 'images/[name].[ext]', // 输出图片的名字,前面是文件夹目录  ext是扩展名
                        esModule: false,//配置该选项 用于在vue中使用图片或者是降低file-loader或者url-loader的版本。
                    }
                }
            },
            // {
            //     test: /\.less$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'less-loader'
            //     ]
            // },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/css/',
                        },
                    },
                    // 'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },

        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        new Webpack.DefinePlugin({
            'process-env': {
                NODE_ENV: DEVELOPMENT ? '"development"' : '"production"'
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        // 抽离css为单独文件
        new MiniCssExtractPlugin({
            filename: 'css/[hash:5].css',
            chunkFilename: '[id].css',
        }),
    ],

    resolve: {
        modules: ["node_modules"],//require('jquery')不带./引入模块时,默认开始的查找路径 从当前的node_modules查找，向上级查找
        extensions: [".js", ".json", ".ts", ".vue"],//引入模块时不加后缀名，因为配置会自动识别js和json结尾的后缀名
        alias: {
            "@": PATH.resolve(__dirname, 'src'),//配置别名,使用@替代src的绝对路径
        }
    },

    stats: {//配置输出信息
        colors: true,
    },

    devtool: 'eval-source-map',//设置source-map 报错可以看到源码文件
}

if (DEVELOPMENT) {
    config.devServer = {
        port: 8888, // webpack服务需要监听的端口号
        host: 'localhost', // 可以通过本机内网ip访问,这样别人也可以访问,手机也可访问,如果设置成localhost则不然
        overlay: {
            errors: true // 这个可有可无,webpack编译出现的错误会出现在网页中,便于更改
        },
        compress: true,//服务端gzip 压缩
        hot: true,//热更新
        hotOnly: true
    };
}

module.exports = config;