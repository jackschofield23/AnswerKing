interface ICategory {
  id: string;
  title: string;
  description: string;
  items: IItemCategory[];
}

/**
 * This is the model that the API expects when
 * updating a category.
 */

interface ICategoryItem {
  id: string;
  title: string;
  description: string;
}
interface ICategoryUpdate {
  name: string;
  description: string;
}

interface ICategoryId {
  id: string;
}
