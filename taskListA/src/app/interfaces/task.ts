export interface Task {
    id: string;
    title: string;
    description: string;
    priority: Int16Array;
    deadLine: Date;
}