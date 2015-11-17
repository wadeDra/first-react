var webpack = require('webpack');


module.exports = {
    cache: true,

    watch: true,

    entry: {
        'app': ['./app/js/app.js']
    },

    output: {
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            }

        ],
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('common.js')
        ]
    }
};
