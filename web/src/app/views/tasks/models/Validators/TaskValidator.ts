import { ITask } from '../ITask';
import {AbstractValidator, Severity} from 'fluent-ts-validator';


export class TaskValidator extends AbstractValidator<ITask> {
    constructor() {
        super();
        this.validateIfString(task => task.title)
            .isAlphanumeric().hasMinLength(50)
            .withFailureMessage('Cmon! At least some pronounceable name.');
    }
}
