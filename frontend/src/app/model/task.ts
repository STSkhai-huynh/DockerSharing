import { Guid } from "guid-typescript";
import { TaskStatus } from "./taskStatus";

export interface Task {
    id?: number;
    description: string;
    targetDate: Date;
    done: boolean;
}