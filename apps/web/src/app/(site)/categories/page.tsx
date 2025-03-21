import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CategoriesList } from '@/components/features/category/list/categories-list';

import {
  FindAllCategoriesDocument,
  type FindAllCategoriesQuery,
} from '@/graphql/generated/output';

import { SERVER_URL } from '@/libs/constants/url.constants';

async function findAllCategories() {
  try {
    const query = FindAllCategoriesDocument.loc?.source.body;

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
      ?.findAllCategories as FindAllCategoriesQuery['findAllCategories'];

    return { categories };
  } catch (error) {
    console.log(error);
    throw new Error('Error while fetching categories');
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('categories');

  return {
    title: t('heading'),
  };
}

export default async function HomePage() {
  const t = await getTranslations('categories');

  const { categories } = await findAllCategories();

  return (
    <div className="space-y-10">
      <CategoriesList heading={t('heading')} categories={categories} />
    </div>
  );
}
