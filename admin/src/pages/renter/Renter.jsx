import RenterLineChart from "./components/charts/RenterLineChart";
import PieChart from "./components/charts/PieChart";
import RegionalBarChart from "./components/charts/RegionalBarChart";
import CustomTable from "../../Components/tables/CustomTable";

const Renter = () => {
  const headers = [
    {
      header: "Title",
      rowField: "title",
    },
    {
      header: "Video Title",
      rowField: "video_title",
    },
    {
      header: "Mark",
      rowField: "totalMark",
    },
    {
      header: "Action",
      rowField: (row) => (
        <div className="flex gap-x-2">
          <button>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokwidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          <button>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokwidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      {/* <div>1. Line chart for monthly created renters "for 1 year"</div>
      <div>2. pie chart for active/inactive renter</div>
      <div>3. regional renters bar chart</div>
      <div>
        4. all renters table "newly created show first " renter can be find by
        their username or home owner username/phone number
      </div> */}
      <div className="card dark:bg-slate-800 dark:text-slate-400 flex flex-col  items-center max-h-[200px] ">
        <div className="w-full border-b-2 px-3">
          <p className="text-sm mt-1 text-gray-600 dark:text-slate-400">
            Yearly created renters
          </p>
        </div>
        <div className="w-full">
          <RenterLineChart />
        </div>
      </div>

      <div className="md:grid grid-cols-7 gap-2 my-2">
        <div className="card md:col-span-2 w-full">
          <PieChart />
        </div>
        <div className="card md:col-span-5 w-full">
          <RegionalBarChart />
        </div>
      </div>

      <div className="card">
        <CustomTable
          title={"Recent created apartment"}
          headers={headers}
          rowData={[
            {
              title: "Test Title 1",
              video_title: "Video Title 1",
              totalMark: "4324",
            },
            {
              title: "Test Title 2",
              video_title: "Video Title 2",
              totalMark: "34324",
            },
            {
              title: "Test Title 3",
              video_title: "Video Title 3",
              totalMark: "14324",
            },
            {
              title: "Test Title 4",
              video_title: "Video Title 4",
              totalMark: "4324",
            },
            {
              title: "Test Title 5",
              video_title: "Video Title5",
              totalMark: "34324",
            },
            {
              title: "Test Title 6",
              video_title: "Video Title 6",
              totalMark: "14324",
            },
          ]}
        />
      </div>
    </>
  );
};

export default Renter;
