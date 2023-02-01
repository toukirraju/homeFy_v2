import { Loader, Switch, Modal, useMantineTheme } from "@mantine/core";
import Styles from "../../../Styles/ModalStyle.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { UilBookReader, UilBuilding, UilUser } from "@iconscout/react-unicons";
import { useState } from "react";
import UpdateApartment from "./UpdateApartment";
import ConfirmationModal from "../../../Components/modals/ConfirmationModal";
const PopUpWindow = ({ popUpModalOpened, setPopUpModalOpened, data }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [checked, setChecked] = useState(false);
  const [billChecked, setBillChecked] = useState(true);

  const [updateModalOpened, setUpdateModalOpened] = useState(false);

  const [confirmationPopUp, setConfirmationPopUp] = useState(false);

  const [isAssignData, setIsAssignData] = useState();
  const [removeId, setRemoveId] = useState();

  //apartment remove function
  const handleRemove = (apartment) => {
    if (apartment.isAvailable === true) {
      setConfirmationPopUp(true);
      setRemoveId(apartment._id);
      setIsAssignData(null);
    } else {
      setConfirmationPopUp(true);
      setRemoveId(null);
      setIsAssignData({
        apartmentId: apartment._id,
        _id: apartment.renterId,
      });
    }
  };

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
        size={isMobile ? "sm" : "md"}
        opened={popUpModalOpened}
        onClose={() => setPopUpModalOpened(false)}
      >
        {data ? (
          <>
            <div>
              <div className={`card ${Styles.Modal_header}`}>
                <h3 className={` ${Styles.Modal_header_title}`}>Actions</h3>
              </div>
              <div className={Styles.popUpWindow__body}>
                <div className={Styles.popUpWindow_container}>
                  <div className={Styles.popUpWindow__innerCard}>
                    <div className={Styles.popUpWindow__card__content}>
                      <span className={Styles.popUpWindow__card__icon}>
                        <UilBuilding />{" "}
                      </span>
                      <div className={Styles.popUpWindow__card__elements}>
                        <span>House Name</span>
                        <span>{data.houseName}</span>
                      </div>
                    </div>
                  </div>
                  <div className={Styles.popUpWindow__innerCard}>
                    <div className={Styles.popUpWindow__card__content}>
                      <span className={Styles.popUpWindow__card__icon}>
                        <UilBookReader />{" "}
                      </span>
                      <div className={Styles.popUpWindow__card__elements}>
                        <span>Owner Name</span> <hr />
                        <span>{data.ownerName}</span>
                      </div>
                    </div>
                  </div>
                  <div className={Styles.popUpWindow__innerCard}>
                    <div className={Styles.popUpWindow__card__content}>
                      <span className={Styles.popUpWindow__card__icon}>
                        <UilUser />{" "}
                      </span>
                      <div className={Styles.popUpWindow__card__elements}>
                        <span>Renter Name</span>
                        <span>{data.renterName}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`card ${Styles.expend_apartment_info}`}>
                  <span>Apartment Informations</span>
                  <Switch
                    onLabel="ON"
                    offLabel="OFF"
                    checked={checked}
                    onChange={(event) =>
                      setChecked(event.currentTarget.checked)
                    }
                  />
                </div>
                {checked && (
                  <>
                    <div className={Styles.popUpWindow_container}>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilBookReader />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Floor</span> <hr />
                            <span>{data.apartmentDetails.floor}</span>
                          </div>
                        </div>
                      </div>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilBuilding />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Name</span>
                            <span>{data.apartmentDetails.apartmentName}</span>
                          </div>
                        </div>
                      </div>

                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilUser />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Room Number</span>
                            <span>
                              {data.apartmentDetails.apartment_number}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={Styles.popUpWindow_container}>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilBookReader />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Type</span> <hr />
                            <span>{data.apartmentDetails.apartmentType}</span>
                          </div>
                        </div>
                      </div>

                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilBuilding />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Bed Room</span>
                            <span>
                              {data.apartmentDetails.number_of_bed_room}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilBookReader />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Bath</span> <hr />
                            <span>{data.apartmentDetails.number_of_baths}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={Styles.popUpWindow_container}>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilBuilding />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Kitchen</span>
                            <span>
                              {data.apartmentDetails.number_of_kitchen}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilUser />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Balcony</span>
                            <span>
                              {data.apartmentDetails.number_of_balcony}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilUser />
                          </span>

                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Length</span>

                            <span>
                              {data.apartmentDetails.apartment_length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className={`card ${Styles.expend_apartment_info}`}>
                  <span>Bill Informations</span>
                  <Switch
                    onLabel="ON"
                    offLabel="OFF"
                    checked={billChecked}
                    onChange={(event) =>
                      setBillChecked(event.currentTarget.checked)
                    }
                  />
                </div>
                {billChecked && (
                  <>
                    <div className={Styles.popUpWindow_container}>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilBookReader />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Rent</span> <hr />
                            <span>{data.billDetails.rent}</span>
                          </div>
                        </div>
                      </div>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilBuilding />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Gas bill</span>
                            <span>{data.billDetails.gas_bill}</span>
                          </div>
                        </div>
                      </div>

                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilUser />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Water bill</span>
                            <span>{data.billDetails.water_bill}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={Styles.popUpWindow_container}>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilBookReader />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Service charge</span> <hr />
                            <span>{data.billDetails.service_charge}</span>
                          </div>
                        </div>
                      </div>

                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilBuilding />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>others</span>
                            <span>{data.billDetails.others}</span>
                          </div>
                        </div>
                      </div>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilBookReader />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Total </span>
                            <span>{data.billDetails.totalRent}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={`card ${Styles.Modal_button_container}`}>
              <button
                className="removeButton btns"
                onClick={() => handleRemove(data)}
              >
                remove
              </button>
              <button className="button btns">Post</button>
              <button className="submit_button btns">Assign</button>
              <button
                className="updateButton btns"
                onClick={() => setUpdateModalOpened(true)}
              >
                Update
              </button>
            </div>
          </>
        ) : (
          <div className="loading__screen">
            <Loader color="teal" variant="bars" />
          </div>
        )}
      </Modal>

      <UpdateApartment
        updateModalOpened={updateModalOpened}
        setUpdateModalOpened={setUpdateModalOpened}
        data={data}
      />
      <ConfirmationModal
        confirmationPopUp={confirmationPopUp}
        setConfirmationPopUp={setConfirmationPopUp}
        data={removeId}
        popUp_type="Remove_Apartment"
        isAssignData={isAssignData}
      />
    </>
  );
};

export default PopUpWindow;
