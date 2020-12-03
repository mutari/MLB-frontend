async function send(url, setting) {
    const response = await fetch(url, setting);
    return await response.json();
}

async function getAllTitles() {
    const response = await fetch('http://mylyricbook/api/')    
    return await response.json();
}

export { getAllTitles, send }