import { AbstractValidator, Severity } from 'fluent-ts-validator';
import { IUser } from 'src/app/views/user/models/user';

export class UserValidator extends AbstractValidator<IUser> {
    constructor() {
        super();

        this.validateIfString((user) => user.name)
            .isAlphanumeric()
            .hasMinLength(10);
    }
}
