// CONSIDER MAKING THIS WHOLE PROJECT A BOILER PLATE.
// START WITH THE BARE BONE WEBPACK CONFIG FILES AND HAVE THE INSTALABLE FOR NPM UPDATES.

const currentTask = process.env.npm_lifecycle_event; //This will yeild the most recent npm command we ran EX: "dev" or "build"

// const { Module } = require("module");
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer')
]

class RunAfterCompile {
    apply(compiler){
        compiler.hooks.done.tap('Copy images', function(){
            fse.copySync('./app/assets/images', './docs/assets/images')
        })
    }
}

let cssConfig = {
    test: /\.css$/i,
    use: ['css-loader', {loader: 'postcss-loader', options: {postcssOptions: {plugins: postCSSPlugins}}}]
}

let config = {
    entry: "./app/assets/scripts/App.js",
    plugins: [new HtmlWebpackPlugin({filename: 'index.html', template: './app/index.html'})],
    module: {
        rules: [
            cssConfig
        ]
    }
}

if(currentTask == "dev"){

    cssConfig.use.unshift("style-loader");

    config.output = {
            filename: "bundled.js",
            path: path.resolve(__dirname, "app")
        }

    config.devServer = {
            historyApiFallback: true,
            static: path.join(__dirname, 'app'),
            hot: true,
            port: 3000
        }

    config.mode = "development"

}if(currentTask == "build"){

    config.module.rules.push({
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"]
            }
        }
    })

    cssConfig.use.unshift(MiniCssExtractPlugin.loader);

    config.output = {
            // filename: "bundled.js",
            // path: path.resolve(__dirname, "dist"),

            filename: '[name].[chunkhash].js',
            path: __dirname + '/docs',
            chunkFilename: '[name].[chunkhash].js'

            // path: path.resolve(__dirname, 'dist'),
            // filename: '[name].[hash:8].js',
            // sourceMapFilename: '[name].[hash:8].map',
            // chunkFilename: '[name].[hash:8].js'
    
        }

    config.mode = "production"

    // This next code will split up our "dist" files a bit more.
    // It will create a file referred to as the "VENDOR CODE" aka code we did not write.
    // config.optimization = {
    //     splitChunks: {chunks: 'all'},
    // }

    config.optimization = {
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              enforce: true,
              chunks: "all",
              minSize: 1000
            }
          }
        },
        minimize: true,
        minimizer: [`...`, new CssMinimizerPlugin()]
      }

    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
        new RunAfterCompile()
    )

}

// THE FOLLOWING COMMENTED CODE IS FOR WHEN WE ARE IN DEVELOPMENT, WE WILL COMMENT IT OUT NOW THAT WE ARE ON THE BUILD PROCESS, 
// BUT STILL WANT TO KEEP THIS CODE HANDY FOR ANY UPCOMING PROJECTS

// module.exports = {
//     entry: "./app/assets/scripts/App.js",
//     output: {
//         filename: "bundled.js",
//         path: path.resolve(__dirname, "app")
//     },
//     devServer: {
//         historyApiFallback: true,
//         static: path.join(__dirname, 'app'),
//         hot: true,
//         port: 3000
//     },
//     mode: "development",
//     // watch: true, (we no longer need this because of our devServer property)
//     module: {
//         rules: [
//             {
//                 test: /\.css$/i,
//                 use: ['style-loader','css-loader', {loader: 'postcss-loader', options: {postcssOptions: {plugins: postCSSPlugins}}}]
//             }
//         ]
//     }
// }

module.exports = config;