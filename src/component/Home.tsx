import sunrise from '../assets/images-removebg-preview (1).png'
import sunset from '../assets/pngtree-vector-sunset-icon-png-image_883993-removebg-preview.png'
import { useState, useEffect } from "react";
import getFormattedWeatherData, { formatToLocalTime, iconUrlFromCode, locationGetter } from '../service/weatherService.js'
import { WeatherData } from "../interface/weather.js";
import { DateTime } from 'luxon';
import Search from "./Search.js";
import MyLocationData from './myLocationData.js';



function Home() {
  const [location, setLocation] = useState(false)
  const [data, setData] = useState<WeatherData>()
  const [myData, setMyData] = useState<{name: string, temp: number}>({name: '', temp: 0})

  const getPosition = (
    options?: PositionOptions
  ): Promise<GeolocationPosition> => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

const [liveTime, setLiveTime] = useState<string>()
const [liveDay, setLiveDay] = useState<Date>()

useEffect(() => {
  const interval = setInterval(() => {
  if(data?.timezone){
      const offsetInSeconds = 19800; // The timezone offset you have
      const offsetInHours = offsetInSeconds / 3600; // Convert the offset to hours
      const currentTime = DateTime.utc(); // Get the current time in UTC
      const timeInDesiredTimezone = currentTime.plus({ hours: offsetInHours }); // Add the offset to get the time in the desired timezone
      setLiveTime(timeInDesiredTimezone.toLocaleString(DateTime.TIME_WITH_SECONDS)); // Format and set the time
      setLiveDay(timeInDesiredTimezone.toJSDate()) 
    }
  }, 1000);
  return () => clearInterval(interval);
}, [data?.timezone]);

const handleOnSearchChange = (searchData: {value: string}) => {
  const [lat, lon] = searchData.value.split(" ");
    locationGetter(+lat, +lon).then(res =>  getFormattedWeatherData({ q: res.city.name }).then(res => setData(res))
  )
};
  
  useEffect(() => {
    if (navigator.geolocation) {
      getPosition()
        //If user allow location service then will fetch data & send it to get-weather function.
        .then((position) => {
          //   this.getWeather(position.coords.latitude, position.coords.longitude);
          // console.log(position);
          const {coords: {latitude, longitude}} = position
          locationGetter(latitude, longitude).then(({city: {name, country}}) => {
            setMyData((state) => ({...state, name: `${name} ${country}`}));
            getFormattedWeatherData({ q: name }).then(res => {setData(res); setMyData((state) => ({...state, temp: res.temp}))})
          })
          setLocation(true)
        })
        .catch((err: Error) => {
          alert(err.message)
          setLocation(false)
          //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
          //   this.getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }
  }, [])
  

  return (
    <div
    className="bg-no-repeat bg-fixed bg-cover min-h-screen h-full p-5 py-7 relative flex flex-col justify-center"
    style={{
      backgroundImage: `url(https://github.com/gauravghai/weatherApp-Reactjs/blob/master/src/images/background.jpg?raw=true)`,
    }}
    >
    <div className="bg-gradient-to-t from-transparent to-black absolute left-0 w-full top-0 md:h-96 h-20"></div>
    <div className="bg-gradient-to-b from-transparent to-black absolute left-0 w-full bottom-0 md:h-96 h-20"></div>
      {location || <div className="bg-black bg-opacity-75 h-[500px] w-full p-5 md:w-[900px] md:max-w-screen-md mx-auto">
        <img className="mb-7 w-72  mx-auto" src="https://github.com/gauravghai/weatherApp-Reactjs/blob/master/src/images/WeatherIcons.gif?raw=true" alt="" />
        <div className="text-white text-center mb-3 ">Detecting your location</div>
        <div className="text-white text-xs text-center md:w-72 mx-auto md:text-sm"> Your current location will be displayed on the app and used for calculating real time weather</div>
      </div>}
          
          {location && <div className="md:flex justify-between md:w-[700px] lg:w-[800px] mx-auto">
           <MyLocationData myData={myData} liveDay={liveDay} liveTime={liveTime} />
            <div className="flex flex-wrap md:w-1/2">
                <div className="w-full px-2 md:px-0">
                    <div className="bg-black bg-opacity-70 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full">
                     <div className="p-5 flex">
                        <Search onSearchChange={handleOnSearchChange}/>
                    </div> 
                        <div className="px-6 pt-6 relative">
                            <div className="flex mb-4 justify-between items-center">
                                <div>
                                    <h5 className="mb-0 font-medium text-xl">{data?.name} {data?.country}</h5>
                                    <h6 className="mb-0">April 04 2021</h6><small>{data?.details}</small>
                                </div>
                                <div className="text-right flex items-center">
                                    <div className="w-16"><img className="animate-pulse" src={iconUrlFromCode(data?.icon)} alt="" /></div>
                                    <h3 className="font-bold text-5xl mb-0"><span>{data?.temp}&deg;</span></h3>
                                    <div className="flex flex-col divide-y">
                                      <p className="text-2xl ">C</p>
                                      {/* <p className="text-2xl text-gray-500">F</p> */}
                                    </div>
                                </div>
                            </div>
                            <div className="block sm:flex justify-between items-center flex-wrap">
                                <div className="w-full sm:w-1/2">
                                    <div className="flex mb-2 justify-between items-center"><span>Feels like</span><span className="px-2 inline-block">{data?.feels_like}&nbsp;&deg;</span></div>
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <div className="flex mb-2 justify-between items-center"><span>Humidity</span><span className="px-2 inline-block">{data?.humidity}%</span></div>
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <div className="flex mb-2 justify-between items-center"><span>Wind</span><span className="px-2 inline-block">{data?.speed} km/s</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col divide-y p-6 gap-3">
                          <div className="flex justify-between">
                            <div className="flex justify-between pl-6 pr-2 items-center gap-2">
                              <img className="w-7" src={`${sunrise}`} alt="" />
                              <small>Rise:</small>
                              <small>{data && formatToLocalTime(data.sunset, data.timezone, "hh:mm a")}</small>
                            </div>
                            <div className="flex justify-between pl-6 pr-2 items-center gap-2">
                              <small>High Temp:</small>
                              <small>{data?.temp_max}&#176;</small>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex justify-between pl-6 pr-2 items-center gap-2">
                              <img className="w-8" src={`${sunset}`} alt="" />
                              <small>Set:</small>
                              <small>{data && formatToLocalTime(data.sunrise, data.timezone, "hh:mm a")}</small>
                            </div>
                            <div className="flex justify-between px-2 items-center gap-2">
                              <small>Low Temp:</small>
                              <small>{data?.temp_min}&#176;</small>
                            </div>
                          </div>
                        </div>
                        <div className="divider table mx-2 text-center bg-transparent whitespace-nowrap"><span className="inline-block px-3"><span className="font-bold">Hourly Forecast</span></span></div>
                        <div className="px-6 pb-6 pt-3 relative">
                            <div className="text-center justify-between items-center flex" style={{flexFlow: 'initial'}}>
                                {data?.hourly.map((item, i) => (
                                  <div  key={i} className="text-center mb-0 flex items-center justify-center flex-col"><small className="block my-1">{item.time}</small><img src={iconUrlFromCode(item.icon)} className="block w-8 h-8" /><span className="block my-1">{item.temp}&deg;</span></div>
                                ))}
                                
                            </div>
                        </div>
                        <div className="divider table mx-2 text-center bg-transparent whitespace-nowrap"><span className="inline-block px-3"><span className="font-bold">Daily Forecast</span></span></div>
                        <div className="px-6 pb-6 pt-3 relative">
                            <div className="text-center justify-between items-center flex" style={{flexFlow: 'initial'}}>
                              {data?.daily.map((item, i) => (
                                <div key={i}  className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">{item.day}</span><img src={iconUrlFromCode(item.icon)} className="block w-8 h-8" /><span className="block my-1">{item.temp}&deg;</span></div>
                              ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>}


      
    </div>
  );
}

export default Home;
