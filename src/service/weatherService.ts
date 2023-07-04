import { DateTime } from "luxon";
import { CurrentWeatherData } from "../interface/weather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../api";

// const WEATHER_API_KEY = "b0263e86507acb13bd7216736133ab88";
// const WEATHER_API_KEY = "3086716d67fc79e345fd672b3e999c8c";
// const WEATHER_API_KEY = "7d0580e645ced237c271e1dde0c8fc1c";

// const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherData = (
  infoType: string,
  searchParams: { [key: string]: any }
): Promise<any> => {
  const url = new URL(`${WEATHER_API_URL}/${infoType}`);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: WEATHER_API_KEY,
  }).toString();

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data: CurrentWeatherData) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];
  return {
    lat,
    lon,
    temp: Math.round(temp - 273.15),
    feels_like: Math.round(feels_like - 273.15),
    temp_min: Math.round(temp_min - 273.15),
    temp_max: Math.round(temp_max - 273.15),
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data: any) => {
  const { list, city } = data;
  console.log(data);
  const daily = list.filter((d: any, i: number) => {
    return (i % 8 === 0 || i === 0)
  }).map((d: any) => {
    return {
      day: formatToLocalTime(d.dt, city.timezone, "ccc"),
      temp: Math.round(d.main.temp - 273.15),
      icon: d.weather[0].icon,
    };
  })

  const hourly = list.slice(1, 7).map((d: any) => {
    return {
      time: formatToLocalTime(d.dt, city.timezone, "hh:mm a"),
      temp: Math.round(d.main.temp - 273.15),
      icon: d.weather[0].icon,
    };
  });

  return { timezone: city.timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams: {
  [key: string]: any;
}) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export const locationGetter = async (lat: number, lon: number) => {
  return await getWeatherData("forecast", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    // units: searchParams.units,
  })
}

const formatToLocalTime = (
  secs: number,
  zone: any,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const dateBuilder = (d: Date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const iconUrlFromCode = (code?: string) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode, dateBuilder };
