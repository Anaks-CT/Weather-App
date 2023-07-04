import { dateBuilder } from "../service/weatherService";

type props = {
  myData: { name: string; temp: number };
  liveTime?: string;
  liveDay?: Date;
};

function MyLocationData({ liveDay, liveTime, myData }: props) {
  return (
    <div className="w-1/2 pb-4 rounded-sm hidden md:block">
      <div
        className=" w-full h-full rounded-lg bg-no-repeat bg-cover flex flex-col justify-between text-white"
        style={{
          backgroundImage: `url(https://github.com/gauravghai/weatherApp-Reactjs/blob/master/src/images/city.jpg?raw=true)`,
        }}
      >
        <div className="z-20 text-2xl text-right p-8">{myData.name}</div>
        <div className="flex justify-between p-7 z-20 items-center">
          <div>
            <div className="text-4xl">{liveTime}</div>
            <div>{liveDay && dateBuilder(liveDay)}</div>
          </div>
          <div className="text-5xl">{myData.temp}&#176;c</div>
        </div>
      </div>
    </div>
  );
}

export default MyLocationData;
