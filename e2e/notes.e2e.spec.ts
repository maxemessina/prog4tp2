import { expect, test } from '@playwright/test';
import { resetAndSeed } from './helpers';

test('completa el flujo de listar, leer, crear, modificar y eliminar notas', async ({
  request,
  baseURL
}) => {
  if (!baseURL) {
    throw new Error('Playwright debe configurar baseURL para ejecutar los tests E2E');
  }

  const { created: seededNotes } = await resetAndSeed(baseURL);
  expect(seededNotes).toHaveLength(2);

  const listResponse = await request.get('/notes');
  expect(listResponse.status()).toBe(200);
  const notes = await listResponse.json();
  expect(notes).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ title: 'Comprar pan' }),
      expect.objectContaining({ title: 'Llamar al dentista' })
    ])
  );

  const getResponse = await request.get(`/notes/${seededNotes[0].id}`);
  expect(getResponse.status()).toBe(200);
  expect(await getResponse.json()).toMatchObject({ title: 'Comprar pan' });

  const createResponse = await request.post('/notes', {
    data: { title: 'Preparar parcial', content: 'Repasar ejercicios', pinned: false }
  });
  expect(createResponse.status()).toBe(201);
  const createdNote = await createResponse.json();
  expect(createdNote).toMatchObject({
    title: 'Preparar parcial',
    content: 'Repasar ejercicios',
    pinned: false
  });

  const updateResponse = await request.patch(`/notes/${createdNote.id}`, {
    data: { content: 'Repasar ejercicios de testing' }
  });
  expect(updateResponse.status()).toBe(200);
  expect(await updateResponse.json()).toMatchObject({
    title: 'Preparar parcial',
    content: 'Repasar ejercicios de testing'
  });

  const deleteResponse = await request.delete(`/notes/${createdNote.id}`);
  expect(deleteResponse.status()).toBe(204);
});

test('rechaza crear una nota con campos inválidos', async ({ request, baseURL }) => {
  if (!baseURL) {
    throw new Error('Playwright debe configurar baseURL para ejecutar los tests E2E');
  }

  await resetAndSeed(baseURL);

  const response = await request.post('/notes', {
    data: { title: '', content: 'Contenido válido' }
  });

  expect(response.status()).toBe(400);
  expect(await response.json()).toMatchObject({ error: 'ValidationError' });
});