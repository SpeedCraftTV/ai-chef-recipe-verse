import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Plus, X, Settings, Edit3 } from "lucide-react";

const AIGenerator = () => {
  // États pour le mode manuel
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [preferences, setPreferences] = useState("");
  
  // États pour le mode automatique
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  
  // États communs
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("manual");

  // Options disponibles
  const preferenceOptions = [
    "Végétarien", "Végétalien", "Sans gluten", "Plat rapide", "Économique", 
    "Plat principal", "Dessert", "Entrée", "Cuisine italienne", "Cuisine française",
    "Cuisine asiatique", "Faible en calories", "Riche en protéines"
  ];

  const allergyOptions = [
    "Arachides", "Gluten", "Lactose", "Œufs", "Fruits de mer", 
    "Noix", "Soja", "Poisson", "Céleri", "Moutarde"
  ];

  // Fonctions pour le mode manuel
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

  // Fonctions pour le mode automatique
  const togglePreference = (preference: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preference) 
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies(prev => 
      prev.includes(allergy) 
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    );
  };

  // Fonction de génération commune
  const generateRecipe = (isAutoMode = false) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let mockRecipe;
      
      if (isAutoMode) {
        // Génération basée sur les filtres
        const recipeTypes = {
          "Dessert": ["Tarte aux pommes", "Mousse au chocolat", "Crème brûlée"],
          "Plat principal": ["Risotto aux champignons", "Saumon grillé", "Pasta carbonara"],
          "Entrée": ["Salade César", "Soupe de légumes", "Carpaccio de bœuf"],
          "Végétarien": ["Buddha Bowl", "Curry de légumes", "Quiche aux épinards"],
          "Végétalien": ["Chili aux haricots", "Salade de quinoa", "Ratatouille"],
          "Sans gluten": ["Salade de riz", "Poisson grillé", "Légumes rôtis"]
        };
        
        let recipeTitle = "Plat du jour";
        let recipeCategory = "Plat principal";
        
        // Choisir le titre selon les préférences
        for (const pref of selectedPreferences) {
          if (recipeTypes[pref]) {
            const options = recipeTypes[pref];
            recipeTitle = options[Math.floor(Math.random() * options.length)];
            recipeCategory = pref;
            break;
          }
        }
        
        // Générer des ingrédients adaptés
        const baseIngredients = [
          { name: 'Huile d\'olive', quantity: '2 c. à soupe' },
          { name: 'Sel', quantity: '1 c. à café' },
          { name: 'Poivre', quantity: 'Au goût' }
        ];
        
        const categoryIngredients = {
          "Végétarien": [
            { name: 'Légumes de saison', quantity: '400g' },
            { name: 'Fromage', quantity: '150g' },
            { name: 'Herbes fraîches', quantity: '1 bouquet' }
          ],
          "Végétalien": [
            { name: 'Légumineuses', quantity: '200g' },
            { name: 'Légumes colorés', quantity: '500g' },
            { name: 'Graines', quantity: '50g' }
          ],
          "Sans gluten": [
            { name: 'Riz ou quinoa', quantity: '200g' },
            { name: 'Protéine au choix', quantity: '300g' },
            { name: 'Légumes frais', quantity: '400g' }
          ]
        };
        
        let specificIngredients = categoryIngredients["Végétarien"]; // par défaut
        for (const pref of selectedPreferences) {
          if (categoryIngredients[pref]) {
            specificIngredients = categoryIngredients[pref];
            break;
          }
        }
        
        // Générer les badges selon les filtres
        const badges = [];
        if (selectedPreferences.includes("Végétarien")) badges.push("100% Végétarien");
        if (selectedPreferences.includes("Végétalien")) badges.push("100% Végétalien");
        if (selectedPreferences.includes("Sans gluten")) badges.push("Sans Gluten");
        if (selectedPreferences.includes("Plat rapide")) badges.push("Préparation Rapide");
        if (selectedAllergies.length > 0) badges.push("Sans Allergènes");
        
        mockRecipe = {
          title: recipeTitle,
          description: `Une délicieuse recette ${recipeCategory.toLowerCase()} adaptée à vos préférences alimentaires.`,
          prepTime: selectedPreferences.includes("Plat rapide") ? 15 : Math.floor(Math.random() * 20) + 20,
          cookTime: selectedPreferences.includes("Plat rapide") ? 20 : Math.floor(Math.random() * 30) + 25,
          servings: Math.floor(Math.random() * 4) + 2,
          difficulty: selectedPreferences.includes("Plat rapide") ? 'Facile' : ['Facile', 'Moyen', 'Difficile'][Math.floor(Math.random() * 3)],
          ingredients: [...specificIngredients, ...baseIngredients],
          instructions: [
            'Préparez tous vos ingrédients selon vos préférences alimentaires.',
            'Commencez par nettoyer et découper tous les légumes.',
            'Faites chauffer l\'huile dans une poêle ou casserole adaptée.',
            'Cuisez les ingrédients principaux selon leur temps de cuisson.',
            'Assaisonnez selon vos goûts en évitant vos allergènes.',
            'Laissez mijoter à feu doux pour développer les saveurs.',
            'Goûtez et ajustez l\'assaisonnement si nécessaire.',
            'Servez chaud et savourez ce plat adapté à vos besoins !'
          ],
          nutritionalInfo: {
            calories: selectedPreferences.includes("Faible en calories") ? 250 : Math.floor(Math.random() * 200) + 350,
            proteins: selectedPreferences.includes("Riche en protéines") ? 25 : Math.floor(Math.random() * 15) + 12,
            carbs: Math.floor(Math.random() * 30) + 20,
            fats: Math.floor(Math.random() * 10) + 8
          },
          tips: `Conseil personnalisé : Cette recette respecte vos préférences ${selectedPreferences.join(', ')}${selectedAllergies.length > 0 ? ' et évite vos allergènes (' + selectedAllergies.join(', ') + ')' : ''}.`,
          badges: badges
        };
      } else {
        // Génération manuelle (code existant adapté)
        mockRecipe = {
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
            'Commencez par faire chauffer l\'huile dans une poêle.',
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
          tips: preferences ? `Conseil basé sur vos préférences : ${preferences}` : 'N\'hésitez pas à adapter les quantités selon vos goûts !',
          badges: []
        };
      }
      
      setGeneratedRecipe(mockRecipe);
      setIsGenerating(false);
    }, 2000);
  };

  const resetForm = () => {
    setGeneratedRecipe(null);
    setIngredients([]);
    setCurrentIngredient("");
    setPreferences("");
    setSelectedPreferences([]);
    setSelectedAllergies([]);
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
          Choisissez votre mode de génération : manuel avec vos ingrédients ou automatique avec vos préférences.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulaire avec onglets */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Mode de génération
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual" className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Manuel
                </TabsTrigger>
                <TabsTrigger value="auto" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Automatique
                </TabsTrigger>
              </TabsList>

              {/* Mode Manuel */}
              <TabsContent value="manual" className="space-y-6 mt-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Mes ingrédients</label>
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
                  
                  <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border rounded-md">
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
                      <p className="text-muted-foreground text-sm py-2">
                        Ajoutez des ingrédients pour commencer...
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Préférences (optionnel)</label>
                  <Textarea
                    placeholder="Ex: végétarien, sans gluten, cuisine italienne, temps de préparation 30min max..."
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={() => generateRecipe(false)}
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
              </TabsContent>

              {/* Mode Automatique */}
              <TabsContent value="auto" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Préférences alimentaires</label>
                    <div className="grid grid-cols-2 gap-2">
                      {preferenceOptions.map((pref) => (
                        <div key={pref} className="flex items-center space-x-2">
                          <Checkbox
                            id={pref}
                            checked={selectedPreferences.includes(pref)}
                            onCheckedChange={() => togglePreference(pref)}
                          />
                          <label htmlFor={pref} className="text-sm cursor-pointer">
                            {pref}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Allergies à éviter</label>
                    <div className="grid grid-cols-2 gap-2">
                      {allergyOptions.map((allergy) => (
                        <div key={allergy} className="flex items-center space-x-2">
                          <Checkbox
                            id={allergy}
                            checked={selectedAllergies.includes(allergy)}
                            onCheckedChange={() => toggleAllergy(allergy)}
                          />
                          <label htmlFor={allergy} className="text-sm cursor-pointer">
                            {allergy}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {(selectedPreferences.length > 0 || selectedAllergies.length > 0) && (
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Résumé de vos choix:</h4>
                      <div className="space-y-1">
                        {selectedPreferences.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            <strong>Préférences:</strong> {selectedPreferences.join(', ')}
                          </p>
                        )}
                        {selectedAllergies.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            <strong>Allergies évitées:</strong> {selectedAllergies.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={() => generateRecipe(true)}
                  disabled={(selectedPreferences.length === 0 && selectedAllergies.length === 0) || isGenerating}
                  className="w-full"
                  variant="hero"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                      Génération automatique...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Générer automatiquement
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Aperçu/Résultat */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Votre recette générée</CardTitle>
          </CardHeader>
          <CardContent>
            {!isGenerating && !generatedRecipe ? (
              <div className="text-center py-12 text-muted-foreground">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Choisissez vos {activeTab === 'manual' ? 'ingrédients' : 'préférences'} pour voir la magie opérer !</p>
              </div>
            ) : isGenerating ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">
                  L'IA {activeTab === 'manual' ? 'analyse vos ingrédients' : 'crée une recette sur mesure'}...
                </p>
              </div>
            ) : generatedRecipe ? (
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground">{generatedRecipe.title}</h3>
                    {generatedRecipe.badges && generatedRecipe.badges.length > 0 && (
                      <div className="flex flex-wrap gap-1 ml-2">
                        {generatedRecipe.badges.map((badge: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
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
                  <Button onClick={resetForm} variant="outline" className="flex-1">
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