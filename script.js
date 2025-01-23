const resultDiv = document.getElementById("result");

async function fetchCharacters() {
  let characterId = 1; 

  for (let i = 0; i < 41; i++) {
    console.log("Personagem ID atual:", characterId);

    const url = `https://swapi.dev/api/people/${characterId}/`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.warn(`Personagem ${characterId} não encontrado (Erro ${response.status}).`);
        characterId++; 
        continue; 
      }

      const data = await response.json();

      const card = document.createElement("div");
      card.className = "card"; 

      card.innerHTML = `
        <h2>${data.name}</h2>
        <p><strong>Altura:</strong> ${data.height} cm</p>
        <p><strong>Peso:</strong> ${data.mass} kg</p>
        <p><strong>Cor do cabelo:</strong> ${data.hair_color}</p>
        <p><strong>Cor dos olhos:</strong> ${data.eye_color}</p>
        <p><strong>Ano de nascimento:</strong> ${data.birth_year}</p>
        <p><strong>Gênero:</strong> ${data.gender}</p>
      `;

      resultDiv.appendChild(card);

    } catch (error) {
      console.error(`Erro ao buscar o personagem ${characterId}:`, error);

      const errorMsg = document.createElement("p");
      errorMsg.style.color = "red";
      errorMsg.textContent = `Erro ao buscar o personagem ${characterId}. Tente novamente mais tarde.`;
      resultDiv.appendChild(errorMsg);
    }

    characterId++; 
  }
}

document.addEventListener("DOMContentLoaded", fetchCharacters);
