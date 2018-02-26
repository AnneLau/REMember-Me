var path=require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
module.exports={
    entry:'./src/index.js',
    output:{
        path:path.resolve('./build'),
        filename:'/bundle.js'
    },
    //启用观察者模式，npm run build --watch或npm run webpack --watch，只要entey指定的入口文件有变化，就会自动编译
    watch:true,
    devServer:{
        //指定静态文件根目录
        stats: { colors: true },
        contentBase:'./build',
        port:29323,
        inline:true, //当源代码变化后自动重新打包并通知浏览器刷新
        hot:true
    },
    module:{
        loaders:[
            {
                test:/\.js/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/\.css/,
                loader:'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|gif)/,
                loader: 'url-loader?limit=8192&name=img/[hash:8].[name].[ext]',
            }
        ]
    },
    plugins:[
        //创建一个自动产出html的插件`
        new HtmlWebpackPlugin({
            //指定生成依据的模板
            template:'./src/index.html'
        }),
        new OpenBrowserWebpackPlugin({url:'http://localhost:29323'})
        ]
}