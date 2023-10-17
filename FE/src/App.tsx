import { RouterProvider } from "react-router-dom";
import { MainRouter } from "./router/MainRouter";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <RouterProvider router={MainRouter} />
      </RecoilRoot>
    </div>
  );
};

export default App;
