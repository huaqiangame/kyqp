// 
module.exports = exports = {
    outDir: "dist",
    tempDir: "__gulptemp__",
    webpackTemp: "__temp__",
    // 暂时，加版号的不能启用webpack打包
    userWebpack: false, //是否使用webpack打包
    sourceDir: "src_kaiyuan", // 方便更改源路径
    // 
    imageFix:"png,jpg,gif,ico,svg",
    startPath:"index.html",
    ignoreDir: "link",
    doorName: "index",
    // link文件夹下的data,这样就不会编译出去了
    ejsDataName: "\\link\\data.js",
    // webpack共用库
    cacheGroups: {
        // 分离之后需要在html在引入,记得手动在页面中插入，lib/vendors.js
        vendors: {
            name: "lib/vendors",
            test: /[\\/]node_modules[\\/]/,
            minSize: 0,
            minChunks: 1, //有两次引用以上才提取2
            priority: -7
        },
    }
}