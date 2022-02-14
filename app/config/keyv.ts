if (process.env.NODE_ENV != 'production') require('dotenv').config();

const uri : string | undefined = process.env.DATABASE_URL;
const ssl = {
	require: true,
	rejectUnauthorized: false,
};

module.exports = { uri, options: { ssl } };
