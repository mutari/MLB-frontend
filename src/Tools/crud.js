async function send(url, setting) {
    const response = await fetch(url, { credentials: "include", ...setting });
    return await response.json();
}

export { send }