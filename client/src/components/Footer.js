import React from "react";
import githubIcon from "../static/assets/icons/githubIcon.svg";
import linkedinIcon from "../static/assets/icons/linkedinIcon.svg";
import workLogo from "../static/assets/icons/workLogo.svg";

const Footer = () => {
	return (
		<div className="foot" fixed="bottom">
			<div className="left">
				<p>Made by: Jorge Ocaris</p>

				<a href="https://github.com/Jors13">
					<img src={githubIcon} alt="Github" height="40" width="60" />
				</a>

				<a href="https://www.linkedin.com/in/jorge-andres-ocaris-acu%C3%B1a-8b73b01a7/">
					<img src={linkedinIcon} alt="Linkedin" height="40" width="60" />
				</a>

				<a href="/">
					<img src={workLogo} alt="Portfolio" height="40" width="60" />
				</a>
			</div>
			<div className="right">
				<p>
					Icons made by
					<a href="https://www.flaticon.com/authors/freepik" title="Freepik">
						Freepik
					</a>
					from
					<a href="https://www.flaticon.com/" title="Flaticon">
						www.flaticon.com
					</a>
				</p>
				<p>
					<a href="https://www.freepik.com/free-photos-vectors/background">
						Background vector created by BiZkettE1 - www.freepik.com
					</a>
				</p>
			</div>
			<div className="bot">2020 Copyright</div>
		</div>
	);
};

export default Footer;
