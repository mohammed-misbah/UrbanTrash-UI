// export const baseUrl = "https://api.firefitnes.com";
export const baseUrl = "http://127.0.0.1:8000/";

const user = localStorage.getItem('user')
export const addressList = (user) => 'api/listAddress/user';
export const addAddress = 'api/addAddress'
// urls
export const RegisterPost = "api/register";
export const loginPost = "api/login";
export const logOut =  'api/logout';
export const bookingWaste = 'api/waste_booking'

export const signUp = "adminapi/login"
export const userList = "adminapi/userlist"
export const userBlock = 'adminapi/block_user/${userID}/Status';
export const userUnblock = 'adminapi/unblock_user/${userID}/Status';


// const loginPost = 'http://localhost:3000/api/login'






