import { ITask, Currency } from '../ITask';
import { AbstractValidator, Severity } from 'fluent-ts-validator';

export class TaskValidator extends AbstractValidator<ITask> {
    constructor() {
        super();

        this.validateIfString((task) => task.title)
            .isAlphanumeric()
            .hasMinLength(10);

        this.validateIfNumber((task) => task.rate.amount);
    }
}
