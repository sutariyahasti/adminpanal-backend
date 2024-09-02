const { bucket } = require('../config/firebaseConfig');
const Project = require('../models/project');
const { v4: uuidv4 } = require('uuid');

exports.addProject = async (req, res) => {
  try {
    const { projectName, description } = req.body;

    // Upload each file to Firebase Storage
    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const uniqueFilename = `${uuidv4()}-${file.originalname}`;
        const blob = bucket.file(uniqueFilename);

        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype
          }
        });

        blobStream.on('error', (error) => reject(error));

        blobStream.on('finish', async () => {
          await blob.makePublic();

          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          resolve(publicUrl); 
        });

        blobStream.end(file.buffer);
      });
    });

    // Collect all image URLs after uploading
    const imageUrls = await Promise.all(uploadPromises);

    // Create a new project with the uploaded image URLs
    const newProject = new Project({
      projectName,
      description,
      imageUrl: imageUrls // Assuming `imageUrl` is an array in your Project model
    });

    await newProject.save();

    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: 'No projects found' });
    }

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};