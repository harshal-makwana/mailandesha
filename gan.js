import { pipeline } from '@xenova/transformers';

(async () => {
    try {
        const textGenerator = await pipeline('text-generation', 'gpt2'); // Ensure this identifier is correct

        async function generateText(prompt, maxLength = 50) {
            const output = await textGenerator(prompt, {
                max_length: maxLength,
                num_return_sequences: 1,
            });

            return output[0].generated_text;
        }

        const prompt = "In the future, AI will";
        const generatedText = await generateText(prompt, 100);
        console.log('Generated Text:', generatedText);
    } catch (error) {
        console.error('Error:', error);
    }
})();
