import { WeatherData } from "../interface/weather";
import { formatToLocalTime, iconUrlFromCode } from "../service/weatherService";
import Search from "./Search";
import sunrise from "../assets/images-removebg-preview (1).png";
import sunset from "../assets/pngtree-vector-sunset-icon-png-image_883993-removebg-preview.png";

type props = {
  data?: WeatherData;
  handleUnitChange: () => void;
  unit: string;
};

function WeatherDetails({
  data,
  handleUnitChange,
  unit,
}: props) {
  return (
    <>

      <div className="px-6 pt-6 relative">
        <div className="flex mb-4 justify-between items-center">
          <div>
            <h5 className="mb-0 font-medium text-xl">
              {data?.name} {data?.country}
            </h5>
            <h6 className="mb-0">April 04 2021</h6>
            <small>{data?.details}</small>
          </div>
          <div className="text-right flex items-center">
            <div className="w-16">
              <img
                className="animate-pulse"
                src={iconUrlFromCode(data?.icon)}
                alt=""
              />
            </div>
            <h3 className="font-bold text-5xl mb-0">
              <span>{data?.temp}&deg;</span>
            </h3>
            <div onClick={handleUnitChange} className="flex cursor-pointer flex-col divide-y">
              <p
                className={`text-2xl ${unit === "imperial" && "text-gray-500"}`}
              >
                C
              </p>
              <p className={`text-2xl ${unit === "metric" && "text-gray-500"}`}>
                F
              </p>
            </div>
          </div>
        </div>
        <div className="block sm:flex justify-between items-center flex-wrap">
          <div className="w-full sm:w-1/2">
            <div className="flex mb-2 justify-between items-center">
              <span>Feels like</span>
              <span className="px-2 flex">
                {data?.feels_like}&nbsp;&deg;
                <p>{unit === "metric" ? "C" : "F"}</p>
              </span>
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <div className="flex mb-2 justify-between items-center">
              <span>Humidity</span>
              <span className="px-2 inline-block">{data?.humidity}%</span>
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <div className="flex mb-2 justify-between items-center">
              <span>Wind</span>
              <span className="px-2 inline-block">
                {data?.speed} {unit === "imperial" ? "mil/hr" : "m/s"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col divide-y p-6 gap-3">
        <div className="flex justify-between">
          <div className="flex justify-between pl-6 pr-2 items-center gap-2">
            <img className="w-7" src={`${sunrise}`} alt="" />
            <small>Rise:</small>
            <small>
              {data && formatToLocalTime(data.sunset, data.timezone, "hh:mm a")}
            </small>
          </div>
          <div className="flex justify-between pl-6 pr-2 items-center gap-2">
            <small>High Temp:</small>
            <small className="flex">
              {data?.temp_max}&#176; <p>{unit === "metric" ? "C" : "F"}</p>
            </small>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-between pl-6 pr-2 items-center gap-2">
            <img className="w-8" src={`${sunset}`} alt="" />
            <small>Set:</small>
            <small>
              {data &&
                formatToLocalTime(data.sunrise, data.timezone, "hh:mm a")}
            </small>
          </div>
          <div className="flex justify-between px-2 items-center gap-2">
            <small>Low Temp:</small>
            <small className="flex">
              {data?.temp_min}&#176; <p>{unit === "metric" ? "C" : "F"}</p>
            </small>
          </div>
        </div>
      </div>
      <div className="divider table mx-2 bg-transparent whitespace-nowrap">
        <span className="inline-block px-3">
          <span className="font-bold">Hourly Forecast</span>
        </span>
      </div>
      <div className="px-6 pb-6 pt-3 relative">
        <div
          className="text-center justify-between items-center flex"
          style={{ flexFlow: "initial" }}
        >
          {data?.hourly.map((item, i) => (
            <div
              key={i}
              className="text-center mb-0 flex items-center justify-center flex-col"
            >
              <small className="block my-1">{item.time}</small>
              <img src={iconUrlFromCode(item.icon)} className="block w-8 h-8" />
              <span className="block my-1 flex">
                {item.temp}&deg; <p>{unit === "metric" ? "C" : "F"}</p>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="divider table mx-2 bg-transparent whitespace-nowrap">
        <span className="inline-block px-3">
          <span className="font-bold self-left">Daily Forecast</span>
        </span>
      </div>
      <div className="px-6 pb-6 pt-3 relative">
        <div
          className="text-center justify-between items-center flex"
          style={{ flexFlow: "initial" }}
        >
          {data?.daily.map((item, i) => (
            <div
              key={i}
              className="text-center mb-0 flex items-center justify-center flex-col"
            >
              <span className="block my-1">{item.day}</span>
              <img src={iconUrlFromCode(item.icon)} className="block w-8 h-8" />
              <span className="block my-1 flex">
                {item.temp}&deg; <p>{unit === "metric" ? "C" : "F"}</p>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WeatherDetails;
