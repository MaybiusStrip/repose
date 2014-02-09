module.exports = function (app, controller) {
  app.get('/' + controller.name + '/:id', controller.get.bind(controller));
  app.get('/' + controller.name, controller.list.bind(controller));
  app.post('/' + controller.name, controller.create.bind(controller));
};

