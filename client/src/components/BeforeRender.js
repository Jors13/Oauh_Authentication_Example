import { useState, useEffect } from "react";

const BeforeRender = before => {
	const [hasRendered, setHasRenderer] = useState(false);

	useEffect(() => {
		setHasRenderer(true);
		return () => {};
	}, [hasRendered]);

	if (!hasRendered) {
		before();
	}
};

export default BeforeRender;
