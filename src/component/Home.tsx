import sun from "../assets/images-removebg-preview.png";
import backgroundImage from "../assets/6246350-field-beauty-nature-sunset-clouds-weather-landscape.jpg"
import sunrise from '../assets/images-removebg-preview (1).png'
import sunset from '../assets/pngtree-vector-sunset-icon-png-image_883993-removebg-preview.png'
import wallpaper from '../assets/wallpaperflare-cropped (1).jpg'
import { useState, useEffect } from "react";
import getFormattedWeatherData, { locationGetter } from '../service/weatherService.js'
import { WeatherData } from "../interface/weather.js";
import myLocation from '../assets/location.png'

function Home() {
  const [location, setLocation] = useState(false)
  const [data, setData] = useState<WeatherData>()
  const getPosition = (
    options?: PositionOptions
  ): Promise<GeolocationPosition> => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  // const getWeather = async () => {
  //   const data = await getFormattedWeatherData({ q: 'london' })
  //   // setData(data)
  //   console.log(data)
  // }
  // getWeather()
  console.log(data)
  useEffect(() => {
    if (navigator.geolocation) {
      getPosition()
        //If user allow location service then will fetch data & send it to get-weather function.
        .then((position) => {
          //   this.getWeather(position.coords.latitude, position.coords.longitude);
          // console.log(position);
          const {coords: {latitude, longitude}} = position
          locationGetter(latitude, longitude).then(res => {
            getFormattedWeatherData({ q: res.city.name }).then(res => setData(res))
          })
          setLocation(true)
        })
        .catch((err) => {
          console.log('first')
          setLocation(false)
          //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
          //   this.getWeather(28.67, 77.22);
          // alert(
          //   "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          // );
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
            <div className="w-1/2 pb-4 rounded-sm hidden md:block">
              <div className=" w-full h-full rounded-lg bg-no-repeat bg-cover flex flex-col justify-between text-white" style={{backgroundImage: `url(https://github.com/gauravghai/weatherApp-Reactjs/blob/master/src/images/city.jpg?raw=true)`}}>
                <div className="z-20 text-2xl text-right p-8">{data?.name} {data?.country}</div>
                <div className="flex justify-between p-7 z-20 items-center">
                  <div>
                    <div className="text-3xl">18:29:51</div>
                    <div>Wednesday, 15 February 2023</div>
                  </div>
                  <div className="text-5xl">23&#176;c</div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap md:w-1/2">
                <div className="w-full px-2 md:px-0">
                    <div className="bg-black bg-opacity-70 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full">
                    <div className="p-5 flex">
                      <div className="relative flex items-center w-full h-10 rounded-full focus-within:shadow-lg bg-white bg-opacity-50 overflow-hidden px-1">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                          className="peer h-full w-full px-3 outline-none text-sm text-gray-700 pr-2"
                          type="text"
                          id="search"
                          placeholder="Search City..." /> 
                      </div>
                      <img className="w-10" src={myLocation} alt="" />
                    </div>
                        <div className="px-6 pt-6 relative">
                            <div className="flex mb-4 justify-between items-center">
                                <div>
                                    <h5 className="mb-0 font-medium text-xl">Delhi,IN</h5>
                                    <h6 className="mb-0">April 04 2021</h6><small>Cloudy</small>
                                </div>
                                <div className="text-right flex items-center">
                                    <div className="w-16"><img className="animate-spin-slow" src={`${sun}`} alt="" /></div>
                                    <h3 className="font-bold text-5xl mb-0"><span>39&deg;</span></h3>
                                    <div className="flex flex-col divide-y">
                                      <p className="text-2xl ">C</p>
                                      <p className="text-2xl text-gray-500">F</p>
                                    </div>
                                </div>
                            </div>
                            <div className="block sm:flex justify-between items-center flex-wrap">
                                <div className="w-full sm:w-1/2">
                                    <div className="flex mb-2 justify-between items-center"><span>Feels like</span><span className="px-2 inline-block">33.33&nbsp;&deg;</span></div>
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <div className="flex mb-2 justify-between items-center"><span>Humidity</span><span className="px-2 inline-block">24.9&nbsp;&deg;</span></div>
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <div className="flex mb-2 justify-between items-center"><span>Wind</span><span className="px-2 inline-block">39&nbsp;&deg;</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col divide-y p-6 gap-3">
                          <div className="flex justify-between">
                            <div className="flex justify-between pl-6 pr-2 items-center gap-2">
                              <img className="w-7" src={`${sunrise}`} alt="" />
                              <small>Rise:</small>
                              <small>4:50 AM</small>
                            </div>
                            <div className="flex justify-between pl-6 pr-2 items-center gap-2">
                              <small>High Temp:</small>
                              <small>50&#176;</small>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex justify-between pl-6 pr-2 items-center gap-2">
                              <img className="w-8" src={`${sunset}`} alt="" />
                              <small>Set:</small>
                              <small>4:50 AM</small>
                            </div>
                            <div className="flex justify-between px-2 items-center gap-2">
                              <small>Low Temp:</small>
                              <small>50&#176;</small>
                            </div>
                          </div>
                        </div>
                        <div className="divider table mx-2 text-center bg-transparent whitespace-nowrap"><span className="inline-block px-3"><span className="font-bold">Hourly Forecast</span></span></div>
                        <div className="px-6 pb-6 pt-3 relative">
                            <div className="text-center justify-between items-center flex" style={{flexFlow: 'initial'}}>
                                <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Sun</span><img src="https://i.imgur.com/ffgW9JQ.png" className="block w-8 h-8" /><span className="block my-1">38.3&deg;</span></div>
                                <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/BQbzoKt.png" className="block w-8 h-8" /><span className="block my-1">39.9&deg;</span></div>
                                <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/BQbzoKt.png" className="block w-8 h-8" /><span className="block my-1">40.1&deg;</span></div>
                                <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/ffgW9JQ.png" className="block w-8 h-8" /><span className="block my-1">41.5&deg;</span></div>
                                <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/ffgW9JQ.png" className="block w-8 h-8" /><span className="block my-1">40.1&deg;</span></div>
                                <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/BQbzoKt.png" className="block w-8 h-8" /><span className="block my-1">38&deg;</span></div>
                            </div>
                        </div>
                        <div className="divider table mx-2 text-center bg-transparent whitespace-nowrap"><span className="inline-block px-3"><span className="font-bold">Daily Forecast</span></span></div>
                        <div className="px-6 pb-6 pt-3 relative">
                            <div className="text-center justify-between items-center flex" style={{flexFlow: 'initial'}}>
                                <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Sun</span><img src="https://i.imgur.com/ffgW9JQ.png" className="block w-8 h-8" /><span className="block my-1">38.3&deg;</span></div>
                                <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/BQbzoKt.png" className="block w-8 h-8" /><span className="block my-1">39.9&deg;</span></div>
                                <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/BQbzoKt.png" className="block w-8 h-8" /><span className="block my-1">40.1&deg;</span></div>
                                <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/ffgW9JQ.png" className="block w-8 h-8" /><span className="block my-1">41.5&deg;</span></div>
                                <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/ffgW9JQ.png" className="block w-8 h-8" /><span className="block my-1">40.1&deg;</span></div>
                                <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/BQbzoKt.png" className="block w-8 h-8" /><span className="block my-1">38&deg;</span></div>
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
