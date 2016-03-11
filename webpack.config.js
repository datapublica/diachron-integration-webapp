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
            {test: /\.js$/, loader: 'ng-annotate!babel', exclude: /node_modules/},
            {test: /\.html$/, loader: 'raw', exclude: /node_modules/},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.styl/, loader: 'style!css!stylus', exclude: /node_modules/},
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
            {test: /\.less$/, loader: "style!css!less"},
            {test: /\.(png|jpg|ico)$/, loader: 'url-loader'}
        ]
    },
    devServer: {
        port: 3001,
        proxy: {
            '/api*': {
                target: 'http://localhost:7899',
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