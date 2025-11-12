
import { GoogleGenAI, Type } from "@google/genai";
import { BrandBible } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const brandSchema = {
    type: Type.OBJECT,
    properties: {
        companyName: {
            type: Type.STRING,
            description: "A creative and fitting name for the company based on its mission.",
        },
        colorPalette: {
            type: Type.ARRAY,
            description: "A harmonious 5-color palette.",
            items: {
                type: Type.OBJECT,
                properties: {
                    hex: { type: Type.STRING, description: "The hex code of the color." },
                    name: { type: Type.STRING, description: "A descriptive name for the color." },
                    usage: { type: Type.STRING, description: "A common usage note for the color (e.g., 'Primary Call-to-Action', 'Background', 'Accent')." }
                },
                required: ["hex", "name", "usage"]
            }
        },
        fontPairing: {
            type: Type.OBJECT,
            description: "Two Google Fonts that pair well together.",
            properties: {
                headerFont: { type: Type.STRING, description: "The name of the Google Font for headers." },
                bodyFont: { type: Type.STRING, description: "The name of the Google Font for body text." }
            },
            required: ["headerFont", "bodyFont"]
        },
        logoPrompts: {
            type: Type.OBJECT,
            description: "Detailed prompts for an AI image generator.",
            properties: {
                primary: { type: Type.STRING, description: "A detailed prompt for a primary company logo. Style: minimalist, versatile, memorable, vector." },
                secondary: {
                    type: Type.ARRAY,
                    description: "An array of 2 shorter prompts for secondary brand marks or icons.",
                    items: { type: Type.STRING }
                }
            },
            required: ["primary", "secondary"]
        }
    },
    required: ["companyName", "colorPalette", "fontPairing", "logoPrompts"]
};


export const generateBrandIdentity = async (
    mission: string, 
    updateStatus: (message: string) => void
): Promise<BrandBible> => {
    try {
        // Step 1: Generate textual brand elements and image prompts
        updateStatus('Crafting brand concepts and color palette...');
        const textResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are a world-class branding expert. Based on the following company mission, generate a complete brand identity kit in JSON format. Company Mission: "${mission}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: brandSchema
            }
        });
        
        const brandConcepts = JSON.parse(textResponse.text);
        const { companyName, colorPalette, fontPairing, logoPrompts } = brandConcepts;

        if (!logoPrompts || !logoPrompts.primary || !logoPrompts.secondary) {
            throw new Error("Failed to generate valid logo prompts.");
        }

        // Step 2: Generate images in parallel
        updateStatus('Designing your primary logo...');
        const allPrompts = [logoPrompts.primary, ...logoPrompts.secondary];
        
        const imagePromises = allPrompts.map((prompt, index) => {
            if (index > 0 && index <= logoPrompts.secondary.length) {
                updateStatus(`Creating secondary brand mark ${index} of ${logoPrompts.secondary.length}...`);
            }
            return ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: `${prompt}, modern logo, vector, high resolution, on a white background`,
                config: { numberOfImages: 1 }
            });
        });

        const imageResults = await Promise.all(imagePromises);
        
        updateStatus('Assembling your brand bible...');

        const imagesBase64 = imageResults.map(res => {
            if (!res.generatedImages || res.generatedImages.length === 0) {
                throw new Error("Image generation failed for one or more prompts.");
            }
            return res.generatedImages[0].image.imageBytes;
        });

        const primaryLogo = imagesBase64[0];
        const secondaryMarks = imagesBase64.slice(1);
        
        return {
            companyName,
            primaryLogo,
            secondaryMarks,
            colorPalette,
            fontPairing
        };

    } catch (error) {
        console.error("Error in generateBrandIdentity:", error);
        throw new Error("Failed to generate brand identity. Please check the console for details.");
    }
};
