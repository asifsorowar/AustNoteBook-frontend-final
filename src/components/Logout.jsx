import { Component } from "react";
import { logout } from "../service/authService";

class Logout extends Component {
  async componentDidMount() {
    await logout();
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
