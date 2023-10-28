import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Textarea ,
  } from "@chakra-ui/react";

import { useRef, useState, useContext, useEffect  } from "react";
import { userContext } from '../../../context/userContext'

import styles from './ModalWithInput.module.css'

import axios from 'axios'
import FileUploadButton from "../FileUploadButton/FileUploadButton";

export default function  ModalWithInput({isOpen, onClose, newUserInfo, setNewUserInfo, getUserInfo, userInfo}) {

    const {token} = useContext(userContext)

    const initialRef = useRef();
    const finalRef = useRef();

    const [editErrors, setEditErros] = useState({})
    const [uploadedFile, setUploadedFile] = useState()

    useEffect(() => {
        if (isOpen) {
          setNewUserInfo(userInfo);
        }
        if (uploadedFile) {
            setNewUserInfo((prevState) => ({
                ...prevState,
                avatar: uploadedFile.url,
            }));
        }
      }, [isOpen, userInfo, uploadedFile, setNewUserInfo]);

    const handleProfileChanges = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
            const response = await axios.patch('http://localhost:3000/v1/user/profile/edit', newUserInfo, config);
            setEditErros({})
            onClose()
            await getUserInfo()
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            const errors = error.response.data.errors;
            setEditErros(errors)
        }
    }

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                    <ModalContent>
                        <ModalHeader> Edite suas informações: </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Apelido: </FormLabel>

                            {userInfo && (
                                <Input 
                                    ref={initialRef} 
                                    onChange={(e) => setNewUserInfo(prevState => ({
                                        ...prevState,
                                        nickName: e.target.value
                                    }))}
                                    isInvalid={editErrors.nickNameError?.hasError ? true : false}
                                    value={newUserInfo.nickName}
                                />
                            )}
                        </FormControl>
                        {editErrors.nickNameError && (
                            editErrors.nickNameError.hasError 
                            ? <p className={styles.errorMessage}>{editErrors.nickNameError.errorText}</p> 
                            : ''
                        )}

                        <FormControl mt={4}>
                            <FormLabel> Descrição: </FormLabel>
                            {userInfo && (
                                <Textarea 
                                    resize="none" 
                                    onChange={(e) => setNewUserInfo(prevState => ({
                                        ...prevState,
                                        userDescription: e.target.value
                                    }))}
                                    isInvalid={editErrors.userDescription?.hasError ? true : false}
                                    value={newUserInfo.userDescription}
                                />
                            )}
                        </FormControl>
                        {editErrors.userDescription && (
                            editErrors.userDescription.hasError 
                            ? <p className={styles.errorMessage}>{editErrors.userDescription.errorText}</p> 
                            : ''
                        )}

                        <FormControl mt={4}>
                            <FormLabel> Imagem de Perfil: </FormLabel>
                            <div className={styles.uploadImageDiv}>
                                {userInfo && (
                                    <FileUploadButton 
                                        setUploadedFile={setUploadedFile} 
                                        styleOfButton={"big"}
                                    />
                                )}
                                {uploadedFile 
                                    ? <img className={styles.imageElement} src={uploadedFile.url}></img>
                                    : <img className={styles.imageElement} src={userInfo.avatar}></img>
                                }
                            </div>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleProfileChanges()}>
                            Editar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}