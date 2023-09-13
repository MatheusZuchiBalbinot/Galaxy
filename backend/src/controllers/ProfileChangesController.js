const EditingProfile = require("../model/EditingProfileModel");
const getUserIdByTokenModel = require("../model/getUserIdByTokenModel");
const validator = require("validator");

const ProfileChangesController = async (client, req, res, userId) => {
    try {
        const { nickName, userDescription } = req.body;
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

        const getUserId = await getUserIdByTokenModel(userId);

        if (!getUserId) {
            return res.status(400).json({ success: false, error: 'Invalid user ID' });
        }

        const data = req.body;

        try {
			console.log(data)
            const result = await EditingProfile(client, getUserId, data);
            res.status(200).json({ success: true, message: 'Sucesso alterando usuário!!', data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Erro interno do servidor' });
        }
    } catch (error) {
        console.error('Erro ao obter os dados:', error);
        res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
};

module.exports = ProfileChangesController;
