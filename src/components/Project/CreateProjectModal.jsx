import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Stack,
  FormHelperText,
} from '@mui/material';
import { Close, Add, Delete } from '@mui/icons-material';
import { useProjects } from '../../hooks/useProjects';

const CreateProjectModal = ({ open, onClose, onSuccess }) => {
  const { createProject, loading, error, clearError } = useProjects();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [],
    status: 'In Progress',
    demoUrl: '',
    sourceCodeUrl: '',
    references: [{ name: '', url: '' }],
  });
  
  const [technologyInput, setTechnologyInput] = useState('');
  const [images, setImages] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (formData.technologies.length === 0) errors.technologies = 'At least one technology is required';
    if (!formData.status) errors.status = 'Status is required';
    
    // Validate URLs
    if (formData.demoUrl && !isValidUrl(formData.demoUrl)) {
      errors.demoUrl = 'Please enter a valid URL';
    }
    if (formData.sourceCodeUrl && !isValidUrl(formData.sourceCodeUrl)) {
      errors.sourceCodeUrl = 'Please enter a valid URL';
    }
    
    // Validate references
    formData.references.forEach((ref, index) => {
      if (ref.name && !ref.url) {
        errors[`references_${index}`] = 'URL is required when name is provided';
      }
      if (ref.url && !isValidUrl(ref.url)) {
        errors[`references_${index}`] = 'Please enter a valid URL';
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTechnologyAdd = useCallback(() => {
    if (technologyInput.trim() && !formData.technologies.includes(technologyInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, technologyInput.trim()]
      }));
      setTechnologyInput('');
      if (formErrors.technologies) {
        setFormErrors(prev => ({ ...prev, technologies: '' }));
      }
    }
  }, [technologyInput, formData.technologies, formErrors]);

  const handleTechnologyDelete = useCallback((techToDelete) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToDelete)
    }));
  }, []);

  const handleReferenceChange = (index, field) => (event) => {
    const newReferences = [...formData.references];
    newReferences[index][field] = event.target.value;
    setFormData(prev => ({ ...prev, references: newReferences }));
    
    // Clear error for this reference
    const errorKey = `references_${index}`;
    if (formErrors[errorKey]) {
      setFormErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const addReference = () => {
    setFormData(prev => ({
      ...prev,
      references: [...prev.references, { name: '', url: '' }]
    }));
  };

  const removeReference = (index) => {
    if (formData.references.length > 1) {
      const newReferences = formData.references.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, references: newReferences }));
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    try {
      const projectData = {
        ...formData,
        images: images,
      };

      const result = await createProject(projectData);
      
      if (result.success) {
        onSuccess?.(result.data);
        handleClose();
      }
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      technologies: [],
      status: 'In Progress',
      demoUrl: '',
      sourceCodeUrl: '',
      references: [{ name: '', url: '' }],
    });
    setTechnologyInput('');
    setImages([]);
    setFormErrors({});
    clearError();
    onClose();
  };

  const handleTechnologyKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleTechnologyAdd();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="h2">
            Create New Project
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            {/* Title */}
            <TextField
              label="Project Title"
              value={formData.title}
              onChange={handleInputChange('title')}
              fullWidth
              required
              error={!!formErrors.title}
              helperText={formErrors.title}
            />

            {/* Description */}
            <TextField
              label="Project Description"
              value={formData.description}
              onChange={handleInputChange('description')}
              fullWidth
              multiline
              rows={4}
              required
              error={!!formErrors.description}
              helperText={formErrors.description}
            />

            {/* Technologies */}
            <Box>
              <TextField
                label="Technologies"
                value={technologyInput}
                onChange={(e) => setTechnologyInput(e.target.value)}
                onKeyPress={handleTechnologyKeyPress}
                fullWidth
                error={!!formErrors.technologies}
                helperText={formErrors.technologies || "Press Enter or click + to add technology"}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleTechnologyAdd} size="small">
                      <Add />
                    </IconButton>
                  ),
                }}
              />
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {formData.technologies.map((tech, index) => (
                  <Chip
                    key={index}
                    label={tech}
                    onDelete={() => handleTechnologyDelete(tech)}
                    size="small"
                    sx={{ bgcolor: 'primary.main', color: 'white' }}
                  />
                ))}
              </Box>
            </Box>

            {/* Status */}
            <FormControl fullWidth error={!!formErrors.status}>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={handleInputChange('status')}
                label="Status"
              >
                <MenuItem value="Live">Live</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
              </Select>
              {formErrors.status && <FormHelperText>{formErrors.status}</FormHelperText>}
            </FormControl>

            {/* URLs */}
            <TextField
              label="Demo URL"
              value={formData.demoUrl}
              onChange={handleInputChange('demoUrl')}
              fullWidth
              error={!!formErrors.demoUrl}
              helperText={formErrors.demoUrl}
            />

            <TextField
              label="Source Code URL"
              value={formData.sourceCodeUrl}
              onChange={handleInputChange('sourceCodeUrl')}
              fullWidth
              error={!!formErrors.sourceCodeUrl}
              helperText={formErrors.sourceCodeUrl}
            />

            {/* References */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                References
              </Typography>
              {formData.references.map((reference, index) => (
                <Box key={index} sx={{ mb: 2, display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  <TextField
                    label="Name"
                    value={reference.name}
                    onChange={handleReferenceChange(index, 'name')}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="URL"
                    value={reference.url}
                    onChange={handleReferenceChange(index, 'url')}
                    sx={{ flex: 2 }}
                    error={!!formErrors[`references_${index}`]}
                    helperText={formErrors[`references_${index}`]}
                  />
                  <IconButton
                    onClick={() => removeReference(index)}
                    disabled={formData.references.length === 1}
                    sx={{ mt: 1 }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<Add />}
                onClick={addReference}
                variant="outlined"
                size="small"
              >
                Add Reference
              </Button>
            </Box>

            {/* Images */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Project Images
              </Typography>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="project-images"
              />
              <label htmlFor="project-images">
                <Button variant="outlined" component="span" fullWidth>
                  Upload Images
                </Button>
              </label>
              {images.length > 0 && (
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  {images.length} image(s) selected
                </Typography>
              )}
            </Box>

            {/* Error Display */}
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Project'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateProjectModal;