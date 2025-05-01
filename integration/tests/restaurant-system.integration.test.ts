import { RestaurantSystem } from '../src/RestaurantService';
import { IProduct, ICustomer, IOrder, IInvoice } from '../src/types';
import { describe, test, expect, beforeEach } from 'vitest';

describe('Tests d\'intégration du système de restaurant', () => {
  let system: RestaurantSystem;
  let client: ICustomer;
  let pizza: IProduct;
  let soda: IProduct;

  beforeEach(() => {
    system = new RestaurantSystem();
    client = system.getCustomerService().createCustomer({
      name: 'Alice Martin',
      email: 'alice@example.com',
      address: '10 avenue de France, 75013 Paris',
      phone: '+33123456789'
    });
    pizza = system.getProductService().createProduct({
      name: 'Pizza Reine',
      description: 'Jambon, champignons, fromage',
      price: 14,
      category: 'main',
      available: true,
      preparationTimeMinutes: 18
    });
    soda = system.getProductService().createProduct({
      name: 'Limonade',
      description: 'Boisson fraîche',
      price: 2.5,
      category: 'drink',
      available: true,
      preparationTimeMinutes: 1
    });
  });

  test('Processus de commande complet', () => {
    const items = [
      { productId: pizza.id, quantity: 2 },
      { productId: soda.id, quantity: 3 }
    ];
    const result = system.processOrder(client.id, items);

    expect(result.order).not.toBeNull();
    expect(result.invoice).not.toBeNull();

    const order = result.order as IOrder;
    const invoice = result.invoice as IInvoice;

    expect(order.customerId).toBe(client.id);
    expect(order.items.length).toBe(2);
    expect(order.totalAmount).toBe(2 * pizza.price + 3 * soda.price);

    expect(invoice.orderId).toBe(order.id);
    expect(invoice.totalAmount).toBe(order.totalAmount);
    expect(invoice.tax).toBe(order.totalAmount * 0.1);

    const paiement = system.getInvoiceService().payInvoice(invoice.id, 'credit_card');
    expect(paiement).toBe(true);
    const facturePayee = system.getInvoiceService().getInvoice(invoice.id);
    expect(facturePayee?.paid).toBe(true);
  });

  test('Attribution des points de fidélité', () => {
    const items = [{ productId: pizza.id, quantity: 1 }];
    const result = system.processOrder(client.id, items);
    expect(result.invoice).not.toBeNull();
    const invoice = result.invoice as IInvoice;
    system.getInvoiceService().payInvoice(invoice.id, 'credit_card');

    const clientMaj = system.getCustomerService().getCustomer(client.id);
    expect(clientMaj?.loyaltyPoints).toBeGreaterThanOrEqual(1);
  });

  test('Disponibilité des produits', () => {
    system.getProductService().updateProductAvailability(pizza.id, false);
    const result = system.processOrder(client.id, [{ productId: pizza.id, quantity: 1 }]);
    expect(result.order).toBeNull();
    expect(result.invoice).toBeNull();

    system.getProductService().updateProductAvailability(pizza.id, true);
    const result2 = system.processOrder(client.id, [{ productId: pizza.id, quantity: 1 }]);
    expect(result2.order).not.toBeNull();
    expect(result2.invoice).not.toBeNull();
  });

  test('Impossible d\'ajouter un produit indisponible à une commande', () => {
    system.getProductService().updateProductAvailability(pizza.id, false);

    const items = [
      { productId: pizza.id, quantity: 1 },
      { productId: soda.id, quantity: 1 }
    ];
    const result = system.processOrder(client.id, items);

    expect(result.order).toBeNull();
    expect(result.invoice).toBeNull();

    const result2 = system.processOrder(client.id, [{ productId: soda.id, quantity: 1 }]);
    expect(result2.order).not.toBeNull();
    expect(result2.invoice).not.toBeNull();
  });

  test('Changements de statut des commandes', () => {
    const items = [{ productId: pizza.id, quantity: 1 }];
    const { order } = system.processOrder(client.id, items);

    expect(order).not.toBeNull();
    if (!order) throw new Error('La commande n\'a pas été créée');

    expect(system.getOrderService().updateOrderStatus(order.id, 'preparing')).toBe(true);
    const maj1 = system.getOrderService().getOrder(order.id);
    expect(maj1?.status).toBe('preparing');

    expect(system.getOrderService().updateOrderStatus(order.id, 'ready')).toBe(true);
    const maj2 = system.getOrderService().getOrder(order.id);
    expect(maj2?.status).toBe('ready');

    expect(system.getOrderService().updateOrderStatus(order.id, 'delivered')).toBe(true);
    const maj3 = system.getOrderService().getOrder(order.id);
    expect(maj3?.status).toBe('delivered');

    expect(system.getOrderService().cancelOrder(order.id)).toBe(false);

    const { order: order2 } = system.processOrder(client.id, items);
    expect(order2).not.toBeNull();
    if (!order2) throw new Error('La commande n\'a pas été créée');
    expect(system.getOrderService().cancelOrder(order2.id)).toBe(true);
    const cancelledOrder = system.getOrderService().getOrder(order2.id);
    expect(cancelledOrder?.status).toBe('cancelled');
  });

  test('Calcul des montants et taxes', () => {
    const items = [
      { productId: pizza.id, quantity: 2 },
      { productId: soda.id, quantity: 3 }
    ];
    const { order, invoice } = system.processOrder(client.id, items);

    expect(order).not.toBeNull();
    expect(invoice).not.toBeNull();
    if (!order || !invoice) throw new Error('Commande ou facture non créée');

    const montantAttendu = pizza.price * 2 + soda.price * 3;
    expect(order.totalAmount).toBeCloseTo(montantAttendu);
    expect(invoice.totalAmount).toBeCloseTo(montantAttendu);

    const taxeAttendue = montantAttendu * 0.1;
    expect(invoice.tax).toBeCloseTo(taxeAttendue);
  });
}); 