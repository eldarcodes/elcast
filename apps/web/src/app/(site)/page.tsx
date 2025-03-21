import { getTranslations } from 'next-intl/server';

import { CategoriesList } from '@/components/features/category/list/categories-list';
import { StreamsList } from '@/components/features/stream/list/stream-list';

import {
  FindRandomCategoriesDocument,
  type FindRandomCategoriesQuery,
  FindRandomStreamsDocument,
  type FindRandomStreamsQuery,
} from '@/graphql/generated/output';

import { SERVER_URL } from '@/libs/constants/url.constants';

async function findRandomStreams() {
  try {
    const query = FindRandomStreamsDocument.loc?.source.body;

    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: {
        revalidate: 30,
      },
    });

    const data = await response.json();

    const streams: FindRandomStreamsQuery['findRandomStreams'] =
      data?.data?.findRandomStreams || [];

    return { streams };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch random streams');
  }
}

async function findRandomCategories() {
  try {
    const query = FindRandomCategoriesDocument.loc?.source.body;

    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: {
        revalidate: 30,
      },
    });

    const data = await response.json();
    const categories = data?.data
      ?.findRandomCategories as FindRandomCategoriesQuery['findRandomCategories'];

    return { categories };
  } catch (error) {
    console.error(error);
    throw new Error('Error while fetching categories');
  }
}

export default async function HomePage() {
  const t = await getTranslations('home');

  const { streams } = await findRandomStreams();
  const { categories } = await findRandomCategories();

  return (
    <div className="space-y-10">
      <StreamsList heading={t('streamsHeading')} streams={streams} />
      <CategoriesList
        heading={t('categoriesHeading')}
        categories={categories}
      />
    </div>
  );
}
