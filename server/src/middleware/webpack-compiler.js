import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import chalk from 'chalk';

export default class devMiddleware {
  static apply(app, webpackConfig) {

    // // Uncomment for a debugging purpose
    // // using below compiler will allow you to see the output in src/build/
    // try {
    //   let compiler = webpack(webpackConfig);
    //   compiler.run((err, stats) => {
    //     gutil.log('[webpack:build]', stats.toString({
    //       chunks: false, // Makes the build much quieter
    //       colors: true
    //     }));
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
    try {
      let compiler = webpack(webpackConfig);
      app.use(webpackDevMiddleware(compiler, {
        noInfo: false,
        quiet: false,
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        inline: true,
        stats: {
          colors: true
        },
      }));
      app.use(webpackHotMiddleware(compiler));
    } catch (err) {
      console.log(err);
    }
  }
}
