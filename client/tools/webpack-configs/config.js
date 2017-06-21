export const babelConfig = {
  babelrc: false,
  presets: [
    ['es2015', { "modules": false }],
    'stage-2'
  ],
  plugins: [
    ['module-resolver', {
      root: ['./src/'],
      alias: aliasConfig
    }],
    'transform-runtime'
  ]
};

export const aliasConfig = {
  config: './config',
  components: './components',
  modules: './modules',
  core: './core',
  store: './store',
  pages: './pages',
  resources: './resources',
  assets: './assets'
};

export const webpackConfig = {
  outputPath: './build/'
};
