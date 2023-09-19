async function CheckEmailModel(client, email) {
    try {
        const dbCollection = client.db("cluster0").collection("users")
        const user = await dbCollection.findOne({ email });
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function CheckEmailAndNickNameModel(client, email, nickName) {
    try {
        const dbCollection = client.db("cluster0").collection("users");
        const existingUserWithEmail = await dbCollection.findOne({ email });
        const existingUserWithNickName = await dbCollection.findOne({ nickName });

        const errors = {};

        if (existingUserWithEmail) {
            errors.email = "E-mail já está cadastrado. Por favor, escolha outro e-mail.";
        }
        else {
            errors.email = "";
        }
        if (existingUserWithNickName) {
            errors.nickName = "NickName já está cadastrado. Por favor, escolha outro NickName.";
        }
        else {
            errors.nickName = "";
        }

        if (Object.keys(errors).length > 0) {
            return errors;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    CheckEmailModel,
    CheckEmailAndNickNameModel,
};