import { createSlice } from '@reduxjs/toolkit';
// import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie' 


const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
    },
    reducers:{
        setUserDetails:(state, action) =>{
            console.log(action.paylosd,"this is action");
            state.user = action.payload;
            console.log(state.user,'this is set user datails');
        },
        clearUserDetails:(state) =>{
            console.log(state.userDetails,'this is not set user datails');
            Cookies.remove('jwt')
            state.userDetails = null;
            console.log(state.user,'after the clear');
        },
    },
});

export default userSlice.reducer
export const {setUserDetails,clearUserDetails} = userSlice.actions;