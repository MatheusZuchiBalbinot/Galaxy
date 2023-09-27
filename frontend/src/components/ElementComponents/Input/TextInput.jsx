import styles from './TextInput.module.css';

export const TextAreaInput = ({ value, onChange, maxLength, rows, placeholder }) => {
    return (
        <textarea 
            rows={rows}
            maxLength={maxLength}
            className={styles.mainTextAreaInput} 
            value={value}
            onChange={onChange}
            placeholder='No que está pensando?'
        />
    );
};

export const TextInput = ({ value, onChange, maxLength, type, placeholder, onInput }) => {
    return (
        <input 
            autoFocus
            type={type}
            maxLength={maxLength}
            className={styles.mainInput} 
            value={value}
            onChange={onChange}
            onInput={onInput}
            placeholder={(placeholder ? placeholder : "No que você está pensando")}
        />
    );
};  