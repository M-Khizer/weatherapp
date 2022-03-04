import React from 'react';
// import DisplayWeather from './DisplayWeather';

function Searchform({cityname,setCity,setSearch,Form,Container,Col}) {
    
    const handleSubmit= async (e)=>{
        e.preventDefault()
        
        setSearch(cityname)
        setCity('')
    }

  return(
  <div>
      <Container style={{width:'80%'}} className='form'>
        <Col >
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='CityName' >
                    <Form.Control className='rounded-pill input' autoComplete='off' type='text' 
                        placeholder='Enter the city name here'
                        onChange={e=>{setCity(e.target.value)}}
                        value={cityname}
                    >
                    </Form.Control>

                </Form.Group>
            </Form>
        </Col>
      </Container>
  </div>
  )
}

export default Searchform;