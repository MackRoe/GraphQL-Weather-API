import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from './index'

function Weather() {
    const [ zip, setZip ] = useState('')
    const [ weather, setWeather ] = useState(null)

    async function getWeather() {
      try {
        const json = await client.query({
          query: gql`
            query {
              getWeather(zip:${zip}) {
                temperature
                description
              }
            }
          `
        })
        setWeather(json)
      } catch(err) {
        console.log(err.message)
      }
    }

    return (
    <div className="Weather">
        {weather ? <h1>{weather.data.getWeather.temperature}</h1>: null}
        <form onSubmit={(e) => {
            e.preventDefault()
            getWeather()
            }}>
            <input
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    </div>
    );
}

export default Weather
