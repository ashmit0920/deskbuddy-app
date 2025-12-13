export const gemini = {
    async chat(history, context) {
        try {
            const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
            const API_URL = import.meta.env.VITE_GEMINI_API_URL;
            if (!API_KEY) {
                return "Error: VITE_GEMINI_API_KEY is not set in your .env file.";
            }
            const systemInstruction = {
                role: "user",
                parts: [{ text: `System Context: ${context}\n\nYou are DeskBuddy AI, a productivity and wellbeing assistant focused on helping users improve their productivity by monitoring their work sessions, through details like typing speed, keystrokes, and active periods. Use the above context about the user's session to provide personalized advice. Be concise, helpful, and empathetic.` }]
            };
            const contents = [systemInstruction, ...history];
            const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: contents,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 256,
                    }
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || "Failed to fetch from Gemini API");
            }
            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        }
        catch (error) {
            console.error("Gemini API Error:", error);
            return "Sorry, I'm having trouble connecting to my brain right now.";
        }
    }
};
