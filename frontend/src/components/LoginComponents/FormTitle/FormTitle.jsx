import styles from './FormTitle.module.css'

const FormTitle = ({ actualPage }) => {
    return (
        <h1 className={styles.formTitleH1}>
            {actualPage !== 'http://localhost:5173/register' ? 'Formulário de Login' : 'Formulário de Registro'}
        </h1>
    );
};

export default FormTitle;