export const calcTimePassed = (dateTime: string) => {
  const now = Date.now();
  const time = new Date(dateTime).getTime();
  const timePassed = now - time;

  if (timePassed < 60000) {
    return 'agora pouco';
  } else if (timePassed < 3600000) {
    const minutes = Math.floor(timePassed / 60000);
    return minutes === 1 ? '1 minuto' : `${minutes} minutos`;
  } else if (timePassed < 86400000) {
    const hours = Math.floor(timePassed / 3600000);
    return hours === 1 ? '1 hora' : `${hours} horas`;
  } else if (timePassed < 604800000) {
    const days = Math.floor(timePassed / 86400000);
    return days === 1 ? '1 dia' : `${days} dias`;
  } else if (timePassed < 2419200000) {
    const weeks = Math.floor(timePassed / 604800000);
    return weeks === 1 ? '1 semana' : `${weeks} semanas`;
  } else if (timePassed < 29030400000) {
    const months = Math.floor(timePassed / 2419200000);
    return months === 1 ? '1 mês' : `${months} meses`;
  } else {
    return 'há muito tempo';
  }
};
