'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/common/alert';
import { Button } from '@/components/ui/common/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/common/form';
import { Input } from '@/components/ui/common/input';
import { PasswordInput } from '@/components/ui/elements/password-input';

import { useCreateUserMutation } from '@/graphql/generated/output';

import {
  createAccountSchema,
  CreateAccountSchema,
} from '@/schemas/auth/create-account.schema';

import { AuthWrapper } from '../auth-wrapper';

export function CreateAccountForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const t = useTranslations('auth.register');

  const form = useForm<CreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const [create, { loading: isLoadingCreate }] = useCreateUserMutation({
    onCompleted: () => {
      setIsSuccess(true);
      toast.success(t('successMessage'));
    },
    onError: () => toast.error(t('errorMessage')),
  });

  const { isValid } = form.formState;

  function onSubmit(data: CreateAccountSchema) {
    create({ variables: { data } });
  }

  return (
    <AuthWrapper
      heading={t('heading')}
      backButtonLabel={t('backButtonLabel')}
      backButtonHref="/account/login"
    >
      {isSuccess ? (
        <Alert className="my-12">
          <CircleCheck className="size-4" />
          <AlertTitle>{t('successAlertTitle')}</AlertTitle>
          <AlertDescription>{t('successAlertDescription')}</AlertDescription>
        </Alert>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('usernameLabel')}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoadingCreate}
                      placeholder="johndoe"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t('usernameDescription')}</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('emailLabel')}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoadingCreate}
                      placeholder="john.doe@acme.com"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('passwordLabel')}</FormLabel>
                  <FormControl>
                    <PasswordInput
                      disabled={isLoadingCreate}
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t('passwordDescription')}</FormDescription>
                </FormItem>
              )}
            />

            <Button
              className="mt-2 w-full"
              disabled={!isValid || isLoadingCreate}
              type="submit"
            >
              {t('submitButton')}
            </Button>
          </form>
        </Form>
      )}
    </AuthWrapper>
  );
}
