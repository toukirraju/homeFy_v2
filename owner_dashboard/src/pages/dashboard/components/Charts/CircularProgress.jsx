import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useSelector } from "react-redux";
import Style from "../../styles/Dashboard.module.css";
const CircularProgress = () => {
  // const {  renterWidgets, billWidgets,  } =
  //   useSelector((state) => state.dashboardData);

  // const per =
  //   (parseInt(billWidgets.paidRenters) * 100) /
  //   parseInt(renterWidgets.activeRenter);
  const percentage = Math.round(50);
  // const incompleteRenter =
  //   parseInt(renterWidgets.activeRenter) - parseInt(billWidgets.paidRenters);
  return (
    <div>
      <div className={`${Style.widget_header}`}>
        <h5 className="subtitle">
          <b>Payment</b>
        </h5>
        <div className={`${Style.widget_content}`}>
          <p>
            <b> Complete:</b>
            20
            {/* <b> {billWidgets.paidRenters}</b> */}
          </p>
          <p>
            <b>Incomplete: </b>5{/* <b>{incompleteRenter}</b> */}
          </p>
        </div>
      </div>

      <div
        className={`${Style.circular_progress}`}
        // style={{
        //   width: "60%",
        //   height: "65%",
        //   margin: "auto",
        // }}
      >
        <CircularProgressbar
          value={percentage}
          text={`Paid :${percentage}%`}
          styles={buildStyles({
            textColor: "gray",
            pathColor: "turquoise",
            trailColor: "gold",
            textSize: "10px",
          })}
        />
      </div>
      <div className={`${Style.widget_footer}`}>
        <p>
          Active Renter: 25
          {/* <b> {renterWidgets.activeRenter}</b> */}
        </p>
      </div>
    </div>
  );
};

export default CircularProgress;
