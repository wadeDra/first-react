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
                query:
                {
                    presets:['es2015','react']
                }
            }
        ]
    }
};
