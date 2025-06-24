const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const buildConversionPrompt = (code, src, target) => `
Convert the following ${src} code to ${target}.
**Return only the converted code, wrapped in triple back-ticks 
with the correct language tag. Do not add any explanation. If the given text does need seem to be any sort of programming language, respond with a message saying the input was not valid code.**

${code}
`;

const getCodeConversion = async (originalCode, sourceLanguage, targetLanguage) => {
  const prompt = buildConversionPrompt(originalCode, sourceLanguage, targetLanguage);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are an expert software engineer that translates code between programming languages.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0,
  });

  return completion.choices[0].message.content.trim();
};

module.exports = { getCodeConversion };