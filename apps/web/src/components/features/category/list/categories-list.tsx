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

      <div className="mt-6 flex flex-wrap gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </>
  ) : (
    <EmptyState />
  );
}
