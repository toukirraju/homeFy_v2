import { Route, Routes } from "react-router-dom";
import RightStyle from "../../../../Styles/Right__side.module.css";
import PrivateRoute from "../../../../utility/PrivateRoute";
import Conversation from "../../../message/pages/Conversation";
import Inbox from "../../../message/pages/Inbox";

const MessageModal = () => {
  return (
    <div className={`card ${RightStyle.message__container}`}>
      <Routes>
        <Route
          path="/inbox"
          element={
            <PrivateRoute>
              {/* <PullToRefresh onRefresh={onRefresh} refreshing={isRefreshing}> */}
              <Conversation />
              {/* </PullToRefresh> */}
            </PrivateRoute>
          }
        />
        <Route
          path="/inbox/:id"
          element={
            <PrivateRoute>
              <Inbox />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default MessageModal;
