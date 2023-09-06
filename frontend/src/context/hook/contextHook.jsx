import { useContext } from "react";
import { userContext } from '../userContext'

export default function contextHook() {

    const context = useContext(userContext)

    if (context === undefined) {
        throw new Error('Não está dentro do contexto')
    }

    return context
}