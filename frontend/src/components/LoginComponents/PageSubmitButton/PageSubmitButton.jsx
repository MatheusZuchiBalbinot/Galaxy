import styles from './PageSubmitButton.module.css'

const PageSubmitButton = ({ actualPage, handleRegisterSubmit, handleLoginSubmit }) => {
    return (
        <button
            type='submit'
            className={styles.submitButton}
            onClick={(e) => (actualPage === 'http://localhost:5173/register' ? handleRegisterSubmit(e) : handleLoginSubmit(e))}
        >
            {actualPage === 'http://localhost:5173/register' ? 'Registrar' : 'Logar'}
        </button>
    );
};

export default PageSubmitButton;