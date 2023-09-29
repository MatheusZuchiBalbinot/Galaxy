import styles from './FormInputs.module.css'

import { BsFillLockFill, BsFillPersonFill } from 'react-icons/bs';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const FormInputs = ({
    actualPage,
    confirmPassword,
    confirmPasswordVisible,
    nickName,
    errorMessages,
    setConfirmPassword,
    setConfirmPasswordVisible,
    setNickName,
}) => {
    if (actualPage === 'http://localhost:5173/register') {
        return (
            <>
                <h1 className={styles.formBodyTitle}>Confirme sua Senha: </h1>
                <div className={styles.formInputDiv}>
                    <div className={styles.formIcon}>
                        <BsFillLockFill />
                    </div>
                    <input
                        className={styles.formInput}
                        value={confirmPassword}
                        maxLength={20}
                        id="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={confirmPasswordVisible ? 'password' : 'text'}
                        autoComplete='off'
                    ></input>
                    <div className={styles.showPasswordIcon} onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                        {confirmPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                </div>
                {errorMessages.confirmPassword ? <p className={styles.errorMessage}>{errorMessages.confirmPassword}</p> : null}
                <h1 className={styles.formBodyTitle}> Nickname: </h1>
                <div className={styles.formInputDiv}>
                    <div className={styles.formIcon}>
                        <BsFillPersonFill />
                    </div>
                    <input
                        className={styles.formInput}
                        id="nickname"
                        maxLength={15}
                        placeholder='Ex: MatheusZin'
                        value={nickName}
                        autoComplete='off'
                        onChange={(e) => setNickName(e.target.value)}
                    ></input>
                </div>
                {errorMessages.nickName ? <p className={styles.errorMessage}>{errorMessages.nickName}</p> : null}
            </>
        );
    } else {
        return null;
    }
};

export default FormInputs;