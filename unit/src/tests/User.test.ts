import { describe, it, expect, beforeEach } from 'vitest';
import { User } from '../User';

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = new User('u1', 'Alice', 'alice@mail.com', 'standard');
  });

  it('crée un utilisateur avec les bonnes propriétés', () => {
    expect(user.id).toBe('u1');
    expect(user.name).toBe('Alice');
    expect(user.email).toBe('alice@mail.com');
    expect(user.category).toBe('standard');
    expect(user.currentLoans).toEqual([]);
  });

  it('permet d\'emprunter tant que la limite n\'est pas atteinte', () => {
    expect(user.canBorrow()).toBe(true);
    user.addLoan('b1');
    user.addLoan('b2');
    user.addLoan('b3');
    expect(user.canBorrow()).toBe(false);
  });

  it('n\'ajoute pas deux fois le même emprunt', () => {
    user.addLoan('b1');
    user.addLoan('b1');
    expect(user.currentLoans).toEqual(['b1']);
  });

  it('retire un emprunt correctement', () => {
    user.addLoan('b1');
    user.addLoan('b2');
    user.removeLoan('b1');
    expect(user.currentLoans).toEqual(['b2']);
  });

  it('gère la limite pour les catégories premium et employee', () => {
    const premium = new User('u2', 'Bob', 'bob@mail.com', 'premium');
    for (let i = 0; i < 5; i++) premium.addLoan(`b${i}`);
    expect(premium.canBorrow()).toBe(false);
    const employee = new User('u3', 'Eve', 'eve@mail.com', 'employee');
    for (let i = 0; i < 8; i++) employee.addLoan(`b${i}`);
    expect(employee.canBorrow()).toBe(false);
  });

  it('retourne true pour canBorrow si aucun emprunt', () => {
    expect(user.canBorrow()).toBe(true);
  });
}); 