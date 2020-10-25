import React, {Component} from "react";
import AuthenticationService from "../service/AuthenticationService";
import './css/styles.css'

class TestLoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "abc",
            name: "Aditya",
            password: "myPass",
            email: "monster.adityachand@gmail.com",
            hasLoginFailed: false,
            showSuccessMessage: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
        this.signUpClicked = this.signUpClicked.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    loginClicked() {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        AuthenticationService.executeJwtAuthenticationService(
            this.state.username,
            this.state.password
        )
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(
                    this.state.username,
                    response.data.token
                );
                this.props.history.push(`/login`);
            })
            .catch(() => {
                this.setState({showSuccessMessage: false});
                this.setState({hasLoginFailed: true});
            });
    }

    signUpClicked() {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        AuthenticationService.createBasicAuthToken(
            this.state.name,
            this.state.email,
            this.state.password
        )
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(
                    this.state.email,
                    response.data.token
                );
                this.props.history.push(`/login`);
            })
            .catch(() => {
                this.setState({showSuccessMessage: false});
                this.setState({hasLoginFailed: true});
            });
    }

    onComponentClick() {
        const signUpButton = document.getElementById("signUp");
        console.log(signUpButton);
        const signInButton = document.getElementById("signIn");
        console.log(signInButton);

        const container = document.getElementById("container");
        console.log(container);

        if (signUpButton != null)
            signUpButton.addEventListener("click", () => {
                container.classList.add("right-panel-active");
            });
        if (signInButton != null)
            signInButton.addEventListener("click", () => {
                container.classList.remove("right-panel-active");
            });
    }

    render() {
        return (
            <div>
                <div className="container" id="container">
                    <div className="form-container sign-up-container">
                        <form onSubmit={this.signUpClicked} >
                            <h1>Create Account</h1>
                            <span> Sign up using social networks</span>
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={this.state.email}
                                name="email"
                                onChange={this.handleChange}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <button className="btn btn-success" >
                                Sign up
                            </button>
                        </form>
                    </div>

                    <div className="form-container sign-in-container">
                        <form onSubmit={this.loginClicked}>
                            <h1>Login to Your Account</h1>
                            <span>Login using social networks</span>
                            <input
                                type="text"
                                placeholder="UserName"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <p>Forgot password</p>
                            <button className="btn btn-success" >
                                Sign In
                            </button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div
                                className="overlay-panel overlay-left"
                                id="leftOverlay"
                                onClick={this.onComponentClick}
                            >
                                <h1>One Of Us?</h1>
                                <p>
                                    If you already have an account, just sign in. We've missed
                                    you!
                                </p>
                                <button
                                    onClick={this.onComponentClick}
                                    className="ghost"
                                    id="signIn"
                                >
                                    Sign In
                                </button>

                            </div>
                            <div
                                className="overlay-panel overlay-right"
                                id="rightOverlay"
                                onClick={this.onComponentClick}
                            >

                                <h1>New Here?</h1>
                                <p>
                                    Enter your Details here and <br></br> start your journey with
                                    us
                                </p>
                                <button className="ghost" id="signUp">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TestLoginComponent;
