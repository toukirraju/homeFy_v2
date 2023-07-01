import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/features/auth/authSlice";
import { decryptData } from "../utility/encryptionDecryption";

const useAuthCheck = () => {
  const dispatch = useDispatch();

  const [authCheck, setAuthCheck] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("homifyAdmin");

    if (localAuth) {
      const authData = JSON.parse(localAuth);
      const decryptedData = decryptData(
        authData,
        process.env.REACT_APP_ED_SECRET
      );
      if (decryptedData?.token && decryptedData?.user) {
        dispatch(
          userLoggedIn({
            token: decryptedData.token,
            user: decryptedData.user,
          })
        );
      }
    }
    setAuthCheck(true);
  }, []);

  return authCheck;
};

export default useAuthCheck;
