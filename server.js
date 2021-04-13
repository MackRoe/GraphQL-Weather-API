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
    },
    getWeather: async ({ zip }) => {
        const apikey = process.env.OPENWEATHERMAP_API_KEY
		const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}`
		const res = await fetch(url)
		const json = await res.json()
		const temperature = json.main.temp
		const description = json.weather[0].description
		return { temperature, description }
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
