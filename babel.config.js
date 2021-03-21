module.exports = api => {
  const isTest = api.env('test');

  return isTest
    ? {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-react',
          '@babel/preset-typescript',
          'next/babel',
        ],
      }
    : {
        presets: ['next/babel'],
        plugins: [],
      };
};
