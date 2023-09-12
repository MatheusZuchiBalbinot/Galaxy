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

import { useRef, useState, useContext } from "react";
import { userContext } from '../../../context/userContext'

import styles from './ModalWithInput.module.css'

import axios from 'axios'

export default function  ModalWithInput({isOpen, onClose, newUserInfo, setNewUserInfo, getUserInfo}) {

    const {isLogged} = useContext(userContext)

    const initialRef = useRef();
    const finalRef = useRef();

    const {token} = isLogged

    const [editErrors, setEditErros] = useState({})

    const handleProfileChanges = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
            const response = await axios.patch('http://localhost:3000/user/profile/edit', newUserInfo, config);
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
                            <Input 
                                ref={initialRef} 
                                placeholder='Ex: teste123' 
                                onChange={(e) => setNewUserInfo(prevState => ({
                                    ...prevState,
                                    nickName: e.target.value
                                }))}
                            />
                        </FormControl>
                        {editErrors.nickNameError && (
                            editErrors.nickNameError.hasError ? <p className={styles.errorMessage}>{editErrors.nickNameError.errorText}</p> : ''
                        )}

                        <FormControl mt={4}>
                            <FormLabel> Descrição: </FormLabel>
                            <Textarea 
                                resize="none" 
                                placeholder='Ex: Estudante que gosta de jogar futebol aos finais de semana.'
                                onChange={(e) => setNewUserInfo(prevState => ({
                                    ...prevState,
                                    userDescription: e.target.value
                                }))}
                            />
                        </FormControl>
                        {editErrors.userDescription && (
                            editErrors.userDescription.hasError ? <p className={styles.errorMessage}>{editErrors.userDescription.errorText}</p> : ''
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleProfileChanges()}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}