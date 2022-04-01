import React , {useEffect, useState} from 'react'
import { CssBaseline, Grid } from '@material-ui/core';

import {getPlacesData, getWeatherData} from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';



export default function App() {
  const [places, setPlaces]= useState([]);
  const [weatherData, setWeatherData]= useState([]);

  const [coordinates, setCoordinates]= useState({});
  const [bounds, setBounds]=useState({ne: {lat: 0, lng: 0}, sw: {lat: 0, lng: 0}});
  //useState({ne: {lat: 0, lng: 0}, sw: {lat: 0, lng: 0}});

  const [childClicked,setChildClicked]= useState(null);

  const [type, setType]= useState('restaurants');
  const [rating, setRating]= useState('');

  const [filteredPlaces, setFilteredPlaces]= useState([]);


  //as soon as user launches the page we can get their latitude and longitude
  useEffect(()=>{
    //use the built in function to grab the current geo location
    navigator.geolocation.getCurrentPosition( ({coords:  {latitude, longitude}  })=>
    {
        setCoordinates({lat: latitude, lng: longitude});
    })
    
  }, []);

  useEffect(()=>{
    const  filteredPlaces= places.filter((place)=> place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);
  //dependancy array is empty to make this happen only at the start

  //dependancy array is full make it happen everytime coordinates or bounds change
  useEffect(()=>{
    if(bounds.sw && bounds.ne)
    {
      console.log('data');
    console.log(coordinates, bounds);

    getWeatherData(coordinates.lat, coordinates.lng)
    .then((data)=> setWeatherData(data));
    console.log('HI');
    console.log(weatherData);
    console.log('Coordinates:')
    console.log(bounds)

    getPlacesData(type, bounds.sw, bounds.ne).then((data)=>{
      console.log(data);
        setPlaces(data?.filter((place)=> place.name && place.num_reviews >0));
        setFilteredPlaces([]);
    })
   }
  }, [type,  bounds]);
  return (
    <>
        <CssBaseline/>
        <Header setCoordinates={setCoordinates}/>
        <Grid container spacing ={3} style={{width: '100%'}}  >
            <Grid item xs={12} md={4}>
                <List places= {filteredPlaces.length ? filteredPlaces : places}
                      childClicked={childClicked}
                      type={type}
                      setType={setType}
                      rating={rating}
                      setRating={setRating}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map
                  setCoordinates={setCoordinates}
                  setBounds= {setBounds}
                  coordinates={coordinates}
                  places={filteredPlaces.length ? filteredPlaces : places}
                  setChildClicked={setChildClicked}
                  weatherData={weatherData}
                />
            </Grid>
        </Grid>
    </>
  )
}
