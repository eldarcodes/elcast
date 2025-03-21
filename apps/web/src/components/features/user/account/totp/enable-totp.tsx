import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/common/input-otp';

import {
  useEnableTotpMutation,
  useGenerateTotpSecretQuery,
} from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import {
  type EnableTotpSchema,
  enableTotpSchema,
} from '@/schemas/user/enable-totp.schema';

export function EnableTotp() {
  const t = useTranslations('dashboard.settings.account.twoFactor.enable');

  const [isOpen, setIsOpen] = useState(false);

  const { refetch } = useCurrentProfile();

  const { data, loading: isLoadingGenerate } = useGenerateTotpSecretQuery();
  const twoFactorData = data?.generateTotpSecret;

  const form = useForm<EnableTotpSchema>({
    resolver: zodResolver(enableTotpSchema),
    defaultValues: {
      pin: '',
    },
  });

  const [enableTotp, { loading: isLoadingEnable }] = useEnableTotpMutation({
    onCompleted: () => {
      refetch();
      toast.success(t('successMessage'));
    },
    onError: () => {
      toast.error(t('errorMessage'));
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: EnableTotpSchema) {
    enableTotp({
      variables: {
        data: {
          pin: data.pin,
          secret: twoFactorData?.secret || '',
        },
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{t('trigger')}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('heading')}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="text-sm text-muted-foreground">
                {twoFactorData?.qrcodeUrl && t('qrInstructions')}
              </span>
              {twoFactorData?.qrcodeUrl && (
                <Image
                  src={twoFactorData.qrcodeUrl}
                  width={200}
                  height={200}
                  alt="QR"
                  className="rounded-lg"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-center text-sm text-muted-foreground">
                {twoFactorData?.secret &&
                  t('secretCodeLabel') + twoFactorData.secret}
              </span>
            </div>

            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pinLabel')}</FormLabel>

                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
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

            <DialogFooter>
              <Button
                type="submit"
                disabled={!isValid || isLoadingGenerate || isLoadingEnable}
              >
                {t('submitButton')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
