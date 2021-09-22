import { useHistory } from "react-router-dom";

export default function SignOut() {
    localStorage.removeItem('token');
    let history = useHistory();
    history.push("/login");

    return (<div></div>);
}