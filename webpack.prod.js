const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
module.exports = merge(common, {
    mode: 'production',
    entry:
        './src/front/js/index.js'
    ,
    output: {

        filename: 'bundle.js',

        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new Dotenv({
            safe: true,
            systemvars: true
        })
    ]
});
