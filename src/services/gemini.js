import { GoogleGenerativeAI } from '@google/generative-ai';

// In a real app, this would be in an environment variable
const apiKey = 'AIzaSyB152H9C3Azz-aQI_vTpLjvMxqmNB98RJU';

export async function getGeminiResponse(message, context, chatHistory = []) {
    try {
        // Initialize Gemini API
        const genAI = new GoogleGenerativeAI(apiKey);
        
        // Configure the model
        const modelConfig = { 
            model: 'gemini-2.0-flash',
            tools: [{ googleSearch: {} }]
        };
        
        const generationConfig = {
            responseMimeType: 'text/plain'
        };
        
        const geminiModel = genAI.getGenerativeModel(modelConfig);

        // Format chat history for the API
        const formattedHistory = chatHistory.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
        }));

        // Add context and current message
        const fullPrompt = [
            {
                role: 'user',
                parts: [{ text: `Context:\n${context}\n\nQuestion: ${message}` }]
            }
        ];

        // Combine history with current prompt
        const contents = [...formattedHistory, ...fullPrompt];

        // Generate response
        const result = await geminiModel.generateContent({
            contents,
            generationConfig
        });

        return {
            success: true,
            data: result.response.text()
        };

    } catch (error) {
        console.error('Error in Gemini service:', error);
        return {
            success: false,
            error: error.message || 'Failed to get response from AI'
        };
    }
}
