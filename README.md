# Questions

## 1 - What does the single responsibility principle consist of? What's its purpose?

Basically, every function, state, or component should have only one reason to change and serve a single purpose.

---

## 2 - What characteristics, in your opinion, does "good" code or clean code have?

- It is understandable even without an explanation.
- It implements a complex feature using as little code as possible.
- It is scalable.
- It is secure.
- It is well-documented.

---

## 3 - Detail how you would do everything that you have not completed.

In this case, I've already finished everything, so I'll respond with a hypothetical example.

First, I like to break the task down into several micro-tasks - all without writing a single line of code. Then I try to complete the most difficult task or the one that will take me the longest. If I have questions, I look for someone who can answer them. If I need help and have exhausted all my resources, I ask for help, thoroughly test my work, and finally document the task.

---

# Movies App

Movie browsing app built with **React Native + Expo**. Uses the **TMDB API** to pull movie data - you can search, browse categories, save stuff to a watchlist, and watch trailers.

---

## Getting started

Install dependencies:

```bash
npm install
```

## Getting started

```bash
npm install
```

Create a `.env` file:

```
EXPO_PUBLIC_TMDB_ACCESS_TOKEN=your_token_here
EXPO_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
```

Run it:

```bash
npx expo start --clear
```

## How it's organized

- `app/` — screens and navigation (Expo Router)
- `src/features/` — each feature has its own hooks and services (home, search, watchlist, details)
- `src/shared/` — reusable components and hooks
- `src/core/` — API client, caching, theme, types

## What it does

- Browse popular, now playing, upcoming and top rated movies
- Search movies with debounced input
- Save movies to a local watchlist (persisted with AsyncStorage)
- Watch YouTube trailers in-app
- Dark/light mode
