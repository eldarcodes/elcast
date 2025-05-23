'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
import { Skeleton } from '@/components/ui/common/skeleton';
import { ColorPicker } from '@/components/ui/elements/color-picker';
import { FormWrapper } from '@/components/ui/elements/form-wrapper';
import { Hint } from '@/components/ui/elements/hint';

import { useChangeProfileAccentColorMutation } from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import {
  changeAccentColorSchema,
  ChangeAccentColorSchema,
} from '@/schemas/user/change-accent-color.schema';

import { cn } from '@/utils/tw-merge';

import { ChangeUsernameForm } from './change-username-form';

export function ChangeAccentColorForm() {
  const t = useTranslations('dashboard.settings.profile.accentColor');

  const { user, isLoadingProfile, refetch } = useCurrentProfile();

  const form = useForm<ChangeAccentColorSchema>({
    resolver: zodResolver(changeAccentColorSchema),
    values: {
      accentColor: user?.accentColor ?? '',
    },
  });

  const [updateProfileAccentColor, { loading: isLoadingUpdate }] =
    useChangeProfileAccentColorMutation({
      onCompleted: () => {
        refetch();
        toast.success(t('successMessage'));
      },
      onError: () => toast.error(t('errorMessage')),
    });

  function onSubmit(data: ChangeAccentColorSchema) {
    updateProfileAccentColor({ variables: { data } });
  }

  const { isValid, isDirty } = form.formState;

  if (isLoadingProfile) {
    return <ChangeAccentColorFormSkeleton />;
  }

  const presets = [
    { name: t('presets.purple'), color: '#5C17C5' },
    { name: t('presets.magenta'), color: '#AF1392' },
    { name: t('presets.pink'), color: '#FF39DB' },
    { name: t('presets.lightPink'), color: '#FFA3EE' },
    { name: t('presets.red'), color: '#EB0200' },
    { name: t('presets.orange'), color: '#FF8280' },
    { name: t('presets.yellow'), color: '#FFD37A' },
    { name: t('presets.green'), color: '#02F593' },
    { name: t('presets.teal'), color: '#00A3A3' },
    { name: t('presets.aqua'), color: '#08F0F0' },
    { name: t('presets.blue'), color: '#2068FF' },
    { name: t('presets.darkBlue'), color: '#1345AA' },
  ];

  return (
    <FormWrapper heading={t('heading')}>
      <div className="mb-5 text-sm text-muted-foreground">
        {t('description')}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
          <FormField
            control={form.control}
            name="accentColor"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <ColorPicker value={field.value} onChange={field.onChange} />

                  <div className="grid w-[200px] grid-cols-3 grid-rows-4 gap-2">
                    {presets.map((preset) => (
                      <Hint label={preset.name} key={preset.name}>
                        <Button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            field.onChange(preset.color);
                          }}
                          variant="outline"
                          size="icon"
                          className={cn(
                            'h-full min-h-10 w-full',
                            field.value === preset.color && 'ring-1',
                          )}
                        >
                          <div
                            className={`h-5 w-5 rounded-full`}
                            style={{ backgroundColor: preset.color }}
                          />
                        </Button>
                      </Hint>
                    ))}
                  </div>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              disabled={!isValid || !isDirty || isLoadingUpdate}
              type="submit"
            >
              {t('submitButton')}
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}

export function ChangeAccentColorFormSkeleton() {
  return <Skeleton className="h-96 w-full" />;
}
