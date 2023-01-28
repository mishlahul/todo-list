const todoItemController = require('../controllers/todo-item.controller');

module.exports = (router) => {
  router.group('/todo-items', (router) => {
    router.get('/', todoItemController.getAll);
    router.get('/:id', todoItemController.getOne);
    router.post('/', todoItemController.create);
    router.patch('/:id', todoItemController.update);
    router.delete('/:id', todoItemController.delete);
  });
};
