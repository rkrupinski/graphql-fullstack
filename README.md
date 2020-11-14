# graphql-fullstack

A simple fullstack GraphQL app based on the [Apollo](https://www.apollographql.com/) stack.

- Basically a 🐈-CRUD
- Built in a monorepo fashion, yet without introducing [lerna](https://github.com/lerna/lerna) to keep things simple
- Uses [json-server](https://github.com/typicode/json-server) as a DB, because why not
- Includes goodies like client/remote state, nested resolvers, JWT authentication
- Does not include many things (e.g. prettiness); I'm accepting PRs though ;)

Packages:

* [client](client) - React-based frontend
* [server](server) - NodeJS-based backend
* [shared](shared) - Types, utils, dragons
