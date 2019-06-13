const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let commonConfig = {
    entry: {
        main: path.resolve(__dirname, 'src/app')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'stage-0', 'es2015'],
                    plugins: [
                        [
                            'transform-runtime',
                            {
                                helpers: false,
                                polyfill: true,
                                regenerator: true
                            }
                        ],
                        ['transform-class-properties'],
                        [
                            'import',
                            {
                                libraryName: 'antd',
                                style: 'css'
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.css/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
        ]
    },
    resolve: {
        alias: {
            pages: path.resolve(__dirname, 'src/pages/'),
            styles: path.resolve(__dirname, 'src/styles/'),
            components: path.resolve(__dirname, 'src/components'),
            utils: path.resolve(__dirname, 'src/utils')
        },
        extensions: ['.js']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash:8].css'
        })
    ]
}

module.exports = commonConfig
