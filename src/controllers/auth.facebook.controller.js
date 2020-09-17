const axios = require("axios");
const jwt = require("jsonwebtoken");
const authControl = {};

authControl.getCode = async (req, res) => {
	const URL = `https://graph.facebook.com/v6.0/oauth/access_token?client_id=${process.env.CLIENT_ID_FACEBOOK}&redirect_uri=${process.env.REDIRECT_URI_FACEBOOK}&client_secret=${process.env.CLIENT_SECRET_FACEBOOK}&code=${req.query.code}`;
	try {
		const tokenResponse = await axios.get(URL); //Get Token
		const { access_token } = tokenResponse.data;

		const DATA_URL = `https://graph.facebook.com/me?access_token=${access_token}&fields=email,first_name,name,picture`; //
		const dataResponse = await axios.get(DATA_URL);

		const { email, first_name, name } = dataResponse.data;
		const avatar = dataResponse.data.picture.data.url;

		const user = {
			avatar: avatar,
			username: first_name,
			email: email,
			name: name
		};

		jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "20s" }, (err, token) => {
			res.redirect(`http://localhost:3000/?token=${token}`);
		});
	} catch (error) {
		console.log(error);

		res.redirect("http://localhost:3000/?error=failed-query");
	}
};

authControl.getClient = (req, res) => {
	res.redirect(
		`https://www.facebook.com/v6.0/dialog/oauth?client_id=${process.env.CLIENT_ID_FACEBOOK}&redirect_uri=${process.env.REDIRECT_URI_FACEBOOK}&state=${process.env.STATE_FACEBOOK}&response_type=code&scope=email`
	);
};

module.exports = authControl;
