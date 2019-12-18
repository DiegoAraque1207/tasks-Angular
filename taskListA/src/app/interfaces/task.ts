export interface Task {
    id: string;
    title: string;
    description: string;
    priority: number;
    deadLine: Date;
    color: string;
    tag: string;
    finished: boolean;
    finishDate: Date;
}