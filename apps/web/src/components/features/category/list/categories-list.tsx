import { EmptyState } from '@/components/ui/elements/empty-state';
import { Heading } from '@/components/ui/elements/heading';

import { FindRandomCategoriesQuery } from '@/graphql/generated/output';

import { CategoryCard } from './category-card';

interface CategoriesListProps {
  heading?: string;
  categories: FindRandomCategoriesQuery['findRandomCategories'];
}

export function CategoriesList({ heading, categories }: CategoriesListProps) {
  return categories.length ? (
    <>
      {heading && <Heading title={heading} />}

      <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </>
  ) : (
    <EmptyState />
  );
}
