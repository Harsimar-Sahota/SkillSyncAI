import { OpenAI } from 'openai'; // Or Azure equivalent
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

interface LearningTask {
    id: string;
    description: string;
    estimatedDuration: string; // e.g., "2 hours", "1 day"
    resources?: string[]; // Links, course names, etc.
    completed: boolean;
}

interface LearningPlan {
    goalSkill: string;
    dailyTasks: LearningTask[];
    weeklyGoals?: string[];
}

export class LearningCopilotAgent {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            // Add Azure configuration here if using Azure
        });
    }

    async generatePlan(missingSkills: string[], targetRole: string): Promise<LearningPlan[]> {
        console.log(`Generating learning plan for role "${targetRole}" focusing on skills: ${missingSkills.join(', ')}`);

        const plans: LearningPlan[] = [];

        for (const skill of missingSkills) {
            const prompt = `
            Create a structured, actionable learning plan to acquire the skill: "${skill}" for someone aiming for a "${targetRole}" role.
            The plan should include:
            1. A list of daily actionable tasks (e.g., "Read chapter X", "Complete tutorial Y", "Build small project Z").
            2. Estimated duration for each task (e.g., "1 hour", "3 hours").
            3. Suggested resources (e.g., specific documentation pages, online courses, tutorials - be specific if possible).
            4. Optional: Define 1-2 weekly goals.

            Format the output as a JSON object with keys: "goalSkill", "dailyTasks", "weeklyGoals".
            "goalSkill" should be the target skill string.
            "dailyTasks" should be an array of objects, each with keys: "id" (string, unique like task-1), "description" (string), "estimatedDuration" (string), "resources" (array of strings, optional), "completed" (boolean, default false).
            "weeklyGoals" should be an array of strings (optional).
            `;

            try {
                // const completion = await this.openai.chat.completions.create({
                //     model: "gpt-4o-mini", // Or your preferred model
                //     messages: [{ role: "user", content: prompt }],
                //     response_format: { type: "json_object" },
                // });
                // const planData = JSON.parse(completion.choices[0].message.content || '{}');

                // Placeholder result until LLM call is implemented
                 console.warn(`LLM call for learning plan (${skill}) is commented out. Using placeholder data.`);
                 const planData: LearningPlan = {
                     goalSkill: skill,
                     dailyTasks: [
                         { id: `task-1-${skill}`, description: `Learn basics of ${skill}`, estimatedDuration: "2 hours", resources: [`https://example.com/learn-${skill}`], completed: false },
                         { id: `task-2-${skill}`, description: `Practice ${skill} with exercises`, estimatedDuration: "3 hours", completed: false },
                     ],
                     weeklyGoals: [`Complete introductory module for ${skill}`]
                 };


                if (planData.goalSkill) { // Basic validation
                    plans.push(planData);
                } else {
                     console.warn(`LLM did not return a valid plan structure for skill: ${skill}`);
                }

            } catch (error) {
                console.error(`Error generating learning plan for skill "${skill}" with LLM:`, error);
                // Decide if you want to throw, return partial, or empty
            }
        }

        // TODO: Integrate with MongoDB to save/update plans
        console.log(`Generated ${plans.length} learning plans.`);
        return plans;
    }

    // Methods to update task status, fetch plan from DB etc. would go here
} 