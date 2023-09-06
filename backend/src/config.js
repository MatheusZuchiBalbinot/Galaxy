require('dotenv').config();

const PASSWORD_DB = process.env.PASSWORD_DB;
const USER_DB = process.env.USER_DB;
const CLUSTER_DB = process.env.CLUSTER_DB;

const mongodbUri = `mongodb+srv://${USER_DB}:${PASSWORD_DB}@${CLUSTER_DB}.ub3ovh1.mongodb.net/?retryWrites=true&w=majority`;

module.exports = mongodbUri
