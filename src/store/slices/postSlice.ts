// import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// interface Post {
//     id: number;
//     type: string;
//     category_id: number;
//     path_url: string | null;
//     image: string | null;
//     logo_position: string | null;
//     business_name_position: string | null;
//     tagline_position: string | null;
//     phone_position: string | null;
//     social_media_position: string | null;
//     created_at: string;
//     updated_at: string;
// }

// interface PostsState {
//     posts: Post[];
//     loading: boolean;
//     error: string | null;
// }

// const initialState: PostsState = {
//     posts: [],
//     loading: false,
//     error: null,
// };

// // Thunks for async actions
// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//     const response = await axios.get('https://ashhari.com/april_bb/admin/public/api/show_post');
//     console.log("Response from API:", response.data);
    
//     return response.data.data || [];
// });


// export const fetchPostsByCategory = createAsyncThunk('posts/fetchPostsByCategory', async (categoryId: number) => {
//     const response = await axios.get(`https://ashhari.com/april_bb/admin/public/api/show_post?category_id=${categoryId}`);
//     return response.data.categories || [];
// });

// const postsSlice = createSlice({
//     name: 'posts', 
//     initialState,
//     reducers: {
//         clearPosts(state) {
//             state.posts = [];
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Fetch all posts
//             .addCase(fetchPosts.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
//                 state.loading = false;
//                 state.posts = action.payload;
//             })
//             .addCase(fetchPosts.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message || 'Failed to fetch posts.';
//             })
//             // Fetch posts by category
//             .addCase(fetchPostsByCategory.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchPostsByCategory.fulfilled, (state, action: PayloadAction<Post[]>) => {
//                 state.loading = false;
//                 state.posts = action.payload;
//             })
//             .addCase(fetchPostsByCategory.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message || 'Failed to fetch posts by category.';
//             });
//     },
// });

// export const { clearPosts } = postsSlice.actions;
// export default postsSlice.reducer;

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
    page: number;
    hasMore: boolean;
}

const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
};

// ✅ Updated thunk for paginated posts
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async ({ page, limit }: { page: number; limit: number }) => {
        const response = await axios.get(`https://ashhari.com/april_bb/admin/public/api/show_post?page=${page}&limit=${limit}`);
        return {
            data: response.data.data || [],
            page,
            hasMore: (response.data.data || []).length === limit, // If less than limit, then no more
        };
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearPosts(state) {
            state.posts = [];
            state.page = 1;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<{ data: Post[]; page: number; hasMore: boolean }>) => {
                state.loading = false;
                // ✅ Append posts instead of replacing
                if (action.payload.page === 1) {
                    state.posts = action.payload.data;
                } else {
                    state.posts = [...state.posts, ...action.payload.data];
                }
                state.page = action.payload.page;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch posts.';
            });
    },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;

