const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const isDev = env.mode === 'dev';
    console.log(isDev);

    return {
        mode: isDev ? 'development' : 'production',
        entry: {
            app: './src/index.tsx',
        },
        output: {
            filename: isDev ? 'js/[name].js' : 'js/[name]-[chunkhash:7].js',
            path: path.resolve(process.cwd(), "./dist/"),
            // path: path.resolve(process.cwd(), './dist/static/'),
            clean: true,
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        module: {
            rules: [
                {
                    test: /\.ts[x]?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                compilerOptions: {
                                    noEmit: false
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(css)$/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: 'global',
                            },
                        },
                    ],
                },
                {
                    test: /\.(otf|eot|ttf|woff|woff2)$/,
                    include: [path.resolve(process.cwd(), '/src/assets')],
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts/',
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'public', 'index.html'),
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash].css',
            }),
        ],
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', 'woff2', 'woff'],
        },
        devServer: {
            port: 7000,
            hot: true,
        },
    };
};
