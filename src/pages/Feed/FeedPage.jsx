import { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Chip, Avatar, Fab, useMediaQuery } from '@mui/material';
import { Add, TrendingUp, EmojiEvents } from '@mui/icons-material';
import Layout from '../../components/Layout';
import FeedCard from './components/FeedCard';
import CreatePostModal from './components/CreatePostModal';
import CommentDrawer from './components/CommentDrawer';
import { usePosts } from '../../hooks/usePosts';
import { useProfiles } from '../../hooks/useProfiles';
import { useAuth } from '../../hooks/useAuth';

const FeedPage = () => {
  const { posts, addPost } = usePosts();
  const { currentProfile, allProfiles } = useProfiles();
  const { user } = useAuth();
  
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const isMobile = useMediaQuery('(max-width:768px)');

  const techFilters = ['all', 'React', 'Node.js', 'TypeScript', 'Docker', 'Kubernetes', 'Python'];

  const filteredPosts = selectedFilter === 'all'
    ? posts
    : posts.filter(post => post.hashtags?.some(tag => tag.toLowerCase().includes(selectedFilter.toLowerCase())));

  const handleCommentClick = (post) => {
    setSelectedPost(post);
    setCommentDrawerOpen(true);
  };

  const handleCreatePost = (postData) => {
    addPost(postData);
  };

  return (
    <Layout>
      <Grid container spacing={0}>
        {!isMobile && (
          <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ p: 2, position: 'sticky', top: 80 }}>
              <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Avatar src={currentProfile?.avatarUrl} sx={{ width: 48, height: 48 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {currentProfile?.fullName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      @{currentProfile?.username}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {currentProfile?.stats.followersCount}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Followers
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {currentProfile?.stats.followingCount}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Following
                    </Typography>
                  </Box>
                </Box>
                <Button variant="contained" fullWidth onClick={() => setCreateModalOpen(true)}>
                  New Post
                </Button>
              </Paper>

              <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Filter by Tech
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {techFilters.map((filter) => (
                    <Chip
                      key={filter}
                      label={filter}
                      onClick={() => setSelectedFilter(filter)}
                      sx={{
                        bgcolor: selectedFilter === filter ? 'primary.main' : 'background.default',
                        color: selectedFilter === filter ? 'white' : 'text.primary',
                        justifyContent: 'flex-start',
                        '&:hover': { bgcolor: selectedFilter === filter ? 'primary.dark' : 'rgba(124, 58, 237, 0.1)' }
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Box>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <Box sx={{ p: { xs: 1, md: 2 }, maxWidth: 800, mx: 'auto' }}>
            {isMobile && (
              <Box sx={{ mb: 2, display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
                {techFilters.map((filter) => (
                  <Chip
                    key={filter}
                    label={filter}
                    size="small"
                    onClick={() => setSelectedFilter(filter)}
                    sx={{
                      bgcolor: selectedFilter === filter ? 'primary.main' : 'background.paper',
                      color: selectedFilter === filter ? 'white' : 'text.primary',
                    }}
                  />
                ))}
              </Box>
            )}

            {filteredPosts.map((post) => (
              <FeedCard key={post.id} post={post} onComment={handleCommentClick} />
            ))}

            {filteredPosts.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No posts found with this filter
                </Typography>
                <Button sx={{ mt: 2 }} onClick={() => setSelectedFilter('all')}>
                  View All Posts
                </Button>
              </Box>
            )}
          </Box>
        </Grid>

        {!isMobile && (
          <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ p: 2, position: 'sticky', top: 80 }}>
              <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <TrendingUp sx={{ color: 'secondary.main' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Trending Repos
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {['awesome-react', 'node-best-practices', 'kubernetes-101'].map((repo, idx) => (
                    <Box key={idx} sx={{ p: 1, borderRadius: 1, bgcolor: 'background.default', cursor: 'pointer', '&:hover': { bgcolor: 'rgba(124, 58, 237, 0.05)' } }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {repo}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {1200 + idx * 300}+ stars
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>

              <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <EmojiEvents sx={{ color: 'secondary.main' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Today's Challenge
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Build a rate limiter in your favorite language
                </Typography>
                <Chip label="Medium" size="small" sx={{ bgcolor: 'secondary.dark', color: 'white' }} />
              </Paper>
            </Box>
          </Grid>
        )}
      </Grid>

      {isMobile && (
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => setCreateModalOpen(true)}
        >
          <Add />
        </Fab>
      )}

      <CreatePostModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />

      <CommentDrawer
        open={commentDrawerOpen}
        onClose={() => setCommentDrawerOpen(false)}
        post={selectedPost}
      />
    </Layout>
  );
};

export default FeedPage;