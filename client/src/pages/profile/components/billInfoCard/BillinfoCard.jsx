import { Loader } from "@mantine/core";
import BillInfoLoader from "../../../../Components/loader/BillInfoLoader";
import { useGetTemporaryBillQuery } from "../../../../redux/features/bills/billRTKquery";
import Style from "./BillinfoCard.module.css";

const BillinfoCard = ({ data }) => {
  const {
    data: temporaryBill,
    isLoading,
    isError,
  } = useGetTemporaryBillQuery();

  // decide what to render
  let content = null;
  if (isLoading && !isError) {
    content = <BillInfoLoader />;
  }
  if (!isLoading && isError) {
    content = <h3>There is an error to getting temporary bill</h3>;
  }
  if (!isLoading && !isError && temporaryBill) {
    content = (
      <div className={`card ${Style.apartment__wrapper}`}>
        <h4 className={Style.apartment__header}>Bill Information</h4>
        {data === null ? (
          <h4>No apartment have been assigned</h4>
        ) : (
          <div className="apartment__container">
            <div className={Style.double__content}>
              <div className="content">
                <span>Rent</span>
                <span>{data.billDetails.rent}</span>
              </div>
              <div className="content">
                <span>Gas Bill</span>
                <span>{data.billDetails.gas_bill}</span>
              </div>
            </div>

            <div className={Style.double__content}>
              <div className="content">
                <span>Water Bill</span>
                <span>{data.billDetails.water_bill}</span>
              </div>
              <div className="content">
                <span>Service Charge</span>
                <span>{data.billDetails.service_charge}</span>
              </div>
            </div>

            <div className={Style.double__content}>
              <div className="content">
                <span>Others</span>
                <span>{data.billDetails.others}</span>
              </div>
              <div className="content">
                <span>Total Rent</span>
                <span>{data.billDetails.totalRent}</span>
              </div>
            </div>

            <div className={Style.double__content}>
              <div className="content">
                <span>Electricity Bill</span>
                <span>{temporaryBill.electricity_bill}</span>
              </div>

              <div className="content">
                <span>Due</span>
                <span>{temporaryBill.tempDue}</span>
              </div>
            </div>

            <div className={Style.double__content}>
              <div className="content">
                <span> Others Temporary</span>
                <span>{temporaryBill.others}</span>
              </div>
              <div className="content">
                <span>Payable Rent</span>
                <span>
                  {parseInt(data.billDetails.totalRent) +
                    parseInt(temporaryBill.electricity_bill) +
                    parseInt(temporaryBill.tempDue) +
                    parseInt(temporaryBill.others)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return content;
};

export default BillinfoCard;
