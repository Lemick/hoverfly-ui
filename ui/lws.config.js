module.exports = {
  port: 9999,
  spa: 'index.html',
  rewrite: [
    {
      from: '/hoverfly-ui/(.*)',
      to: '/$1'
    }
  ],
  directory: 'build'
};
