import { EdfParser } from './edf-parser';

const path = './test.edf';
const parser = new EdfParser();
parser.parse(path).then((result) => {
    console.log(JSON.stringify(result, null, 2));
});
