import { GiThink } from "react-icons/gi";
import { BiConfused } from "react-icons/bi";
const WidgetSm = ({ leftIcon, rightIcon, title, value }) => {
  const LeftIconComponent = leftIcon || BiConfused;
  const RightIconComponent = rightIcon || GiThink;
  return (
    <div className="card p-3 dark:bg-slate-800 dark:text-slate-400">
      <div className="flex justify-between text-gray-500">
        <span>
          <LeftIconComponent />
        </span>
        <span>
          <RightIconComponent />
        </span>
      </div>
      <p className="text-sm mt-1 text-gray-600 dark:text-slate-400">{title}</p>
      <span className="text-lg font-semibold text-gray-700 dark:text-slate-300">
        {value}
      </span>
    </div>
  );
};

export default WidgetSm;
