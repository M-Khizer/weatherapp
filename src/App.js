import { useState,useEffect } from 'react';
import './App.css';
import DisplayWeather from './displayweather';
import Searchform from './searchform';
import {Form,Card,Container,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import sunset from './Weather Icons/sunset.jpg'
function App() {
  
  const [keys,setKeys]=useState('7AxUqblxyOiDMU2dc9PcGYy26VeyWT4A')
  const [cityname,setCity]=useState('');
  const [cityData,setCityData]=useState();
  const [search,setSearch]=useState('karachi')
  const [id,setId]=useState('');

  // setId(cityData?.Key)
  useEffect(() => {
  
    const baseURL="http://dataservice.accuweather.com/locations/v1/cities/search"

    const query=`?apikey=${keys}&q=${search.toLowerCase()}`

    const controller= new AbortController()
    const signal=controller.signal

    const CityDetails= async ()=>{
    
      const fetchData=await fetch(baseURL+query,{
        signal:signal
      }).catch(e=>{
        
        if(e.name === 'AbortError'){
          console.log('Abort success')
        }
        else{
          console.log(e)
        }
      });
      const result= await fetchData.json()

      setCityData(result[0])
     
      return ()=>{
        controller.abort()
      }
    }

    CityDetails()

  },[search]);

  return(
    <div className='app'>        
      
      <Searchform cityname={cityname} setCity={setCity} setSearch={setSearch} Form={Form}
        Container={Container} Col={Col}/>

      {
        typeof(cityData) !== "undefined" ? (
        <DisplayWeather cityData={cityData} keys={keys} setId={setId} id={id} Card={Card}/>)
        :<Container style={{width:'70%'}} className='display'> 
          <Col>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>City not found</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      }
     
     </div>

    )


  }


export default App;