import React, { useState } from "react";
import "./LogoSearch.css";
import { UilSearch } from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import { searchRenter } from "../../redux/slices/renterSlice";
import SearchPopUp from "../../pages/renter/modals/SearchPopUp";
import LoadingSpinner from "../LoadingSpinner";

const LogoSearch = ({ searchType }) => {
  const dispatch = useDispatch();
  const [searchId, setSearchId] = useState();

  const [loading, setLoading] = useState(false);
  const [searchPopUp, setSearchPopUp] = useState(false);
  const [searchData, setSearchData] = useState({});

  const handleSubmit = () => {
    switch (searchType) {
      case "renter":
        setLoading(true);
        dispatch(searchRenter(searchId))
          .unwrap()
          .then((res) => {
            setLoading(false);
            setSearchData(res.renter);
            setSearchPopUp(true);
          })
          .catch((error) => {
            setLoading(false);
          });

        break;

      default:
        break;
    }
  };
  // console.log(searchData);
  // if (loading) {
  //   return <LoadingSpinner />;
  // }
  return (
    <>
      <SearchPopUp
        searchPopUp={searchPopUp}
        setSearchPopUp={setSearchPopUp}
        data={searchData}
        popUp_type="find__renter"
      />
      {/* {loading ? <LoadingSpinner /> : null} */}
      <div className="LogoSearch">
        {/* <img src={Logo} alt="" /> */}
        <div className="Search">
          <input
            type="text"
            placeholder="#Explore"
            onChange={(e) => setSearchId(e.target.value)}
          />
          <div className="s-icon" onClick={() => handleSubmit()}>
            <UilSearch />
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoSearch;
