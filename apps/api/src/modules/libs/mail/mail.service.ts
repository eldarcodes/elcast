import type { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';

import type { SessionMetadata } from '@/src/shared/types/session-metadata.type';

import { AccountDeletionTemplate } from './templates/account-deletion.template';
import { DeactivateTemplate } from './templates/deactivate.template';
import { EnableTwoFactorTemplate } from './templates/enable-two-factor.template';
import { PasswordRecoveryTemplate } from './templates/password-recovery.template';
import { VerificationCodeTemplate } from './templates/verification-code.template';
import { VerificationTemplate } from './templates/verification.template';
import { VerifyChannelTemplate } from './templates/verify-channel.template';

@Injectable()
export class MailService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendVerificationToken(email: string, token: string) {
    const domain = this.configService.get<string>('ALLOWED_ORIGIN');
    const html = await render(VerificationTemplate({ domain, token }));

    return this.sendMail(email, 'Verify Your Email Address', html);
  }

  public async sendVerificationCode(
    email: string,
    token: string,
    metadata: SessionMetadata,
  ) {
    const html = await render(VerificationCodeTemplate({ token, metadata }));

    return this.sendMail(email, 'Verify Your Email Address', html);
  }

  public async sendPasswordResetToken(
    email: string,
    token: string,
    metadata: SessionMetadata,
  ) {
    const domain = this.configService.get<string>('ALLOWED_ORIGIN');

    const html = await render(
      PasswordRecoveryTemplate({ domain, token, metadata }),
    );

    return this.sendMail(email, 'Password reset', html);
  }

  public async sendDeactivateToken(
    email: string,
    token: string,
    metadata: SessionMetadata,
  ) {
    const html = await render(DeactivateTemplate({ token, metadata }));

    return this.sendMail(email, 'Account Deactivation', html);
  }

  public async sendAccountDeletion(email: string) {
    const domain = this.configService.get<string>('ALLOWED_ORIGIN');

    const html = await render(AccountDeletionTemplate({ domain }));

    return this.sendMail(email, 'Account Deleted', html);
  }

  public async sendEnableTwoFactor(email: string) {
    const domain = this.configService.get<string>('ALLOWED_ORIGIN');

    const html = await render(EnableTwoFactorTemplate({ domain }));

    return this.sendMail(email, 'Enable Two-Factor Authentication', html);
  }

  public async sendVerifyChannel(email: string) {
    const html = await render(VerifyChannelTemplate());

    return this.sendMail(email, 'Your channel is verified', html);
  }

  private sendMail(email: string, subject: string, html: string) {
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
