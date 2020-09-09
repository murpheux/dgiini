import { AbstractValidator } from 'fluent-ts-validator';
import { ITask } from '../task';

export class TaskValidator extends AbstractValidator<ITask> {
    constructor() {
        super();

        this.validateIfString((task) => task.title)
            .isAlphanumeric()
            .hasMinLength(10);

        this.validateIfNumber((task) => task.rate.amount);
    }
}
