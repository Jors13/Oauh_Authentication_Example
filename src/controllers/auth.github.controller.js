const axios = require("axios");
const jwt = require("jsonwebtoken");
const authControl = {};

authControl.getCode = async (req, res) => {
	const URL = "https://github.com/login/oauth/access_token";

	const body = {
		client_id: process.env.CLIENT_ID_GITHUB,
		client_secret: process.env.CLIENT_SECRET_GITHUB,
		code: req.query.code,
		state: process.env.STATE_GITHUB
	};

	try {
		const tokenResponse = await axios.post(URL, body); //Get Github Token
		const accessToken = new URLSearchParams(tokenResponse.data).get("access_token");
		const GITHUB_URL = "https://api.github.com/user";

		const dataResponse = await axios.get(GITHUB_URL, {
			// Get User Data
			headers: {
				Authorization: `token ${accessToken}`
			}
		});

		let { username, avatar_url, email, name } = dataResponse.data;

		if (username === undefined) {
			username = "Username";
		}

		if (name === undefined) {
			name = "No Name";
		}

		const user = {
			avatar: avatar_url,
			email: email,
			name: name,
			username: username
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
		`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID_GITHUB}&scope=user&state=${process.env.STATE_GITHUB}`
	);
};

module.exports = authControl;
