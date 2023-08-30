const pako = require('pako')

async function GetTweetsModel(client, getTweetsType) {
    const dbCollection = client.db("cluster0").collection("tweets")

    switch (getTweetsType) {
        case "orderByRecent":
            try {
                const tweetsData = await dbCollection.find()
                    .sort({
                        'actualDate.year': -1,
                        'actualDate.month': -1,
                        'actualDate.days': -1,
                        'actualDate.hours': -1,
                        'actualDate.minutes': -1
                    })
                    .toArray();
                
                    // Tentando transformar a imagem em base 64, descomprimir ela e inserir os cabeçalhos devidos para poder mostrar no front-end
                    
                    return tweetsDataWithDecompressedImages;
            } catch (error) {
                console.error("Error getting tweets:", error);
                return [];
            }
    }
}

module.exports = GetTweetsModel