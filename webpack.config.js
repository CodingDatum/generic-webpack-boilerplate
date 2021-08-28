// CONSIDER MAKING THIS WHOLE PROJECT A BOILER PLATE.
// START WITH THE BARE BONE WEBPACK CONFIG FILES AND HAVE THE INSTALABLE FOR NPM UPDATES.

const path = require("path");

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
]

module.exports = {
    entry: "./app/assets/scripts/App.js",
    output: {
        filename: "bundled.js",
        path: path.resolve(__dirname, "app")
    },
    devServer: {
        historyApiFallback: true,
        static: path.join(__dirname, 'app'),
        hot: true,
        port: 3000
    },
    mode: "development",
    // watch: true, (we no longer need this because of our devServer property)
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader', {loader: 'postcss-loader', options: {postcssOptions: {plugins: postCSSPlugins}}}]
            }
        ]
    }
}