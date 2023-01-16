import React, { useEffect, useState } from "react";
import Styles from "../Components/modals/ModalStyle.module.css";
import Divisions from "../assets/location_json/divisions/divisions.json";

import Districts from "../assets/location_json/districts/districts.json";

import Upazilas from "../assets/location_json/upazilas/upazilas.json";

import Unions from "../assets/location_json/unions/unions.json";

import { Formik, Form, Field } from "formik";

const AddressDropDown = ({ getAddressData }) => {
  // const [divisions, setDivisions] = React.useState({});
  // const [districts, setDistricts] = React.useState({});
  // const [upazilas, setUpazilas] = React.useState({});
  // const [selectedData, setSelectedData] = React.useState({});
  // const [unions, setUnions] = React.useState({});

  // const handleChange = (e) => {
  //   setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
  //   setDistricts({ ...districts, [e.target.name]: e.target.value });
  // };

  // const division =
  //   Object.keys(divisions).length === 0 ? {} : JSON.parse(divisions.division);
  // const district =
  //   Object.keys(districts).length === 0 ? {} : JSON.parse(districts.district);
  // const upazila =
  //   Object.keys(upazilas).length === 0 ? {} : JSON.parse(upazilas.upazila);
  // const union =
  //   Object.keys(unions).length === 0 ? {} : JSON.parse(unions.union);

  // const address = {
  //   division: division.name,
  //   district: district.name,
  //   upazila: upazila.name,
  //   union: union.name,
  // };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  // console.log(val({ name: "raju" }));
  // console.log(Unions[2].data);
  // const dv = JSON.parse(selectedData.data);
  // console.log(dv);
  // useEffect(() => {
  //   getAddressData(address);
  // }, [address]);

  // return (
  //   <>
  //     <div
  //     >
  //       <h2 className={``}>Select your address</h2>
  //       {Divisions[2].data ? (
  //         <form>
  //           <select
  //             style={{
  //               width: "100%",
  //               marginBottom: "10px",
  //               marginTop: "10px",
  //             }}
  //             name="division"
  //             onChange={(e) => {
  //               setDivisions({
  //                 ...divisions,
  //                 [e.target.name]: e.target.value,
  //               });
  //             }}
  //             value={divisions.division}
  //           >
  //             <option value={JSON.stringify(new Object())}>Divisions</option>
  //             {Divisions[2].data &&
  //               Divisions[2].data.map((item, index) => (
  //                 <option key={index} value={JSON.stringify(item)}>
  //                   &#10148; {item.name} &#10148; {item.bn_name}
  //                 </option>
  //               ))}
  //           </select>

  //           {Object.keys(division).length !== 0 && (
  //             <select
  //               style={{ width: "100%", marginBottom: "10px" }}
  //               name="district"
  //               onChange={(e) => {
  //                 setDistricts({
  //                   ...districts,
  //                   [e.target.name]: e.target.value,
  //                 });
  //               }}
  //               value={districts.district}
  //             >
  //               <option value={JSON.stringify(new Object())}>Districts</option>
  //               {Districts[2].data &&
  //                 Districts[2].data.map(
  //                   (item, index) =>
  //                     item.division_id === division.id && (
  //                       <option key={index} value={JSON.stringify(item)}>
  //                         &#10148; {item.name} &#10148; {item.bn_name}
  //                       </option>
  //                     )
  //                 )}
  //             </select>
  //           )}

  //           {Object.keys(district).length !== 0 && (
  //             <select
  //               style={{ width: "100%", marginBottom: "10px" }}
  //               name="upazila"
  //               onChange={(e) => {
  //                 setUpazilas({
  //                   ...upazilas,
  //                   [e.target.name]: e.target.value,
  //                 });
  //               }}
  //               value={upazilas.upazila}
  //             >
  //               <option value={JSON.stringify(new Object())}>Upazila</option>
  //               {Upazilas[2].data &&
  //                 Upazilas[2].data.map(
  //                   (item, index) =>
  //                     item.district_id === district.id && (
  //                       <option key={index} value={JSON.stringify(item)}>
  //                         &#10148; {item.name} &#10148; {item.bn_name}
  //                       </option>
  //                     )
  //                 )}
  //             </select>
  //           )}

  //           {Object.keys(upazila).length !== 0 && (
  //             <select
  //               style={{ width: "100%", marginBottom: "10px" }}
  //               name="union"
  //               onChange={(e) => {
  //                 setUnions({ ...unions, [e.target.name]: e.target.value });
  //               }}
  //               value={unions.union}
  //             >
  //               <option value={JSON.stringify(new Object())}>Unions</option>
  //               {Unions[2].data &&
  //                 Unions[2].data.map(
  //                   (item, index) =>
  //                     item.upazilla_id === upazila.id && (
  //                       <option key={index} value={JSON.stringify(item)}>
  //                         &#10148;{item.name} &#10148; {item.bn_name}
  //                       </option>
  //                     )
  //                 )}
  //             </select>
  //           )}

  //           <button
  //             className="button infoButton"
  //             onClick={onSubmit}
  //           >
  //             submit
  //           </button>
  //         </form>
  //       ) : (
  //         <></>
  //       )}
  //     </div>
  //   </>
  // );

  const [{ division, district, upazila, union }, setData] = useState({
    division: {
      // bn_name: "চট্টগ্রাম",
      // id: "1",
      // name: "Chattagram",
    },
    district: {},
    upazila: {},
    union: {},
  });

  const divisions = Divisions[2].data.map((division) => (
    <option key={division.name} value={JSON.stringify(division)}>
      {division.bn_name}
    </option>
  ));
  // console.log({ division, district, upazila, union });
  // const states = countriesData
  //   .find((item) => item.name === division)
  //   ?.states.map((district) => (
  //     <option key={district} value={district}>
  //       {district}
  //     </option>
  //   ));
  const districts = Districts[2].data
    .filter((item) => item.division_id === division.id)
    ?.map((district) => (
      // <>
      //   <option value={new Object()}>----select----</option>
      <option key={district.name} value={JSON.stringify(district)}>
        {district.bn_name}
      </option>
      // </>
    ));

  const upazilas = Upazilas[2].data
    .filter((item) => item.district_id === district.id)
    ?.map((upazila) => (
      <option key={upazila.name} value={JSON.stringify(upazila)}>
        {upazila.bn_name}
      </option>
    ));

  const unions = Unions[2].data
    .filter((item) => item.upazilla_id === upazila.id)
    ?.map((union) => (
      <option key={union.name} value={JSON.stringify(union)}>
        {union.bn_name}
      </option>
    ));

  // function handleCountryChange(event) {
  //   setData((data) => ({ district: "", division: event.target.value }));
  // }
  function handleDivisionChange(event) {
    setData((data) => ({
      district: "",
      division: JSON.parse(event.target.value),
      upazila: "",
      union: "",
    }));
  }

  function handleDistrictChange(event) {
    setData((data) => ({ ...data, district: JSON.parse(event.target.value) }));
  }

  function handleUpazilaChange(event) {
    setData((data) => ({ ...data, upazila: JSON.parse(event.target.value) }));
  }

  function handleUnionChange(event) {
    setData((data) => ({ ...data, union: JSON.parse(event.target.value) }));
  }

  useEffect(() => {
    getAddressData({ division, district, upazila, union });
  }, [division, district, upazila, union]);
  return (
    <>
      <div
        style={{ display: "unset", width: "90%" }}
        onSubmit={() => console.log("Submitted")}
      >
        <div className={Styles.input__container}>
          <label htmlFor="division" className={Styles.input__label}>
            Division
          </label>
          <select
            name="division"
            value={division.division}
            onChange={handleDivisionChange}
          >
            {/* <option>----select----</option> */}
            {divisions}
          </select>
        </div>

        {Object.keys(division).length !== 0 && (
          <div className={Styles.input__container}>
            <label htmlFor="district" className={Styles.input__label}>
              District
            </label>
            <select
              name="district"
              value={district.district}
              onChange={handleDistrictChange}
            >
              {/* <option>----select----</option> */}
              {districts}
            </select>
          </div>
        )}

        {Object.keys(district).length !== 0 && (
          <div className={Styles.input__container}>
            <label htmlFor="upazila" className={Styles.input__label}>
              Upazila
            </label>
            <select
              name="upazila"
              value={upazila.upazila}
              onChange={handleUpazilaChange}
            >
              {/* <option>----select----</option> */}
              {upazilas}
            </select>
          </div>
        )}

        {Object.keys(upazila).length !== 0 && (
          <div className={Styles.input__container}>
            <label htmlFor="union" className={Styles.input__label}>
              Union
            </label>
            <select
              name="union"
              value={union.union}
              onChange={handleUnionChange}
            >
              {/* <option>----select----</option> */}
              {unions}
            </select>
          </div>
        )}

        {/* <input type="submit" /> */}
      </div>
    </>
  );
};

export default AddressDropDown;
