const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // if production if will minify the html output
    mode: 'development',


    // the bundle will be the filenmame of output but if you want to change, just change the bundle into something
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js')
    },

    output: {
        path: path.resolve(__dirname, 'dist'),

        //for JS file
        filename: '[name][contenthash].js',

        // clean will auto delete the js out file coz of the hashtag
        clean: true,

        //for image output only
        assetModuleFilename: pathData => {
            const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
            return `${filepath}/[name][ext]`;
        },
    },

    devServer: {
        static:{
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },

    //good for debugging
    devtool: 'source-map',

    module: {
        rules: [
            //FOR SASS
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },

            //FOR JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            //FOR IMAGES
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico|webp}|avif)$/i,
                type: 'asset/resource',
            },
            {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              type: "asset/resource",
            },
            
        ]
    }, 

    //for PLugins
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Webpack Application',
            buttonLabel: 'Get Another Joke!',
            filename: 'index.html',
            template: 'src/template.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack XXXXX',
            buttonLabel: 'Get Another Fuck!',
            filename: 'new.html',
            template: 'src/new.html',
        }),
        new BundleAnalyzerPlugin()
        
    ],

    //terser minifier
    optimization: {
        minimize: true,
        //minimizer: [new TerserPlugin()],
        minimizer: [
            new TerserPlugin({
            terserOptions: {
                format: {
                comments: false,
                },
            },
            extractComments: false,
            }),
        ],
    },



}