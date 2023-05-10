import axios from "axios";

const generateImage = async (prompt) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };

  const data = {
    "prompt": prompt,
    "n": 1,
    "size": "1024x1024",
  };

  try {
    const response = await axios.post("https://api.openai.com/v1/images/generations", data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

export default generateImage;
