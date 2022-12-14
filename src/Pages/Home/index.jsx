import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import { CurrentWeatherContext } from '../../contexts/CurrentWeatherContext'
import { ForecastContext } from '../../contexts/ForecastContext'

import { useFetchData } from '../../hooks/useFetchData'
import { useFetchPosition } from '../../hooks/useFetchPosition'

import { key } from '../../data/apiKey'

import { Title } from '../../components/Title'
import { MainImage } from '../../components/MainImage'
import { Details } from '../../components/Details'
import { Forecast } from '../../components/Forecast'
import { Nav } from  '../../components/Nav'
import { Loading } from '../../components/Loading'

import './style.css'

export const Home = () => {
  const navigate = useNavigate()

  const maxDeviceWidth = useMediaQuery({query: '(max-height: 575.98px)'})
  const middlewidth = useMediaQuery({query: '(orientation: landscape)'})

  const { currentWeather, setCurrentWeather } = useContext(CurrentWeatherContext)
  const { forecast, setForecast } = useContext(ForecastContext)
  
  const [ position, setPosition ] = useState(null)
  const [ error, setError ] = useState(false)

  useFetchPosition(setPosition, setError)
  useFetchData(position, setCurrentWeather, setForecast, setError, key)

  if (error) {
    navigate('/error')
  }

  if (maxDeviceWidth && middlewidth) {
    return (
      <section className='home'>
      { !currentWeather && !forecast ? 
        <Loading /> 
        :
        <section className='home-content'>
          <Nav />
          <section className="content-container">
            <section className='current-weather-section'>
              <Title />
              <MainImage />
              <Details />
            </section>
            <Forecast className='forecast-component'/>
          </section>
        </section> }
    </section>
    )
  }

  return (
    <section className='home'>
      { !currentWeather && !forecast ?
        <Loading />
        :
        <section className='home-content'>
          <Nav />
          <Title />
          <MainImage />
          <Details />
          <Forecast />
        </section> }
    </section>
  )
}