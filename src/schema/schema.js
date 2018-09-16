"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require("graphql");

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLSchema = graphql.GraphQLSchema;
var UserType = new GraphQLObjectType({
  name: "User",
  fields: function fields() {
    return {
      id: {
        type: GraphQLString
      },
      age: {
        type: GraphQLInt
      },
      firstName: {
        type: GraphQLString
      }
    };
  }
});
var RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: function resolve(parentValue, args) {
        return _axios.default.get("http://localhost:3000/users/".concat(args.id)).then(function (resp) {
          return resp.data;
        });
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery
});