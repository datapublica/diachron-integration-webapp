var webpack = require('webpack');

var config = {
    context: __dirname + '/app',
    entry: './index.js',
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            ON_TEST: process.env.NODE_ENV === 'test'
        }),
        new webpack.DefinePlugin({
            ON_PROD: process.env.NODE_ENV === 'production'
        }),
        new webpack.ProvidePlugin({
            d3: 'd3'
        })
    ],
    module: {
        loaders: [
            {test: /\.js$/,loader:'ng-annotate!babel',exclude: /node_modules/},
            {test: /\.html$/,loader:'raw',exclude: /node_modules/},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.styl/,loader:'style!css!stylus',exclude: /node_modules/}
        ]
    },
    devServer: {
        port: 3001,
        proxy: {
            '/api*': {
                target: 'http://localhost:8080',
                secure: false
            }
        }
    }
};

if(process.env.NODE_ENV === 'production'){
    config.output.path = __dirname + '/dist';
    //config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    //config.devtool = 'source-map';
}

module.exports = config;