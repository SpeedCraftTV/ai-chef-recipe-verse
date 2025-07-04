import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  cook_time: number;
  servings: number;
  view_count: number;
  is_published: boolean;
  is_featured: boolean;
  category_id: string;
  categories: { name: string } | null;
  created_at: string;
}

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select(`
          *,
          categories (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecipes(data || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les recettes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('recipes')
        .update({ is_published: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      setRecipes(recipes.map(recipe => 
        recipe.id === id 
          ? { ...recipe, is_published: !currentStatus }
          : recipe
      ));

      toast({
        title: "Succès",
        description: `Recette ${!currentStatus ? 'publiée' : 'dépubliée'}`,
      });
    } catch (error) {
      console.error('Error updating recipe:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier la recette",
        variant: "destructive",
      });
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('recipes')
        .update({ is_featured: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      setRecipes(recipes.map(recipe => 
        recipe.id === id 
          ? { ...recipe, is_featured: !currentStatus }
          : recipe
      ));

      toast({
        title: "Succès",
        description: `Recette ${!currentStatus ? 'mise en avant' : 'retirée des mises en avant'}`,
      });
    } catch (error) {
      console.error('Error updating recipe:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier la recette",
        variant: "destructive",
      });
    }
  };

  const deleteRecipe = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRecipes(recipes.filter(recipe => recipe.id !== id));
      toast({
        title: "Succès",
        description: "Recette supprimée",
      });
    } catch (error) {
      console.error('Error deleting recipe:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la recette",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestion des Recettes</h1>
        </div>
        <Card></Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Recettes</h1>
          <p className="text-muted-foreground">
            Gérez vos recettes et leur contenu
          </p>
        </div>
        <Link to="/admin/recipes/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle recette
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Toutes les recettes ({recipes.length})</CardTitle>
          <CardDescription>
            Liste complète de vos recettes avec actions de gestion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Difficulté</TableHead>
                <TableHead>Temps</TableHead>
                <TableHead>Vues</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{recipe.title}</div>
                      {recipe.is_featured && (
                        <Badge variant="secondary" className="mt-1">
                          En vedette
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {recipe.categories?.name || 'Sans catégorie'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      recipe.difficulty === 'Facile' ? 'default' :
                      recipe.difficulty === 'Moyen' ? 'secondary' : 'destructive'
                    }>
                      {recipe.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>{recipe.cook_time} min</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {recipe.view_count}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={recipe.is_published ? 'default' : 'secondary'}>
                      {recipe.is_published ? 'Publié' : 'Brouillon'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Link to={`/admin/recipes/edit/${recipe.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePublished(recipe.id, recipe.is_published)}
                      >
                        {recipe.is_published ? 'Dépublier' : 'Publier'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFeatured(recipe.id, recipe.is_featured)}
                      >
                        {recipe.is_featured ? 'Retirer' : 'Vedette'}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteRecipe(recipe.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeManagement;