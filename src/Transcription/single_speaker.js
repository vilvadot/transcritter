module.exports = {
  jobName: "Hola",
  accountId: "839597465288",
  results: {
    transcripts: [{ transcript: "Hola. Qué tal, Estoy? Muy bien, gracias." }],
    speaker_labels: {
      speakers: 1,
      segments: [
        {
          start_time: "0.54",
          speaker_label: "spk_0",
          end_time: "1.55",
          items: [
            { start_time: "0.54", speaker_label: "spk_0", end_time: "1.03" },
            { start_time: "1.04", speaker_label: "spk_0", end_time: "1.21" },
            { start_time: "1.21", speaker_label: "spk_0", end_time: "1.55" },
          ],
        },
        {
          start_time: "2.44",
          speaker_label: "spk_0",
          end_time: "4.25",
          items: [
            { start_time: "2.44", speaker_label: "spk_0", end_time: "2.99" },
            { start_time: "2.99", speaker_label: "spk_0", end_time: "3.22" },
            { start_time: "3.22", speaker_label: "spk_0", end_time: "3.63" },
            { start_time: "3.64", speaker_label: "spk_0", end_time: "4.25" },
          ],
        },
      ],
    },
    items: [
      {
        start_time: "0.54",
        end_time: "1.03",
        alternatives: [{ confidence: "0.942", content: "Hola" }],
        type: "pronunciation",
      },
      {
        alternatives: [{ confidence: "0.0", content: "." }],
        type: "punctuation",
      },
      {
        start_time: "1.04",
        end_time: "1.21",
        alternatives: [{ confidence: "0.943", content: "Qué" }],
        type: "pronunciation",
      },
      {
        start_time: "1.21",
        end_time: "1.55",
        alternatives: [{ confidence: "1.0", content: "tal" }],
        type: "pronunciation",
      },
      {
        alternatives: [{ confidence: "0.0", content: "," }],
        type: "punctuation",
      },
      {
        start_time: "2.44",
        end_time: "2.99",
        alternatives: [{ confidence: "0.702", content: "Estoy" }],
        type: "pronunciation",
      },
      {
        alternatives: [{ confidence: "0.0", content: "?" }],
        type: "punctuation",
      },
      {
        start_time: "2.99",
        end_time: "3.22",
        alternatives: [{ confidence: "1.0", content: "Muy" }],
        type: "pronunciation",
      },
      {
        start_time: "3.22",
        end_time: "3.63",
        alternatives: [{ confidence: "1.0", content: "bien" }],
        type: "pronunciation",
      },
      {
        alternatives: [{ confidence: "0.0", content: "," }],
        type: "punctuation",
      },
      {
        start_time: "3.64",
        end_time: "4.25",
        alternatives: [{ confidence: "0.981", content: "gracias" }],
        type: "pronunciation",
      },
      {
        alternatives: [{ confidence: "0.0", content: "." }],
        type: "punctuation",
      },
    ],
  },
  status: "COMPLETED",
};
