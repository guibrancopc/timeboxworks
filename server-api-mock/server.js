// eslint-disable-next-line import/no-extraneous-dependencies
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(jsonServer.rewriter({
  '/api/v1/*': '/$1',
  '/events': '/events?_embed=goals&_embed=side-topics',
  '/events/:id': '/events/:id?_embed=goals&_embed=side-topics',
  '/events/:id/side-topics': '/side-topics?eventId=:id',
}));

const SERVER_PORT = 3000;

function getErrorMessage(status) {
  if (status === 404) {
    return 'Not found.';
  }
  if (status >= 400 && status < 500) {
    return 'Bad request.';
  }
  if (status >= 500) {
    return 'Internal server error.';
  }
  return null;
}

router.render = (req, res) => {
  res.jsonp({
    status: res.statusCode,
    data: res.locals.data,
    error: getErrorMessage(res.statusCode),
  });
};

server.use(middlewares);
server.use(router);
server.listen(SERVER_PORT, () => {
  console.log(`JSON Server is running at port ${SERVER_PORT}`);
});
