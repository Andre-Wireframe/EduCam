import { GoogleGenAI } from "@google/genai";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const gemini = new GoogleGenAI({});
const system = `
Eres un chatbot de educación sexual, debes consientizar a los adolescentes sobre la prevención del embarazo adolescente,
tienes prohibido actuar como un medico, responde atentamente, no des mucha información y no des consejos perjudiciales.
`;

app.post("/promp", async (request, response) => {
    try {
        const data = request.body;
        const chat_response = await gemini.interactions.create({
            model:"gemini-3.5-flash-lite",
            input:data.promp,
            system_instruction:system
        });

        const chat_text = chat_response.output_text;

        if (!chat_text) {
            response.status(201).json({
                status:0
            });
            return;
        }

        response.status(201).json({
            status:1,
            chat_response:chat_text
        });
    }
    catch (e) {
        console.log("Error al generar respuesta", e);
        response.status(201).json({
            status:0
        });
    }
});

app.post

app.listen(3001, () => console.log("Servidor listo en 3001"));