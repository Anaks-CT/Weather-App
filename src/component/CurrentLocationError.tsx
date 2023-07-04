
function CurrentLocationError() {
  return (
    <div className="bg-black bg-opacity-75 h-[500px] w-full p-5 md:w-[900px] md:max-w-screen-md mx-auto">
          <img
            className="mb-7 w-72  mx-auto"
            src="https://github.com/gauravghai/weatherApp-Reactjs/blob/master/src/images/WeatherIcons.gif?raw=true"
            alt=""
          />
          <div className="text-white text-center mb-3 ">
            Detecting your location
          </div>
          <div className="text-white text-xs text-center md:w-72 mx-auto md:text-sm">
            {" "}
            Your current location will be displayed on the app and used for
            calculating real time weather
          </div>
        </div>
  )
}

export default CurrentLocationError