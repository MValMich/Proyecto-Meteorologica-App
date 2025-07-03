// QuerySelectors
const inpAddress = document.querySelector('#inpAddress');
const containerTime = document.querySelector('#containerTime');
const boxAddress = document.querySelector('#boxAddress');
const boxDataTime = document.querySelector('#boxDataTime');
const boxTempMax = document.querySelector('#boxTempMax');
const boxTempMin = document.querySelector('#boxTempMin');
const btnGetWeather = document.querySelector('button');
const img = document.querySelector('img');

// Funcion Asincrona Meteorológica
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=3LJJCRM6RZBCWLZRKMGQQGMZY`,{ mode: 'cors' }
    );

    if (!response.ok) {
      throw new Error(`Ciudad no encontrada o error en la API. Código: ${response.status}`);
    }

    const weatherData = await response.json();

    const resolveAddress = weatherData.resolvedAddress;
    const dateTime = weatherData.days[0].datetime;
    const tempMax = Number(((weatherData.days[0].tempmax - 32) * 5 / 9).toFixed(1));
    const tempMin = Number(((weatherData.days[0].tempmin - 32) * 5 / 9).toFixed(1));

  // Selección del GIF según temperatura
    if (tempMax < 5 && tempMin < 0) {
      // Frio
      img.src = 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnk4MzBmMWd1Z3VicjIyZ2NhNzU0N3p4eDJnejF1bmRlZ245NTlqZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JTghlLg0d1BpZvbQlG/giphy.gif'; // frío
    } else if (tempMin >= 5 && tempMax <= 15) {
      // Templado
      img.src = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2F6dzlodDFnamdmMXppcW81Z2Y2cmJlb20weDlzd3FqOGwyMWo3MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nyRlegXqTlI8BIANBj/giphy.gif'; // templado
    } else if (tempMin > 15) {
      // Calido
      img.src = 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG0wdGl5cjBycDRkdGlpMDE2NzVvZzhqcHVwejIydDIzZjg3b2g4dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FUvdCo48nmtP7G4L1R/giphy.gif'; // caluroso
    } else {
      // Templado
      img.src = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2F6dzlodDFnamdmMXppcW81Z2Y2cmJlb20weDlzd3FqOGwyMWo3MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nyRlegXqTlI8BIANBj/giphy.gif'; // neutro por defecto
    }

    containerTime.innerHTML = `
      Ubicación interpretada: ${resolveAddress}<br><br>
      Fecha: ${dateTime}; <br> <br>
      Mínima: ${tempMin} C°<br> <br>
      Máxima: ${tempMax} C°;
      `;
   
  } catch (error) {
    console.error(error);
    containerTime.innerHTML = "No se pudo obtener el clima. Verifica el nombre de la ciudad.";
        img.src = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjRydHE2YzQybmM0djU0M25kd2Vza20zNXdwcjF1YjBiZWwzOWxqdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OPU6wzx8JrHna/giphy.gif';
  }
}
// Evento del botón
btnGetWeather.addEventListener('click', (e) => {
  e.preventDefault();
  const city = inpAddress.value.trim().replace(/[<>&"']/gi,'');
  if (city) {
    getWeather(city);
  } else {
    containerTime.textContent = "Por favor, ingresa una ciudad.";
  }
});
