// Selecionar elementos do DOM
const input = document.getElementById('character-id');
const button = document.getElementById('fetch-character');
const resultDiv = document.getElementById('result');

async function fetchCharacter() {
  const characterId = input.value;

  if (!characterId) {
    resultDiv.innerHTML = '<p style="color: red;">Por favor, insira um ID válido.</p>';
    return;
  }

  const url = `https://swapi.dev/api/people/${characterId}/`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      resultDiv.innerHTML = `<p style="color: red;">Personagem não encontrado (Erro ${response.status}).</p>`;
      return;
    }

    const data = await response.json();

    resultDiv.innerHTML = `
      <h2>${data.name}</h2>
      <p><strong>Altura:</strong> ${data.height} cm</p>
      <p><strong>Peso:</strong> ${data.mass} kg</p>
      <p><strong>Cor do cabelo:</strong> ${data.hair_color}</p>
      <p><strong>Cor dos olhos:</strong> ${data.eye_color}</p>
      <p><strong>Ano de nascimento:</strong> ${data.birth_year}</p>
      <p><strong>Gênero:</strong> ${data.gender}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = '<p style="color: red;">Erro ao buscar os dados. Tente novamente mais tarde.</p>';
    console.error('Erro:', error);
  }
}

button.addEventListener('click', fetchCharacter);
