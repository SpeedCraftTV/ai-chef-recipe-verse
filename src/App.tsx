import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";

const RecipeApp = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">🍳 CuisineAI</h1>
            </div>
            <nav className="flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-gray-900">Accueil</a>
              <a href="#recipes" className="text-gray-700 hover:text-gray-900">Recettes</a>
              <a href="#generator" className="text-gray-700 hover:text-gray-900">Générateur</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Découvrez la cuisine avec l'Intelligence Artificielle
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Créez des recettes personnalisées, explorez de nouvelles saveurs et 
            transformez votre façon de cuisiner grâce à notre IA culinaire avancée.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Commencer à cuisiner
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition">
              Voir les recettes
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="home" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Fonctionnalités principales
            </h3>
            <p className="text-xl text-gray-600">
              Tout ce dont vous avez besoin pour révolutionner votre cuisine
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="text-xl font-semibold mb-3">Génération IA</h4>
              <p className="text-gray-600">
                Créez des recettes uniques basées sur vos ingrédients et préférences
              </p>
            </div>
            
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">📱</div>
              <h4 className="text-xl font-semibold mb-3">Interface moderne</h4>
              <p className="text-gray-600">
                Design intuitif et responsive pour une expérience optimale
              </p>
            </div>
            
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🔐</div>
              <h4 className="text-xl font-semibold mb-3">Sécurisé</h4>
              <p className="text-gray-600">
                Authentification sécurisée avec base de données PostgreSQL
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="recipes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Catégories populaires
            </h3>
            <p className="text-xl text-gray-600">
              Explorez nos recettes par catégorie
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Entrées", emoji: "🥗", count: "25+" },
              { name: "Plats principaux", emoji: "🍝", count: "50+" },
              { name: "Desserts", emoji: "🍰", count: "30+" },
              { name: "Boissons", emoji: "🥤", count: "20+" }
            ].map((category) => (
              <div key={category.name} className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-3">{category.emoji}</div>
                <h4 className="font-semibold text-gray-900">{category.name}</h4>
                <p className="text-sm text-gray-600">{category.count} recettes</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section id="generator" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Générateur de recettes IA
          </h3>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-lg text-white">
            <h4 className="text-xl font-semibold mb-4">
              Créez votre recette personnalisée
            </h4>
            <p className="mb-6">
              Entrez vos ingrédients et préférences, notre IA créera une recette unique pour vous
            </p>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg">
              <div className="text-sm text-left text-white mb-4">
                <strong>Fonctionnalité disponible :</strong>
                <ul className="mt-2 space-y-1">
                  <li>• Génération basée sur les ingrédients</li>
                  <li>• Prise en compte des allergies</li>
                  <li>• Adaptation aux régimes alimentaires</li>
                  <li>• Instructions détaillées</li>
                </ul>
              </div>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Commencer la génération
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">CuisineAI</h4>
              <p className="text-gray-400">
                Révolutionnez votre cuisine avec l'intelligence artificielle
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Fonctionnalités</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Génération de recettes</li>
                <li>Gestion des préférences</li>
                <li>Interface moderne</li>
                <li>Sécurité avancée</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Technologies</h4>
              <ul className="space-y-2 text-gray-400">
                <li>React & TypeScript</li>
                <li>PostgreSQL</li>
                <li>Express.js</li>
                <li>Intelligence Artificielle</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CuisineAI. Déployé avec succès sur Render.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<RecipeApp />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
