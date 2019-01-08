import "reflect-metadata";

import * as Express from "express";

import { Query, Resolver, buildSchema } from "type-graphql";

import { ApolloServer } from "apollo-server-express";

@Resolver()
class HelloResolver {
	@Query(() => String, { nullable: true })
	async helloWorld() {
		return "Hello World";
	}
}

const main = async () => {
	const schema = await buildSchema({
		resolvers: [HelloResolver]
	});
	const apolloServer = new ApolloServer({
		schema
	});
	const app = Express();
	apolloServer.applyMiddleware({ app });
	app.listen(4000, () => {
		console.log("Server started on http://localhost:4000");
	});
};

main();
