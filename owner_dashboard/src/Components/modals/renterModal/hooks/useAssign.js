import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ApartmentService from "../../../../redux/services/apartment.api.service";
import { allApartments } from "../../../../redux/slices/apartmentSlice";
import { assign } from "../../../../redux/slices/assignRenterSlice";
import { getAllrenters } from "../../../../redux/slices/renterSlice";

const useAssign = ({
  apartmentData,
  apartmentPopUp,
  renterData,
  renterPopUp,
  setAssignModalOpened,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fatchApartments, setFatchApartments] = useState([]);
  const [selectedData, setSelectedData] = useState({
    apartment: "",
    renter: "",
  });
  //   const { user } = useSelector((state) => state.auth.user);
  //   const { renters } = useSelector((state) => state.renterInfo);

  const handleChange = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let apartment = apartmentPopUp ? null : JSON.parse(selectedData.apartment);
    let renter = renterPopUp ? null : JSON.parse(selectedData.renter);

    const assignedData = {
      apartmentId: apartmentPopUp ? apartmentData._id : apartment._id,
      apartment_number: apartmentPopUp
        ? apartmentData.apartmentDetails.apartment_number
        : apartment.apartmentDetails.apartment_number,
      roomNumber: apartmentPopUp
        ? apartmentData.apartmentDetails.roomNumber
        : apartment.apartmentDetails.roomNumber,
      renterName: renterPopUp
        ? renterData.firstname + " " + renterData.lastname
        : renter.firstname + " " + renter.lastname,
      renterId: renterPopUp ? renterData._id : renter._id,
    };
    console.log(assignedData);
    dispatch(assign(assignedData))
      .unwrap()
      .then(() => {
        setLoading(false);
        // dispatch(setReload());
        toast.success("successfully assigned");
        setAssignModalOpened(false);
        dispatch(getAllrenters());
        dispatch(allApartments());
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
      setFatchApartments(data);
    };

    fetchApartments();
  }, [renterPopUp]);

  useEffect(() => {
    const fetchRenterInfo = async () => {
      await dispatch(getAllrenters());
    };
    fetchRenterInfo();
  }, [apartmentPopUp]);

  return {
    loading,
    fatchApartments,
    selectedData,
    handleChange,
    onSubmit,
  };
};

export default useAssign;
