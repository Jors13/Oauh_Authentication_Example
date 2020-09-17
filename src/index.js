require("dotenv").config(); //KEYS

const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const verifyToken = require("./verifyToken");

//Settings
const PORT = process.env.PORT || 4000;

//Middlewares
app.use(morgan("dev")); //Request Middleware
app.use(express.json()); // Send and Receive Json
app.use(cors()); //Cross Origin Receive and Send Data

//Routes
app.use("/api/users", verifyToken, require("./routes/api/users")); //Protected JWT Route
app.use("/auth", require("./routes/auth/auth.github")); //Public Routes
app.use("/auth", require("./routes/auth/auth.gitlab"));
app.use("/auth", require("./routes/auth/auth.gmail"));
app.use("/auth", require("./routes/auth/auth.facebook"));

//Production Static Serve
if (process.env.NODE_ENV === "production") {
	// Static Folder
	app.use(express.static("client/build")); // Change for __dirname, "client", "build"
	app.get("/", (req, res) => {
		res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
	});
}

app.get("*", function(req, res) {
	//Bug . possible with morgan
	res.redirect("http://localhost:3000/unauthorized");
});

//Start Server
async function main() {
	await app.listen(PORT);
	console.log(`Server on PORT ${PORT}`);
}

main();
