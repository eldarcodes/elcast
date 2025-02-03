import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CategoryOverview } from '@/components/features/category/overview/category-overview';

import {
  FindCategoryBySlugDocument,
  FindCategoryBySlugQuery,
} from '@/graphql/generated/output';

import { SERVER_URL } from '@/libs/constants/url.constants';

import { getMediaSource } from '@/utils/get-media-source';

async function findCategoryBySlug(slug: string) {
  try {
    const query = FindCategoryBySlugDocument.loc?.source.body;
    const variables = { slug };

    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      next: {
        revalidate: 30,
      },
    });

    const data = await response.json();
    const category = data?.data
      ?.findCategoryBySlug as FindCategoryBySlugQuery['findCategoryBySlug'];

    return { category };
  } catch (error) {
    return notFound();
  }
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;

  const { category } = await findCategoryBySlug(slug);

  return {
    title: category.title,
    description: category.description,
    openGraph: {
      images: [
        {
          url: getMediaSource(category.thumbnailUrl),
          alt: category.title,
        },
      ],
    },
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const { category } = await findCategoryBySlug(slug);

  return <CategoryOverview category={category} />;
}
