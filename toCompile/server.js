import express from "express";
import expressGraphQL from "express-graphql";
import schema from "./schema/schema";

const app = express();

app.use(
	"/graphql",
	expressGraphQL({
		schema: schema,
		graphiql: true
	})
);

app.listen(9000, () => {
	console.log("Listening");
});
