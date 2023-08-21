import React from "react";
import MainPage from "./pages/MainPage";
import CompressorPage from "./pages/CompressorPage";
import DecompressorPage from "./pages/DecompressorPage";
import invalidLink from "./pages/InvalidLink";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";

export default function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/small-bytes/home" component={MainPage} />
				<Route exact path="/">
					<Redirect to="/small-bytes/home" />
				</Route>
				<Route exact path="/small-bytes/">
					<Redirect to="/small-bytes/home" />
				</Route>
				<Route
					exact
					path="/small-bytes/compressor"
					component={CompressorPage}
				/>
				<Route
					exact
					path="/small-bytes/decompressor"
					component={DecompressorPage}
				/>
				<Route exact path="/404" component={invalidLink} />
				<Redirect to="/404" />
			</Switch>
		</Router>
	);
}