import webpackConfig from './webpack-configs/webpack.dev';

async function start() {
    // TODO:
    // this should go to WEBPACK
    // https://github.com/johnagan/clean-webpack-plugin
    // await run(clean);
    // TODO:
    // this should goes to the WEBPACK config ? why not ?
    // await run(copy.bind(undefined, { watch: true }));

    // TODO:
    // this is adding to much complexity to the build,
    // as all of that could be in webpack config directly,
    // no reason for splitting it like that if we don't have micro-services
    await new Promise(() => {
        let server = require('../../server/src/server').default;
        server.bootstrap(webpackConfig);
    });
}

export default start;
