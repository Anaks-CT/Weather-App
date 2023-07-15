import { useState, useEffect } from "react";
import getFormattedWeatherData, {
  locationGetter,
} from "../service/weatherService.js";
import { WeatherData } from "../interface/weather.js";
import { DateTime } from "luxon";
import WeatherDetails from "./WeatherDetails.js";
import CurrentLocationError from "./CurrentLocationError.js";
import loader from "../assets/Pulse-1s-200px.gif";
import Search from "./Search.js";
import infinityLoader from '../assets/Infinity-1s-200px (3).gif'
import MyLocationData from "./MyLocationData.js";
import { useSwipeable } from 'react-swipeable';


function Home() {
  const [location, setLocation] = useState(false);
  const [data, setData] = useState<WeatherData>();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fullLoader, setFullLoader] = useState(false);
  const [phoneViewHandler, setPhoneViewHandler] = useState(false)
  const [myData, setMyData] = useState<{
    name: string;
    temp: number;
    timeZone: number;
  }>({ name: "", temp: 0, timeZone: 0 });
  const [unit, setUnit] = useState<string>("metric");
  const [search, setSearch] = useState<any>(null);

  const handleOnChange = (searchData: any) => {
    setSearch(searchData);
    handleOnSearchChange(searchData);
  };

  const handleUnitChange = () => {
    setLoading(true)
    setUnit((prevState) => {
      if (prevState === "metric") return "imperial";
      else return "metric";
    });
  };
  console.log(unit);
  const getPosition = (
    options?: PositionOptions
  ): Promise<GeolocationPosition> => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  const [liveTime, setLiveTime] = useState<string>();
  const [liveDay, setLiveDay] = useState<Date>();

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.timezone) {
        const offsetInSeconds = myData.timeZone; // The timezone offset you have
        const offsetInHours = offsetInSeconds / 3600; // Convert the offset to hours
        const currentTime = DateTime.utc(); // Get the current time in UTC
        const timeInDesiredTimezone = currentTime.plus({
          hours: offsetInHours,
        }); // Add the offset to get the time in the desired timezone
        setLiveTime(
          timeInDesiredTimezone.toLocaleString(DateTime.TIME_WITH_SECONDS)
        ); // Format and set the time
        setLiveDay(timeInDesiredTimezone.toJSDate());      }
    }, 1000);
    return () => clearInterval(interval);
  }, [data?.timezone]);

useEffect(() => {
  if(liveTime){
    setFullLoader(false)
  }
}, [liveTime])

  const handleOnSearchChange = (searchData: { value: string }) => {
    const [lat, lon] = searchData.value.split(" ");
    locationGetter(+lat, +lon).then((res) => {
      setLoading(true);
      getFormattedWeatherData({ q: res.city.name, units: unit })
        .then((res) => setData(res))
        .catch((err) => alert(err))
        .finally(() => setLoading(false));
    });
  };

  useEffect(() => {
    if (!isFirstRender) {
      handleOnSearchChange({ value: `${data?.lat} ${data?.lon}` });
    } else {
      setIsFirstRender(false);
    }
  }, [unit]);

  useEffect(() => {
    if (navigator.geolocation) {
      getPosition()
      //If user allow location service then will fetch data & send it to get-weather function.
      .then((position) => {
          setFullLoader(true)
          //   this.getWeather(position.coords.latitude, position.coords.longitude);
          // console.log(position);
          const {
            coords: { latitude, longitude },
          } = position;
          locationGetter(latitude, longitude).then(
            ({ city: { name, country } }) => {
              setMyData((state) => ({ ...state, name: `${name} ${country}` }));
              getFormattedWeatherData({ q: name, units: unit }).then((res) => {
                setData(res);
                setMyData((state) => ({
                  ...state,
                  temp: res.temp,
                  timeZone: res.timezone,
                }));
              });
            }
          );
          setLocation(true);
        })
        .catch((err: Error) => {
          alert(err.message);
          setLocation(false);
          //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
          //   this.getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        })
    } else {
      alert("Geolocation not available");
    }
  }, []);




    const [currentDiv, setCurrentDiv] = useState(0);
    const divs = ['Div 1', 'Div 2', 'Div 3'];
  
    const handlers = useSwipeable({
      onSwipedLeft: () => {
        if (currentDiv > 0) {
          setCurrentDiv(currentDiv - 1);
        }
      },
      onSwipedRight: () => {
        if (currentDiv < divs.length - 1) {
          setCurrentDiv(currentDiv + 1);
        }
      },
    });




  return (
    <div
      className="bg-no-repeat bg-fixed bg-cover min-h-screen h-full p-5 py-7 relative flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(https://github.com/gauravghai/weatherApp-Reactjs/blob/master/src/images/background.jpg?raw=true)`,
      }}
    >
      <div className="bg-gradient-to-t from-transparent to-black absolute left-0 w-full top-0 md:h-96 h-20"></div>
      <div className="bg-gradient-to-b from-transparent to-black absolute left-0 w-full bottom-0 md:h-96 h-20"></div>
      {location || <CurrentLocationError />}
      

      <div className="slide" {...handlers}>
      {divs.map((div, index) => (
        <div
          key={index}
          className={`${index === currentDiv ? 'active' : ''}`}
          style={{ transform: `translateX(${(index - currentDiv) * 100}%)` }}
        >
          {div}
        </div>
      ))}
    </div>


      {fullLoader ? <img className="w-16" src={infinityLoader} alt="" />: (
        location &&  (
          <div className="md:flex justify-between md:w-[700px] lg:w-[800px] mx-auto">
            <MyLocationData
              myData={myData}
              liveDay={liveDay}
              liveTime={liveTime}
              setPhoneViewHandler={setPhoneViewHandler}
              phoneViewHandler={phoneViewHandler}
            />
            <div className={`flex flex-wrap ${phoneViewHandler || 'hidden'} md:block md:w-1/2`}>
              <div className="w-full px-2 md:px-0">
                <div className="bg-black min-h-[672px] min-w-[345px] justify-center pt-16 flex flex-col bg-opacity-70 text-white relative  break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full">
                  <div className="p-5 flex absolute w-full top-0">
                    <Search search={search} handleOnChange={handleOnChange} />
                  </div>
                  {loading ? (
                    <img className="self-center w-16" src={loader} alt="" />
                  ) : (
                    <WeatherDetails
                      data={data}
                      handleUnitChange={handleUnitChange}
                      unit={unit}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Home;
