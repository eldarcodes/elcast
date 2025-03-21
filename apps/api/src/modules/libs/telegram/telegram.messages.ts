import type { User } from '@/prisma/generated';
import type { SessionMetadata } from '@/src/shared/types/session-metadata.type';

export const TELEGRAM_MESSAGES = {
  welcome: `<b>👋 Welcome to Elcast Bot!</b>\n\n
To receive notifications and enhance your experience on the platform, let's link your Telegram account with Elcast.\n\n
Click the button below and go to the <b>Notifications</b> section to complete the setup.`,
  authSuccess:
    '🎉 You have successfully authenticated, and your Telegram account is now linked with Elcast!',
  invalidToken: '❌ Invalid token.',
  expiredToken: '❌ Expired token.',
  profile: (user: User, followersCount: number) =>
    `<b>👤 User Profile:</b>\n\n
    💬 Username: <b>${user.username}</b>\n
    📧 Email: <b>${user.email}</b>\n
    👥 Followers Count: <b>${followersCount}</b>\n
    📝 Bio: <b>${user.bio || 'Not provided'}</b>\n\n
    🔧 Click the button below to go to your profile settings.`,
  follows: (user: User) =>
    `<a href="https://elcast.eldarcodes.com/${user.username}">${user.username}</a>`,
  resetPassword: (token: string, metadata: SessionMetadata) =>
    `<b>🔒 Password Reset</b>\n\n
    You requested a password reset for your account on the <b>Elcast</b> platform.\n\n
    To create a new password, please follow this link:\n\n
    <b><a href="https://elcast.eldarcodes.com/account/recovery/${token}">Reset Password</a></b>\n\n
    📅 <b>Request Date:</b> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n\n
    🖥️ <b>Request Info:</b>\n\n
    🌍 <b>Location:</b> ${metadata.location.country}, ${metadata.location.city}\n
    📱 <b>Operating System:</b> ${metadata.device.os}\n
    🌐 <b>Browser:</b> ${metadata.device.browser}\n
    💻 <b>IP Address:</b> ${metadata.ip}\n\n
    If you did not make this request, please ignore this message.\n\n
    Thank you for using <b>Elcast</b>! 🚀`,
  deactivate: (token: string, metadata: SessionMetadata) =>
    `<b>⚠️ Account Deactivation Request</b>\n\n
    You have initiated the process of deactivating your account on the <b>Elcast</b> platform.\n\n
    To complete the operation, please confirm your request by entering the following confirmation code:\n\n
    <b>Confirmation Code: ${token}</b>\n\n
    📅 <b>Request Date:</b> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n\n
    🖥️ <b>Request Info:</b>\n\n
    • 🌍 <b>Location:</b> ${metadata.location.country}, ${metadata.location.city}\n
    • 📱 <b>Operating System:</b> ${metadata.device.os}\n
    • 🌐 <b>Browser:</b> ${metadata.device.browser}\n
    • 💻 <b>IP Address:</b> ${metadata.ip}\n\n
    <b>What will happen after deactivation?</b>\n\n
    1. You will be automatically logged out and lose access to your account.\n
    2. If you do not cancel the deactivation within 7 days, your account will be <b>permanently deleted</b> along with all your information, data, and subscriptions.\n\n
    <b>⏳ Please note:</b> If you change your mind within 7 days, you can contact our support team to restore access to your account before it is completely deleted.\n\n
    Once the account is deleted, it cannot be recovered, and all data will be lost permanently.\n\n
    If you have changed your mind, simply ignore this message. Your account will remain active.\n\n
    Thank you for using <b>Elcast</b>! We are always happy to have you on our platform and hope you’ll stay with us. 🚀\n\n
    Best regards,
    The Elcast Team`,
  accountDeleted: `<b>⚠️ Your account has been permanently deleted.</b>\n\n
    Your account has been completely removed from the Elcast database. All your data and information have been permanently deleted. ❌\n\n
    🔒 You will no longer receive notifications on Telegram or by email.\n\n
    If you wish to return to the platform, you can register using the following link:\n
    <b><a href="https://elcast.eldarcodes.com/account/create">Register on Elcast</a></b>\n\n
    Thank you for being with us! We will always be happy to have you back on the platform. 🚀\n\n
    Best regards,\n
    The Elcast Team`,
  streamStart: (channel: User) =>
    `<b>📡 Live stream started on ${channel.displayName}'s channel!</b>\n\n` +
    `Watch it here: <a href="https://elcast.eldarcodes.com/${channel.username}">Join the stream</a>`,
  newFollowing: (follower: User, followersCount: number) =>
    `<b>You have a new follower!</b>\n\n
    Meet <a href="https://elcast.eldarcodes.com/${follower.username}">${follower.displayName}</a>\n\n
    Your channel now has a total of ${followersCount} followers.`,
  enableTwoFactor: `🔐 Protect your account!\n\n
    Enable two-factor authentication in your <a href="https://elcast.eldarcodes.com/dashboard/settings">account settings</a>.`,
  verifyChannel: `<b>🎉 Congratulations! Your channel is now verified</b>\n\n
    We’re excited to let you know that your channel has been verified, and you’ve received the official verification badge.\n\n
    The verification badge confirms the authenticity of your channel and helps build trust with your audience.\n\n
    Thank you for being with us and continuing to grow your channel with Elcast!`,
};
