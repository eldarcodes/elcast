'use client';

import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from '@hello-pangea/dnd';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Separator } from '@/components/ui/common/separator';

import {
  useFindSocialLinksQuery,
  useReorderSocialLinksMutation,
} from '@/graphql/generated/output';

import { SocialLinkItem } from './social-link-item';

export function SocialLinksList() {
  const t = useTranslations('dashboard.settings.profile.socialLinks');
  const { data, refetch } = useFindSocialLinksQuery();

  const items = useMemo(() => data?.findSocialLinks ?? [], [data]);

  const [socialLinks, setSocialLinks] = useState(items);

  useEffect(() => {
    setSocialLinks(items);
  }, [items]);

  const [reorderSocialLinks, { loading: isLoadingReorder }] =
    useReorderSocialLinksMutation({
      onCompleted: () => {
        refetch();
        toast.success(t('successReorderMessage'));
      },
      onError: () => {
        toast.error(t('errorReorderMessage'));
      },
    });

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    const items = Array.from(socialLinks);
    const [reorderItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderItem);

    const bulkUpdatedData = items.map((socialLink, index) => ({
      id: socialLink.id,
      position: index,
    }));

    setSocialLinks(items);

    reorderSocialLinks({ variables: { list: bulkUpdatedData } });
  }

  if (!socialLinks.length) return null;

  return (
    <>
      <Separator />

      <div className="mt-5 px-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="social-links">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {socialLinks.map((socialLink, index) => (
                  <Draggable
                    key={socialLink.id}
                    draggableId={socialLink.id}
                    index={index}
                    isDragDisabled={isLoadingReorder}
                  >
                    {(provided) => (
                      <SocialLinkItem
                        key={socialLink.id}
                        socialLink={socialLink}
                        provided={provided}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}
