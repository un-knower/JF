const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const VERSION_STRING = JSON.parse(fs.readFileSync('package.json')).version;
const APP_NAME = 'jf';
module.exports = {
    // entry: './app/index.jsx',
    entry: {
        'bundle':'./src/index.jsx',
    },

    output: {
        path:`${ROOT_PATH}/build/${APP_NAME}`,
   	    filename: `resources/js/${VERSION_STRING}/bundle.js`,
        chunkFilename: `resources/js/${VERSION_STRING}/[name].ensure.js`,
        publicPath:`/${APP_NAME}/`
  	},

    resolve: {
        extensions: ["*",".js", ".json", ".jsx", ".css"],
        alias: {
            'app_images': ROOT_PATH + "/src/resources/"+APP_NAME+"/images",
            'app_constants': ROOT_PATH + "/src/constants/index",
            'app_common': ROOT_PATH + "/src/common",
            'app_component': ROOT_PATH + "/src/component",
            'app_page': ROOT_PATH + "/src/app",
            'app_css': ROOT_PATH + "/src/resources/"+APP_NAME+"/css",
        }
    },

    externals: {
        'echarts':'echarts',
        'react':'React',
        'react-dom': 'ReactDOM'
    },

    module: {
    	rules:[
      	    {
                test: /\.(jsx|js)$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
                use: [
                    {
                        loader:'babel-loader',
                        options:{
                            presets: ['react', 'es2015','stage-0'],
                            cacheDirectory: true,
                            plugins: [
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
                exclude:/node_modules/
    		},
    		{
                test: /\.(less|css)$/,
                include: [ROOT_PATH],
                use: ['style-loader','css-loader','less-loader']
    		},
	        {
	            test: /\.(jpg|png)$/,
	            use: ['url-loader']
	        }
  		],
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            comments: false,        //去掉注释
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            title:'经纪业务经营分析平台',
            filename: "index_prod.html",
            template: "./src/template/index_prod.html",
            //inject: 'body',
            //hash: true,
            chunks: ['bundle'],
            showErrors:true,
            baseurl:`/${APP_NAME}/`
        }),
        new CopyWebpackPlugin([{
            from: `${ROOT_PATH}/resources`,
            to:`${ROOT_PATH}/build/${APP_NAME}/resources`,
            flatten:false,
            ignore:['*.js'] //忽略源目录下的js文件
        }])
    ]
};
