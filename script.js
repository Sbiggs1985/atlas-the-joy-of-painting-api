// script.js
document.addEventListener('DOMContentLoaded', () => {
    const episodesList = document.getElementById('episodes-list');
  
    // Fetch the list of episodes from the API
    fetch('http://localhost:3000/episodes')
      .then(response => response.json())
      .then(episodes => {
        // Clear the list first
        episodesList.innerHTML = '';
  
        // Loop through the episodes and create a list item for each one
        episodes.forEach(episode => {
          const listItem = document.createElement('li');
          listItem.textContent = `${episode.title} (Air Date: ${episode.air_date})`;
          episodesList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error fetching episodes:', error);
      });
  });