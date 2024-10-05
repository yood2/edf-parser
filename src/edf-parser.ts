import * as fs from 'fs/promises';
import parseHeader from './util/header-util';
import parseDataRecords from './util/record-util';
import { EdfFile, EdfHeader, EdfDataRecord } from './schema';

export class EdfParser {
    async parse(path: string): Promise<EdfFile> {
        try {
            const data = await fs.readFile(path);
            return this.parseBuffer(data);
        } catch (err) {
            throw err;
        }
    }

    private parseBuffer(buffer: Buffer): EdfFile {
        try {
            const header = parseHeader(buffer);
            const dataRecords = parseDataRecords(buffer, header);

            const output: EdfFile = {
                header,
                dataRecords,
            };

            return output;
        } catch (err) {
            throw err;
        }
    }
}
