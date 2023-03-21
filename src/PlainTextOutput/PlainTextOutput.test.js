const { PlainTextOutput } = require("./PlainTextOutput");
const fs = require("fs");
const path = require("path");
const Transcription = require("../Transcription");

describe("PlainTextOutput", () => {
  const raw = fs.readFileSync(path.resolve(__dirname, "./test-input.json"));
  const input = Transcription.from(JSON.parse(raw));

  it("punctuation is not preceded by space", async () => {
    const result = PlainTextOutput.from(input);

    expect(result).not.toContain(" .");
  });

  it("splits long paragraphs into multiple", async () => {
    const result = PlainTextOutput.from(input);

    expect(result).toEqual(transcriptionInParagraphs);
  });

  const transcriptionInParagraphs = `00:00
En la Aiba Eh, No Estoy Michigan Alba siete a la C tres escabeche Día triste en por entrevió Ya sea capote insti- for quería Estaré a la H a la que fue Eche lleva su presencia. Dicen que son En la cinco Decir Ahí voy a Fira Soy golpistas de la hay Fira a Ghana es el ama.

00:28
Noches Jaguar bellum. Han sido tres años os de Navas que decir Gracias. Voy rico. Eres hija? Vicky declaración dijo Jon Anza fue el campo parecía a doctores miles de comer. No hay buenos maestros, depresiones, nada. Das ya se venden. Atienda así sí que he hecho Sea del PP.

00:50
Hay bueno y muchos se a que es su Presentó una injerencia. Eso es igual Vigente tal verdad. Veces carecen chifa a que

`;
});
