export const formatSeconds = (s: number) => {
  const seconds = s % 60;
  const minutes = (s - seconds) / 60;
  const hours = (s - (minutes * 60) - seconds) / 3600;

  return `${hours ? hours + ':' : ''}${minutes ? minutes + ':' : ''}${seconds ? `${seconds < 10 ? '0' : ''}` + seconds : '00'}`
}