// mostly code from reactjs.org/docs/error-boundaries.html
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component
{
    state =
        {
            hasError: false,
            redirect: false,
            time: 5,
        };


    static getDerivedStateFromError()
    {
        return { hasError: true };
    }


    /**
     * Decreases timer every 1 second
     */


    timer()
    {
        return this.setState(
            {
                time: this.state.time--
            }
        )
    }
    componentDidCatch(error, info)
    {
        console.error("ErrorBoundary caught an error", error, info);
        this.timeout = setTimeout(() => this.setState({ redirect: true }), 5000);
    }
    componentDidMount()
    {
        this.interval = setInterval(() => this.setState(this.timer), 1000)
    }

    componentWillUnmount()
    {
        clearInterval(this.interval);
        clearTimeout(this.timeout)
    }

    // ignore this function, as it will never be called upon the error occuring
    // due to it being unable to be called the first time it renders
    // moved timeout into componentDidCatch error
    // componentDidUpdate()
    // {
    //     if (this.state.hasError)
    //     {
    //         //set redirect
    //         setTimeout(() => this.setState({ redirect: true }), 5000);
    //     }
    // }
    render()
    {
        if (this.state.redirect)
        {
            return <Redirect to="/" />
        }
        else if (this.state.hasError)
        {
            return (
                <div>
                    <h2>
                        There was an error with this listing. <Link to="/">Click here</Link>{" "}
                        to back to the home page or wait {this.state.time} seconds.
                    </h2>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;