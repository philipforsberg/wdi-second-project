const List = require('../models/list');

function indexRoute(req, res, next) {
  List
    .find()
    .exec()
    .then((lists) => res.render('lists/index', {lists}))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('lists/new');
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;

  List
    .create(req.body)
    .then(() => res.redirect('/lists'))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest('/lists/new', err.toString());
      }
      next(err);
    });
}

function showRoute(req, res, next) {
  List
    .findById(req.params.id)
    .populate('createdBy items.createdBy comments.createdBy')
    .exec()
    .then((list) => {
      if (!list) return res.notFound();
      return res.render('lists/show', { list});
    })
    .catch(next);
}

function editRoute(req, res, next) {
  List
    .findById(req.params.id)
    .exec()
    .then((list) => {
      if (!list) return res.notFound();
      return res.render('lists/edit', { list});
    })
    .catch(next);
}

function deleteRoute(req, res, next) {
  List
    .findById(req.params.id)
    .exec()
    .then((list) => {
      if (!list) return res.notFound();
      return list.remove();
    })
    .then(() => res.redirect('/lists'))
    .catch(next);
}

function createItemRoute(req, res, next) {
  req.body.createdBy = req.user;

  List
    .findById(req.params.id)
    .exec()
    .then((list) => {
      if(!list) return res.notFound();

      list.items.push(req.body);
      return list.save();
    })
    .then((list) => {
      res.redirect(`/lists/${list.id}`);
    })
    .catch(next);
}

function deleteItemRoute(req, res, next) {
  List
    .findById(req.params.id)
    .exec()
    .then((list) => {
      if(!list) return res.notFound();

      const item     = list.items.id(req.params.itemId);
      item.remove();

      return list.save();
    })
    .then((list) => {
      res.redirect(`/lists/${list.id}`);
    })
    .catch(next);
}

function createCommentRoute(req, res, next) {
  req.body.createdBy = req.user;

  List
    .findById(req.params.id)
    .exec()
    .then((list) => {
      if(!list) return res.notFound();

      list.comments.push(req.body);
      return list.save();
    })
    .then((list) => {
      res.redirect(`/lists/${list.id}`);
    })
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  List
    .findById(req.params.id)
    .exec()
    .then((list) => {
      if(!list) return res.notFound();

      const comment = list.comments.id(req.params.commentId);
      comment.remove();

      return list.save();
    })
    .then((list) => {
      res.redirect(`/lists/${list.id}`);
    })
    .catch(next);
}


module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  delete: deleteRoute,
  createItem: createItemRoute,
  deleteItem: deleteItemRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
