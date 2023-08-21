import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

import spaceCat from '../../assets/cat_in_space.svg'
import styles from './Login.module.css'

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

import {BsFillPersonFill, BsFillLockFill} from 'react-icons/bs';
import {MdEmail} from 'react-icons/md'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'

import { useContext } from 'react';
import { userContext} from '../../context/userContext'

export default function Login() {

    const {setIsLogged} = useContext(userContext)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [nickName, setNickName] = useState('')
    const [email, setEmail] = useState('')

    const [showDialog, setShowDialog] = useState(false);

    const [passwordHasError, setPasswordHasError] = useState(false)
    const [notEqualPasswords, setNotEqualPasswords] = useState(false)
    const [nickNameHasError, setNickNameHasError] = useState(false)
    const [emailHasError, setEmailHasError] = useState(false)

    const [passwordVisible, setPasswordVisible] = useState(true)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true)

    const [emailAlreadyExists, setEmailAlreadyExists] = useState(false)
    const [nickNameAlreadyExists, setNickNameAlreadyExists] = useState(false)

    const navigate = useNavigate()

    const actualPage = window.location.href

    const goToRegister = () => {
        return navigate('/register')
    }

    const goToLogin = () => {
        return navigate('/login')
    }

    const handleErrorsResponse = (errors) => {
        const error = errors.response.data;
        if(error.errors) {
            if (error.isEmailValid || error.isPasswordValid || error.isNicknameValid || error.isPasswordsEqual) {
                setEmailHasError(error.isEmailValid !== true);
                setPasswordHasError(error.isPasswordValid !== true);
                setNickNameHasError(error.isNicknameValid !== true);
                setNotEqualPasswords(error.isPasswordsEqual !== true);
            }
        }
        else {
            const errorResult = errors.response.data

            console.log(errorResult)

            const { emailExists, nickNameExists} = error

            if(emailExists && nickNameExists) {
                setNickNameAlreadyExists(true)
                setEmailAlreadyExists(true)
                document.getElementById("email").style.borderBottom = '3px solid red'
                document.getElementById("nickname").style.borderBottom = '3px solid red'
            } else if (emailExists && !nickNameExists) {
                setNickNameAlreadyExists(false)
                setEmailAlreadyExists(true)
                document.getElementById("email").style.borderBottom = '3px solid red'
            } else if (!emailExists && nickNameExists) {
                setNickNameAlreadyExists(true)
                setEmailAlreadyExists(false)
                document.getElementById("nickname").style.borderBottom = '3px solid red'

            }
    }
    
    };

    const resetForm = () => {
        setEmail('');
        setConfirmPassword('');
        setNickName('');
        setPassword('');
        setEmailHasError(false);
        setNickNameHasError(false);
        setPasswordHasError(false);
        setNotEqualPasswords(false);
        setNickNameAlreadyExists(false);
        setEmailAlreadyExists(false);
    };

    const handleSuccessResponse = () => {
        setShowDialog(true);
        setTimeout(() => {
            setShowDialog(false);
        }, 2500);
    };
    
    const handleRegisterSubmit = (e) => {
        e.preventDefault()

        const data = {
            email, 
            nickName, 
            password,
            confirmPassword
        }

        let result;

        const creatingUser = async () => {
            try {
                result = await axios.post("http://localhost:3000/user/register", data);
            } 
            catch (err) {
                handleErrorsResponse(err);
            } finally {
                if (result && result.status === 201) {
                    handleSuccessResponse();
                    resetForm();
                    const elementIds = ["email", "password", "passorwdConfirm", "nickname"];
                    elementIds.forEach((id) => {
                        const element = document.getElementById(id);
                        if (element) {
                            element.style.borderBottom = 'none';
                        }
                    });
                }
            }
        }
        creatingUser()
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = { 
                userEmail: email,
                userPassword: password,
            }
            const result = await axios.post("http://localhost:3000/user/login", data);
            setIsLogged(result.data)
            return navigate('/home')
            
        } catch (error) {
            console.error(error);
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(email.match(validRegex)) {
            document.getElementById("email").style.borderBottom = '3px solid green'
        }
        else {
            document.getElementById("email").style.borderBottom = '3px solid red'
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)

        if(password.length >= 6 - 1) {
            document.getElementById("password").style.borderBottom = '3px solid green'
        }
        else {
            document.getElementById("password").style.borderBottom = '3px solid red'
        }
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
        document.getElementById("passorwdConfirm").style.borderBottom = '3px solid green'
    }

    const handleNickName = (e) => {
        setNickName(e.target.value)

        if(nickName.length >= 6 - 1) {
            document.getElementById("nickname").style.borderBottom = '3px solid green'
        }
        else {
            document.getElementById("nickname").style.borderBottom = '3px solid red'
        }
    }

    const checkPageButtons = () => {
        if(actualPage != 'http://localhost:5173/register') {
            return <button type='button' className={styles.redirectButton} onClick={goToRegister}> Não tem uma conta? Cadastre-se.</button>
        }
        else {
            return <button type='button' className={styles.redirectButton} onClick={goToLogin}> Já tem uma conta? Logue.</button>
        }
    }

    const checkPageTitle = () => {
        if(actualPage != 'http://localhost:5173/register') {
            return <h1 className={styles.formTitleH1}>Formulário de Login</h1>
        }
        else {
            return <h1 className={styles.formTitleH1}>Formulário de Registro</h1>
        }
    }

    const checkPageInput = () => {
        if(actualPage == 'http://localhost:5173/register') {
            return (
                <>
                    <h1 className={styles.formBodyTitle}>Confirme sua Senha: </h1>
                    <div className={styles.formInputDiv}>
                        <div className={styles.formIcon}>
                            <BsFillLockFill />
                        </div>
                        <input className={styles.formInput} value={confirmPassword} id="passorwdConfirm" onChange={(e) => handleConfirmPassword(e)} type={confirmPasswordVisible ? 'password' : 'text'}></input>
                        <div className={styles.showPasswordIcon} onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                            {confirmPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </div>
                    </div>
                    {notEqualPasswords && <p className={styles.errorMessage}>As senhas não correspondem.</p>}
                    <h1 className={styles.formBodyTitle}> Nickname: </h1>
                    <div className={styles.formInputDiv}>
                        <div className={styles.formIcon}>
                            <BsFillPersonFill />
                        </div>
                        <input className={styles.formInput} id="nickname" placeholder='Ex: MatheusZin' value={nickName} onChange={(e) => handleNickName(e)}></input>
                    </div>
                    {nickNameHasError && <p className={styles.errorMessage}> O NickName deve ter no mínimo seis caracteres.</p>}
                    {nickNameAlreadyExists && <p className={styles.errorMessage}> Nickname já existente.</p>}

                </>
            )
        }
    }

    const submitButton = () => {
        if(actualPage == 'http://localhost:5173/register') {
            return <button type='submit' className={styles.submitButton} onClick={(e) => handleRegisterSubmit(e)}> Registrar </button>
        }
        else {
            return <button type='submit' className={styles.submitButton} onClick={(e) => handleLoginSubmit(e)}> Logar </button>
        }
    }

    return (
        <div className={styles.mainLoginDiv}>
            <div className={styles.loginDiv}>
                <div className={styles.formDiv}>
                    <form className={styles.mainForm}>
                        <div className={styles.formTitle}>
                            {checkPageTitle()}
                        </div>
                        <div className={styles.formBody}>
                            <h1 className={styles.formBodyTitle}>Email: </h1>
                            <div className={styles.formInputDiv}>
                                <div className={styles.formIcon}>
                                    <MdEmail />
                                </div>
                                <input className={styles.formInput} id="email" placeholder='Ex: matheus@gmail.com' value={email} onChange={(e) => handleEmail(e)} type='text'></input>
                            </div>
                            {emailHasError && <p className={styles.errorMessage}>O email é inválido.</p>}
                            {emailAlreadyExists && <p className={styles.errorMessage}>Email já existente.</p>}
                            <h1 className={styles.formBodyTitle}>Senha: </h1>
                            <div className={styles.formInputDiv}>
                                <div className={styles.formIcon}>
                                    <BsFillLockFill />
                                </div>
                                <input className={styles.formInput} id="password" placeholder='#Ex: dsa5S!9' value={password} onChange={(e) => handlePassword(e)} type={passwordVisible ? 'password' : 'text'}></input>
                                <div className={styles.showPasswordIcon} onClick={() => setPasswordVisible(!passwordVisible)}>
                                    {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </div>
                            </div>
                            {passwordHasError && <p className={styles.errorMessage}>A senha deve ter pelo menos 6 caracteres.</p>}
                            {checkPageInput()}
                        </div>
                        <div className={styles.formButton}>
                            <div className={styles.buttonDiv}>
                                {submitButton()}
                            </div>
                            <div className={styles.buttonDiv}>
                                {checkPageButtons()}
                            </div>
                        </div>
                    </form>
                </div>
                <div className={styles.gifDiv}>
                    <img src={spaceCat} className={styles.spaceCatStyle}></img>
                    <a href="https://storyset.com/cute" className={styles.storysetText}>Cute illustrations by Storyset</a>
                </div>
            </div>
            {showDialog && (
            <div className={styles.dialogDiv}>
                <Alert status='success'>
                    <AlertIcon />
                    <AlertTitle> User</AlertTitle>
                    <AlertDescription> A user has been created! </AlertDescription>
                </Alert>
            </div>
        )}
        </div>
    )
}