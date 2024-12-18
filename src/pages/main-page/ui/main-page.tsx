import { Navigate } from "react-router-dom";

import { AppRoute } from "../../../app/provider/router";

const MainPage = (): JSX.Element => <Navigate to={AppRoute.Main} />;

export default MainPage;
