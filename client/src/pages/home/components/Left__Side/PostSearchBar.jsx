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

import AddressDropdown from "../../../../Components/AddressDropDown";
import DatePicker from "react-datepicker";
const PostSearchBar = () => {
  const [isMapOn, setIsMapOn] = useState(false);
  const [budgetOpened, setBudgetOpened] = useState(false);
  const [roomOpened, setRoomOpened] = useState(false);
  const [scheduleopened, setScheduleOpened] = useState(false);

  const [state, setState] = useState({
    room: 0,
    budget: 0,
    location: {},
    date: new Date(),
  });
  const getAddressData = (data) => {
    setState({ ...state, location: data });
  };
  console.log(state);
  return (
    <>
      <div className={`card ${LeftStyle.search__wrapper}`}>
        <div className={LeftStyle.Search_container}>
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

            <div className={LeftStyle.bottom__content}>
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
                <span>{new Date(state.date).getMonth() + 1}</span>
              </div>
            </div>
          </div>

          <div className={LeftStyle.s__icon}>
            <UilSearch />
          </div>
        </div>
        <div className={LeftStyle.postOptions}>
          <Popover opened={budgetOpened} onChange={setBudgetOpened} width={300}>
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

            <Popover.Dropdown zIndex={99999}>
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
                // value={room}
                // onChange={setRoom}
                // onChangeEnd={setEndRoom}
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

          <Popover opened={isMapOn} onChange={setIsMapOn}>
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
              <div>
                <AddressDropdown getAddressData={getAddressData} />
              </div>
            </Popover.Dropdown>
          </Popover>

          {/* <Popover opened={scheduleopened} onChange={setScheduleOpened}>
            <Popover.Target></Popover.Target>

            <Popover.Dropdown></Popover.Dropdown>
          </Popover> */}
          <div>
            <DatePicker
              selected={state.date}
              onChange={(date) => setState({ ...state, date: date })}
              customInput={<CustomInput />}
              dateFormatCalendar={"MMM yyyy"}
              minDate={new Date()}
              showPopperArrow
              showFullMonthYearPicker
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostSearchBar;

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    className={LeftStyle.option}
    style={{ color: "var(--shedule)", background: "none", border: "none" }}
    onClick={onClick}
    ref={ref}
  >
    <UilSchedule />
    Schedule
  </button>
));
