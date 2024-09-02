const Project = require('../models/project');

exports.addProject = async (req, res) => {
  // try {
  //   const { projectName, description } = req.body;
  //   const file = req.file;

  //   if (!file || !projectName || !description) {
  //     return res.status(400).json({ message: 'Missing required fields' });
  //   }

  //   const imageUrl = `uploads/${file.filename}`;
  //   const newImage = new Project({ projectName, description, imageUrl });
  //   await newImage.save();

  //   res.status(200).json({ message: 'Image uploaded successfully', newImage });
  // } catch (error) {
  //   res.status(500).json({ message: 'Server error', error });
  // }
  try {
    const { projectName, description } = req.body;

    // Collect the paths of the uploaded images
    const imagePaths = req.files.map(file => file.path);

    // Create a new project with the uploaded images
    const newProject = new Project({
      projectName,
      description,
      imageUrl: imagePaths // Assuming `images` is an array in your Project model
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