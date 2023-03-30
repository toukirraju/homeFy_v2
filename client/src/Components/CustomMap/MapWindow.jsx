import { Loader, Switch, Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import CustomMap from "./CustomMap";

const MapWindow = ({ mapWindowOpen, setMapWindowOpen, setAddress }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(false);

  //get detail address from coodinates
  const getAddressFromCoordinates = async (lat, lon) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const data = await response.json();

    const address = data;

    return address;
  };

  const handleConfirm = () => {
    setLoading(true);
    getAddressFromCoordinates(location[0], location[1])
      .then((address) => {
        // setMarkerAddress(address); // Output: Westminster
        setLoading(false);
        setAddress(address);
        setMapWindowOpen(false);
      })
      .catch(() => setLoading(false));
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size={isMobile ? "sm" : "lg"}
      opened={mapWindowOpen}
      onClose={() => setMapWindowOpen(false)}
    >
      <div>
        <CustomMap setLocation={setLocation} />
        <button
          style={{ margin: "auto", padding: "10px", marginTop: "5px" }}
          className="button"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? (
            <>
              Confirm location <LoadingSpinner />{" "}
            </>
          ) : (
            "Confirm location"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default MapWindow;
