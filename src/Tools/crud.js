async function getAllTitles() {
    const response = await fetch('http://mylyricbook/api/')    
    return await response.json();
}

export { getAllTitles }