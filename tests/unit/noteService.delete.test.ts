import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - deleteNote (Ejercicio 5)', () => {
  let service: NoteServiceImpl;
  let repo: SqliteNoteRepository;

  beforeEach(() => {
    const db = createDb(':memory:');
    repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('elimina una nota existente', () => {
    const created = repo.create({
      title: 'Comprar pan',
      content: 'Antes de las 20hs'
    });

    const result = service.deleteNote(created.id);

    expect(result).toBe(true);
    expect(repo.findById(created.id)).toBeUndefined();
  });
  it('devuelve false si la nota no existe', () => {
  const result = service.deleteNote(999);

  expect(result).toBe(false);
 });
});