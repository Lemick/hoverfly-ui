export {};

declare global {
    interface Window {
        initialSimulations: string;
        setSimulations: any;
        simulationsUpdated: any;
    }
}
