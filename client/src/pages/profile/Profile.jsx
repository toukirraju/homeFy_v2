import Style from "./styles/Profile.module.css";
import ProfileLeft from "../../Components/profile/profileLeft/ProfileLeft";
import RightSide from "../../Components/profile/rightSide/RightSide";
import { useSelector } from "react-redux";
import UserBillTable from "../../Components/tables/UserBillTable";
import LeftTitleHeader from "../../Components/leftSide/LeftTitleHeader";
import RightNavBar from "../../Components/navigationBar/RightNavBar";
import ProfileCard from "./components/profileCard/ProfileCard";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      {/* <div className="card headerContainer">
        <h3>Profile</h3>
        <div className="bulkCreate">
          <button className="button create__btn">Create</button>
        </div>
      </div> */}
      <div className={Style.Profile__wrapper}>
        <div className={Style.Profile__left}>
          <LeftTitleHeader />
        </div>
        <div className={Style.Profile__center}>
          <div className={Style.center__profile__section}>
            <ProfileCard />
          </div>
          <div className={`card ${Style.user__chart}`}>
            {" "}
            Bar Chart Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Beatae ratione quasi ab repudiandae doloribus excepturi ipsa
            officiis temporibus libero omnis neque fuga facere natus voluptates
            corporis dicta possimus, iusto labore. Quis vero deserunt optio
            magni repellat odit distinctio officiis ea nobis quas asperiores
            expedita labore beatae deleniti explicabo voluptatem id soluta quod
            quos exercitationem ab, consequuntur nisi voluptatibus laborum!
            Placeat dicta voluptate laboriosam voluptatibus doloribus sit
            temporibus quia possimus, molestias explicabo, incidunt impedit, eos
            nesciunt nostrum nihil quos nulla alias excepturi repellendus. Nam,
            recusandae. Tempora itaque, perferendis laudantium dolores eligendi
            dolore velit obcaecati accusamus beatae inventore laborum commodi
            ipsum! Illum similique minus accusantium porro consequatur nobis a
            sit unde iste aliquid officiis ratione, ipsam neque repellendus aut
            quae, tempora consectetur voluptas itaque magnam maxime quis sed
            dicta totam? Accusamus cupiditate, corporis nam obcaecati vitae
            ipsam alias laudantium corrupti. Fugit nihil commodi, vel dolor
            quibusdam impedit sunt necessitatibus accusamus officiis doloremque
            dolore, repellat quam ab neque corporis adipisci!
          </div>
          <div className={Style.bill__table}>
            <UserBillTable />
          </div>

          {/* <UserBillTable /> */}
        </div>
        <div className={Style.Profile__right}>
          {/* <RightSide /> */}
          <RightNavBar />
        </div>
      </div>
    </>
  );
};

export default Profile;
