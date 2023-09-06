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

import axios from 'axios'

export default function  ModalWithInput({isOpen, onClose, newUserInfo, setNewUserInfo}) {

    const {isLogged} = useContext(userContext)

    const initialRef = useRef();
    const finalRef = useRef();

    const {nickName} = isLogged

    const [editErrors, setEditErros] = useState({
        textError: '',
        descriptionError: '',
    })

    const handleProfileChanges = async () => {

        try {
            const result = await axios.patch(`http://localhost:3000/user/profile/edit/${nickName}`, newUserInfo)
        }
        catch(error) {
            console.log(error)
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