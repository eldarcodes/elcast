'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
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
  DialogTrigger,
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

import { useChangeProfileUsernameMutation } from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import { USERNAME_CHANGE_COOLDOWN_DAYS } from '@/libs/constants/account.constants';
import { APP_URL } from '@/libs/constants/url.constants';

import {
  type ChangeUsernameSchema,
  changeUsernameSchema,
} from '@/schemas/user/change-username.schema';

import { canChangeUsername } from '@/utils/cooldown-validation';

export function ChangeUsernameForm() {
  const t = useTranslations('dashboard.settings.profile.username');

  const [open, setOpen] = useState(false);

  const { user, refetch } = useCurrentProfile();

  const isUsernameChangeAvailable = canChangeUsername(user?.lastUsernameChange);

  const form = useForm<ChangeUsernameSchema>({
    resolver: zodResolver(changeUsernameSchema),
    defaultValues: {
      username: '',
    },
  });

  const [updateProfileUsername, { loading: isLoadingUpdate }] =
    useChangeProfileUsernameMutation({
      onCompleted: () => {
        refetch();
        toast.success(t('modal.successMessage'));
        setOpen(false);
      },
      onError: () => toast.error(t('modal.errorMessage')),
    });

  function onSubmit(data: ChangeUsernameSchema) {
    updateProfileUsername({ variables: { data } });
  }

  const { isValid, isDirty } = form.formState;

  return (
    <Form {...form}>
      <FormItem>
        <FormLabel>{t('usernameLabel')}</FormLabel>

        <div className="flex flex-nowrap">
          <Input
            placeholder={t('usernamePlaceholder')}
            disabled
            className="rounded-r-none"
            value={user?.username}
            autoComplete="off"
          />

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-l-none">
                <Pencil className="size-5" />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {t('modal.heading')}
                </DialogTitle>
                <DialogDescription>
                  {t('modal.description', {
                    cooldownDays: USERNAME_CHANGE_COOLDOWN_DAYS,
                  })}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('usernameLabel')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('usernamePlaceholder')}
                          disabled={
                            isLoadingUpdate || !isUsernameChangeAvailable
                          }
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="my-3">
                  {isUsernameChangeAvailable ? (
                    <>
                      <strong className="text-sm font-medium leading-none">
                        {t('modal.usernameUrlPreview')}
                      </strong>
                      <div>
                        {APP_URL}
                        {'/'}
                        {form.watch('username')}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-red-400">
                      {t('modal.cooldownError', {
                        cooldownDays: USERNAME_CHANGE_COOLDOWN_DAYS,
                      })}
                    </p>
                  )}
                </div>

                <div className="mt-3 flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      {t('modal.cancelButton')}
                    </Button>
                  </DialogClose>

                  {isUsernameChangeAvailable && (
                    <Button
                      disabled={!isValid || !isDirty || isLoadingUpdate}
                      type="submit"
                    >
                      {t('modal.submitButton')}
                    </Button>
                  )}
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isUsernameChangeAvailable && (
          <FormDescription>{t('usernameDescription')}</FormDescription>
        )}
      </FormItem>
    </Form>
  );
}
