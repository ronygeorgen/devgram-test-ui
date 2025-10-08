import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Tabs, Tab, Grid, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import Layout from '../../components/Layout';
import ProfileHeader from './components/ProfileHeader';
import ProjectCard from './components/ProjectCard';
import EducationItem from './components/EducationItem';
import ExperienceItem from './components/ExperienceItem';
import FeedCard from '../Feed/components/FeedCard';
import CommentDrawer from '../Feed/components/CommentDrawer';
import CreateProjectModal from '../../components/Project/CreateProjectModal';
import { useProjects } from '../../hooks/useProjects';
import { useAuth } from '../../hooks/useAuth';
import { useProfiles } from '../../hooks/useProfiles';
import { usePosts } from '../../hooks/usePosts';

const ProfilePage = () => {
  const { username } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { currentProfile, getProfileByUsername, fetchProfileByUsername } = useProfiles();
  const { posts } = usePosts();
  const { projects, fetchProjects } = useProjects();
  
  const [activeTab, setActiveTab] = useState(0);
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Get the profile for the current username
  const profile = getProfileByUsername(username) || currentProfile;
  const isOwnProfile = currentProfile?.username === username;
  
  // Filter posts and projects for the current profile
  const userPosts = posts.filter(post => post.userId === profile?.userId);
  const userProjects = projects.filter(project => project.userId === profile?.userId);

  useEffect(() => {
    // Fetch profile if not found
    if (username && !profile) {
      fetchProfileByUsername(username);
    }
    
    // Fetch projects when component mounts for own profile
    if (isOwnProfile) {
      fetchProjects(false);
    }
  }, [username, profile, isOwnProfile, fetchProjects, fetchProfileByUsername]);

  const handleCommentClick = (post) => {
    setSelectedPost(post);
    setCommentDrawerOpen(true);
  };

  const handleProjectCreated = (newProject) => {
    setCreateModalOpen(false);
  };

  // Show loading while checking authentication
  if (!isAuthenticated) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Please log in to view profiles
          </Typography>
        </Container>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Loading profile...
          </Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} variant="scrollable" scrollButtons="auto">
            <Tab label="Posts" />
            <Tab label="Projects" />
            <Tab label="Experience" />
            <Tab label="Education" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Box>
            {userPosts.length === 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No posts yet
              </Typography>
            ) : (
              <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                {userPosts.map((post) => (
                  <FeedCard key={post.id} post={post} onComment={handleCommentClick} />
                ))}
              </Box>
            )}
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            {isOwnProfile && (
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setCreateModalOpen(true)}
                >
                  Add Project
                </Button>
              </Box>
            )}
            
            {userProjects.length === 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                {isOwnProfile ? 'You haven\'t added any projects yet.' : 'No projects yet'}
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {userProjects.map((project) => (
                  <Grid item xs={12} sm={6} md={4} key={project._id || project.id}>
                    <ProjectCard project={project} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No experience added yet
            </Typography>
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No education added yet
            </Typography>
          </Box>
        )}
      </Container>

      <CommentDrawer
        open={commentDrawerOpen}
        onClose={() => setCommentDrawerOpen(false)}
        post={selectedPost}
      />

      <CreateProjectModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={handleProjectCreated}
      />
    </Layout>
  );
};

export default ProfilePage;