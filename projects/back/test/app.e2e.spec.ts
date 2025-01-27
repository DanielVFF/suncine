import { describe, it, expect, beforeAll } from 'vitest';
import supertest from 'supertest';

let authToken: string;
let trendingMovieId: number;
const api = supertest('http://localhost:3000');
beforeAll(async () => {
  const loginResponse = await api
    .post('/login')
    .send({ login: 'admin@email.com', password: 'Admin@123' })
    .expect(200);

  authToken = loginResponse.body.payload.token;

  const trendingResponse = await api
    .get('/movie/most-trended')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);

  trendingMovieId = trendingResponse.body[0].id;
});

describe('Authentication Endpoints', () => {
  it('should authenticate the user successfully', async () => {
    const response = await api
      .post('/login')
      .send({ login: 'admin@email.com', password: 'Admin@123' })
      .expect(200);

    expect(response.body.status).toBe('OK');
    expect(response.body.payload.token).toBeDefined();
  });

  it('should return error for invalid credentials', async () => {
    const response = await api
      .post('/login')
      .send({ login: 'invalid@email.com', password: 'wrongpassword' })
      .expect(401);

    expect(response.body.status).toBe('UNAUTHORIZED');
  });
});

describe('Movie Endpoints', () => {
  it('should return the most trending movie', async () => {
    const response = await api
      .get('/movie/most-trended')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('release_date');
    expect(response.body[0]).toHaveProperty('likes');
  });

  it('should return the top 10 most popular movies', async () => {
    const response = await api
      .get('/movie/top-10')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body.length).toBeLessThanOrEqual(10);
  });

  it('should allow the user to like or unlike a movie', async () => {
    console.log(trendingMovieId);
    const likeResponse = await api
      .put(`/movie/like/${trendingMovieId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(likeResponse.body.status).toBe('LIKE');

    const unlikeResponse = await api
      .put(`/movie/like/${trendingMovieId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(unlikeResponse.body.status).toBe('DISLIKE');
  });

  it('should return the list of movies liked by the user', async () => {
    const response = await api
      .get('/movie/likes')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('User Endpoints', () => {
  it('should return the authenticated user data', async () => {
    const response = await api
      .get('/user/me')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body.status).toBe('OK');
    expect(response.body.payload).toHaveProperty('login');
    expect(response.body.payload).toHaveProperty('name');
  });
});
