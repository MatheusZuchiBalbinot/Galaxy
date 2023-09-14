import styles from './PageChangeButton.module.css'

const RedirectButton = ({ actualPage, goToRegister, goToLogin }) => {
    if (actualPage !== 'http://localhost:5173/register') {
        return (
            <button type='button' className={styles.redirectButton} onClick={goToRegister}>
                Não tem uma conta? Cadastre-se.
            </button>
        );
    } else {
        return (
            <button type='button' className={styles.redirectButton} onClick={goToLogin}>
                Já tem uma conta? Logue.
            </button>
        );
    }
};

export default RedirectButton;