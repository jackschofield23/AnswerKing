interface IItem {
  id: string;
  title: string;
  price: number;
  description: string;
  validUntil: string;
  categories: ICategoryItem[];
}

interface IItemCategory {
  id: string;
  title: string;
  price: number;
  description: string;
  validUntil: string;
}

interface IItemUpdate {
  name: string;
  description: string;
  price: number;
  category: ICategoryId;
}

interface IItemId {
  id: string;
}
