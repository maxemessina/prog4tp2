import { describe, it, expect } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import type { NoteRepository } from '../../src/repositories/NoteRepository';
import type { Note } from '../../src/models/Note';

describe('NoteService - listNotes (Ejercicio 2)', () => {
  it('devuelve una lista vacía si no hay notas', () => {
    const repo: NoteRepository = {
      create: () => {
        throw new Error('No usado');
      },
      findAll: () => [],
      findById: () => undefined,
      update: () => undefined,
      delete: () => false,
      clear: () => {}
    };

    const service = new NoteServiceImpl(repo);

    expect(service.listNotes()).toEqual([]);
  });

  it('devuelve varias notas', () => {
    const notas: Note[] = [
      {
        id: 1,
        title: 'Nota 1',
        content: 'Contenido 1',
        pinned: false,
        createdAt: '2026-09-28T10:00:00.000Z',
        updatedAt: '2026-09-28T10:00:00.000Z'
      },
      {
        id: 2,
        title: 'Nota 2',
        content: 'Contenido 2',
        pinned: true,
        createdAt: '2026-09-28T11:00:00.000Z',
        updatedAt: '2026-09-28T11:00:00.000Z'
      }
    ];

    const repo: NoteRepository = {
      create: () => {
        throw new Error('No usado');
      },
      findAll: () => notas,
      findById: () => undefined,
      update: () => undefined,
      delete: () => false,
      clear: () => {}
    };

    const service = new NoteServiceImpl(repo);

    expect(service.listNotes()).toEqual(notas);
  });
});