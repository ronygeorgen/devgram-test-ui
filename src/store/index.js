import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './slices/projectsSlice';
import authReducer from './slices/authSlice';
import postsReducer from './slices/postsSlice';
import profilesReducer from './slices/profilesSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    auth: authReducer,
    posts: postsReducer,
    profiles: profilesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;