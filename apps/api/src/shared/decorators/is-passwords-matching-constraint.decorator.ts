import {
  type ValidationArguments,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from 'class-validator';

import type { NewPasswordInput } from '@/src/modules/auth/password-recovery/inputs/new-password.input';

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

  public defaultMessage(): string {
    return 'Passwords do not match';
  }
}
