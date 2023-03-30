import { useMediaQuery } from "@mantine/hooks";
import createApartmentGif from "../../../assets/createApartment.gif";
const CreateApartmentGuideline = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <h4 style={{ textAlign: "center", padding: "40px 0" }}>
        No apartment found
        <br />
        <span style={{ color: "gray" }}>Please create apartment first</span>
      </h4>
      <div className="guidline" style={{ textAlign: "center" }}>
        <img
          style={{
            textAlign: "center",
            width: isMobile ? "100%" : "65%",
            objectFit: "cover",
          }}
          src={createApartmentGif}
          alt=""
        />
        <h5>Creating apartment</h5>
      </div>
    </>
  );
};

export default CreateApartmentGuideline;
