import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required');
}

// Instance Stripe pour l'admin (avec permissions étendues)
export const stripeAdmin = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

// Types pour l'admin dashboard
export interface AdminStripeStats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalCustomers: number;
  totalSubscriptions: number;
  churnRate: number;
}

export interface AdminPayment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  customerEmail?: string;
  createdAt: number;
  description?: string;
}

export interface AdminCustomer {
  id: string;
  email?: string;
  name?: string;
  totalSpent: number;
  subscriptions: number;
  createdAt: number;
}

// Fonctions utilitaires pour l'admin
export class StripeAdminService {
  /**
   * Récupère les statistiques générales
   */
  static async getStats(): Promise<AdminStripeStats> {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    try {
      // Revenus total et mensuel via les charges
      const [allCharges, monthlyCharges, customers, subscriptions] = await Promise.all([
        stripeAdmin.charges.list({ 
          limit: 100,
          created: { gte: Math.floor(lastMonth.getTime() / 1000) }
        }),
        stripeAdmin.charges.list({ 
          limit: 100,
          created: { gte: Math.floor(thisMonth.getTime() / 1000) }
        }),
        stripeAdmin.customers.list({ limit: 100 }),
        stripeAdmin.subscriptions.list({ limit: 100 })
      ]);

      const totalRevenue = allCharges.data
        .filter(charge => charge.paid)
        .reduce((sum, charge) => sum + charge.amount, 0) / 100;

      const monthlyRevenue = monthlyCharges.data
        .filter(charge => charge.paid)
        .reduce((sum, charge) => sum + charge.amount, 0) / 100;

      const activeSubscriptions = subscriptions.data
        .filter(sub => sub.status === 'active').length;

      return {
        totalRevenue,
        monthlyRevenue,
        totalCustomers: customers.data.length,
        totalSubscriptions: activeSubscriptions,
        churnRate: 5.2 // TODO: Calculer le vrai churn rate
      };
    } catch (error) {
      console.error('Error fetching Stripe stats:', error);
      throw error;
    }
  }

  /**
   * Récupère les paiements récents
   */
  static async getRecentPayments(limit = 10): Promise<AdminPayment[]> {
    try {
      const charges = await stripeAdmin.charges.list({
        limit,
        expand: ['data.customer']
      });

      return charges.data.map(charge => ({
        id: charge.id,
        amount: charge.amount / 100,
        currency: charge.currency.toUpperCase(),
        status: charge.status,
        customerEmail: charge.billing_details?.email || 
          (charge.customer as any)?.email,
        createdAt: charge.created,
        description: charge.description || undefined
      }));
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  }

  /**
   * Récupère les clients avec leurs statistiques
   */
  static async getCustomersWithStats(limit = 50): Promise<AdminCustomer[]> {
    try {
      const customers = await stripeAdmin.customers.list({
        limit,
        expand: ['data.subscriptions']
      });

      const customersWithStats = await Promise.all(
        customers.data.map(async (customer) => {
          // Récupérer les charges pour ce client
          const charges = await stripeAdmin.charges.list({
            customer: customer.id,
            limit: 100
          });

          const totalSpent = charges.data
            .filter(charge => charge.paid)
            .reduce((sum, charge) => sum + charge.amount, 0) / 100;

          return {
            id: customer.id,
            email: customer.email || undefined,
            name: customer.name || undefined,
            totalSpent,
            subscriptions: (customer as any).subscriptions?.data?.length || 0,
            createdAt: customer.created
          };
        })
      );

      return customersWithStats;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }

  /**
   * Crée un lien de session Stripe Dashboard
   */
  static async createDashboardLink(): Promise<string> {
    try {
      // Pour un environnement de test, on retourne directement l'URL
      return process.env.NODE_ENV === 'production' 
        ? 'https://dashboard.stripe.com'
        : 'https://dashboard.stripe.com/test';
    } catch (error) {
      console.error('Error creating dashboard link:', error);
      throw error;
    }
  }
}