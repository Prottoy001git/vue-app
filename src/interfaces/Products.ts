export interface Product {
    id: number;
    name: string;
    category_id: number;
    category?: string;
    description?: string;
    price: number;
    discount?: number;
    quantity?: number;
    photo?: string;
}
export const defaultProduct: Product = {
    id: 0,
    name: '',
    category_id: 0,
    category: '',
    description: '',
    price: 0,
    discount: 0,
    quantity: 0,
    photo: ''
};