const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: ['file-loader'],
            },
            { 
                test: /\.css$/, 
                use: [ 'style-loader', 'css-loader', 'postcss-loader' ] 
            },
            { 
                test: /\.(ts|tsx|js)$/,
                exclude: /node_modules/, 
                use: {
                    loader: 'ts-loader', 
                    options: {
                        compilerOptions: {
                            noEmit: false, 
                        },
                    } 
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/images', to: 'images' }
            ]
        })
    ],
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    },

    devServer: {
        hot: true, 
        port: 3000,
        host: '0.0.0.0',
        disableHostCheck: true,
        historyApiFallback: true,
        public: 'https://server-spartacus.onrender.com',
        proxy: [{
            target: 'https://server-spartacus.onrender.com',
        }],

        allowedHosts: 'https://server-spartacus.onrender.com'
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
}
