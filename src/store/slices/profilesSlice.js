import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profiles: [
    {
      id: 'p1',
      userId: 'u1',
      username: 'alexjohnson',
      fullName: 'Alex Johnson',
      headline: 'Senior React Developer',
      bio: 'Passionate about building beautiful UIs and open source contributions',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      website: 'https://alexjohnson.dev',
      skills: ['React', 'TypeScript', 'Node.js'],
      stats: { postsCount: 12, followersCount: 1245, followingCount: 89 },
    },
    {
      id: 'p2',
      userId: 'u2',
      username: 'sarahchen',
      fullName: 'Sarah Chen',
      headline: 'DevOps Engineer',
      bio: 'Cloud infrastructure and automation enthusiast',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
      website: 'https://sarahchen.tech',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
      stats: { postsCount: 8, followersCount: 892, followingCount: 67 },
    },
    {
      id: 'p3',
      userId: 'u3',
      username: 'mikerodriguez',
      fullName: 'Mike Rodriguez',
      headline: 'Full Stack Developer',
      bio: 'Building scalable applications with modern tech stack',
      avatarUrl: 'https://i.pravatar.cc/150?img=8',
      website: 'https://mikerod.dev',
      skills: ['JavaScript', 'Python', 'PostgreSQL', 'React'],
      stats: { postsCount: 15, followersCount: 1567, followingCount: 112 },
    },
  ],
  currentProfile: {
    id: 'p1',
    userId: 'u1',
    username: 'alexjohnson',
    fullName: 'Alex Johnson',
    headline: 'Senior React Developer',
    bio: 'Passionate about building beautiful UIs and open source contributions',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    website: 'https://alexjohnson.dev',
    skills: ['React', 'TypeScript', 'Node.js'],
    stats: { postsCount: 12, followersCount: 1245, followingCount: 89 },
  },
};

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setCurrentProfile: (state, action) => {
      state.currentProfile = action.payload;
    },
    updateProfile: (state, action) => {
      const updatedProfile = action.payload;
      const index = state.profiles.findIndex(p => p.id === updatedProfile.id);
      if (index !== -1) {
        state.profiles[index] = updatedProfile;
      }
      if (state.currentProfile.id === updatedProfile.id) {
        state.currentProfile = updatedProfile;
      }
    },
  },
});

export const { setCurrentProfile, updateProfile } = profilesSlice.actions;
export default profilesSlice.reducer;