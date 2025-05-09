import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import { Queue } from 'bullmq';

import {
  MAIL_QUEUE_NAME,
  MailJobName,
} from '@/src/shared/constants/queue.constants';
import type { SessionMetadata } from '@/src/shared/types/session-metadata.type';

import { AccountDeletionTemplate } from './templates/account-deletion.template';
import { DeactivateTemplate } from './templates/deactivate.template';
import { EnableTwoFactorTemplate } from './templates/enable-two-factor.template';
import { PasswordRecoveryTemplate } from './templates/password-recovery.template';
import { PasswordUpdatedTemplate } from './templates/password-updated.template';
import { VerificationCodeTemplate } from './templates/verification-code.template';
import { VerificationTemplate } from './templates/verification.template';
import { VerifyChannelTemplate } from './templates/verify-channel.template';

@Injectable()
export class MailService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,

    @InjectQueue(MAIL_QUEUE_NAME) private readonly mailQueue: Queue,
  ) {}

  public async sendVerificationToken(email: string, token: string) {
    const domain = this.configService.get<string>('ALLOWED_ORIGIN');
    const html = await render(VerificationTemplate({ domain, token }));

    return this.mailQueue.add(
      MailJobName.SEND_VERIFICATION_TOKEN,
      {
        to: email,
        subject: 'Verify Your Email Address',
        html,
      },
      { removeOnComplete: true },
    );
  }

  public async sendVerificationCode(
    email: string,
    username: string,
    token: string,
    metadata: SessionMetadata,
  ) {
    const html = await render(
      VerificationCodeTemplate({ token, username, metadata }),
    );

    return this.mailQueue.add(
      MailJobName.SEND_VERIFICATION_CODE,
      {
        to: email,
        subject: 'Verify your email address',
        html,
      },
      { removeOnComplete: true },
    );
  }

  public async sendPasswordResetToken(
    email: string,
    username: string,
    token: string,
    metadata: SessionMetadata,
  ) {
    const domain = this.configService.get<string>('ALLOWED_ORIGIN');

    const html = await render(
      PasswordRecoveryTemplate({ domain, token, username, metadata }),
    );

    return this.mailQueue.add(
      MailJobName.SEND_PASSWORD_RESET_TOKEN,
      {
        to: email,
        subject: 'Reset your password',
        html,
      },
      { removeOnComplete: true },
    );
  }

  public async sendPasswordUpdated(email: string, username: string) {
    const domain = this.configService.get<string>('ALLOWED_ORIGIN');

    const html = await render(
      PasswordUpdatedTemplate({
        username,
        domain,
        updatedDate: new Date(),
      }),
    );

    return this.mailQueue.add(
      MailJobName.SEND_PASSWORD_UPDATED,
      {
        to: email,
        subject: 'Password updated',
        html,
      },
      { removeOnComplete: true },
    );
  }

  public async sendDeactivateToken(
    email: string,
    username: string,
    token: string,
    metadata: SessionMetadata,
  ) {
    const html = await render(
      DeactivateTemplate({ token, username, metadata }),
    );

    return this.mailQueue.add(
      MailJobName.SEND_DEACTIVATE_TOKEN,
      {
        to: email,
        subject: 'Confirm your account deactivation',
        html,
      },
      { removeOnComplete: true },
    );
  }

  public async sendAccountDeletion(email: string) {
    const domain = this.configService.get<string>('ALLOWED_ORIGIN');

    const html = await render(AccountDeletionTemplate({ domain }));

    return this.mailQueue.add(
      MailJobName.SEND_ACCOUNT_DELETION,
      {
        to: email,
        subject: 'Account Deleted',
        html,
      },
      { removeOnComplete: true },
    );
  }

  public async sendEnableTwoFactor(email: string, username: string) {
    const domain = this.configService.get<string>('ALLOWED_ORIGIN');

    const html = await render(EnableTwoFactorTemplate({ domain, username }));

    return this.mailQueue.add(
      MailJobName.SEND_ENABLE_TWO_FACTOR,
      {
        to: email,
        subject: 'Enable Two-Factor Authentication',
        html,
      },
      { removeOnComplete: true },
    );
  }

  public async sendVerifyChannel(email: string) {
    const html = await render(VerifyChannelTemplate());

    return this.mailQueue.add(
      MailJobName.SEND_VERIFY_CHANNEL,
      {
        to: email,
        subject: 'Your channel is verified',
        html,
      },
      { removeOnComplete: true },
    );
  }

  public sendMail(email: string, subject: string, html: string) {
    try {
      return this.mailerService.sendMail({
        to: email,
        subject,
        html,
      });
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
    }
  }
}
