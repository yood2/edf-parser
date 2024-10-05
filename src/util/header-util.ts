import { EdfHeader, EdfSignal } from '../schema';

export default function parseHeader(buffer: Buffer): EdfHeader {
    let offset = 0;
    const headerFields: [keyof EdfHeader, number, (s: string) => any][] = [
        ['version', 8, String],
        ['patientId', 80, String],
        ['recordingId', 80, String],
        ['startDate', 8, String],
        ['startTime', 8, String],
        ['headerBytes', 8, parseInt],
        ['reserved', 44, String],
        ['numDataRecords', 8, parseInt],
        ['durationOfDataRecord', 8, parseFloat],
        ['numSignals', 4, parseInt],
    ];

    const header = {} as EdfHeader;

    for (const [field, length, parser] of headerFields) {
        (header[field] as any) = parser(
            buffer.toString('ascii', offset, offset + length).trim()
        );
        offset += length;
    }

    const signals: EdfSignal[] = [];
    for (let i = 0; i < (header.numSignals || 0); i++) {
        signals.push(parseSignal(buffer, offset, header.numSignals || 0));
        offset += 256;
    }

    header.signals = signals;

    return header;
}

function parseSignal(
    buffer: Buffer,
    baseOffset: number,
    numSignals: number
): EdfSignal {
    const signalFields: [keyof EdfSignal, number, (s: string) => any][] = [
        ['label', 16, String],
        ['transducerType', 80, String],
        ['physicalDimension', 8, String],
        ['physicalMinimum', 8, parseFloat],
        ['physicalMaximum', 8, parseFloat],
        ['digitalMinimum', 8, parseInt],
        ['digitalMaximum', 8, parseInt],
        ['prefiltering', 80, String],
        ['numSamplesPerDataRecord', 8, parseInt],
        ['reserved', 32, String],
    ];

    const signal = {} as EdfSignal;
    let offset = baseOffset;

    for (const [field, length, parser] of signalFields) {
        (signal[field] as any) = parser(
            buffer.toString('ascii', offset, offset + length).trim()
        );
        offset += field === 'reserved' ? length : length * numSignals;
    }

    return signal;
}
