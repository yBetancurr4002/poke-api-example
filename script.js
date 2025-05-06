document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the form from submitting normally

  const input = document.getElementById("pokemonInput").value;
  const card = document.getElementById("pokemonCard");
  const nameElement = document.getElementById("pokemonName");
  const imageElement = document.getElementById("pokemonImage");
  const typeElement = document.getElementById("pokemonTypes");
  const stats = document.getElementById("pokemonStats"); 

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`);

  if (response.ok) {
    const data = await response.json();

    console.log(data); // Log the entire data object for debugging
    
    nameElement.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    imageElement.src = data.sprites.other['official-artwork'].front_default;
    typeElement.textContent = `Tipo: ${data.types.map(type => type.type.name).join(', ')}`;

    card.classList.remove("d-none"); // Show the card
    stats.innerHTML = ""; // Clear previous stats
    data.stats.forEach(stat => {
      const statElement = document.createElement("li");
      
      statElement.className = "list-group-item d-flex justify-content-between align-items-center";

      statElement.innerHTML = `
        <strong>${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</strong>
        <span class="badge bg-primary rounded-pill">${stat.base_stat}</span>
      `;

      stats.appendChild(statElement);
    });

  }
  
});