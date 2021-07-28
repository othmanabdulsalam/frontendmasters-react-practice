import { StrictMode, useState } from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import ThemeContext from "./ThemeContext";





const App = () =>
{
    const theme = useState("peru");
    return (
        <ThemeContext.Provider value={theme}>
            <div>
                <Router>
                    <header>
                        <Link to="/">
                            <h1>Adopt Me!</h1>
                        </Link>
                    </header>
                    <Switch>
                        <Route path="/details/:id">
                            <Details />
                        </Route>
                        <Route path="/">
                            <SearchParams />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </ThemeContext.Provider>
    );
};

render(
    <StrictMode>
        <App />
    </StrictMode>, document.getElementById("root"));
