"use strict";

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _schema = _interopRequireDefault(require("./schema/schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use("/graphql", (0, _expressGraphql.default)({
  schema: _schema.default,
  graphiql: true
}));
app.listen(9000, function () {
  console.log("Listening");
});