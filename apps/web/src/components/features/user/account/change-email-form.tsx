'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/common/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/common/form';
import { Input } from '@/components/ui/common/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/common/input-otp';
import { FormWrapper } from '@/components/ui/elements/form-wrapper';

import {
  useChangeEmailMutation,
  useSendVerificationLinkMutation,
} from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import { EMAIL_CHANGE_COOLDOWN_DAYS } from '@/libs/constants/account.constants';

import {
  changeEmailSchema,
  ChangeEmailSchema,
} from '@/schemas/user/change-email.schema';

import { canChangeEmail } from '@/utils/cooldown-validation';

export function ChangeEmailForm() {
  const t = useTranslations('dashboard.settings.account.email');

  const [open, setOpen] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [emailResent, setEmailResent] = useState(false);

  const { user, refetch } = useCurrentProfile();

  const isEmailChangeAvailable = canChangeEmail(user?.lastEmailChange);

  const form = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const [changeEmail, { loading: isLoadingUpdate }] = useChangeEmailMutation({
    onCompleted: (data) => {
      refetch();

      if (data.changeEmail.message === 'PIN_REQUIRED') {
        setIsShowConfirm(true);
      } else {
        form.reset();
        toast.success(t('modal.successMessage'));
        setOpen(false);
        setIsShowConfirm(false);
      }
    },
    onError: () => toast.error(t('modal.errorMessage')),
  });

  const [sendVerificationLink, { loading: isLoadingSendLink }] =
    useSendVerificationLinkMutation({
      onCompleted: () => {
        toast.success(t('sendVerificationLink.successMessage'));

        setEmailResent(true);
      },
      onError: () => toast.error(t('sendVerificationLink.errorMessage')),
    });

  function onSubmit(data: ChangeEmailSchema) {
    changeEmail({ variables: { data } });
  }

  const { isValid, isDirty } = form.formState;

  const currentPin = form.watch('pin');

  const twoFactorValid = isShowConfirm ? currentPin?.length === 6 : true;

  return (
    <FormWrapper heading={t('heading')}>
      <Form {...form}>
        <FormItem>
          <FormLabel>{t('emailLabel')}</FormLabel>

          <div className="flex flex-nowrap">
            <Input
              placeholder={t('emailPlaceholder')}
              disabled
              className="rounded-r-none"
              value={user?.email}
              autoComplete="off"
            />

            <Button
              variant="outline"
              size="icon"
              className="rounded-l-none"
              onClick={() => setOpen(true)}
            >
              <Pencil className="size-5" />
            </Button>
          </div>

          {isEmailChangeAvailable && (
            <FormDescription>{t('emailDescription')}</FormDescription>
          )}

          {user?.isEmailVerified ? (
            <p className="text-sm text-muted-foreground">
              <strong className="text-green-400">{t('verified')}.</strong>{' '}
              {t('verifiedText')}
            </p>
          ) : (
            <div className="flex items-center gap-x-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-red-400">{t('notVerified')}.</strong>{' '}
                {t('notVerifiedText')}
              </p>

              {!emailResent && (
                <Button
                  disabled={isLoadingSendLink}
                  onClick={() => sendVerificationLink()}
                  type="button"
                  variant="secondary"
                  size="sm"
                >
                  {isLoadingSendLink && (
                    <Loader2 className="size-4 animate-spin" />
                  )}
                  {t('sendVerificationLink.resend')}
                </Button>
              )}
            </div>
          )}
        </FormItem>
      </Form>

      <Dialog
        open={open}
        onOpenChange={() => {
          form.reset();
          setOpen(false);
          setIsShowConfirm(false);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">{t('modal.heading')}</DialogTitle>
            <DialogDescription>
              {t('modal.description', {
                cooldownDays: EMAIL_CHANGE_COOLDOWN_DAYS,
              })}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {isShowConfirm ? (
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('pinLabel')}</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field} autoFocus>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>{t('pinDescription')}</FormDescription>
                    </FormItem>
                  )}
                />
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('emailLabel')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('emailPlaceholder')}
                            disabled={
                              isLoadingUpdate || !isEmailChangeAvailable
                            }
                            {...field}
                            autoComplete="off"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {!isEmailChangeAvailable && !isShowConfirm && (
                <div className="my-3">
                  <p className="text-sm text-red-400">
                    {t('modal.cooldownError', {
                      cooldownDays: EMAIL_CHANGE_COOLDOWN_DAYS,
                    })}
                  </p>
                </div>
              )}

              <div className="mt-3 flex justify-end gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    {t('modal.cancelButton')}
                  </Button>
                </DialogClose>

                {(isEmailChangeAvailable || isShowConfirm) && (
                  <Button
                    disabled={
                      !isValid || !isDirty || isLoadingUpdate || !twoFactorValid
                    }
                    type="submit"
                  >
                    {t('modal.submitButton')}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </FormWrapper>
  );
}
