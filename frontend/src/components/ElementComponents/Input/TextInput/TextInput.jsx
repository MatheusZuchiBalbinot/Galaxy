import styles from './TextInput.module.css';

export const TextAreaInput = ({ value, id, onChange, maxLength, rows, placeholder }) => {
    return (
        <textarea 
            rows={rows}
            id={id}
            maxLength={maxLength}
            className={styles.mainTextAreaInput} 
            value={value}
            autoComplete='off'
            onChange={onChange}
            placeholder='No que está pensando?'
        />
    );
};

export const TextInput = ({ value, id, onChange, maxLength, type, placeholder, onInput }) => {
    return (
        <input 
            autoFocus
            type={type}
            autoComplete='off'
            maxLength={maxLength}
            className={styles.mainInput} 
            value={value}
            onChange={onChange}
            onInput={onInput}
            placeholder={(placeholder ? placeholder : "No que você está pensando")}
        />
    );
};  