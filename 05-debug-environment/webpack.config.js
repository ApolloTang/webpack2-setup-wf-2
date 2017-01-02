const pathResolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const webpackDevServer_host = '0.0.0.0';
const webpackDevServer_port = 8080;

const absolutePath_sourceFolder = pathResolve('src');
const absolutePath_buildFolder = pathResolve('dist');

const info = process.env.CONSOLE_LOG;

const config_fn = env => {                        // [6]
    if ( info || env && env.debug ) {
        console.log('absolutePath_sourceFolder: ', absolutePath_sourceFolder);
        console.log('absolutePath_buildFolder: ', absolutePath_buildFolder);
    }

    const config = {
        devServer: {
            host: webpackDevServer_host,
            port: webpackDevServer_port
        },
        context: absolutePath_sourceFolder,      // [2]
        entry: {
            main: './main.js'
        },
        output: {
            path: absolutePath_buildFolder,      // [4]
            filename: 'bundle.js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.template.html',
                favicon: './favicon.ico'
                // inject: 'head',               // [5]
            }),
            new ProgressBarPlugin()              // [7]
        ]
    };

    if ( info || env && env.debug ) {
        console.log('webpack.config: ', config)  // [8]
    }
    return config;
};

module.exports = config_fn;

// [2] • Context of entry point;
//     • [!] must be absolute path
//
// [4] • Webpack bundle is saved to /path/to/project/server/dist/bundle.js
//     • [!] must be absolute path
//
// [5] • To avoid flash of unstyle page, never inject into head.
//
// [6] • npm script with --env.debug will result in env.debug=true.
//
// [7] • show progress bar in terminal
//
// [8] • all default value of webpack configruation is logged.
//
