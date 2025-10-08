import axiosInstance from '../utils/axios';

class ApiService {
  // Projects API
  static async createProject(projectData) {
    const formData = new FormData();
    
    // Append all fields to formData
    Object.keys(projectData).forEach(key => {
      if (key === 'images' && projectData.images) {
        // Append each image file
        projectData.images.forEach(image => {
          formData.append('images', image);
        });
      } else if (key === 'references' && projectData.references) {
        // Stringify references array
        formData.append(key, JSON.stringify(projectData.references));
      } else if (projectData[key] !== null && projectData[key] !== undefined) {
        formData.append(key, projectData[key]);
      }
    });

    const response = await axiosInstance.post('/profile/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async getProjects(archived = false) {
    const response = await axiosInstance.get(`/profile/projects?archived=${archived}`);
    return response.data;
  }

  static async getProjectById(id) {
    const response = await axiosInstance.get(`/profile/projects/${id}`);
    return response.data;
  }

  static async updateProject(id, projectData) {
    const formData = new FormData();
    
    Object.keys(projectData).forEach(key => {
      if (key === 'images' && projectData.images) {
        projectData.images.forEach(image => {
          if (typeof image === 'object') {
            formData.append('images', image);
          }
        });
      } else if (key === 'references' && projectData.references) {
        formData.append(key, JSON.stringify(projectData.references));
      } else if (projectData[key] !== null && projectData[key] !== undefined) {
        formData.append(key, projectData[key]);
      }
    });

    const response = await axiosInstance.put(`/profile/projects/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async deleteProject(id) {
    const response = await axiosInstance.delete(`/profile/projects/${id}`);
    return response.data;
  }

  static async archiveProject(id, isArchived) {
    const response = await axiosInstance.patch(`/profile/projects/${id}/archive`, {
      isArchived,
    });
    return response.data;
  }
}

export default ApiService;