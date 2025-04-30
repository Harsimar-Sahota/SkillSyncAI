import pdfParse from 'pdf-parse';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' }); // Adjust path relative to agents/dist

interface ResumeAnalysisResult {
    skills: string[];
    experience: string[];
    // ... other extracted fields
}

export class ResumeAnalyzerAgent {
    private githubToken = process.env.GITHUB_TOKEN;

    async analyzeFromPdf(pdfBuffer: Buffer): Promise<ResumeAnalysisResult> {
        console.log("Analyzing PDF buffer...");
        try {
            const data = await pdfParse(pdfBuffer);
            const text = data.text;
            // TODO: Implement sophisticated parsing logic (regex, keywords, or LLM)
            console.log("PDF Text Extracted (first 500 chars):", text.substring(0, 500));
            // Placeholder extraction
            const skills = text.match(/Skills: (.*)/i)?.[1]?.split(',').map(s => s.trim()) || [];
            const experience = text.match(/Experience: (.*)/is)?.[1]?.split('\n\n').map(s => s.trim()) || [];

            return { skills, experience };
        } catch (error) {
            console.error("Error parsing PDF:", error);
            throw error;
        }
    }

    async analyzeFromGithub(githubUsername: string): Promise<ResumeAnalysisResult> {
        console.log(`Analyzing GitHub profile: ${githubUsername}`);
        if (!this.githubToken) {
            console.warn("GitHub token not found. Analysis will be limited.");
            // Potentially fetch public data only
        }
        // TODO: Implement GitHub API calls to fetch profile README, pinned repos, languages etc.
        // Example: Fetch user repos
        // const response = await axios.get(`https://api.github.com/users/${githubUsername}/repos`, {
        //     headers: { Authorization: `token ${this.githubToken}` }
        // });
        // console.log("GitHub Repos:", response.data.map((repo: any) => repo.name));

        // Placeholder result
        return { skills: ["GitHub Skill 1", "TypeScript"], experience: ["Repo A Contributor"] };
    }

    // Combine results or use LLM for deeper analysis
    async processAnalysis(analysis: ResumeAnalysisResult): Promise<ResumeAnalysisResult> {
        // TODO: Potentially use an LLM to refine or structure the extracted data
        console.log("Processing analysis result...");
        return analysis;
    }
} 