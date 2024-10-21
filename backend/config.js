import path from 'path';

const __filename = new URL('', import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const pathPokedex = path.join(__dirname, 'data', 'pokedex.json');

export { pathPokedex };