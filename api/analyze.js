export default async function handler(req, res) {
    // Енді бұл жерде Gemini кілті қолданылады
    const API_KEY = process.env.GEMINI_API_KEY; 
    const { schedule } = req.body;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Сен мектеп психологысың. Мына сабақ кестесін талдап, оқушының шаршау деңгейі мен жүктемесі туралы қазақша қысқаша кеңес бер: ${schedule}`
                    }]
                }]
            })
        });

        const data = await response.json();
        // Gemini-ден келген жауапты өңдеу
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        res.status(200).json({ aiResponse });
    } catch (error) {
        res.status(500).json({ error: "Gemini API-де қате болды" });
    }
}
