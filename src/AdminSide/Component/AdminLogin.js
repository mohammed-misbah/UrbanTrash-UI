import React,{useCallback, useState} from 'react'
import GoogleIcon from '@mui/icons-material/Google'; 
import FacebookIcon from '@mui/icons-material/Facebook';  
import TwitterIcon from '@mui/icons-material/Twitter';    

import styles from './AdminLogin.module.css'

const AdminLogin = () => {
    

    
    return (
        <div className={styles.card}>
        <div className={styles.title}>
        <h1>Admin Login</h1>
        </div>
        <form >
            <div className={styles.input_container}>
                <input type='text' placeholder='Enter a email'
               
                name='email' />
                <input type='password' placeholder='Enter a passoword' 
                name="password" />
                
            </div>
            <input type='submit' value='Login' className={styles.login_button}/>
        </form>
        <div className='icons'>
            <GoogleIcon className={styles.icon}/>
            <FacebookIcon className={styles.iconf}/>
            <TwitterIcon className={styles.icont}/>
        </div>
        </div>
  )
}

export default AdminLogin;






// const [name, setName] = useState('');
// const [password, setPassword] = useState('');
// const [errorMessages, setErrorMessage] = useState('');
// const errors = {name :"Invalid name",password:"Invalid password",noName:"Please enter your name",noPassword:"Please enter your password"}
// const handleLogin = (event) => {event.preventdefault();if (!name){setErrorMessage({name:'noName', message:errors.noName})
// return;}if (!password){setErrorMessage({password:'noPassword', message:errors.noPassword})}};const renderErrorMsg = (name) => 
// name = errorMessages.name && (<p className={styles.error_msg}>{errorMessages.message}</p>)
{/* {renderErrorMsg('name')}{renderErrorMsg('noName')} */}
{/* {renderErrorMsg('password')}{renderErrorMsg('noPassword')} */}