
class Helper {
  static parseTimecodeToSeconds(timecode, standard) {
    const arr = timecode.split(':');

    let f = 0;
    switch (standard) {
      case 'PAL':
        f = Number(arr[3]) * 0.04;
        break;
      case 'NTSC':
        f = Number(arr[3]) * 0.0333;
        break;
      default:
        break;
    }
    // hour * 3600 + minute * 60 + seconds + (f * standard)
    return Number(arr[0]) * 3600 + Number(arr[1]) * 60 + Number(arr[2]) + f;
  }

  static convertSecondsToHMS(duration, standard) {
    const h = Math.floor(duration / 3600);
    const m = Math.floor(duration % 3600 / 60);
    const s = Math.floor(duration % 3600 % 60);

    // conversion formulation adapted from https://stackoverflow.com/a/42090723
    let fps = 0;
    switch (standard) {
      case 'PAL':
        fps = 25;
        break;
      case 'NTSC':
        fps = 30;
        break;
      default:
        break;
    }
    const f = Math.round(duration * fps % fps);
    return h + ':' + m + ':' + s + ':' + f;
  }
}

export default Helper;  