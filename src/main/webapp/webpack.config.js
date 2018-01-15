const path = require('path')
const ROOT_PATH = path.resolve(__dirname);
const webpack = require('webpack');
const APP_NAME = 'jf';
//console.log(APP_NAME);
module.exports = {
    entry: './src/index.jsx',

    output: {
   	    filename: 'bundle.js',
        chunkFilename: `[name].ensure.js`,
        publicPath:'/'   //DEV SERVER 绝对路径
  	},

    resolve: {
	    extensions: [".js", ".json", ".jsx", ".css"],
        alias: {
            'app_images': ROOT_PATH + "/src/resources/"+APP_NAME+"/images",
            'app_constants': ROOT_PATH + "/src/constants/index",
            'app_common': ROOT_PATH + "/src/common",
            'app_component': ROOT_PATH + "/src/component",
            'app_page': ROOT_PATH + "/src/app",
            'app_css': ROOT_PATH + "/src/resources/"+APP_NAME+"/css",
        }
        //别名key 要加引号，否则不识别
    },

    module: {
    	rules:[
      	    {
                test: /\.(jsx|js)$/,
                use: [
                    {
                        loader:'babel-loader',
                        options:{
                            presets: ['react', 'es2015','stage-0'],
                            cacheDirectory: true,
                            plugins: [
                                // "transform-decorators-legacy",   es7 decorators
                                "transform-runtime",
                                [
                                    "import",
                                    {
                                        "libraryName": "antd",
                                        "style": true,
                                    }
                                ]
                            ]
                        }
                    }
                ],
                exclude:/node_modules/,
    		},
            {
                test: /\.bundle\.js$/,
                use: {
                    loader: 'bundle-loader',
                    options: {
                        name: 'my-chunk'
                    }
                }
            },
    		{
                test: /\.(less|css)$/,
                exclude: /^node_modules$/,
                include: [ROOT_PATH],
                use: ['style-loader','css-loader','less-loader']
    		},
	        {
	            test: /\.(jpg|png)$/,
	            use: ['url-loader']
	        }
  		],
    },

    // plugins: [
    //     new webpack.HotModuleReplacementPlugin()
    // ],

    devServer: {
        inline: true,   //自动刷新页面 package.json --inline也要配置
        historyApiFallback: true,   //配置路由后   解决刷新页面后失去路由问题
        // hot:true,                                 //  这个坑逼hot不能加， 加完不更新后页面不能自动刷新
        progress: true,
        colors:true,
        // host:'172.88.65.148',
        // port:'8619'
        // proxy: {
        //      '/api': {
        //          target: 'http://172.88.65.59',
        //          changeOrigin: true,
        //          secure: false
        //      },
        //      '/login': {
        //          target: 'http://172.88.65.59',
        //          changeOrigin: true,
        //          secure: false
        //      },
        //      '/signOut': {
        //          target: 'http://172.88.65.59',
        //          changeOrigin: true,
        //          secure: false
        //      }
        // },

        //  headers: { "X-Custom-Header": "yes" },
    }
};
