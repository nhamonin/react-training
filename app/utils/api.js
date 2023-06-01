export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message);
      }

      return data.items;
    });
}

function getErrorMsg(message, username) {
  if (message === 'Not Found') {
    return `${username} doesn't exist`;
  }

  return message;
}

async function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMsg(profile.message, username));
      }

      return profile;
    });
}

async function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then((res) => res.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMsg(profile.message, username));
      }

      return repos;
    });
}

async function getUserData(player) {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile.followers, repos),
    })
  );
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

function getStarCount(repos) {
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

export async function battle(players) {
  return Promise.all([getUserData(players[0]), getUserData(players[1])]).then(
    sortPlayers
  );
}
