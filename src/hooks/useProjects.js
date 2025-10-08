import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  createProject,
  fetchProjects,
  updateProject,
  deleteProject,
  archiveProject,
  clearError,
} from '../store/slices/projectsSlice';

export const useProjects = () => {
  const dispatch = useDispatch();
  const projectsState = useSelector((state) => state.projects);

  const handleCreateProject = useCallback(
    async (projectData) => {
      try {
        const result = await dispatch(createProject(projectData)).unwrap();
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const handleFetchProjects = useCallback(
    async (archived = false) => {
      try {
        const result = await dispatch(fetchProjects(archived)).unwrap();
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const handleUpdateProject = useCallback(
    async (id, projectData) => {
      try {
        const result = await dispatch(updateProject({ id, projectData })).unwrap();
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const handleDeleteProject = useCallback(
    async (id) => {
      try {
        await dispatch(deleteProject(id)).unwrap();
        return { success: true };
      } catch (error) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const handleArchiveProject = useCallback(
    async (id, isArchived) => {
      try {
        const result = await dispatch(archiveProject({ id, isArchived })).unwrap();
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    projects: projectsState.projects,
    loading: projectsState.loading,
    error: projectsState.error,
    currentProject: projectsState.currentProject,
    
    // Actions
    createProject: handleCreateProject,
    fetchProjects: handleFetchProjects,
    updateProject: handleUpdateProject,
    deleteProject: handleDeleteProject,
    archiveProject: handleArchiveProject,
    clearError: handleClearError,
  };
};