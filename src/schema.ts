export interface EdfFile {
    header: EdfHeader;
    dataRecords: EdfDataRecord[];
}

export interface EdfHeader {
    version: string; // 8 ascii
    patientId: string; // 80 ascii
    recordingId: string; // 80 ascii
    startDate: string; // 8 ascii (dd.mm.yy)
    startTime: string; // 8 ascii (hh.mm.ss)
    headerBytes: number; // 8 ascii
    reserved: string; // 44 ascii
    numDataRecords: number; // 8 ascii, -1 if unknown
    durationOfDataRecord: number; // 8 ascii, in seconds
    numSignals: number; // 4 ascii
    signals: EdfSignal[];
}

export interface EdfSignal {
    label: string; // 16 ascii
    transducerType: string; // 80 ascii
    physicalDimension: string; // 8 ascii
    physicalMinimum: number; // 8 ascii
    physicalMaximum: number; // 8 ascii
    digitalMinimum: number; // 8 ascii
    digitalMaximum: number; // 8 ascii
    prefiltering: string; // 80 ascii
    numSamplesPerDataRecord: number; // 8 ascii
    reserved: string; // 32 ascii
}

export interface EdfDataRecord {
    signals: number[][]; // inner array represents samples for one signal
}
