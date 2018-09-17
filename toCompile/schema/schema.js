const graphql = require("graphql");
import axios from "axios";

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema
} = graphql;


const UserType = new GraphQLObjectType({
	name: "User",
	fields: ()=> ({
		id: {type: GraphQLString},
		age: {type: GraphQLInt},
		firstName:{type: GraphQLString}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		user: {
			type: UserType,
			args: {id:{type: GraphQLString}},
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/users/${args.id}`)
					.then(resp=> resp.data);
			}
		}
	}
});

export default  new GraphQLSchema({
	query: RootQuery
});
