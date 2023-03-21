const Dialog = require('./Dialog')
const Speakers = require('./Speakers')

class Transcription {
  static from(raw){
    return new Transcription(raw)
  }
  
  constructor(raw){
    const firstIntervention = raw.results.items[0]
    const lastIntervention = raw.results.items[raw.results.items.length - 1]

    this.name = raw.id
    this.startTime = firstIntervention.start_time
    this.endTime = lastIntervention.end_time
    this.speakers = Speakers.from(raw)
    this.dialog = Dialog.from(raw)
  }

  forEachInteraction(callback){
    this.dialog.forEach((interaction) => {
      callback(interaction)
    })
  }
}

module.exports = Transcription