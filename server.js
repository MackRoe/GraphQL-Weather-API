// Import dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// require dotenv and call cofig
require('dotenv').config()
const apikey = process.env.OPENWEATHERMAP_API_KEY

// SCHEMAS
const schema = buildSchema(`
type Test {
	message: String!
}

type Weather {
    temperature: Float!
    description: String!
}

type Query {
    doTest: Test
    getWeather(zip: Int!): Weather!
}
`)

// RESOLVERS
const root = {
    doTest: () => {
        return { message: "Test completed successfully!"}
    }
}

// Create express app
const app = express()

// Define a route for GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

// Start this app
const port = 4000
app.listen(port, () => {
  console.log('Running on port:'+port)
})
