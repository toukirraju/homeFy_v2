import React, { useEffect, useState } from "react";
import LeftStyle from "./Left__side.module.css";
import { Popover, Slider } from "@mantine/core";
import {
  UilSearch,
  UilBill,
  UilBedDouble,
  UilLocationPoint,
  UilSchedule,
} from "@iconscout/react-unicons";

import CustomMap from "../../../../Components/UI/CustomMap/CustomMap";
import { useMediaQuery } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import { fetchFilteredPosts } from "../../../../redux/features/posts/postSlice";
const PostSearchBar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();

  const [isMapOn, setIsMapOn] = useState(false);
  const [budgetOpened, setBudgetOpened] = useState(false);
  const [roomOpened, setRoomOpened] = useState(false);

  const [state, setState] = useState({
    room: "",
    budget: "",
  });

  const handleSubmit = () => {
    dispatch(
      fetchFilteredPosts({
        budget: state.budget,
        rooms: state.room,
      })
    );
    reset();
  };
  const reset = () => {
    setState({
      room: "",
      budget: "",
    });
  };
  return (
    <>
      <div className={`card ${LeftStyle.search__wrapper}`}>
        <div className={LeftStyle.Search_container}>
          {/* search output */}
          <div className={LeftStyle.Search_content}>
            <div className={LeftStyle.upper__content}>
              <div>
                <span>
                  <UilBill color="green" />{" "}
                </span>
                <span>{state.budget}</span>৳
              </div>

              <div>
                <span>
                  <UilBedDouble color="var(--video)" />
                </span>{" "}
                <span>{state.room}</span>
              </div>
            </div>

            {/* <div className={LeftStyle.bottom__content}>
              <div>
                <span>
                  <UilLocationPoint color="var(--location)" />{" "}
                </span>{" "}
                <div className={LeftStyle.bottom__locations}>
                  <span>
                    {Object.keys(state.location).length !== 0 &&
                      state.location.division.name}
                  </span>
                  <span>
                    {Object.keys(state.location).length !== 0 &&
                      state.location.district.name}
                  </span>
                  <span>
                    {Object.keys(state.location).length !== 0 &&
                      state.location.upazila.name}
                  </span>
                </div>
              </div>

              <div>
                <span>
                  <UilSchedule color="var(--shedule)" />
                </span>{" "}
                <span>{new Date(state.date).toLocaleDateString()}</span>
              </div>
            </div> */}
          </div>

          <div
            className={LeftStyle.s__icon}
            style={{
              backgroundImage:
                "linear-gradient(to right,#02aab0 0%,#00cdac 51%, #02aab0 100%)",
            }}
            onClick={handleSubmit}
            type="submit"
          >
            <UilSearch />
          </div>
        </div>

        {/* Popover options */}
        <div className={LeftStyle.postOptions}>
          {/* Budget slider  */}
          <Popover
            opened={budgetOpened}
            onChange={setBudgetOpened}
            withArrow
            width={300}
          >
            <Popover.Target>
              <div
                className={LeftStyle.option}
                style={{ color: "var(--photo)" }}
                onClick={() => setBudgetOpened((o) => !o)}
              >
                <UilBill />
                Budget
              </div>
            </Popover.Target>

            <Popover.Dropdown>
              <Slider
                thumbChildren={<UilBill size={16} />}
                color="teal"
                size="sm"
                label={(value) => `${value} ৳ `}
                marks={[
                  { value: 10000, label: "10k" },
                  { value: 20000, label: "20k" },
                  { value: 40000, label: "40k" },
                  { value: 60000, label: "60k" },
                  { value: 80000, label: "80k" },
                  { value: 100000, label: "100k" },
                ]}
                step={10000}
                value={state.budget}
                onChange={(value) => setState({ ...state, budget: value })}
                // onChangeEnd={(value) => console.log(value)}
                max={100000}
                thumbSize={26}
                styles={{
                  thumb: { borderWidth: 2, padding: 3 },
                  markLabel: { display: "none" },
                }}
              />
            </Popover.Dropdown>
          </Popover>

          {/* Room slider  */}
          <Popover
            opened={roomOpened}
            onChange={setRoomOpened}
            withArrow
            width={200}
          >
            <Popover.Target>
              <div
                className={LeftStyle.option}
                style={{ color: "var(--video)" }}
                onClick={() => setRoomOpened((o) => !o)}
              >
                <UilBedDouble />
                Room
              </div>
            </Popover.Target>

            <Popover.Dropdown>
              <Slider
                thumbChildren={<UilBedDouble size={16} />}
                color="violet"
                size="sm"
                marks={[
                  { value: 2, label: "2" },
                  { value: 4, label: "4" },
                  { value: 6, label: "6" },
                  { value: 8, label: "8" },
                  { value: 10, label: "10" },
                ]}
                value={state.room}
                onChange={(value) => setState({ ...state, room: value })}
                max={10}
                thumbSize={26}
                styles={{
                  thumb: { borderWidth: 2, padding: 3 },
                  markLabel: { display: "none" },
                }}
              />
            </Popover.Dropdown>
          </Popover>
          {/* Location Picker  */}
          {isMobile && (
            <Popover withArrow opened={isMapOn} onChange={setIsMapOn}>
              <Popover.Target>
                <div
                  className={LeftStyle.option}
                  style={{ color: "var(--location)" }}
                  onClick={() => setIsMapOn((prev) => !prev)}
                >
                  <UilLocationPoint />
                  Location
                </div>
              </Popover.Target>

              <Popover.Dropdown>
                <div style={{ width: "330px" }}>
                  {/* <AddressDropdown getAddressData={getAddressData} /> */}
                  <CustomMap setIsMapOn={setIsMapOn} />
                </div>
              </Popover.Dropdown>
            </Popover>
          )}
        </div>
      </div>
    </>
  );
};

export default PostSearchBar;
