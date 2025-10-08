import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, ToggleButtonGroup, ToggleButton, Typography, IconButton } from '@mui/material';
import { Image, VideoLibrary, TextFields, Close } from '@mui/icons-material';

const CreatePostModal = ({ open, onClose, onSubmit }) => {
  const [type, setType] = useState('text');
  const [caption, setCaption] = useState('');
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleTypeChange = (event, newType) => {
    if (newType !== null) {
      setType(newType);
      setMediaPreview(null);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!caption.trim() && !mediaPreview) return;

    const hashtags = caption.match(/#\w+/g)?.map(tag => tag.slice(1)) || [];
    const mentions = caption.match(/@\w+/g)?.map(mention => mention.slice(1)) || [];

    onSubmit({
      type,
      caption,
      mediaUrl: mediaPreview,
      hashtags,
      mentions,
    });

    setCaption('');
    setMediaPreview(null);
    setType('text');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Create Post
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            Post Type
          </Typography>
          <ToggleButtonGroup value={type} exclusive onChange={handleTypeChange} fullWidth size="small">
            <ToggleButton value="text">
              <TextFields sx={{ mr: 0.5 }} />
              Text
            </ToggleButton>
            <ToggleButton value="image">
              <Image sx={{ mr: 0.5 }} />
              Image
            </ToggleButton>
            <ToggleButton value="video">
              <VideoLibrary sx={{ mr: 0.5 }} />
              Video
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="What's on your mind? Use #hashtags and @mentions"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          sx={{ mb: 2 }}
        />

        {type !== 'text' && (
          <Box sx={{ mb: 2 }}>
            <input
              accept={type === 'image' ? 'image/*' : 'video/*'}
              type="file"
              id="media-upload"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="media-upload">
              <Button variant="outlined" component="span" fullWidth>
                Upload {type === 'image' ? 'Image' : 'Video'}
              </Button>
            </label>
            {mediaPreview && (
              <Box sx={{ mt: 2, position: 'relative' }}>
                {type === 'image' ? (
                  <img src={mediaPreview} alt="Preview" style={{ width: '100%', borderRadius: 8 }} />
                ) : (
                  <video src={mediaPreview} controls style={{ width: '100%', borderRadius: 8 }} />
                )}
              </Box>
            )}
          </Box>
        )}

        <Typography variant="caption" color="text.secondary">
          Tip: Use Markdown-style code blocks with ```language syntax
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!caption.trim() && !mediaPreview}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;