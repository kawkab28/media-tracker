async function getRecommendations(title) {

  const recommendations = {
    interstellar: ["Inception", "The Martian", "Gravity", "Arrival", "Contact"],
    inception: ["Interstellar", "Tenet", "The Matrix", "Minority Report"],
    avatar: ["Dune", "Star Wars", "Guardians of the Galaxy"]
  };

  const key = title.toLowerCase();

  return recommendations[key] || [
    "Inception",
    "The Matrix",
    "Blade Runner 2049",
    "Arrival",
    "The Martian"
  ];
}

module.exports = { getRecommendations };