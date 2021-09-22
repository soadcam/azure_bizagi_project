export function handleResponse(response, history) {
    const status = response.status;
    if ([401, 403].indexOf(status) !== -1)
        history.push("/login");
    else if (status >= 500)
        history.push("/error");
}