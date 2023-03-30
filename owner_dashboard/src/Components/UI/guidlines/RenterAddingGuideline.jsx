import { useMediaQuery } from "@mantine/hooks";
import createRenterGif from "../../../assets/createRenter.gif";
import findRenterGif from "../../../assets/findRenter.gif";
const RenterAddingGuideline = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <h4 style={{ textAlign: "center", padding: "40px 0" }}>
        No renter found
        <br />
        <span style={{ color: "gray" }}>
          Please create or find the renter first
        </span>
      </h4>
      <div className="guidline" style={{ textAlign: "center" }}>
        <img
          style={{
            textAlign: "center",
            width: isMobile ? "100%" : "65%",
            objectFit: "cover",
          }}
          src={createRenterGif}
          alt=""
        />
        <h5>Renter creating</h5>
      </div>
      <div
        className="guidline"
        style={{ textAlign: "center", padding: "40px 0" }}
      >
        <img
          style={{
            textAlign: "center",
            width: isMobile ? "100%" : "65%",
            objectFit: "cover",
          }}
          src={findRenterGif}
          alt=""
        />
        <h5>Renter finding</h5>
      </div>
    </>
  );
};

export default RenterAddingGuideline;
