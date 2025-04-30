import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '../.env' }); // Adjust path if .env is elsewhere relative to server/dist

const app = express();
const port = process.env.PORT || 3001; // Use environment variable or default

app.use(express.json()); // Middleware to parse JSON bodies

// Simple root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('SkillSyncAI Server is running!');
});

// Placeholder for future API endpoints based on Phase 2 plan
app.post('/api/analyze-resume', (req: Request, res: Response) => {
  console.log('Received resume analysis request:', req.body);
  // TODO: Integrate with ResumeAnalyzerAgent
  res.json({ message: 'Resume analysis endpoint placeholder' });
});

app.post('/api/suggest-skills', (req: Request, res: Response) => {
  console.log('Received skill suggestion request:', req.body);
  // TODO: Integrate with SkillGapAgent
  res.json({ message: 'Skill suggestion endpoint placeholder' });
});

app.post('/api/learning-plan', (req: Request, res: Response) => {
  console.log('Received learning plan request:', req.body);
  // TODO: Integrate with LearningCopilotAgent
  res.json({ message: 'Learning plan endpoint placeholder' });
});

app.post('/api/connect-mentor', (req: Request, res: Response) => {
  console.log('Received mentor connection request:', req.body);
  // TODO: Integrate with MentorMatchAgent
  res.json({ message: 'Mentor connection endpoint placeholder' });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  // Verify if API keys are loaded (optional check)
  // console.log('OpenAI Key Loaded:', !!process.env.OPENAI_API_KEY);
  // console.log('Azure Key Loaded:', !!process.env.AZURE_OPENAI_API_KEY);
}); 