import { USERNAME_CHANGE_COOLDOWN_DAYS } from '@/libs/constants/account.constants';

export function canChangeUsername(
  lastUsernameChange: string | Date | null,
): boolean {
  if (!lastUsernameChange) return true;

  const now = new Date();
  const lastChange = new Date(lastUsernameChange);
  const daysSinceLastChange =
    (now.getTime() - lastChange.getTime()) / (1000 * 60 * 60 * 24);

  return daysSinceLastChange >= USERNAME_CHANGE_COOLDOWN_DAYS;
}
