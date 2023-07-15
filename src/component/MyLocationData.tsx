import { dateBuilder } from "../service/weatherService";

type props = {
  myData: { name: string; temp: number };
  liveTime?: string;
  liveDay?: Date;
  setPhoneViewHandler: React.Dispatch<React.SetStateAction<boolean>>
  phoneViewHandler: boolean
};

function MyLocationData({ liveDay, liveTime, myData, phoneViewHandler }: props) {
  return (
    <div className={`w-1/2 pb-4 rounded-sm ${phoneViewHandler && 'hidden'} md:block `}>
      <div
        className=" w-full h-full rounded-lg bg-no-repeat bg-cover flex flex-col justify-between text-white min-w-[345px] min-h-[672px]"
        style={{
          backgroundImage: `url(https://github.com/gauravghai/weatherApp-Reactjs/blob/master/src/images/city.jpg?raw=true)`,
        }}
      >
        <div className="z-20 md:text-2xl text-xl text-right p-8">{myData.name}</div>
        <div className="flex justify-between p-7 z-20 items-center">
          <div>
            <div className="md:text-4xl text-2xl">{liveTime}</div>
            <div>{liveDay && dateBuilder(liveDay)}</div>
          </div>
          <div className="md:text-5xl text-4xl">{myData.temp}&#176;c</div>
        </div>
      </div>
    </div>
  );
}

export default MyLocationData;
