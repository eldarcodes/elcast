'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import {
  Dialog,
  DialogContent,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/common/select';

import { useCreateIngressMutation } from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import {
  type CreateIngressSchema,
  createIngressSchema,
  IngressType,
} from '@/schemas/stream/create-ingress.schema';

export function CreateIngressForm() {
  const t = useTranslations('dashboard.keys.createModal');

  const [isOpen, setIsOpen] = useState(false);

  const { refetch } = useCurrentProfile();

  const form = useForm<CreateIngressSchema>({
    resolver: zodResolver(createIngressSchema),
    defaultValues: {
      ingressType: IngressType.RTMP,
    },
  });

  const [createIngress, { loading: isLoadingCreate }] =
    useCreateIngressMutation({
      onCompleted: () => {
        refetch();
        setIsOpen(false);
        toast.success(t('successMessage'));
      },
      onError: () => toast.error(t('errorMessage')),
    });

  function onSubmit(data: CreateIngressSchema) {
    createIngress({ variables: { type: data.ingressType } });
  }

  const { isValid } = form.formState;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{t('trigger')}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('heading')}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="ingressType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('ingressTypeLabel')}</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value.toString()}
                      onValueChange={(value) => {
                        field.onChange(+value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t('ingressTypePlaceholder')}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem
                          value={IngressType.RTMP.toString()}
                          disabled={isLoadingCreate}
                        >
                          RTMP
                        </SelectItem>

                        <SelectItem
                          value={IngressType.WHIP.toString()}
                          disabled={isLoadingCreate}
                        >
                          WHIP
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormDescription>
                    {t('ingressTypeDescription')}
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button disabled={!isValid || isLoadingCreate} type="submit">
                {t('submitButton')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
