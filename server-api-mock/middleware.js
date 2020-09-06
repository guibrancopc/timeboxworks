module.exports = (req, res) => {
  console.log('res.body', res.body);
  res.jsonp({
    status: 23234,
    data: res.locals.data,
  });
};
