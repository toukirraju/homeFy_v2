import createHomeImage from "../../../assets/create house .gif";
import setDefaultGif from "../../../assets/make default.gif";
const DefaultHouseGuideline = () => {
  return (
    <>
      <h4 style={{ textAlign: "center", padding: "40px 0" }}>
        Default house not found
        <br />
        <span style={{ color: "gray" }}>
          Please create a house then select it as a default house from profile
          section
        </span>
      </h4>
      <div className="guidline" style={{ textAlign: "center" }}>
        <img
          style={{ textAlign: "center", width: "350px", objectFit: "cover" }}
          src={createHomeImage}
          alt=""
        />
        <h5>create house</h5>
      </div>

      <div className="guidline" style={{ textAlign: "center" }}>
        <img
          style={{ textAlign: "center", width: "350px", objectFit: "cover" }}
          src={setDefaultGif}
          alt=""
        />
        <h5>set default house</h5>
      </div>
    </>
  );
};

export default DefaultHouseGuideline;
