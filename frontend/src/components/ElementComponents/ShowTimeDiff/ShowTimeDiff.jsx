export default function ShowTimeDiff({ actualDate }) {
    const { hours, minutes, days, month, year } = actualDate;
  
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDays = currentDate.getDate();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
  
    const minutesDiff =
      (currentYear - year) * 525600 +
      (currentMonth - month) * 43800 +
      (currentDays - days) * 1440 +
      (currentHours - hours) * 60 +
      (currentMinutes - minutes);
  
    let timeDiffText = '';
  
    if (Math.abs(minutesDiff) >= 525600) {
      const years = Math.floor(Math.abs(minutesDiff) / 525600);
      timeDiffText += `${years} ${years === 1 ? 'ano' : 'anos'}`;
    } else if (Math.abs(minutesDiff) >= 43800) {
      const months = Math.floor(Math.abs(minutesDiff) / 43800);
      timeDiffText += `${months} ${months === 1 ? 'mês' : 'meses'}`;
    } else if (Math.abs(minutesDiff) >= 1440) {
      const days = Math.floor(Math.abs(minutesDiff) / 1440);
      timeDiffText += `${days} ${days === 1 ? 'dia' : 'dias'}`;
    } else if (Math.abs(minutesDiff) >= 60) {
      const hours = Math.floor(Math.abs(minutesDiff) / 60);
      timeDiffText += `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else {
      timeDiffText += `${Math.abs(minutesDiff)} ${minutesDiff === 1 ? 'minuto' : 'minutos'}`;
    }
  
    return <h3>{`${timeDiffText} atrás`}</h3>;
  }