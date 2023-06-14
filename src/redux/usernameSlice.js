import { createSlice } from '@reduxjs/toolkit';
// import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie' 


const userSlice = createSlice({
    id : 'id',
    name:'user',
    initialState:{
        id : null,
        user:null,
    },
    reducers: {
        setUserDetails: (state, action) => {
          console.log(action.payload, "this is action");
          state.user = action.payload;
          console.log(state.user, 'this is set user details');
        },
        clearUserDetails: (state) => {
          console.log(state.user, 'this is not set user details');
          Cookies.remove('jwt');
          state.user = null;
          console.log(state.user, 'after the clear');
        },
      },
    });
    
  // const orderSlice = createSlice ({
  //     name: 'order',
  //     initialState: {
  //       order_detail_id: null,
  //       orderdetail:null,
  //     },
  //     reducers: {
  //       setOrderDetails: (state, action) => {
  //         console.log(action.payload, "this is action payload")
  //         state.orderdetail = action.payload;
  //         console.log(state.user, 'this is set order details')
  //       },
  //       clearOrderDetails: (state) => {
  //         console.log(state.user,'this is not a order details')
  //         Cookies.remove('jwt');
  //         state.orderdetail = null;
  //         console.log(state.user, 'order details after clear')
  //       }
  //     }
  //   });
    
export default userSlice.reducer;
    
export const {setUserDetails,clearUserDetails} = userSlice.actions;
// export const {setOrderDetails, clearOrderDetails} = orderSlice.actions;


// export const userReducer = userSlice.reducer;
// export const orderReducer = orderSlice.reducer;


