const glob = require('glob')
const $config = require('./config.js')
let sourceDir = $config.sourceDir;
let doorName = $config.doorName;
let ignoreDir = $config.ignoreDir;
let cacheGroups = $config.cacheGroups;

let files = glob.sync(`./${sourceDir}/**/!(${ignoreDir})/${doorName}.{js,ts}`);
let entry = {};
files.forEach(file => {
    entry[file.replace(`./${sourceDir}`, "")
        .replace(/.(js|ts)/, "")] = file;
})

module.exports = {
    mode: process.env.NODE_ENV,
    entry,
    output: {
        filename: "[name].js"
    },
    devtool: process.env.NODE_ENV==="production"|| process.env.FUCK ?false:"source-map",
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/, //匹配JS文件  
                use: 'babel-loader',
                exclude: /node_modules/ //排除node_modules目录
            },{
                test: /\.ts?$/,
                use: ["babel-loader", "ts-loader"],
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        /**
         * 多文件入口有用
         */
        splitChunks: {
            // initial 入口chunk，对于异步导入的文件不处理
            // async 异步chunk，只对异步导入的文件处理
            // all 全部chunk
            chunks: 'all',
            cacheGroups: {
                ...cacheGroups
            }
        }
    }
}