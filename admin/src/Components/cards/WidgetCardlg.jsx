import BarChart from "../../pages/dashboard/components/Charts/BarChart";

const WidgetCardlg = () => {
  return (
    <div className="card dark:bg-slate-800 dark:text-slate-400 flex flex-col  items-center max-h-[200px] ">
      <div className="w-full border-b-2 px-3">
        <p className="text-sm mt-1 text-gray-600 dark:text-slate-400">
          New House created per Month{" "}
        </p>
      </div>
      <div className="w-full">
        <BarChart />
      </div>
    </div>
  );
};

export default WidgetCardlg;
