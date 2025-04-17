import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Post {
    id: number;
    type: string;
    category_id: number;
    path_url: string | null;
    image: string | null;
    logo_position: string | null;
    business_name_position: string | null;
    tagline_position: string | null;
    phone_position: string | null;
    social_media_position: string | null;
    created_at: string;
    updated_at: string;
}

interface PostsState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null,
};

// Thunks for async actions
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get('https://ashhari.com/april_bb/admin/public/api/show_post');
    console.log("Response from API:", response.data);
    
    return response.data.data || [];
});


export const fetchPostsByCategory = createAsyncThunk('posts/fetchPostsByCategory', async (categoryId: number) => {
    const response = await axios.get(`https://ashhari.com/april_bb/admin/public/api/show_post?category_id=${categoryId}`);
    return response.data.categories || [];
});

const postsSlice = createSlice({
    name: 'posts', 
    initialState,
    reducers: {
        clearPosts(state) {
            state.posts = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all posts
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch posts.';
            })
            // Fetch posts by category
            .addCase(fetchPostsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostsByCategory.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPostsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch posts by category.';
            });
    },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;




