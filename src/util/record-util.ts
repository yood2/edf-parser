import { EdfHeader, EdfDataRecord } from '../schema';

export default function parseDataRecords(
    buffer: Buffer,
    header: EdfHeader
): EdfDataRecord[] {
    const dataRecords: EdfDataRecord[] = [];
    let offset = header.headerBytes;

    for (let i = 0; i < header.numDataRecords; i++) {
        const signals: number[][] = [];

        for (const signal of header.signals) {
            const samples: number[] = [];
            for (let j = 0; j < signal.numSamplesPerDataRecord; j++) {
                samples.push(buffer.readInt16LE(offset));
                offset += 2; // 2 bytes per sample?
            }
            signals.push(samples);
        }

        dataRecords.push({ signals });
    }

    return dataRecords;
}
