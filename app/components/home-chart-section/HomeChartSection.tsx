import HomePriceChart from "./HomePriceChart";
import HomeVolumeChart from "./HomeVolumeChart";

export default function HomeChartSection() {
  return (
    <>
      <div className="pt-4 w-full flex justify-center items-center flex-col">
        <div className="w-full flex pr-10 pl-10 justify-center items-center">
          <div className="m-4 w-1/2">
            <HomePriceChart />
          </div>

          <div className="m-4 w-1/2">
            <HomeVolumeChart />
          </div>
        </div>
      </div>
    </>
  );
}
