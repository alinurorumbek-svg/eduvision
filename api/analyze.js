export default async function handler(req, res) {
    // Кілт Vercel-дің ішінде жасырын тұрады
    const API_KEY = process.env.OPENAI_API_KEY; 

    const { schedule } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: "Талдау жаса: " + schedule }]
            })
        });

        const data = await response.json();
        res.status(200).json({ aiResponse: data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Серверде қате болды" });
    }
}
