import {
  ValidationArguments,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from 'class-validator';

import { NewPasswordInput } from '@/src/modules/auth/password-recovery/inputs/new-password.input';

@ValidatorConstraint({
  name: 'IsPasswordsMatching',
  async: false,
})
export class IsPasswordsMatchingConstraint
  implements ValidatorConstraintInterface
{
  public validate(passwordRepeat: string, args: ValidationArguments): boolean {
    const object = args.object as NewPasswordInput;

    return passwordRepeat === object.password;
  }

  public defaultMessage(args: ValidationArguments): string {
    return `Passwords do not match`;
  }
}
