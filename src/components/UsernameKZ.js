import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'

import styles from '../styles/Username.module.css';
import Button from "@material-ui/core/Button";

export default function UsernameKZ() {

    const navigate = useNavigate();
    const setUsername = useAuthStore(state => state.setUsername);

    const formik = useFormik({
        initialValues : {
            username : ''
        },
        validate : usernameValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
            setUsername(values.username);
            navigate('/passwordkz')
        }
    })

    return (
        <div className="container mx-auto">

            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className='flex justify-center items-center h-screen'style={{width: "1300px", height: "800px"}}>
                <div className={styles.glass}>

                    <div className="title flex flex-col items-center">
                        <div style={{marginLeft: "250px", marginTop: "-50px",backgroundColor: "#6366f1"}}>
                            <Button className={styles.btndocum} component={Link} to="/">
                                ru
                            </Button>
                        </div>
                        <h4 className='text-4xl font-bold'>Сәлеметсізбе</h4>
                        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Wolt-ке қош келдіңіз
            </span>
                    </div>

                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className='profile flex justify-center py-4'>
                            <img src={avatar} className={styles.profile_img} alt="avatar" />
                        </div>

                        <div className="textbox flex flex-col items-center gap-6">
                            <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Никнейм' />
                            <button className={styles.btn} type='submit'>Кіру</button>
                        </div>

                        <div className="text-center py-4">
                            <span className='text-gray-500'>Аккаунт жоқ па?<Link className='text-red-500' to="/registerkz">Тіркелу</Link></span>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}
