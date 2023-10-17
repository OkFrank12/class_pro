import { useRecoilValue, useRecoilState } from "recoil";
import { PropsWithChildren, FC, useEffect } from "react";
import { user, userState } from "../global/recoil";
import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";
const PrivateRouter: FC<PropsWithChildren> = ({ children }) => {
  const state = useRecoilValue(user);
  const [stateData, setStateData] = useRecoilState(userState);

  useEffect(() => {
    const decode = jwtDecode(state);
    if (state) {
      setStateData(decode);
    }
  }, []);

  console.log("private-route: ", stateData);
  return (
    <div>{state ? <div>{children}</div> : <Navigate to={`/sign-in`} />}</div>
  );
};

export default PrivateRouter;
