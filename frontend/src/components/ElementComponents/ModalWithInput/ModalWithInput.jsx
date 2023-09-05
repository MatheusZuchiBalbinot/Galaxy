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
import { useDisclosure } from "@chakra-ui/react";

import { useRef } from "react";

export default function  ModalWithInput({isOpen, onClose}) {
    const initialRef = useRef();
    const finalRef = useRef();

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
                            <FormLabel>Nickname: </FormLabel>
                            <Input ref={initialRef} placeholder='Ex: teste123' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel> Description: </FormLabel>
                            <Textarea resize="none" placeholder='Ex: Estudante que gosta de jogar futebol aos finais de semana.' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}