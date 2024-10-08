import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate'
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'
import styles from '../styles/Username.module.css';
import Button from "@material-ui/core/Button";

export default function PasswordKZ() {

    const navigate = useNavigate()
    const { username } = useAuthStore(state => state.auth)
    const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

    const formik = useFormik({
        initialValues : {
            password : ''
        },
        validate : passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {

            let loginPromise = verifyPassword({ username, password : values.password })
            toast.promise(loginPromise, {
                loading: 'Checking...',
                success : <b>Login Successfully...!</b>,
                error : <b>Password Not Match!</b>
            });

            loginPromise.then(res => {
                let { token } = res.data;
                localStorage.setItem('token', token);
                navigate('/profilekz')
            })
        }
    })

    if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

    return (
        <div className="container mx-auto">

            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className='flex justify-center items-center h-screen'style={{width: "1300px", height: "900px"}}>
                <div className={styles.glass}>

                    <div className="title flex flex-col items-center">
                        <div style={{marginLeft: "250px", marginTop: "-50px", backgroundColor: "#6366f1"}}>
                            <Button className={styles.btndocum} component={Link} to="/password">
                                ru
                            </Button>
                        </div>
                        <h4 className='text-3xl font-bold'>Қайырлы күн {apiData?.firstName || apiData?.username}</h4>
                        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Аккаунтқа кіріңіз
            </span>
                    </div>

                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className='profile flex justify-center py-4'>
                            <img src={apiData?.profile || avatar} className={styles.profile_img} alt="avatar"/>
                        </div>

                        <div className="textbox flex flex-col items-center gap-6">
                            <input {...formik.getFieldProps('password')} className={styles.textbox} type="text"
                                   placeholder='Құпиясөз'/>
                            <button className={styles.btn} type='submit'>Кіру</button>
                        </div>

                        <div className="text-center py-4">
                        <span className='text-gray-500'>Құпиясөзді ұмыттыңызба? <Link className='text-red-500'
                                                                             to="/recoverykz">Сброс</Link></span>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}
