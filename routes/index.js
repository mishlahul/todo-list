const express = require('express');
const app = express();
const Router = require('express-group-router');
let router = new Router();

module.exports = function () {
  router.group('/', (router) => {
    require('./todo-item.router')(router);
    require('./activity-group.router')(router);
  });
  const listRoutes = router.init();
  app.use(listRoutes);
  return app;
};
