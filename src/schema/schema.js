"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require("graphql");

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLSchema = graphql.GraphQLSchema,
    GraphQLList = graphql.GraphQLList;
var CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: function fields() {
    return {
      id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      users: {
        type: new GraphQLList(UserType),
        resolve: function resolve(parentValue, args) {
          return _axios.default.get("http://localhost:3000/companies/".concat(parentValue.id, "/users")).then(function (res) {
            return res.data;
          });
        }
      }
    };
  }
});
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
      },
      company: {
        type: CompanyType,
        resolve: function resolve(parentValue, args) {
          return _axios.default.get("http://localhost:3000/companies/".concat(parentValue.companyId)).then(function (res) {
            console.log(res.data);
            return res.data;
          });
        }
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
    },
    company: {
      type: CompanyType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: function resolve(parentValue, args) {
        return _axios.default.get("http://localhost:3000/companies/".concat(args.id)).then(function (resp) {
          return resp.data;
        });
      }
    }
  }
});

var _default = new GraphQLSchema({
  query: RootQuery
});

exports.default = _default;