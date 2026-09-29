import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - updateNote (Ejercicio 4)', () => {
  let service: NoteServiceImpl;
  let repo: SqliteNoteRepository;

  beforeEach(() => {
    const db = createDb(':memory:');
    repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('actualiza una nota existente', () => {
    const created = repo.create({
      title: 'Comprar pan',
      content: 'Antes de las 20hs'
    });

    const updated = service.updateNote(created.id, {
      title: 'Comprar leche'
    });

    expect(updated).toBeDefined();
    expect(updated?.id).toBe(created.id);
    expect(updated?.title).toBe('Comprar leche');
    expect(updated?.content).toBe('Antes de las 20hs');
  });

  it('devuelve undefined si la nota no existe', () => {
    const updated = service.updateNote(999, {
      title: 'Algo'
    });

    expect(updated).toBeUndefined();
  });
});