const activityGroupController = require('../controllers/activity-group.controller');

module.exports = (router) => {
  router.group('/activity-groups', (router) => {
    router.get('/', activityGroupController.getAll);
    router.get('/:id', activityGroupController.getOne);
    router.post('/', activityGroupController.create);
    router.patch('/:id', activityGroupController.update);
    router.delete('/:id', activityGroupController.delete);
  });
};
