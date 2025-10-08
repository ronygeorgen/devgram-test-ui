import { createSlice } from '@reduxjs/toolkit';

// Initial state with demo data (you'll replace this with API calls later)
const initialState = {
  posts: [
    {
      id: 'post1',
      userId: 'u1',
      type: 'text',
      caption: 'Just built a new React component library! 🚀\n\n```javascript\nconst Button = ({ children, variant = "primary" }) => {\n  return (\n    <button className={`btn btn-${variant}`}>\n      {children}\n    </button>\n  );\n};\n```\n\n#React #TypeScript #Frontend',
      mediaUrl: null,
      hashtags: ['React', 'TypeScript', 'Frontend'],
      mentions: [],
      likesCount: 24,
      commentsCount: 8,
      sharesCount: 3,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'post2',
      userId: 'u2',
      type: 'image',
      caption: 'Deployed my first microservices architecture using Docker and Kubernetes! 🐳\n\n#Docker #Kubernetes #Microservices #DevOps',
      mediaUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500',
      hashtags: ['Docker', 'Kubernetes', 'Microservices', 'DevOps'],
      mentions: [],
      likesCount: 42,
      commentsCount: 12,
      sharesCount: 7,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    }
  ],
  comments: [
    {
      id: 'c1',
      postId: 'post1',
      userId: 'u2',
      content: 'Great component! Love the TypeScript integration.',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'c2',
      postId: 'post1',
      userId: 'u3',
      content: 'Clean code! Would love to see more examples.',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    }
  ],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      const newPost = {
        ...action.payload,
        id: `post${state.posts.length + 1}`,
        likesCount: 0,
        commentsCount: 0,
        sharesCount: 0,
        createdAt: new Date().toISOString(),
      };
      state.posts.unshift(newPost);
    },
    toggleLike: (state, action) => {
      const postId = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.likesCount += 1;
      }
    },
    addComment: (state, action) => {
      const { postId, content } = action.payload;
      const newComment = {
        id: `c${state.comments.length + 1}`,
        postId,
        userId: 'current-user', // This should come from auth
        content,
        createdAt: new Date().toISOString(),
      };
      state.comments.push(newComment);
      
      // Update post comments count
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.commentsCount += 1;
      }
    },
    sharePost: (state, action) => {
      const postId = action.payload;
      const originalPost = state.posts.find(p => p.id === postId);
      if (originalPost) {
        const sharedPost = {
          ...originalPost,
          id: `post${state.posts.length + 1}`,
          userId: 'current-user', // This should come from auth
          caption: `Shared: ${originalPost.caption}`,
          createdAt: new Date().toISOString(),
        };
        state.posts.unshift(sharedPost);
        
        // Update original post shares count
        originalPost.sharesCount += 1;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { addPost, toggleLike, addComment, sharePost, clearError } = postsSlice.actions;
export default postsSlice.reducer;