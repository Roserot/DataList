import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
    mode: 'development',
    optimization: {
        minimize: false
    },
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader' },
            {
                test: /\.css$/,
                include: path.join(__dirname, 'src/components/'),
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: { modules: true }
                    }
                ]
            },
            {
                test: /\.(svg|png)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name]-[hash:8].[ext]',
                    include: 'src/assets'
            }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/index.html' },
            { from: 'src/resources/lists-data/*', to: 'resources/lists-data', flatten: true  }
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9009
    }
};