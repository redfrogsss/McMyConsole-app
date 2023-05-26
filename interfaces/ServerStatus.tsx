export default interface ServerStatus {
    tps: number[];
    currentMemory: number;
    freeMemory: number;
    maxMemory: number;
}