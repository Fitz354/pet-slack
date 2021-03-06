export default (env) => {
  const path = `./webpack.${env}.js`;
  console.log('Webpack config:', path); // eslint-disable-line
  const getCurrentWebpackConfig = require(path).default;  // eslint-disable-line

  return getCurrentWebpackConfig();
};
