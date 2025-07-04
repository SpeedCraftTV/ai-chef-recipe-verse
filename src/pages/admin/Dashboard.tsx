import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Folder, Lightbulb, Eye, TrendingUp, Users } from 'lucide-react';

interface Stats {
  totalRecipes: number;
  totalCategories: number;
  pendingSuggestions: number;
  totalViews: number;
  todayViews: number;
  totalUsers: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalRecipes: 0,
    totalCategories: 0,
    pendingSuggestions: 0,
    totalViews: 0,
    todayViews: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get recipes count
        const { count: recipesCount } = await supabase
          .from('recipes')
          .select('*', { count: 'exact', head: true });

        // Get categories count
        const { count: categoriesCount } = await supabase
          .from('categories')
          .select('*', { count: 'exact', head: true });

        // Get pending suggestions count
        const { count: suggestionsCount } = await supabase
          .from('ai_suggestions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        // Get total page views
        const { count: totalViewsCount } = await supabase
          .from('page_views')
          .select('*', { count: 'exact', head: true });

        // Get today's views
        const today = new Date().toISOString().split('T')[0];
        const { count: todayViewsCount } = await supabase
          .from('page_views')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', `${today}T00:00:00`);

        // Get users count
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        setStats({
          totalRecipes: recipesCount || 0,
          totalCategories: categoriesCount || 0,
          pendingSuggestions: suggestionsCount || 0,
          totalViews: totalViewsCount || 0,
          todayViews: todayViewsCount || 0,
          totalUsers: usersCount || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Recettes',
      value: stats.totalRecipes,
      description: 'Recettes publiées',
      icon: ChefHat,
      color: 'text-primary'
    },
    {
      title: 'Catégories',
      value: stats.totalCategories,
      description: 'Catégories actives',
      icon: Folder,
      color: 'text-success'
    },
    {
      title: 'Suggestions en attente',
      value: stats.pendingSuggestions,
      description: 'Suggestions IA à valider',
      icon: Lightbulb,
      color: 'text-warning'
    },
    {
      title: 'Vues totales',
      value: stats.totalViews,
      description: 'Pages vues au total',
      icon: Eye,
      color: 'text-info'
    },
    {
      title: "Vues aujourd'hui",
      value: stats.todayViews,
      description: 'Pages vues aujourd\'hui',
      icon: TrendingUp,
      color: 'text-success'
    },
    {
      title: 'Utilisateurs',
      value: stats.totalUsers,
      description: 'Utilisateurs inscrits',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="animate-pulse">
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="h-8 bg-muted rounded w-16"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble de votre site de recettes
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <CardDescription className="text-xs text-muted-foreground">
                  {card.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Accès rapide aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Gestion du contenu</p>
              <div className="grid grid-cols-2 gap-2">
                <a href="/admin/recipes/new" className="text-sm text-primary hover:underline">
                  Nouvelle recette
                </a>
                <a href="/admin/categories" className="text-sm text-primary hover:underline">
                  Gérer catégories
                </a>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Modération</p>
              <div className="grid grid-cols-2 gap-2">
                <a href="/admin/suggestions" className="text-sm text-primary hover:underline">
                  Valider suggestions
                </a>
                <a href="/admin/analytics" className="text-sm text-primary hover:underline">
                  Voir analytics
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques rapides</CardTitle>
            <CardDescription>
              Aperçu de l'activité récente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Croissance utilisateurs</span>
                <span className="text-sm font-medium text-success">+12%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Recettes populaires</span>
                <span className="text-sm font-medium">Top 10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Taux d'engagement</span>
                <span className="text-sm font-medium text-success">78%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;