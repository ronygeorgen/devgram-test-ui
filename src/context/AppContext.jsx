import { createContext, useContext, useState, useEffect } from 'react';
import { users, profiles, posts as initialPosts, comments as initialComments, projects, education, experience, currentUser, currentProfile } from '../data/demoData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState(initialPosts);
  const [comments, setComments] = useState(initialComments);
  const [allProfiles, setAllProfiles] = useState(profiles);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      setUser(currentUser);
      setProfile(currentProfile);
    }
  }, []);

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.hashedPassword === password);
    if (foundUser) {
      const foundProfile = profiles.find(p => p.userId === foundUser.id);
      setIsAuthenticated(true);
      setUser(foundUser);
      setProfile(foundProfile);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const signup = (username, email, password) => {
    const newUser = {
      id: `u${users.length + 1}`,
      username,
      email,
      hashedPassword: password,
    };
    const newProfile = {
      id: `p${profiles.length + 1}`,
      userId: newUser.id,
      username,
      fullName: username,
      headline: 'New Developer',
      bio: '',
      avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      website: '',
      skills: [],
      stats: { postsCount: 0, followersCount: 0, followingCount: 0 },
    };
    users.push(newUser);
    profiles.push(newProfile);
    setAllProfiles([...profiles]);
    setIsAuthenticated(true);
    setUser(newUser);
    setProfile(newProfile);
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setProfile(null);
    localStorage.removeItem('isAuthenticated');
  };

  const addPost = (newPost) => {
    const post = {
      ...newPost,
      id: `post${posts.length + 1}`,
      userId: user.id,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      createdAt: new Date().toISOString(),
    };
    setPosts([post, ...posts]);
  };

  const toggleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likesCount: post.likesCount + 1 }
        : post
    ));
  };

  const addComment = (postId, content) => {
    const newComment = {
      id: `c${comments.length + 1}`,
      postId,
      userId: user.id,
      content,
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, commentsCount: post.commentsCount + 1 }
        : post
    ));
  };

  const sharePost = (postId) => {
    const originalPost = posts.find(p => p.id === postId);
    if (originalPost) {
      const sharedPost = {
        ...originalPost,
        id: `post${posts.length + 1}`,
        userId: user.id,
        caption: `Shared: ${originalPost.caption}`,
        createdAt: new Date().toISOString(),
      };
      setPosts([sharedPost, ...posts]);
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, sharesCount: post.sharesCount + 1 }
          : post
      ));
    }
  };

  const getProfileByUsername = (username) => {
    return allProfiles.find(p => p.username === username);
  };

  const getPostsByUserId = (userId) => {
    return posts.filter(p => p.userId === userId);
  };

  const getCommentsByPostId = (postId) => {
    return comments.filter(c => c.postId === postId);
  };

  const value = {
    isAuthenticated,
    user,
    profile,
    posts,
    comments,
    allProfiles,
    projects,
    education,
    experience,
    login,
    signup,
    logout,
    addPost,
    toggleLike,
    addComment,
    sharePost,
    getProfileByUsername,
    getPostsByUserId,
    getCommentsByPostId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
