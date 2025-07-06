import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";

const CuisineAIApp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header moderne */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">🍳</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CuisineAI
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#accueil" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Accueil</a>
              <a href="#recettes" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Recettes</a>
              <a href="#generateur" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Générateur IA</a>
              <a href="#blog" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Blog</a>
            </nav>
            <div className="flex space-x-3">
              <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors">
                Connexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Révolutionnez votre
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                cuisine avec l'IA
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
              Créez des recettes personnalisées, explorez de nouvelles saveurs et 
              transformez votre façon de cuisiner grâce à notre intelligence artificielle avancée.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                🚀 Générer une recette
              </button>
              <button className="border-2 border-purple-600 text-purple-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300">
                🍽️ Découvrir les recettes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnalités principales */}
      <section id="accueil" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Fonctionnalités révolutionnaires
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez tous les outils dont vous avez besoin pour transformer votre expérience culinaire
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-6xl mb-6">🤖</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">IA Culinaire Avancée</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Notre intelligence artificielle analyse vos ingrédients et crée des recettes uniques 
                adaptées à vos goûts et restrictions alimentaires.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-6xl mb-6">📱</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Interface Intuitive</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Design moderne et responsive pour une expérience utilisateur optimale 
                sur tous vos appareils, partout où vous cuisinez.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-6xl mb-6">🔐</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Sécurité Maximale</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Vos données sont protégées avec une authentification sécurisée 
                et une base de données PostgreSQL cryptée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catégories de recettes */}
      <section id="recettes" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Explorez par catégorie
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des milliers de recettes organisées pour tous vos besoins culinaires
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Entrées", emoji: "🥗", count: "156 recettes", color: "from-green-400 to-emerald-500" },
              { name: "Plats principaux", emoji: "🍝", count: "342 recettes", color: "from-orange-400 to-red-500" },
              { name: "Desserts", emoji: "🍰", count: "89 recettes", color: "from-pink-400 to-rose-500" },
              { name: "Boissons", emoji: "🥤", count: "67 recettes", color: "from-blue-400 to-indigo-500" }
            ].map((category, index) => (
              <div key={index} className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className={`text-5xl mb-4 p-4 rounded-full bg-gradient-to-r ${category.color} w-20 h-20 flex items-center justify-center mx-auto`}>
                  <span className="filter drop-shadow-lg">{category.emoji}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h4>
                <p className="text-gray-600 font-medium">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Générateur IA */}
      <section id="generateur" className="py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Générateur de Recettes IA
            </h3>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Révolutionnez votre cuisine ! Entrez simplement vos ingrédients disponibles, 
              vos préférences alimentaires, et laissez notre IA créer des recettes personnalisées 
              qui vous surprendront à chaque fois.
            </p>
            
            <div className="bg-white/20 backdrop-blur p-8 rounded-2xl mb-10">
              <h4 className="text-2xl font-bold text-white mb-6">🌟 Fonctionnalités Premium</h4>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-center text-white/90">
                    <span className="mr-3">✨</span>
                    <span>Génération basée sur vos ingrédients</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="mr-3">🥜</span>
                    <span>Prise en compte des allergies</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-white/90">
                    <span className="mr-3">🌱</span>
                    <span>Adaptation aux régimes alimentaires</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="mr-3">📝</span>
                    <span>Instructions détaillées étape par étape</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="bg-white text-purple-600 px-12 py-4 rounded-full font-bold text-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl">
              🚀 Commencer la génération
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">🍳</span>
                </div>
                <h4 className="text-2xl font-bold">CuisineAI</h4>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Révolutionnez votre cuisine avec l'intelligence artificielle. 
                Créez, découvrez et partagez des recettes uniques adaptées à vos goûts.
              </p>
              <div className="flex space-x-4">
                <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full transition-colors">
                  Newsletter
                </button>
                <button className="border border-gray-600 hover:border-white px-6 py-2 rounded-full transition-colors">
                  Contact
                </button>
              </div>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">Fonctionnalités</h5>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Génération de recettes</li>
                <li className="hover:text-white transition-colors cursor-pointer">Gestion des préférences</li>
                <li className="hover:text-white transition-colors cursor-pointer">Interface moderne</li>
                <li className="hover:text-white transition-colors cursor-pointer">Sécurité avancée</li>
                <li className="hover:text-white transition-colors cursor-pointer">API développeurs</li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">Technologies</h5>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">React & TypeScript</li>
                <li className="hover:text-white transition-colors cursor-pointer">PostgreSQL</li>
                <li className="hover:text-white transition-colors cursor-pointer">Express.js</li>
                <li className="hover:text-white transition-colors cursor-pointer">Intelligence Artificielle</li>
                <li className="hover:text-white transition-colors cursor-pointer">API REST</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 CuisineAI. Tous droits réservés. Déployé avec succès sur Render.
            </p>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
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
        <Route path="*" element={<CuisineAIApp />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
