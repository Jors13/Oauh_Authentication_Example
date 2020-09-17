const axios = require("axios");
const jwt = require("jsonwebtoken");
const authControl = {};

authControl.getCode = async (req, res) => {
	const URL = "https://gitlab.com/oauth/token";

	const body = {
		client_id: process.env.CLIENT_ID_GITLAB,
		client_secret: process.env.CLIENT_SECRET_GITLAB,
		code: req.query.code,
		grant_type: "authorization_code",
		redirect_uri: process.env.REDIRECT_URI_GITLAB
	};

	try {
		const tokenResponse = await axios.post(URL, body);
		const accessToken = new URLSearchParams(tokenResponse.data).get("access_token");
		const GITHUB_URL = "https://gitlab.com/api/v4/user";

		const dataResponse = await axios.get(GITHUB_URL, {
			// Get User Data
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		const { username, avatar_url, email, name } = dataResponse.data;

		const user = {
			avatar: avatar_url,
			username: username,
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
		`https://gitlab.com/oauth/authorize?client_id=${process.env.CLIENT_ID_GITLAB}&redirect_uri=${process.env.REDIRECT_URI_GITLAB}&response_type=code&state=${process.env.STATE_GITLAB}&scope=read_user`
	);
};

module.exports = authControl;
