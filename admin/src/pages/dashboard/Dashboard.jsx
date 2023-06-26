import WidgetCardlg from "../../Components/cards/WidgetCardlg";
import WidgetCardmd from "../../Components/cards/WidgetCardmd";
import WidgetSm from "../../Components/cards/WidgetSm";
import { pieChartData, smallWidgetData } from "../../dummyData";

const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
        {/* cards */}
        {smallWidgetData.map((card, index) => {
          const { leftIcon, rightIcon, title, value } = card || {};
          return (
            <WidgetSm
              key={index}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              title={title}
              value={value}
            />
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row gap-2 w-full">
        {/* pie/donat/progress charts */}
        <div className="flex flex-col gap-2">
          {/* pie 1 */}
          {pieChartData.map((data, index) => (
            <WidgetCardmd key={index} data={data} />
          ))}
        </div>
        {/* bar/line charts */}
        <div className="bar grid grid-cols-1 lg:grid-cols-2  w-full gap-2 ">
          {[...Array(4)].map((_, index) => (
            <WidgetCardlg />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
