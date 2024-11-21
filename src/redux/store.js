import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import MailinboxSlice from "./slices/MailiboxSlice";
import UniversalLoader from "./slices/UniversalLoader";
import UserDetailsSlice from "./slices/UserDetailsSlice";
import MESSlice from "./slices/ManagerEmployeeSupervisorListSlice";

const store = configureStore({
  reducer: {
    userSlice: UserSlice,
    mailSlice: MailinboxSlice,
    UniversalLoader: UniversalLoader,
    UserDetailsSlice: UserDetailsSlice,
    MESSlice: MESSlice,
  },
});

export default store;
