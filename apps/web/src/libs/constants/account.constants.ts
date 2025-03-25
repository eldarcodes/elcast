export const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
export const MIN_USERNAME_LENGTH = 4;

export const MIN_PASSWORD_LENGTH = 8;

export const MAX_BIO_LENGTH = 300;

export const USERNAME_CHANGE_COOLDOWN_DAYS = 7;
export const EMAIL_CHANGE_COOLDOWN_DAYS = 3;

export const ACCOUNT_DAYS_UNTIL_DELETION = 7;

// This heartbeat updates user last active timestamp
export const USER_ONLINE_HEARTBEAT = 5000; // 5 seconds

// User is considered online if last active is within this threshold
export const USER_ONLINE_THRESHOLD = 10000; // 10 seconds
