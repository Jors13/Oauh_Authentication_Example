import githubIcon from "../static/assets/icons/githubIcon.svg";
import gitlabIcon from "../static/assets/icons/tanukiGitlab.svg";
import googleIcon from "../static/assets/icons/googleIcon.svg";
import facebookIcon from "../static/assets/icons/facebookIcon.svg";

const loginProvider = [
	{
		provider: "Github", //Icons and Images
		url: "http://localhost:4000/auth/github/",
		color: "#5a6672",
		icon: githubIcon
	},
	{
		provider: "Gitlab",
		url: "http://localhost:4000/auth/gitlab/",
		color: "#fc671d",
		icon: gitlabIcon
	},
	{
		provider: "Google",
		url: "http://localhost:4000/auth/gmail/",
		color: "#c71610",
		icon: googleIcon,
		iconby: "https://www.iconfinder.com/justui"
	},
	{
		provider: "Facebook",
		url: "http://localhost:4000/auth/facebook/",
		color: "#3b5998 ",
		icon: facebookIcon
	}
];

export default loginProvider;
