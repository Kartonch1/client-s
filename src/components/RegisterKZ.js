import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper'
import pdf from "./public.pdf";

import styles from '../styles/Username.module.css';
import Button from "@material-ui/core/Button";

export default function RegisterKZ() {
    const [agree, setAgree] = useState(false);

    const checkboxHandler = () => {
        // if agree === true, it will be set to false
        // if agree === false, it will be set to true
        setAgree(!agree);
        // Don't miss the exclamation mark
    }
    const navigate = useNavigate()
    const [file, setFile] = useState()

    const formik = useFormik({
        initialValues : {
            email: '',
            username: '',
            password : ''
        },
        validate : registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
            values = await Object.assign(values, { profile : file || ''})
            let registerPromise = registerUser(values)
            toast.promise(registerPromise, {
                loading: 'Creating...',
                success : <b></b>,
                error : <b></b>
            });

            registerPromise.then(function(){ navigate('/kz')});
        }
    })

    /** formik doensn't support file upload so we need to create this handler */
    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

    return (
        <div className="container mx-auto">

            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className='flex justify-center items-center h-screen'style={{width: "1300px", height: "1100px"}}>
                <div className={styles.glass} style={{ width: "55%", paddingTop: '0em'}}>

                    <div className="title flex flex-col items-center">
                        <div style={{marginLeft: "500px", marginTop: "50px", backgroundColor: "#6366f1"}}>
                            <Button className={styles.btndocum} component={Link} to="/register">
                                ru
                            </Button>
                        </div>
                        <h4 className='text-5xl font-bold'>Тіркелу</h4>
                        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
            </span>
                    </div>

                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className='profile flex justify-center py-4'>
                            <label htmlFor="profile">
                                <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                            </label>

                            <input onChange={onUpload} type="file" id='profile' name='profile' />
                        </div>

                        <div className="textbox flex flex-col items-center gap-6">
                            <input {...formik.getFieldProps('email')} className={styles.textbox} type="text"
                                   placeholder='Пошта*'/>
                            <input {...formik.getFieldProps('username')} className={styles.textbox} type="text"
                                   placeholder='Никнейм*'/>
                            <input {...formik.getFieldProps('password')} className={styles.textbox} type="text"
                                   placeholder='Құпиясөз*'/>
                            <div>
                                <input type="checkbox" id="agree" onChange={checkboxHandler}/>
                                <label htmlFor="agree"> Тіркелу арқылы сіз </label>
                                <a href={pdf} target="_blank" rel="noreferrer">
                                    <b> жария офертасымен </b>
                                </a>
                                <label> келісесіз </label>
                            </div>
                            <button className={styles.btn} type='submit'>Тіркелу</button>
                        </div>

                        <div className="text-center py-4">
                  <span className='text-gray-500'>Аккаунт бар ма? <Link className='text-red-500'
                                                                      to="/">Логин</Link></span>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

