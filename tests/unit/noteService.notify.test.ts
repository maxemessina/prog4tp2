import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { notify } from '../../src/services/notificationService';
import { NoteRepository } from '../../src/repositories/NoteRepository';

vi.mock('../../src/services/notificationService', () => ({
  notify: vi.fn(),
  _getSentNotifications: vi.fn(),
  _clearSentNotifications: vi.fn(),
}));

describe('NoteService - Ejercicio 6: Notificación al fijar', () => {
  let noteService: NoteServiceImpl;
  let mockRepo: NoteRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRepo = {
      create: vi.fn().mockImplementation((data: any) => ({
        id: 1,
        title: data.title,
        content: data.content,
        pinned: data.pinned ?? false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })),
      findAll: vi.fn(),
      findById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      clear: vi.fn(),
    };

    noteService = new NoteServiceImpl(mockRepo);
  });

  it('debe llamar a notify cuando se crea una nota con pinned: true', async () => {
    const newNoteData = {
      title: 'Nota importante',
      content: 'Contenido de prueba',
      pinned: true,
    };

    noteService.createNote(newNoteData);

    expect(notify).toHaveBeenCalledTimes(1);
    expect(notify).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Nota importante', pinned: true })
    );
  });

  it('no debe llamar a notify si la nota no está fijada', async () => {
    const newNoteData = {
      title: 'Nota normal',
      content: 'Contenido común',
      pinned: false,
    };

    noteService.createNote(newNoteData);

    expect(notify).not.toHaveBeenCalled();
  });
});