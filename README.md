# Galaxy
[EM DESENVOLVIMENTO] Aplicação FullStack que simula o Twitter.

## 🚀 Tecnologias
* Node
* Express
* MongoDB
* React
* Axios
* Socket.io
* Javascript 
* HTML  
* CSS
* MVC
* JWT
* Bcrypt
* Vite
* Axios
* Dotenv
* Nodemon

## Problema que estou pensando em como resolver(tanto na parte de procurar por um tweet em específico nessa estrutura, quanto em como exibir isso no frontend): 

tweetId: {
    senderId: 'xx',
    conteudo: {
        texto,
        imagem,
        video,
    }
    comments: [
        {
            tweetId: {
                senderId: 'xx',
                conteudo: {
                    texto,
                    imagem,
                    video,
                },
                comments: [
                    {
                        tweetId: {
                            senderId: 'xx',
                            conteudo: {
                                texto,
                                imagem,
                                video,
                            },
                            comments: [
                                {
                                    , tende ao infinito.
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            tweetId: {
                senderId: 'xx',
                conteudo: {
                    texto,
                    imagem,
                    video,
                },
                comments: [
                    {
                        tweetId: {
                            senderId: 'xx',
                            conteudo: {
                                texto,
                                imagem,
                                video,
                            }
                            comments: [
                                {
                                    , tende ao infinito.
                                }
                            ]
                        }
                    }
                ]
            }
        }, tende ao infinito.
    ]
}


