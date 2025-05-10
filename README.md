
# 🎥 MOVIE EXPLORER - Discover your favorite films
MOVIE EXPLORER is a modern movie based website to explore and filter popular and trending movies using the [TMDb (The Movie Database) API](https://developers.themoviedb.org/3). Users can search by country name, filter by region and language, and mark countries as favorites.


## Features of our system

- 🧑‍💻 User authentication (Register/Login).
- 🎬 Display popular movies with the youtube trailer and further details.  
- 🔍 Search by movie name with storing last searched movie.
- 🌐 Filter by genre of the movie.
- 📅 Filter by released year of the movie.
- 📊 Filter by rating of the movie.
- 🎬 Display trending movies with the youtube trailer and further details.
- ⭐ Add/remove favorite movies and display to the user.
- 🔆 Light/dark mode.
- 🎨 Responsive and modern UI.

## Tech Stack we have used

- **Frontend:** React, Material-UI (MUI)
- **API:** [TMDb (The Movie Database) API](https://developers.themoviedb.org/3)
- **Authentication:** JWT-web token
- **State Management:** React Context / useState

---

## How To Setup

### Prerequisities:

- React.js
- Material-UI (MUI)
- Git.

### Clone the repositoty:

```bash
git clone https://github.com/ThisalFernando/movie_explorer.git
cd movie_explorer
```

### Install Dependencies:

```bash
npm install
```

### Start the application

- Frontend Server

```bash
npm start
```

Before deploying the application, the application will be available at http://localhost:3000/.
Since the application is already deployed, the application will be available at https://movie-explorer-omega-green.vercel.app/. 
Click and get the access to the application.

---

## API Endpoints

- User Registration:

```http
  https://movieexplorerbackend-production.up.railway.app/api/auth/register
```

- Use Login:

```http
  https://movieexplorerbackend-production.up.railway.app/api/auth/login
```

- Fetch movie list:

```http
  https://api.themoviedb.org/3/movie/popular
```

- Fetch trending movie list:

```http
  https://api.themoviedb.org/3/trending/movie
```

- Search by movie name:

```http
  https://api.themoviedb.org/3/search/movie
```

- Filter by genre/ released year/ rating:

```http
  https://api.themoviedb.org/3/discover/movie
```

- Fetch movie genres:

```http
  https://api.themoviedb.org/3/genre/movie/list
```

- Add/Get movies as favorite:

```http
  https://movieexplorerbackend-production.up.railway.app/api/favorite-movies
```

- Remove country from favorites:

```http
  https://movieexplorerbackend-production.up.railway.app/api/favorite-movies/:movieId
```

---

## Build For Production

```bash
  npm run build
```

This will generate optimized static files in the dist/ directory.

---

## Connect With MOVIE EXPLORER

🌐[MOVIE EXPLORER - Discover your favorite films](https://movie-explorer-omega-green.vercel.app/)




