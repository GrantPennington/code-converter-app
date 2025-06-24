const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const buildPrompt = (text, style) => {
  // build prompt based on summary style
  switch (style) {
    case 'bullet':
      return `Summarize the following text in 3-5 bullet points focusing on key ideas:\n\n${text}`;
    case 'tldr':
      return `Give a TL;DR of the following in 1-2 sentences:\n\n${text}`;
    case 'action-items':
      return `Extract only the action items and tasks from the following notes. Use bullet points:\n\n${text}`
    case 'outline':
      return `Summarize the following text as a structured outline with headings and subpoints:\n\n${text}`
    case 'study-guide':
      return `Turn the following content into a study guide with sections for key terms, main ideas, and 2-3 practice questions:\n\n${text}`
    case 'highlighted-quotes':
      return `Extract the 3 most important or impactful quotes or statements from this text. Include them as bullet points:\n\n${text}`
    case 'rewrite-simplified':
      return `Rewrite the following text in very simple language a 10-year-old could understand:\n\n${text}`;
    case 'question-generator':
      return `Create 5 quiz-style questions based on the following content. Include the answers below each question:\n\n${text}`;
    default:
      return `Summarize the following text concisely:\n\n${text}`;
  }
};

const getChatGPTSummary = async (text, style) => {
  const prompt = buildPrompt(text, style);

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // or 'gpt-3.5-turbo' if you want cheaper, gpt-4o for more expensive
    messages: [
      { role: 'system', content: 'You are a helpful assistant that summarizes text into concise, useful summaries.' },
      { role: 'user', content: prompt },
    ],
  });

  return completion.choices[0].message.content;
};

module.exports = { getChatGPTSummary };