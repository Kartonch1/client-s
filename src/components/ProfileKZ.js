import React, { useState } from 'react'
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper'
import {Link, useNavigate} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { Dropdown } from 'primereact/dropdown';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css'
export default function ProfileKZ() {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: 'Актау', code: 'AK' },
    { name: 'Актобе', code: 'AKT' },
    { name: 'Алматы', code: 'ALM' },
    { name: 'Астана', code: 'AST' },
    { name: 'Екибастуз', code: 'EK' },
    { name: 'Жезказган', code: 'ZH' },
    { name: 'Караганда', code: 'KAR' },
    { name: 'Кокшетау', code: 'KOK' },
    { name: 'Костанай', code: 'KOST' },
    { name: 'Кызылорда', code: 'KYZ' },
    { name: 'Орал', code: 'OR' },
    { name: 'Оскемен', code: 'OSK' },
    { name: 'Павлодар', code: 'PAV' },
    { name: 'Петропавл', code: 'PET' },
    { name: 'Семей', code: 'SEM' },
    { name: 'Шымкент', code: 'SHYM' },
    { name: 'Талдыкорган', code: 'TALD' },
    { name: 'Тараз', code: 'TARAZ' },
    { name: 'Темиртау', code: 'TEM' },
    { name: 'Туркестан', code: 'TURK' },
  ];
  const [selectedTransport, setselectedTransport] = useState(null);
  const transports = [
    { name: 'Автомобиль', code: 'Auto' },
    { name: 'Мотоцикл', code: 'Moto' },
    { name: 'Велосипед', code: 'Velo' },
  ];
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues : {
      firstName : apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address : apiData?.address || '',
      iin : apiData?.iin || '',
      patronymic : apiData?.patronymic || '',
      year : apiData?.year || '',
    },

    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || apiData?.profile || ''})
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });

    }
  })


  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }
  const Upload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
      <div className="container mx-auto">

        <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className='flex justify-center items-center h-screen' style={{width: "1300px", height: "1000px"}}>
          <div className={`${styles.glass} ${extend.glass}`} style={{width: "75%",}}>
            <Button className={styles.btndocum} component={Link} to="/document">
              Құжаттар
            </Button>
            <div style={{marginLeft: "1000px", backgroundColor: "#6366f1"}}>
              <Button className={styles.btndocum} component={Link} to="/profile">
                ru
              </Button>
            </div>

            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Профиль</h4>

              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Ақпаратты өзгертіңіз
            </span>

            </div>


            <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-2'>
                <label htmlFor="profile">
                  <img src={apiData?.profile || file || avatar}
                       className={`${styles.profile_img} ${extend.profile_img}`}
                       alt="avatar"/>
                </label>

                <input onChange={onUpload} type="file" id='profile' name='profile'/>
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <div className="name flex w-3/4 gap-10">
                  <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`}
                         type="text" placeholder='Аты'/>
                  <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`}
                         type="text" placeholder='Тегі'/>
                  <input {...formik.getFieldProps('patronymic')} className={`${styles.textbox} ${extend.textbox}`}
                         type="text" placeholder='Әкесінің аты'/>
                </div>
                <div className="name flex w-3/4 gap-10">
                  <input {...formik.getFieldProps('year')} className={`${styles.textbox} ${extend.textbox}`}
                         type="text" placeholder='Туған күн,ай,жыл'/>
                  <input {...formik.getFieldProps('iin')} className={`${styles.textbox} ${extend.textbox}`} type="text"
                         placeholder='ИИН'/>
                  <div className={`${styles.textbox} ${extend.textbox}`}>
                    <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities}
                              optionLabel="name"
                              placeholder="Қала" className="w-full md:w-14rem"/>
                  </div>


                </div>

                <div className="name flex w-3/4 gap-10">
                  <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`}
                         type="text"
                         placeholder='Телефон номері'/>
                  <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`}
                         type="text"
                         placeholder='Пошта*'/>
                  <div className={`${styles.textbox} ${extend.textbox}`}>
                    <Dropdown value={selectedTransport} onChange={(e) => setselectedTransport(e.value)}
                              options={transports}
                              optionLabel="name"
                              placeholder="Транспорт" className=""/>
                  </div>
                </div>

                <button className={styles.btn} type='submit'>Өзгерту</button>
              </div>

              <div className="text-center py-4">
              <span className='text-gray-500'><button onClick={userLogout} className='text-red-500'
                                                      to="/">Шығу</button></span>
              </div>

            </form>

          </div>
        </div>
      </div>
  )
}

