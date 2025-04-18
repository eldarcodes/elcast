import { EmptyState } from '@/components/ui/elements/empty-state';
import { Heading } from '@/components/ui/elements/heading';

import { FindRandomCategoriesQuery } from '@/graphql/generated/output';

import { CategoryCard } from './category-card';

interface CategoriesListProps {
  heading?: string;
  categories: FindRandomCategoriesQuery['findRandomCategories'];
}

export function CategoriesList({ heading, categories }: CategoriesListProps) {
  const isOdd = categories.length % 2 === 1;

  return categories.length ? (
    <>
      {heading && <Heading title={heading} />}

      <div className="mt-6 flex flex-wrap gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}

        {isOdd && (
          <div className="invisible w-32 max-w-full flex-[1_0_auto] sm:w-40" />
        )}
      </div>
    </>
  ) : (
    <EmptyState />
  );
}
