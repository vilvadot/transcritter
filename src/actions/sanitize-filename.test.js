const { sanitizeFilename } = require("./sanitize-filename")

describe("Sanitize filename", () => {
  it("turns names to lowercase", () => {
    const originalName = "MY_FILE.mp3"

    const result = sanitizeFilename(originalName)

    expect(result).toEqual("my_file.mp3")
  })

  it("removes accents", () => {
    const originalName = "transcritter-AUDIO_TABÚ_WHATEVER.mp3"

    const result = sanitizeFilename(originalName)

    expect(result).toEqual("transcritter-audio_tabu_whatever.mp3")
  })

  it("removes special symbols", () => {
    const originalName = `~""=]audio.mp3`

    const result = sanitizeFilename(originalName)

    expect(result).toEqual("audio.mp3")
  })

  it("removes spaces", () => {
    const originalName = `my audio.mp3`

    const result = sanitizeFilename(originalName)

    expect(result).toEqual("my_audio.mp3")
  })

})