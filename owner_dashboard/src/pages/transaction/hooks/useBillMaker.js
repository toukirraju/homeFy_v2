import { useState, useEffect } from "react";

const useBillMaker = (setBillModalOpened, temporaryBill, data) => {
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);

  // initial form value
  const [formValue, setFormValue] = useState({
    renterId: "",
    renterName: "",

    rent: 0,
    gas_bill: 0,
    water_bill: 0,
    service_charge: 0,

    electricity_bill: 0,
    others: 0,
    totalRent: 0,

    payableAmount: 0,
    paidAmount: "",
    due: 0,
  });

  //calculate total amount
  const total =
    parseInt(data.apartment.billDetails.totalRent) +
    parseInt(formValue.electricity_bill) +
    parseInt(formValue.others) +
    parseInt(formValue.due);

  //calculate Due bill
  const newDue = parseInt(total) - parseInt(formValue.paidAmount);

  //initializ submited data
  const [submitedData, setSubmitedData] = useState({
    renterId: formValue.renterId,
    renterName: formValue.renterName,

    phone: data.phone,

    electricity_bill: formValue.electricity_bill,
    others: formValue.others,
    totalRent: formValue.totalRent,
    payableAmount: total,
    paidAmount: formValue.paidAmount,
    due: newDue > 0 ? newDue : 0,
  });

  // form submit function
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitedData({
      ...formValue,
      renterId: formValue.renterId,
      renterName: formValue.renterName,

      phone: data.phone,

      electricity_bill: formValue.electricity_bill,
      others: formValue.others,
      totalRent: formValue.totalRent,
      payableAmount: total,
      paidAmount: formValue.paidAmount,
      due: newDue > 0 ? newDue : 0,
    });
    setConfirmationPopUp(true);
    setBillModalOpened(false);
  };

  // form input value change
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormValue({
      renterId: data._id,
      renterName: data.firstname + " " + data.lastname,

      rent: data.apartment.billDetails.rent,
      gas_bill: data.apartment.billDetails.gas_bill,
      water_bill: data.apartment.billDetails.water_bill,
      service_charge: data.apartment.billDetails.service_charge,

      electricity_bill: temporaryBill.electricity_bill
        ? temporaryBill.electricity_bill
        : 0,
      others: temporaryBill.others ? temporaryBill.others : 0,
      totalRent: data.apartment.billDetails.totalRent,

      payableAmount: total,
      paidAmount: "",
      due: temporaryBill.tempDue ? temporaryBill.tempDue : 0,
    });
  }, [temporaryBill, data]);

  return {
    total,
    newDue,
    onSubmit,
    formValue,
    handleChange,
    submitedData,
    confirmationPopUp,
    setConfirmationPopUp,
  };
};

export default useBillMaker;
