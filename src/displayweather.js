import React, { useState,useEffect } from 'react';
import { Col, Container } from 'react-bootstrap';
import sun from './Weather Icons/sun.png'
import moon from './Weather Icons/moon.png'

function DisplayWeather({cityData,keys,setId,id,Card}) {

  const [weatherData,setWeatherData]=useState();

  useEffect(() => {
    setId(cityData.Key)
  }, [cityData.EnglishName])
  
  useEffect(() => {

    const baseURL="http://dataservice.accuweather.com/currentconditions/v1/"
    const query=`${id}?apikey=${keys}`

    const controller= new AbortController()
    const signal=controller.signal

    const weatherDetails= async ()=>{
      
      
      const res= await fetch(baseURL+query,{
        signal:signal
      }).catch(e=>{
        if(e.name === 'AbortError'){
          console.log('Abort success')
        }
        else{
          console.log(e)
        }
      })
      
      const data = await res.json()
      setWeatherData(data[0])
      // console.log(weatherData)

      return ()=>{
        controller.abort()
      }
    }
    weatherDetails()
  },[id]);

  return(
  <div>
    <Container style={{width:'70%'}} className='display'>
      <Col>
        <Card className="text-center card-display" >

          <Card.Body className='card-body'>

          <div className='card-content'>           
            <Card.Title className="country rounded-pill">{cityData?.Country.EnglishName}</Card.Title>
            <Card.Title className='city-contain'><span className="city">{cityData?.EnglishName}</span>
              {/* <sup className="country rounded-pill">{cityData?.Country.ID}</sup> */}
              </Card.Title>
            <Card.Title className='temp-contain'><span className="temp">{Math.ceil(weatherData?.Temperature.Metric.Value)}</span>
               <sup className='deg'>&deg;C</sup></Card.Title>
            <Card.Title className='text-contain'><div className="text">{weatherData?.WeatherText}</div></Card.Title>
            <Card.Title className="sun-moon">{weatherData?.IsDayTime ? <img src={sun}/> : 
              < img src={moon}/>
            }</Card.Title>
          
          </div>

          </Card.Body>
        </Card>
      </Col>

    </Container>
  </div>
  )
}

export default DisplayWeather;