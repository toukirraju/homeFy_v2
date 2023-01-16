import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import ApartmentService from "../../../redux/services/apartment.api.service";
import { useDispatch, useSelector } from "react-redux";
import { assign } from "../../../redux/slices/assignRenterSlice";
import { setReload } from "../../../redux/slices/reloadSlice";
import LoadingSpinner from "../../LoadingSpinner";

const AssignRenter = ({
  assignModalOpened,
  setAssignModalOpened,
  renterData,
  searchPopUp,
}) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [allApartments, setAllApartments] = useState([]);
  const { user } = useSelector((state) => state.auth.user);
  const [selectedData, setSelectedData] = useState({
    apartment: "",
    renter: "",
  });

  const handleChange = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let apartment = JSON.parse(selectedData.apartment);
    let renter = searchPopUp ? null : JSON.parse(selectedData.renter);

    const assignedData = {
      ownerId: user._id,
      apartmentId: apartment._id,
      apartNo: apartment.apartNo,
      roomNo: apartment.roomNo,
      renterName: searchPopUp
        ? renterData.firstname + " " + renterData.lastname
        : renter.firstname + " " + renter.lastname,
      renterId: searchPopUp ? renterData._id : renter._id,
    };

    // console.log(assignedData);

    dispatch(assign(assignedData))
      .unwrap()
      .then(() => {
        setLoading(false);
        dispatch(setReload());
        setAssignModalOpened(false);
        setSelectedData({
          apartment: "",
          renter: "",
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const fetchApartments = async () => {
      const data = await ApartmentService.getApartments();
      // setPersons(data);
      setAllApartments(data);
    };
    fetchApartments();
  }, [assignModalOpened]);

  return (
    <>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "lg"}
        // fullScreen={isMobile}
        opened={assignModalOpened}
        onClose={() => setAssignModalOpened(false)}
      >
        <form>
          <h3>Assign Renter</h3>
          <span className="subtitle">* assign the renter to his apartment</span>
          <div className="form__select">
            <select
              className=""
              onChange={handleChange}
              value={selectedData.apartment}
              name="apartment"
            >
              <option value="">Select Apartment</option>

              {allApartments
                ? allApartments.map((item) =>
                    item.map((i, idx) =>
                      i.isAvailable === true ? (
                        <option key={idx} value={JSON.stringify(i)}>
                          Level: {i.level} &#10148; Apartment No: {i.apartNo}{" "}
                          &#10148; Room No: {i.roomNo}
                        </option>
                      ) : null
                    )
                  )
                : null}
            </select>

            {!searchPopUp && (
              <select
                name="renter"
                className=""
                onChange={handleChange}
                value={selectedData.renter}
              >
                <option value="">Select Renter</option>
                {renterData
                  ? renterData.map((item, index) =>
                      item.apartNo === "" && item.roomNo === "" ? (
                        <option key={index} value={JSON.stringify(item)}>
                          Name: {item.username} &#10148; Phone: {item.phoneNo}
                        </option>
                      ) : null
                    )
                  : null}
              </select>
            )}
          </div>

          <button
            className="button infoButton"
            disabled={loading}
            onClick={onSubmit}
          >
            {loading ? <LoadingSpinner /> : " Assign"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AssignRenter;
