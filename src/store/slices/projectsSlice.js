import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../../services/apiService';
import { useAuth } from '../../hooks/useAuth';

// Async thunks - Temporarily using mock data
export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { rejectWithValue, getState }) => {
    try {
      // For now, use mock data instead of actual API call
      // const response = await ApiService.createProject(projectData);
      
      const mockProject = {
        _id: `project-${Date.now()}`,
        ...projectData,
        userId: 'current-user', // This should come from auth
        likesCount: 0,
        isArchived: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return mockProject;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create project'
      );
    }
  }
);

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (archived = false, { rejectWithValue }) => {
    try {
      // For now, return empty array instead of making API call
      // const response = await ApiService.getProjects(archived);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return []; // Return empty array to avoid API call
      
      // If you want to see some sample projects, use this instead:
      /*
      return [
        {
          _id: 'project1',
          title: 'Sample Project',
          description: 'This is a sample project',
          technologies: ['React', 'Node.js'],
          status: 'In Progress',
          demoUrl: '',
          sourceCodeUrl: '',
          references: [],
          images: [],
          likesCount: 0,
          isArchived: false,
          userId: 'current-user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];
      */
    } catch (error) {
      // Don't throw error, just return empty array
      console.log('Projects API call failed, using empty array');
      return [];
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, projectData }, { rejectWithValue }) => {
    try {
      // Mock update
      const updatedProject = {
        _id: id,
        ...projectData,
        updatedAt: new Date().toISOString(),
      };
      
      await new Promise(resolve => setTimeout(resolve, 500));
      return updatedProject;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update project'
      );
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id, { rejectWithValue }) => {
    try {
      // Mock delete
      await new Promise(resolve => setTimeout(resolve, 500));
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete project'
      );
    }
  }
);

export const archiveProject = createAsyncThunk(
  'projects/archiveProject',
  async ({ id, isArchived }, { rejectWithValue }) => {
    try {
      // Mock archive
      const updatedProject = {
        _id: id,
        isArchived,
        updatedAt: new Date().toISOString(),
      };
      
      await new Promise(resolve => setTimeout(resolve, 500));
      return updatedProject;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to archive project'
      );
    }
  }
);

// Initial state
const initialState = {
  projects: [],
  archivedProjects: [],
  loading: false,
  error: null,
  currentProject: null,
};

// Projects slice
const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
    // Add a mock project for testing without API
    addMockProject: (state, action) => {
      const mockProject = {
        _id: `mock-${Date.now()}`,
        ...action.payload,
        likesCount: 0,
        isArchived: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.projects.unshift(mockProject);
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.unshift(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Set empty array on error to prevent redirects
        state.projects = [];
      })
      // Update Project
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (project) => project._id === action.payload._id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      // Delete Project
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload
        );
      })
      // Archive Project
      .addCase(archiveProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (project) => project._id === action.payload._id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      });
  },
});

export const { clearError, setCurrentProject, clearCurrentProject, addMockProject } = projectsSlice.actions;
export default projectsSlice.reducer;