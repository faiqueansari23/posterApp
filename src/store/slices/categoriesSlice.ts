import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
    id: number;
    category: string;
    active: number;
}

interface CategoriesState {
    categories: Category[];
    selectedCategory: Category | null;
}

const initialState: CategoriesState = {
    categories: [{ id: 0, category: 'All', active: 1 }], // Initial category
    selectedCategory: { id: 0, category: 'All', active: 1 },
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<Category[]>) {
            // Avoid duplicates
            const existingIds = state.categories.map((cat) => cat.id);
            const newCategories = action.payload.filter((cat) => !existingIds.includes(cat.id));
            state.categories = [...state.categories, ...newCategories];
        },
        selectCategory(state, action: PayloadAction<Category | null>) {
            state.selectedCategory = action.payload;
        },
    },
});

export const { setCategories, selectCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
