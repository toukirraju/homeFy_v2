const WidgetCardmd = ({ children, title }) => {
  return (
    <div className="card min-w-[270px] md:max-w-[270px] max-h-[180px] flex flex-col justify-center items-center  dark:bg-slate-800 dark:text-slate-400 ">
      <div className=" w-full border-b-2">
        <p className="text-sm mt-1 px-3 text-gray-600 dark:text-slate-400">
          {title}
        </p>
      </div>
      <div className="flex justify-center items-center">
        {/* chart */}
        <div className="pb-2">{children}</div>
      </div>
    </div>
  );
};

export default WidgetCardmd;
