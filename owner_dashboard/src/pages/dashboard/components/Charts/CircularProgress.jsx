import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Style from "../../styles/Dashboard.module.css";
const CircularProgress = ({ data }) => {
  const percentage =
    (parseInt(data.paidRenters) * 100) / parseInt(data.activeRenters);
  return (
    <div>
      <div className={`${Style.widget_header}`}>
        <h5 className="subtitle">
          <b>Payment</b>
        </h5>
        <div className={`${Style.widget_footer}`}>
          <p style={{ marginRight: "5px" }}>
            Complete:
            {data.paidRenters}
          </p>
          <p>Incomplete: {data.nonPaidRenters}</p>
        </div>
      </div>

      <div className={`${Style.circular_progress}`}>
        <CircularProgressbar
          value={percentage}
          text={`Paid :${percentage}%`}
          styles={buildStyles({
            textColor: "gray",
            pathColor: "turquoise",
            trailColor: "gold",
            textSize: "14px",
            fontWeight: "600",
          })}
        />
      </div>
      <div className={`${Style.widget_footer}`}>
        {/* <div> */}
        <p>Active Renter: {data.activeRenters}</p>
        <p>Inactive Renter: {data.inactiveRenters}</p>
        {/* </div> */}
      </div>
    </div>
  );
};

export default CircularProgress;
