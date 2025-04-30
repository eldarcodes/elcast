import { zodResolver } from '@hookform/resolvers/zod';
import { SendHorizonal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/common/form';
import { Textarea } from '@/components/ui/common/textarea';
import { EmojiPicker } from '@/components/ui/elements/emoji-picker';

import {
  type FindChannelByUsernameQuery,
  useSendChatMessageMutation,
} from '@/graphql/generated/output';

import {
  sendMessageSchema,
  type SendMessageSchema,
} from '@/schemas/chat/send-message.schema';

interface SendMessageFormProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
  isDisabled: boolean;
}

export function SendMessageForm({ channel, isDisabled }: SendMessageFormProps) {
  const t = useTranslations('stream.chat.sendMessage');

  const form = useForm<SendMessageSchema>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      text: '',
    },
  });

  const [send, { loading: isLoadingSend }] = useSendChatMessageMutation({
    onError() {
      toast.error(t('errorMessage'));
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: SendMessageSchema) {
    send({
      variables: {
        data: {
          text: data.text,
          streamId: channel.stream.id,
        },
      },
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-3 flex items-center gap-x-2"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="w-[calc(100%-36px)]">
              <FormControl>
                <div className="relative">
                  <Textarea
                    placeholder={t('placeholder')}
                    rows={1}
                    onInput={(e) => {
                      e.currentTarget.style.height = 'auto';
                      e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    className="min-h-[36px] resize-none pr-8"
                    disabled={isDisabled || isLoadingSend}
                    {...field}
                  />

                  <div className="absolute right-2 top-2 cursor-pointer">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                      isDisabled={isDisabled || isLoadingSend}
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          size="icon"
          type="submit"
          disabled={isDisabled || !isValid || isLoadingSend}
        >
          <SendHorizonal className="size-4" />
        </Button>
      </form>
    </Form>
  );
}
