import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./usernameSlice";
import adminSlice from "./adminReducer"
// import {orderSlice} from './usernameSlice';
// import {userSlice, orderSlice} from './usernameSlice'
// import { userReducer, orderReducer } from "./usernameSlice";


export const store = configureStore({
   reducer: {
      user: userSlice,
      admin:adminSlice,
      // orderdetail: orderReducer,
   },
});


export default store;