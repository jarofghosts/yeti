module.exports = function (router, routes) {

  router.listen('get', '/user', routes.users.getUser)
  router.listen('post', '/user', routes.users.postUser)
  router.listen('put', '/user', routes.users.putUser)
  router.listen('delete', '/user', routes.users.deleteUser)

  router.listen('get', '/post', routes.posts.getPost)
  router.listen('post', '/post', routes.posts.postPost)
  router.listen('put', '/post', routes.posts.putPost)
  router.listen('delete', '/post', routes.posts.deletePost)

  router.listen('get', '/reply', routes.replies.getReply)
  router.listen('post', '/reply', routes.replies.postReply)
  router.listen('put', '/reply', routes.replies.putReply)
  router.listen('delete', '/reply', routes.replies.deleteReply)

  router.listen('get', '/message', routes.messages.getMessage)
  router.listen('post', '/message', routes.messages.postMessage)
  router.listen('put', '/message', routes.messages.putMessage)
  router.listen('delete', '/message', routes.messages.deleteMessage)

  router.listen('get', '/category', routes.categories.getCategory)
  router.listen('post', '/category', routes.categories.postCategory)
  router.listen('put', '/category', routes.categories.putCategory)
  router.listen('delete', '/category', routes.categories.deleteCategory)

  router.listen('put', '/login', routes.auth.putLogin)
  router.listen('put', '/logout', routes.auth.putLogout)
  router.listen('get', '/logout', routes.auth.putLogout)
  router.listen('post', '/register', routes.auth.postRegister)

  return router

}
