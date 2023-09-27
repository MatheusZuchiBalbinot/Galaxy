const EditingProfile = require("../model/EditingProfileModel");
const GetUserIdByTokenModel = require("../model/GetUserIdByTokenModel");

const ObjectId = require('mongodb').ObjectId;

const validator = require("validator");

const ProfileChangesController = async (client, req, res, jwtToken) => {
    try {
        const { nickName, userDescription } = req.body;

		const dbCollection = client.db("cluster0").collection("users")
        const getUserId = GetUserIdByTokenModel(jwtToken)

        const oldUserInfo = await dbCollection.findOne(
            { _id: new ObjectId(getUserId) },	
            { projection: { _id: 0, nickName: 1, avatar: 1, createdInDate: 1, userDescription: 1, } }
          );

		  const alreadyExistNickName = await dbCollection.findOne({nickName})

		  if(alreadyExistNickName == null) {
			const errors = {
				userDescription: {
				  hasError: false,
				  errorText: '',
				},
				nickNameError: {
				  hasError: false,
				  errorText: '',
				},
			  };
			  
			  if (!validator.isLength(nickName, { min: 6, max: 15 })) {
				errors.nickNameError = {
				  hasError: true,
				  errorText: 'O nickName deve conter entre 6 e 15 caracteres',
				};
			  }
			  if (!validator.isLength(userDescription, { min: 12, max: 120 })) {
				errors.userDescription = {
				  hasError: true,
				  errorText: 'A descrição deve conter entre 12 e 120 caracteres',
				};
	
			  }
			  if (errors.userDescription.hasError || errors.nickNameError.hasError) {
				return res.status(400).json({ success: false, errors });
			  }
	
			if (!getUserId) {
				return res.status(400).json({ success: false, error: 'Invalid user ID' });
			}
	
			const data = req.body;
	
			try {
				// console.log(data)
				const result = await EditingProfile(client, getUserId, oldUserInfo, data);
				return res.status(200).json({ success: true, message: 'Sucesso alterando usuário!!', data: result });
			} catch (error) {
				return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
			}
		  } else {

			const errors = {
				nickNameError: {
				  hasError: true,
				  errorText: 'Nickname já existente!! ',
				},
			};

			return res.status(400).json({ success: false, errors });
		}
    
    } catch (error) {
        console.error('Erro ao obter os dados:', error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
};

module.exports = ProfileChangesController;
