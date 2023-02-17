import React from "react";
import ResizableDiv from "./ResizableDiv";

const Message = () => {
  return (
    <>
      <div className="card headerContainer">
        <h3>Message</h3>
        <div className="bulkCreate">
          <button className="button create__btn">Create</button>
        </div>
      </div>

      <ResizableDiv />
    </>
  );
};

export default Message;
