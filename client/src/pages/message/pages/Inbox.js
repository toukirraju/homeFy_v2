import RightNavBar from "../../../Components/navigationBar/RightNavBar";
import ChatBody from "../components/inbox/chatbody/ChatBody";
import Navigation from "../components/inbox/Navigation";
import Sidebar from "../components/inbox/Sidebar";

export default function Inbox() {
  return (
    <div className="lg:w-2/4 mx-auto ">
      {/* <Navigation /> */}
      <RightNavBar />
      <div className="mx-auto -mt-1  max-w-7xl ">
        <div className="flex  min-w-full rounded border lg:grid lg:grid-cols-3 ">
          <Sidebar />
          <ChatBody />
        </div>
      </div>
    </div>
  );
}
