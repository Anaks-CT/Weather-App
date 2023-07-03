// export interface WeatherData {
//     coord: { lat: number, lon: number };
//     main: { temp: number, feels_like: number, temp_min: number, temp_max: number, humidity: number };
//     name: string;
//     dt: number;
//     sys: { country: string, sunrise: number, sunset: number };
//     weather: { main: string, icon: string }[];
//     wind: { speed: number };
// }

// export interface FormattedWeatherData {
//     lat: number;
//     lon: number;
//     temp: number;
//     feels_like: number;
//     temp_min: number;
//     temp_max: number;
//     humidity: number;
//     name: string;
//     dt: number;
//     country: string;
//     sunrise: number;
//     sunset: number;
//     weather: { main: string, icon: string }[];
//     speed: number;
//     details: string;
//     icon: string;
// }

// export interface ForecastData {
//     timezone: string;
//     daily: {
//         dt: number;
//         temp: { day: number };
//         weather: { icon: string }[];
//     }[];
//     hourly: {
//         dt: number;
//         temp: number;
//         weather: { icon: string }[];
//     }[];
// }

// export interface FormattedForecastData {
//     timezone: string;
//     daily: {
//         title: string;
//         temp: number;
//         icon: string;
//     }[];
//     hourly: {
//         title: string;
//         temp: number;
//         icon: string;
//     }[];
// }

export interface Coordinates {
    lat: number;
    lon: number;
  }
  
  export interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  }
  
  export interface SysWeatherData {
    country: string;
    sunrise: number;
    sunset: number;
  }
  
  export interface Weather {
    main: string;
    icon: string;
  }
  
  export interface Wind {
    speed: number;
  }
  
  export interface CurrentWeatherData {
    coord: Coordinates;
    main: MainWeatherData;
    name: string;
    dt: number;
    sys: SysWeatherData;
    weather: Weather[];
    wind: Wind;
  }
  
  export interface DailyForecast {
    dt: number;
    temp: {
      day: number;
    };
    weather: Weather[];
  }
  
  export interface HourlyForecast {
    dt: number;
    temp: number;
    weather: Weather[];
  }
  
  export interface ForecastWeatherData {
    timezone: string;
    daily: DailyForecast[];
    hourly: HourlyForecast[];
  }

  export interface WeatherData {
    country: string;
    daily: Array<{
      day: string;
      temp: number;
      icon: string;
    }>;
    details: string;
    dt: number;
    feels_like: number;
    hourly: Array<{
      time: string;
      temp: number;
      icon: string;
    }>;
    humidity: number;
    icon: string;
    lat: number;
    lon: number;
    name: string;
    speed: number;
    sunrise: number;
    sunset: number;
    temp: number;
    temp_max: number;
    temp_min: number;
    timezone: number;
  }
  