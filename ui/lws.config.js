module.exports = {
  port: 9696,
  spa: 'index.html',
  rewrite: [
    {
      from: '/hoverfly-ui/(.*)',
      to: '/$1'
    }
  ],
  directory: 'build'
};
