import { describe, it, expect } from 'vitest';
import { Book } from '../Book';

describe('Book', () => {
  it('crée un livre avec les bonnes propriété', () => {
    const book = new Book('1', '1984', 'George Orwell');
    expect(book.id).toBe('1');
    expect(book.title).toBe('1984');
    expect(book.author).toBe('George Orwell');
    expect(book.status).toBe('available');
    expect(book.isAvailable()).toBe(true);
  });

  it('retourne true pour isBorrowed si le livre est emprunte', () => {
    const book = new Book('2', 'Brave New World', 'Aldous Huxley');
    book.status = 'borrowed';
    expect(book.isBorrowed()).toBe(true);
    expect(book.isAvailable()).toBe(false);
  });

  it('retourne true pour isInMaintenance si le livre est en maintenance', () => {
    const book = new Book('3', 'Fahrenheit 451', 'Ray Bradbury');
    book.status = 'maintenance';
    expect(book.isInMaintenance()).toBe(true);
  });

  it('gère correctement les propriétés optionnelles', () => {
    const book = new Book('4', 'Test', 'Auteur');
    expect(book.borrowedBy).toBeUndefined();
    expect(book.borrowDate).toBeUndefined();
    expect(book.dueDate).toBeUndefined();
  });
}); 