import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - getNote (Ejercicio 3)', () => {
  let service: NoteServiceImpl;
  let repo: SqliteNoteRepository;

  beforeEach(() => {
    const db = createDb(':memory:');
    repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('obtiene una nota por su id', () => {
    const created = repo.create({
      title: 'Comprar pan',
      content: 'Antes de las 20hs'
    });

    const note = service.getNote(created.id);

    expect(note).toBeDefined();
    expect(note?.id).toBe(created.id);
    expect(note?.title).toBe('Comprar pan');
    expect(note?.content).toBe('Antes de las 20hs');
  });

  it('devuelve undefined si la nota no existe', () => {
    const note = service.getNote(999);

    expect(note).toBeUndefined();
  });
});