const { mergee } = require('webpack-merge')
const commonConfigg = require('./webpack.config.common')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = mergee(commonConfigg, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
    }
})