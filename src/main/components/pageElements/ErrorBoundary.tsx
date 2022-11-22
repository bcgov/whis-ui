import React from "react";


/* There is, as of writing, no FC equivalent of componentDidCatch, so we need a class here */

export class ErrorBoundary extends React.Component<any, any> {

	constructor(props) {
		super(props);
		this.state = {
			errorDetected: false,
			errorDetails: null
		}
	}

	static getDerivedStateFromError(error: Error) {
		return {errorDetected: true, errorDetails: error};
	}

	componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
		if (prevProps.children !== this.props.children) {
			this.setState({
				errorDetected: false,
				errorDetails: null
			});
		}
	}

	render() {
		if (this.state.errorDetected) {
			return (
				<>
					<h1>An error has occurred</h1>
					<pre>
						{this.state.errorDetails?.message}
					</pre>
					<pre>
						{this.state.errorDetails?.stack}
					</pre>
					<a href="#" onClick={() => history.go(-1)}>Go back</a>
				</>);
		}

		return this.props.children;
	}

}
