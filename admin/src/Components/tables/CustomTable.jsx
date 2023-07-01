import "../../Styles/TableStyle.css";
import TableRow from "./TableRow";
const CustomTable = ({ title, headers, rowData }) => {
  return (
    <div>
      <table>
        <caption>
          <div className="flex w-full shadow-lg rounded px-2 py-2 justify-between items-center">
            <span>{title}</span>
            <form>
              <input type="text" name="" placeholder="search..." />
            </form>
          </div>
        </caption>

        <thead>
          <tr>
            {headers?.map((header) => (
              <th key={header.header}>{header.header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <TableRow rowData={rowData} headers={headers} />
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
