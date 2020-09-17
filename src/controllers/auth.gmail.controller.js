const axios = require("axios");
const jwt = require("jsonwebtoken");
const authControl = {};

authControl.getCode = async (req, res) => {
	const URL = "https://oauth2.googleapis.com/token";

	const body = {
		client_id: process.env.CLIENT_ID_GOOGLE,
		client_secret: process.env.CLIENT_SECRET_GOOGLE,
		code: req.query.code,
		grant_type: "authorization_code",
		redirect_uri: process.env.REDIRECT_URI_GOOGLE
	};

	try {
		const tokenResponse = await axios.post(URL, body);
		const accessToken = new URLSearchParams(tokenResponse.data).get("access_token");
		const GOOGLE_URL = "https://www.googleapis.com/oauth2/v1/userinfo";

		const dataResponse = await axios.get(GOOGLE_URL, {
			// Get User Data
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		// https://www.googleapis.com/auth/userinfo.email
		// https://www.googleapis.com/auth/userinfo.profile

		const { email, name, given_name, picture } = dataResponse.data;

		const user = {
			avatar: picture,
			username: given_name,
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
		`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID_GOOGLE}&redirect_uri=${process.env.REDIRECT_URI_GOOGLE}&response_type=code&scope=${process.env.SCOPES_GOOGLE}&state=${process.env.STATE_GOOGLE}`
	);
};

module.exports = authControl;
