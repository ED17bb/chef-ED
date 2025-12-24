import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowLeft, 
  BookOpen, 
  Flame,
  Info,
  Filter
} from 'lucide-react';

// --- DEFINICIÓN DE TIPOS ---
interface Ingredient {
  text: string;
  group: string;
}

interface Recipe {
  id: string;
  title: string;
  category: string;
  prep: string;
  servings: string;
  difficulty: string;
  image: string;
  ingredients: Ingredient[];
  steps: string[];
  tip: string;
}

// --- DATA CURADA ---
const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'jamon',
    title: "Pan de Jamón",
    category: "FESTIVOS",
    prep: "4h",
    servings: "2P",
    difficulty: "Experto",
    // Imagen: Pan horneado relleno tradicional
    image: "https://images.unsplash.com/photo-1598143153002-f88a21d31ec1?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      { text: "500-800 gr Harina 000", group: "Masa" },
      { text: "260 ml Agua", group: "Masa" },
      { text: "60 gr Azúcar", group: "Masa" },
      { text: "100 gr Margarina", group: "Masa" },
      { text: "2 Huevos", group: "Masa" },
      { text: "10 gr Levadura", group: "Masa" },
      { text: "10 gr Sal", group: "Masa" },
      { text: "150 gr Aceitunas", group: "Relleno" },
      { text: "150 gr Pasas", group: "Relleno" },
      { text: "1 Kg Jamón", group: "Relleno" },
      { text: "250 gr Panceta", group: "Relleno" },
      { text: "Queso Crema (Opcional)", group: "Relleno" }
    ],
    steps: [
      "Comenzar agregando el azúcar en un bol con el agua y mezclar bien.",
      "Agregar la levadura, luego incorporar 1 huevo y mezclar nuevamente.",
      "Agregar la harina (aproximadamente 500gr inicialmente) e integrar.",
      "Luego de mezclar, agregar la sal.",
      "Amasar en el mesón durante 10 minutos integrando la margarina en 2 partes.",
      "Agregar harina gradualmente hasta tener una masa suave y lisa (aprox. 1.2kg).",
      "Dividir en 2 mitades iguales y dejar leudar por 1 hora.",
      "Extender la masa entre 40-50 cm hasta que esté bien delgada.",
      "Hacer una hilera de aceitunas en el borde y envolverlas.",
      "Cubrir con queso crema, jamón, pasas y panceta en diagonal.",
      "Enrollar con suavidad y sellar bordes con huevo.",
      "Clavar un tenedor por todo el pan para el vapor.",
      "Pintar con huevo y dejar leudar 1 hora adicional.",
      "Barniz: Mezclar 1/4 taza de azúcar con agua caliente hasta color caramelo.",
      "Hornear a 180°C por 25-30 min. Barnizar y hornear 10 min más."
    ],
    tip: "Conservación: Guárdalo en la heladera envuelto en tela delgada de algodón. Recalienta a 170°C antes de servir."
  },
  {
    id: 'casero',
    title: "Pan Casero",
    category: "DIARIO",
    prep: "2.5h",
    servings: "6U",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1597079910443-60c43fc4f729?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      { text: "500 gr Harina", group: "Secos" },
      { text: "300 ml Agua tibia", group: "Líquidos" },
      { text: "15 gr Sal", group: "Secos" },
      { text: "10 gr Levadura", group: "Líquidos" },
      { text: "1/2 cucharada de Azúcar", group: "Líquidos" },
      { text: "30-40 gr Manteca", group: "Grasas" }
    ],
    steps: [
      "Mezclar agua tibia con levadura y azúcar.",
      "Mezclar harina con sal en un bol grande e integrar líquidos.",
      "Añadir manteca y amasar por 10 minutos.",
      "Reposar masa tapada por 30 minutos.",
      "Dividir en 6 partes iguales.",
      "Estirar y enrollar presionando con la palma como un 'burrito'.",
      "Colocar en bandeja aceitada y hacer cortes diagonales.",
      "Tapar y dejar reposar 1 hora hasta duplicar tamaño.",
      "Hornear a 180°C-200°C por 10 a 15 minutos."
    ],
    tip: "Usa la 'prueba de la huella'. Si presionas y la masa vuelve lento, está lista para el horno."
  },
  {
    id: 'matilda',
    title: "Torta Matilda",
    category: "POSTRES",
    prep: "1h",
    servings: "10P",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      { text: "3 Huevos", group: "Masa" },
      { text: "100 gr Mantequilla derretida", group: "Masa" },
      { text: "200-400 gr Azúcar", group: "Masa" },
      { text: "2-3 cdas de Vainilla / 250ml Leche", group: "Masa" },
      { text: "100 gr Chocolate en polvo", group: "Masa" },
      { text: "280 gr Harina de trigo", group: "Masa" },
      { text: "1 cda Polvo hornear / 1 cdita Bicarbonato", group: "Masa" },
      { text: "1 vaso Agua / 4 cdas Maicena", group: "Cubierta" },
      { text: "5 cdas Cacao / 3 cdas Mantequilla", group: "Cubierta" },
      { text: "200 gr Azúcar", group: "Cubierta" }
    ],
    steps: [
      "Licuar huevos hasta que generen mucha espuma.",
      "Agregar azúcar y batir hasta que duplique tamaño.",
      "Incorporar mantequilla, vainilla y leche tibia; batir.",
      "Tamizar cacao, harina, sal y bicarbonato sobre la mezcla.",
      "Mezclar con cuidado hasta integrar perfectamente.",
      "Agregar polvo de hornear y batir suavemente.",
      "Verter en molde engrasado y enharinado.",
      "Hornear a 180°C por 30-40 minutos.",
      "Cubierta: Mezclar agua y maicena en olla apagada.",
      "Añadir cacao, mantequilla y azúcar.",
      "Cocinar mezclando hasta que espese al punto deseado.",
      "Bañar la torta desmoldada con la mezcla caliente."
    ],
    tip: "El éxito es el batido inicial de los huevos; cuanto más aire tengan, más esponjosa será."
  }
];

const App: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Filtro simplificado (sin estado de búsqueda para evitar errores de compilación)
  const filteredRecipes = useMemo(() => {
    return INITIAL_RECIPES;
  }, []);

  const Dashboard = () => (
    <div className="flex flex-col h-screen bg-[#050505] overflow-hidden">
      {/* Header Minimalista corregido sin variables no usadas */}
      <header className="px-6 pt-16 pb-6 flex justify-between items-center bg-black/50 backdrop-blur-lg border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
          <h1 className="text-[10px] font-black tracking-[0.4em] text-zinc-400 uppercase">Chef ED</h1>
        </div>
        <div className="flex gap-5">
          <Search size={18} className="text-zinc-600 hover:text-white transition-colors cursor-pointer" />
          <Filter size={18} className="text-zinc-600 hover:text-white transition-colors cursor-pointer" />
        </div>
      </header>

      {/* Hero Bienvenida */}
      <div className="px-6 pt-10 pb-6">
        <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">Workspace</p>
        <h2 className="text-3xl font-bold text-white tracking-tighter">
          Hola, Ernesto.
        </h2>
      </div>

      {/* Lista de Recetas - Imágenes cuadradas de 80px (~3x3 cm) */}
      <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-12">
        {filteredRecipes.map((recipe) => (
          <div 
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="flex items-center justify-between p-4 bg-zinc-900/40 rounded-3xl border border-zinc-900 hover:border-zinc-800 active:scale-[0.97] transition-all duration-200 group"
          >
            <div className="flex-1 pr-4">
              <span className="text-[9px] font-black tracking-[0.1em] text-orange-500/80 mb-1 block">
                {recipe.category}
              </span>
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                {recipe.title}
              </h3>
              <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-bold">
                <span className="flex items-center gap-1"><Clock size={12} /> {recipe.prep}</span>
                <span className="flex items-center gap-1"><Users size={12} /> {recipe.servings}</span>
              </div>
            </div>

            {/* Imagen Cuadrada Pequeña */}
            <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden shadow-xl border border-white/5">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CookingView = ({ recipe }: { recipe: Recipe }) => {
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    return (
      <div className="h-screen bg-black overflow-hidden flex flex-col animate-in fade-in slide-in-from-right duration-400">
        <div className="relative h-[35vh] shrink-0">
          <img src={recipe.image} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
          
          <button 
            onClick={() => setSelectedRecipe(null)}
            className="absolute top-14 left-6 p-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-white active:scale-90 transition-transform"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="absolute bottom-6 left-8 right-8">
            <h2 className="text-4xl font-black text-white leading-none tracking-tighter">
              {recipe.title}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12 pb-32">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-8">
            <div className="flex flex-col items-center gap-1">
              <Clock size={16} className="text-zinc-600" />
              <p className="text-white font-bold text-sm">{recipe.prep}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Users size={16} className="text-zinc-600" />
              <p className="text-white font-bold text-sm">{recipe.servings}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Flame size={16} className="text-zinc-600" />
              <p className="text-white font-bold text-sm">{recipe.difficulty}</p>
            </div>
          </div>

          <section>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="text-orange-500" size={18} />
              <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400">Ingredientes</h3>
            </div>
            <div className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <div 
                  key={i} 
                  onClick={() => setChecked(prev => ({...prev, [`i-${i}`]: !prev[`i-${i}`]}))}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${
                    checked[`i-${i}`] ? 'bg-zinc-900 border-transparent opacity-30' : 'bg-zinc-900/30 border-zinc-800'
                  }`}
                >
                  <span className={`text-sm ${checked[`i-${i}`] ? 'line-through' : 'text-zinc-200'}`}>{ing.text}</span>
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${checked[`i-${i}`] ? 'bg-orange-500 border-orange-500' : 'border-zinc-700'}`}>
                    {checked[`i-${i}`] && <CheckCircle2 size={12} className="text-black" />}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-8">
              <Flame className="text-orange-500" size={18} />
              <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400">Preparación</h3>
            </div>
            <div className="space-y-10 relative pl-4">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-zinc-900" />
              {recipe.steps.map((step, i) => (
                <div 
                  key={i} 
                  onClick={() => setChecked(prev => ({...prev, [`s-${i}`]: !prev[`s-${i}`]}))}
                  className={`relative transition-opacity ${checked[`s-${i}`] ? 'opacity-20' : ''}`}
                >
                  <div className={`absolute -left-[1.35rem] top-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border bg-black ${
                    checked[`s-${i}`] ? 'border-orange-500 text-orange-500' : 'border-zinc-800 text-zinc-600'
                  }`}>
                    {i + 1}
                  </div>
                  <p className="text-base leading-relaxed text-zinc-300 pl-6">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-zinc-900/50 p-6 rounded-3xl border border-orange-500/10 mb-20">
            <div className="flex items-center gap-2 mb-3">
              <Info size={14} className="text-orange-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-orange-500">Chef ED Note</span>
            </div>
            <p className="text-zinc-400 text-xs italic leading-relaxed">
              "{recipe.tip}"
            </p>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
          <button 
            onClick={() => setSelectedRecipe(null)}
            className="w-full bg-orange-500 text-black font-black py-4 rounded-2xl shadow-[0_10px_20px_rgba(249,115,22,0.2)] uppercase tracking-widest text-[11px] active:scale-95 transition-transform"
          >
             Cerrar Receta
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans antialiased text-white selection:bg-orange-500/30 selection:text-orange-500">
      {selectedRecipe ? (
        <CookingView recipe={selectedRecipe} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default App;