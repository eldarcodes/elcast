export const MAIL_QUEUE_NAME = 'mail';

export enum MailJobName {
  SEND_VERIFICATION_TOKEN = 'send_verification_token',
  SEND_VERIFICATION_CODE = 'send_verification_code',
  SEND_PASSWORD_RESET_TOKEN = 'send_password_reset_token',
  SEND_DEACTIVATE_TOKEN = 'send_deactivate_token',
  SEND_ACCOUNT_DELETION = 'send_account_deletion',
  SEND_ENABLE_TWO_FACTOR = 'send_enable_two_factor',
  SEND_VERIFY_CHANNEL = 'send_verify_channel',
  SEND_PASSWORD_UPDATED = 'send_password_updated',
}
