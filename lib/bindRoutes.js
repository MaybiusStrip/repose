module.exports = function (app, controller) {
  app.get('/' + controller.model.modelName + '/:id', controller.get.bind(controller));
}

