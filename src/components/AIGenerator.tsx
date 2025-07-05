import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Plus, X } from "lucide-react";

const AIGenerator = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [preferences, setPreferences] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const [generatedRecipe, setGeneratedRecipe] = useState<any>(null);

  const generateRecipe = () => {
    setIsGenerating(true);
    
    // Simulation d'une recette générée par IA
    setTimeout(() => {
      const mockRecipe = {
        title: `Recette aux ${ingredients.slice(0, 2).join(' et ')}`,
        description: `Une délicieuse recette créée avec vos ingrédients : ${ingredients.join(', ')}.`,
        prepTime: Math.floor(Math.random() * 20) + 10,
        cookTime: Math.floor(Math.random() * 30) + 15,
        servings: Math.floor(Math.random() * 4) + 2,
        difficulty: ['Facile', 'Moyen', 'Difficile'][Math.floor(Math.random() * 3)],
        ingredients: ingredients.map(ing => ({
          name: ing,
          quantity: `${Math.floor(Math.random() * 300) + 100}g`
        })).concat([
          { name: 'Huile d\'olive', quantity: '2 c. à soupe' },
          { name: 'Sel', quantity: '1 c. à café' },
          { name: 'Poivre', quantity: 'Au goût' }
        ]),
        instructions: [
          'Préparez tous vos ingrédients et lavez-les soigneusement.',
          `Commencez par faire chauffer l'huile dans une poêle.`,
          `Ajoutez ${ingredients[0] || 'les ingrédients principaux'} et faites cuire 5 minutes.`,
          'Assaisonnez avec le sel et le poivre selon votre goût.',
          `Incorporez le reste des ingrédients : ${ingredients.slice(1).join(', ')}.`,
          'Laissez mijoter pendant 10-15 minutes à feu moyen.',
          'Goûtez et ajustez l\'assaisonnement si nécessaire.',
          'Servez chaud et dégustez !'
        ],
        nutritionalInfo: {
          calories: Math.floor(Math.random() * 200) + 300,
          proteins: Math.floor(Math.random() * 15) + 10,
          carbs: Math.floor(Math.random() * 30) + 20,
          fats: Math.floor(Math.random() * 10) + 5
        },
        tips: preferences ? `Conseil basé sur vos préférences : ${preferences}` : 'N\'hésitez pas à adapter les quantités selon vos goûts !'
      };
      
      setGeneratedRecipe(mockRecipe);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-medium text-primary">Générateur IA</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Créez votre recette personnalisée
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Entrez vos ingrédients disponibles et vos préférences. Notre IA créera une recette unique pour vous.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulaire */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Mes ingrédients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Ajout ingrédients */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Ex: tomates, basilic, mozzarella..."
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={addIngredient} disabled={!currentIngredient.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Liste des ingrédients */}
              <div className="flex flex-wrap gap-2 min-h-[60px]">
                {ingredients.map((ingredient) => (
                  <Badge 
                    key={ingredient} 
                    variant="secondary" 
                    className="px-3 py-1 cursor-pointer hover:bg-destructive/20 transition-colors"
                    onClick={() => removeIngredient(ingredient)}
                  >
                    {ingredient}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {ingredients.length === 0 && (
                  <p className="text-muted-foreground text-sm py-4">
                    Ajoutez des ingrédients pour commencer...
                  </p>
                )}
              </div>
            </div>

            {/* Préférences */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Préférences (optionnel)</label>
              <Textarea
                placeholder="Ex: végétarien, sans gluten, cuisine italienne, temps de préparation 30min max..."
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                rows={4}
              />
            </div>

            {/* Bouton génération */}
            <Button 
              onClick={generateRecipe}
              disabled={ingredients.length === 0 || isGenerating}
              className="w-full"
              variant="hero"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                  Génération en cours...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Générer ma recette
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Aperçu/Résultat */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Votre recette générée</CardTitle>
          </CardHeader>
          <CardContent>
            {!isGenerating && !generatedRecipe && ingredients.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Ajoutez des ingrédients pour voir la magie opérer !</p>
              </div>
            ) : isGenerating ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">L'IA analyse vos ingrédients...</p>
              </div>
            ) : generatedRecipe ? (
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-xl font-bold text-foreground mb-2">{generatedRecipe.title}</h3>
                  <p className="text-muted-foreground mb-4">{generatedRecipe.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">⏱️ Préparation:</span>
                      <span>{generatedRecipe.prepTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">🔥 Cuisson:</span>
                      <span>{generatedRecipe.cookTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">👥 Portions:</span>
                      <span>{generatedRecipe.servings}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">📊 Difficulté:</span>
                      <Badge variant="secondary">{generatedRecipe.difficulty}</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">📝 Ingrédients</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {generatedRecipe.ingredients.map((ing: any, idx: number) => (
                      <div key={idx} className="flex justify-between p-2 bg-muted/20 rounded">
                        <span>{ing.name}</span>
                        <span className="font-medium">{ing.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">👩‍🍳 Instructions</h4>
                  <div className="space-y-3">
                    {generatedRecipe.instructions.map((step: string, idx: number) => (
                      <div key={idx} className="flex gap-3 p-3 bg-muted/10 rounded">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">🍎 Informations nutritionnelles</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 bg-muted/20 rounded text-center">
                      <div className="font-semibold">{generatedRecipe.nutritionalInfo.calories}</div>
                      <div className="text-xs text-muted-foreground">Calories</div>
                    </div>
                    <div className="p-2 bg-muted/20 rounded text-center">
                      <div className="font-semibold">{generatedRecipe.nutritionalInfo.proteins}g</div>
                      <div className="text-xs text-muted-foreground">Protéines</div>
                    </div>
                    <div className="p-2 bg-muted/20 rounded text-center">
                      <div className="font-semibold">{generatedRecipe.nutritionalInfo.carbs}g</div>
                      <div className="text-xs text-muted-foreground">Glucides</div>
                    </div>
                    <div className="p-2 bg-muted/20 rounded text-center">
                      <div className="font-semibold">{generatedRecipe.nutritionalInfo.fats}g</div>
                      <div className="text-xs text-muted-foreground">Lipides</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600 text-sm">💡</span>
                    <div>
                      <div className="font-medium text-amber-800 text-sm mb-1">Conseil du chef</div>
                      <p className="text-sm text-amber-700">{generatedRecipe.tips}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => {
                    setGeneratedRecipe(null);
                    setIngredients([]);
                    setPreferences('');
                  }} variant="outline" className="flex-1">
                    Nouvelle recette
                  </Button>
                  <Button onClick={() => {
                    alert('Fonctionnalité de sauvegarde bientôt disponible !');
                  }} className="flex-1">
                    Sauvegarder
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Prêt à générer votre recette !</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIGenerator;