import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnIconOutlined  from '@material-ui/icons/LocationOnOutlined';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import Rating from '@material-ui/lab/Rating';

import usestyles from './styles';

export default function Map({setCoordinates,setBounds, coordinates, places, setChildClicked, weatherData}) {
  const  classes = usestyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

console.log(isDesktop);
  return (
    <div className={classes.mapContainer} >
      <GoogleMapReact  
          bootstrapURLKeys={{key:'AIzaSyAqdnRaWbu8lF1Oo51r4OtR2wH47grm5h0'}}
          defaultCenter={coordinates}
          center= {coordinates}
          defaultZoom={14}
          margin= {[50,50,50,50]}
          options={''}
          onChange={(e)=>{
          
            setCoordinates({lat: e.center.lat, lng:e.center.lng});
            setBounds({ne:e.marginBounds.ne, sw:e.marginBounds.sw});
          }}
         
          
          onChildClick= {(child)=>setChildClicked(child)}
         
      
      >
      
        {places?.map((place, i)=>(
          <div className={classes.markerContainer}
               lat={Number(place.latitude)}
               lng={Number(place.longitude)}
               key= {i}
          >
            {
            
             !isDesktop ?(
               <LocationOnIcon color= "primary" fontSize="large"/>
              ): (
                <Paper elevation={3} className={classes.paper}>
                  <Typography  className={classes.Typography} variant="subtitle2" gutterBottom>
                    {place.name}
                  </Typography>
                  <img
                   className={classes.pointer}
                   src={place.photo ? place.photo.images.large.url :'https://www.rlare.com/wp-content/uploads/2019/12/Inside-1-1.jpg'}
                   alt={place.name}
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly/>
                </Paper>
              )
            }
            
          </div>
        ))}

          {weatherData?.list?.length && weatherData.list.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
          </div>
        ))}
     
     
          {console.log(weatherData)}

      </GoogleMapReact>

    </div>
  )
}
