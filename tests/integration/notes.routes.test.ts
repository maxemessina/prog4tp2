import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { makeApp } from '../../src/app';

describe('Notes routes - GET /notes/:id (Ejercicio 3)', () => {
  let app: ReturnType<typeof makeApp>;

  beforeEach(() => {
    app = makeApp(':memory:');
  });

it('obtiene una nota existente por su id', async () => {
  const createdResponse = await request(app)
    .post('/notes')
    .send({
      title: 'Comprar pan',
      content: 'Antes de las 20hs'
    });

  const noteId = createdResponse.body.id;

  const response = await request(app)
    .get(`/notes/${noteId}`);

  expect(response.status).toBe(200);
  expect(response.body.id).toBe(noteId);
  expect(response.body.title).toBe('Comprar pan');
  expect(response.body.content).toBe('Antes de las 20hs');
});

  it('devuelve 404 si la nota no existe', async () => {
    const response = await request(app)
      .get('/notes/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'NotFound' });
  });
});