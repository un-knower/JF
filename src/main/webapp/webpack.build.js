const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ROOT_PATH = path.resolve(__dirname);
const VERSION_STRING = JSON.parse(fs.readFileSync('package.json')).version;
const APP_NAME = 'jf';
module.exports = {
    // entry: './app/index.jsx',
    entry: './src/index.jsx',

    output: {
        path:`${ROOT_PATH}/resources/js`,
   	    filename: `bundle.${VERSION_STRING}.js`,
        chunkFilename: `[name].ensure.js`,
        publicPath:'/jf/resources/js/'
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
        })
    ]
};
