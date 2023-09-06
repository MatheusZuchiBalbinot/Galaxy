export default function ShowTimeDiff ({actualDate}) {

    const { hours, minutes, days, month, year } = actualDate;

    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentDays = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const yearsDiff = currentYear - year;
    const monthsDiff = currentMonth - month;
    const daysDiff = currentDays - days;
    const hoursDiff = currentHours - hours;
    const minutesDiff = currentMinutes - minutes;

    let timeDiffText = '';

    if (Math.abs(yearsDiff) > 0) {
        timeDiffText += `${Math.abs(yearsDiff)} ${Math.abs(yearsDiff) === 1 ? 'ano' : 'anos'}`;
    } else if (Math.abs(monthsDiff) > 0) {
        timeDiffText += `${Math.abs(monthsDiff)} ${Math.abs(monthsDiff) === 1 ? 'mês' : 'meses'}`;
    } else if (Math.abs(daysDiff) > 1) {
        timeDiffText += `${Math.abs(daysDiff)} ${Math.abs(daysDiff) === 1 ? 'dia' : 'dias'}`;
    } else if (Math.abs(hoursDiff) > 0) {
        timeDiffText += `${Math.abs(hoursDiff)} ${Math.abs(hoursDiff) === 1 ? 'hora' : 'horas'}`;
    } else if (Math.abs(minutesDiff) > 0) {
        timeDiffText += `${Math.abs(minutesDiff)} ${Math.abs(minutesDiff) === 1 ? 'minuto' : 'minutos'}`;
    }

    return <h3>{`${timeDiffText} atrás`}</h3>;
    
}