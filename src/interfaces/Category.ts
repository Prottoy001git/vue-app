export interface Category {
    id: number;
    name: string;
    is_inactive: boolean;
}
export const defaultCategory:Category = {
    id: 0,
    name: '',
    is_inactive: false,
}