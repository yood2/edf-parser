import { EdfParser } from '../src/edf-parser';

const path = './demo/data/test.edf';
const parser = new EdfParser();
parser.parse(path).then((result) => {
    console.log(JSON.stringify(result, null, 2));
});
