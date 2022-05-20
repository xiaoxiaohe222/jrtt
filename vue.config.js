const px2rem = require('postcss-px2rem')
//const path = require("path");
const postcss = px2rem({
    remUnit: 37.5
})
//const myTheme = path.join(__dirname, "/src/styles/cover.less");
//console.log(myTheme);
module.exports={
    lintOnSave:false,
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        // 直接覆盖变量
                        'nav-bar-title-text-color': '#fff',
                       'nav-bar-background-color':'#3c8bf2',
                        // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                        //hack: `true; @import "${__dirname}+'/src/styles/normal.less'";`,
                        //hack: `true; @import "${myTheme}";`
                        //hack: `true; @import "src/styles/cover.less";`,
                    },
                },
            },
            postcss: {
                plugins: [
                    postcss
                ]
            },
        }
    },

}
