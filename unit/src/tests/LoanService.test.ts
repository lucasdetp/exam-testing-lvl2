import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LoanService } from '../LoanService';
import { Book } from '../Book';
import { User } from '../User';
import { UserCategory } from '../types';

describe('LoanService', () => {
  let service: LoanService;
  let book: Book;
  let user: User;

  beforeEach(() => {
    service = new LoanService();
    book = new Book('1', '1984', 'George Orwell');
    user = new User('u1', 'Alice', 'alice@mail.com', 'standard');
    service.addBook(book);
    service.addUser(user);
  });

  describe('Gestion des livres et utilisateurs', () => {
    it('ajoute et récupère un livre', () => {
      expect(service.getBook('1')).toBe(book);
    });
    it('ajoute et récupère un utilisateur', () => {
      expect(service.getUser('u1')).toBe(user);
    });
  });

  describe('Emprunt de livre', () => {
    it('permet à un utilisateur d\'emprunter un livre disponible', () => {
      const result = service.borrowBook('1', 'u1');
      expect(result).toBe(true);
      expect(book.isBorrowed()).toBe(true);
      expect(book.borrowedBy).toBe('u1');
      expect(user.currentLoans).toContain('1');
    });

    it('refuse l\'emprunt si le livre est déjà emprunté', () => {
      service.borrowBook('1', 'u1');
      const user2 = new User('u2', 'Bob', 'bob@mail.com', 'standard');
      service.addUser(user2);
      const result = service.borrowBook('1', 'u2');
      expect(result).toBe(false);
    });

    it('refuse l\'emprunt si l\'utilisateur a atteint sa limite', () => {
      const spy = vi.spyOn(user, 'canBorrow').mockReturnValue(false);
      const result = service.borrowBook('1', 'u1');
      expect(result).toBe(false);
      spy.mockRestore();
    });

    it('refuse l\'emprunt si le livre ou l\'utilisateur n\'existe pas', () => {
      expect(service.borrowBook('999', 'u1')).toBe(false);
      expect(service.borrowBook('1', 'u999')).toBe(false);
    });
  });

  describe('Retour de livre', () => {
    it('retourne un livre et calcule la pénalité de retard', () => {
      service.borrowBook('1', 'u1', new Date('2024-01-01'));
      const penalty = service.returnBook('1', new Date('2024-01-20'));
      expect(penalty).toBe(2.5); // 5 jours de retard
      expect(book.isAvailable()).toBe(true);
      expect(user.currentLoans).not.toContain('1');
    });

    it('retourne un livre sans pénalité si rendu à temps', () => {
      service.borrowBook('1', 'u1', new Date('2024-01-01'));
      const penalty = service.returnBook('1', new Date('2024-01-10'));
      expect(penalty).toBe(0);
      expect(book.isAvailable()).toBe(true);
    });

    it('retourne -1 si le livre n\'existe pas ou n\'est pas emprunté', () => {
      expect(service.returnBook('999')).toBe(-1);
      expect(service.returnBook('1')).toBe(-1);
    });
  });

  describe('Consultation', () => {
    it('liste les livres empruntés et disponibles', () => {
      expect(service.getAvailableBooks()).toContain(book);
      service.borrowBook('1', 'u1');
      expect(service.getBorrowedBooks()).toContain(book);
      expect(service.getAvailableBooks()).not.toContain(book);
    });

    it('récupère les livres empruntés par un utilisateur', () => {
      service.borrowBook('1', 'u1');
      expect(service.getUserLoans('u1')).toContain(book);
    });

    it('récupère les livres en retard', () => {
      service.borrowBook('1', 'u1', new Date('2024-01-01'));
      const overdue = service.getOverdueBooks(new Date('2024-02-01'));
      expect(overdue).toContain(book);
    });
  });
}); 