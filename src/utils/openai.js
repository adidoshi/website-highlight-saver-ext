export const generateSummary = async (text, apiKey) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that creates concise summaries of text highlights.",
        },
        {
          role: "user",
          content: `Please provide a brief summary of the following text in 2-3 sentences:\n\n${text}`,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    let apiErrorMessage = `OpenAI request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData?.error?.message) {
        apiErrorMessage = errorData.error.message;
      }
    } catch {
      // Keep the status-based message when response body is not JSON.
    }
    throw new Error(apiErrorMessage);
  }

  const data = await response.json();
  if (!data?.choices?.[0]?.message?.content) {
    throw new Error("OpenAI response did not include summary content.");
  }
  return data.choices[0].message.content.trim();
};
