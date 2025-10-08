import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { setCurrentProfile, updateProfile } from '../store/slices/profilesSlice';

export const useProfiles = () => {
  const dispatch = useDispatch();
  const profilesState = useSelector((state) => state.profiles);

  const handleSetCurrentProfile = useCallback((profile) => {
    dispatch(setCurrentProfile(profile));
  }, [dispatch]);

  const handleUpdateProfile = useCallback((profile) => {
    dispatch(updateProfile(profile));
  }, [dispatch]);

  const getProfileByUsername = useCallback((username) => {
    return profilesState.profiles.find(p => p.username === username);
  }, [profilesState.profiles]);

  const getProfileByUserId = useCallback((userId) => {
    return profilesState.profiles.find(p => p.userId === userId);
  }, [profilesState.profiles]);

  return {
    // State
    allProfiles: profilesState.profiles,
    currentProfile: profilesState.currentProfile,
    
    // Actions
    setCurrentProfile: handleSetCurrentProfile,
    updateProfile: handleUpdateProfile,
    getProfileByUsername,
    getProfileByUserId,
  };
};