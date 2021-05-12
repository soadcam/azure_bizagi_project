import { useHistory } from "react-router-dom";

export default function SignOut() {
    let history = useHistory();
    history.push("/login");

    return (<div></div>);
}