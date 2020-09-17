const jwt = require("jsonwebtoken");
const usersControl = {};

usersControl.getUser = (req, res) => {
	jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
		if (err) {
			res.redirect("http://localhost:3000/?error=failed-query");
		} else {
			res.json(authData);
		}
	});
};

module.exports = usersControl;
