export abstract class ObjectEventRequest {
    abstract execute(endpoint: string): void;
}