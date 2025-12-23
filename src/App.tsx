import React, { useState, useMemo } from 'react';
import { 
  ChefHat, 
  Search, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowLeft, 
  BookOpen, 
  Flame,
  Info,
  Star,
  Play
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
  image: string; // URL de foto provocativa
  ingredients: Ingredient[];
  steps: string[];
  tip: string;
}

// --- DATA CON FOTOS REALISTAS Y ESTÉTICAS ---
const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'jamon',
    title: "Pan de Jamón",
    category: "Festivos",
    prep: "3-4 h",
    servings: "2 Panes",
    difficulty: "Expert",
    image: "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?auto=format&fit=crop&q=80&w=1000",
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
      "Agregar la harina (aproximadamente 500gr inicialmente) y mezclar hasta integrar.",
      "Luego de mezclar, agregar la sal.",
      "Retirar la masa y amasar en el mesón durante 10 minutos. Durante este proceso, agregar la margarina dividida en 2 partes.",
      "Se puede agregar un poco más de harina gradualmente hasta tener una masa suave y lisa que no se pegue a la mesa (el peso final será de aproximadamente 1.2kg).",
      "Dividir la masa en 2 mitades iguales.",
      "Envolver y dejar que actúe la levadura por 1 hora (o mínimo 30 min).",
      "Enharinar el mesón y extender la masa entre 40-50 cm de largo hasta que esté bien delgada.",
      "Hacer una hilera de aceitunas en el borde de la masa y envolverlas primero.",
      "Cubrir el resto con el queso crema, luego el jamón, las pasas y finalmente la panceta colocada en diagonal.",
      "Enrollar con mucha suavidad.",
      "Pintar el borde de la masa con huevo batido para asegurar que se pegue la decoración.",
      "Clavar un tenedor por todo el pan para permitir la salida del vapor durante la cocción.",
      "Llevar el pan a la bandeja y pintar toda la superficie con huevo. Dejar leudar por 1 hora adicional.",
      "Preparar el barniz: En una olla pequeña, agregar 1/4 taza de azúcar con un chorrito de agua a alta temperatura hasta lograr un color caramelo líquido poco espeso.",
      "Meter el pan al horno precalentado a 180°C por 25-30 min.",
      "Sacar el pan, pintar generosamente con el barniz de caramelo y devolver al horno por 10 min más."
    ],
    tip: "Conservación: Debido al jamón y queso crema, guárdalo en la heladera envuelto en tela delgada de algodón. Recalienta a 170°C antes de servir."
  },
  {
    id: 'casero',
    title: "Pan Casero",
    category: "Diario",
    prep: "2-3 h",
    servings: "6 Unidades",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1000",
    ingredients: [
      { text: "500 gr Harina", group: "Secos" },
      { text: "300 ml Agua tibia", group: "Líquidos" },
      { text: "15 gr Sal", group: "Secos" },
      { text: "10 gr Levadura", group: "Líquidos" },
      { text: "1/2 cucharada de Azúcar (~4g)", group: "Líquidos" },
      { text: "30-40 gr Manteca", group: "Grasas" }
    ],
    steps: [
      "En un bol pequeño, mezclar el agua tibia con la levadura y el azúcar para activarla.",
      "En otro bol grande, mezclar la harina con la sal de forma homogénea.",
      "Unir el contenido de ambos bols, mezclar e integrar la manteca a temperatura ambiente.",
      "Amasar enérgicamente por unos 10 minutos hasta obtener una masa elástica.",
      "Dejar reposar la masa tapada en un lugar cálido por 30 minutos.",
      "Pasado el tiempo, separar y dividir la masa en 6 partes iguales.",
      "Estirar cada parte y calcular el tamaño. Luego abollar y, con la palma de la mano, ir presionando mientras se enrolla como un 'burrito'.",
      "Colocar los panes en una bandeja apenas aceitada y, con un cuchillo afilado, hacer unos cortes diagonales decorativos.",
      "Tapar y dejar reposar por 1 hora hasta que aumenten significativamente su tamaño.",
      "Llevar al horno precalentado a 180°C-200°C por 10 a 15 minutos."
    ],
    tip: "Para saber si está listo para el horno, usa la 'prueba de la huella'. Si presionas y la masa vuelve lento, es el momento perfecto."
  },
  {
    id: 'matilda',
    title: "Torta Matilda",
    category: "Postres",
    prep: "1 h",
    servings: "10 Porciones",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=1000",
    ingredients: [
      { text: "3 Huevos", group: "Masa" },
      { text: "100 gr Mantequilla derretida", group: "Masa" },
      { text: "200-400 gr Azúcar", group: "Masa" },
      { text: "2-3 cdas de Vainilla / 250ml Leche tibia", group: "Masa" },
      { text: "100 gr Chocolate en polvo", group: "Masa" },
      { text: "280 gr Harina de trigo", group: "Masa" },
      { text: "1 cda Polvo de hornear / 1 cdita Bicarbonato", group: "Masa" },
      { text: "1 vaso de Agua / 4 cdas Maicena", group: "Cubierta" },
      { text: "5 cdas Cacao / 3 cdas Mantequilla", group: "Cubierta" },
      { text: "200 gr Azúcar", group: "Cubierta" }
    ],
    steps: [
      "Comenzar agregando a la licuadora los huevos y mezclarlos hasta que generen bastante espuma.",
      "Agregar el azúcar y volver a batir hasta que la mezcla suba de tamaño notablemente.",
      "Incorporar la mantequilla derretida, la vainilla y la leche tibia; volver a batir brevemente.",
      "Preparar los ingredientes secos con la ayuda de un colador (tamizado): agregar el cacao, la harina, una pizca de sal y la cucharadita de bicarbonato de sodio.",
      "Con cuidado, batir y mezclar todo para que se integre de forma perfecta y sin grumos.",
      "Finalmente, agregar la cucharada de polvo de hornear y seguir batiendo suavemente hasta conseguir una mezcla homogénea.",
      "Preparar un molde esparciendo mantequilla y enharinando toda su superficie.",
      "Verter la mezcla en el molde y llevar al horno precalentado a 180°C por unos 30-40 minutos (revisar con un palito hasta que esté lista).",
      "Preparación de la cubierta: En una olla con el fuego apagado, agregar 1 vaso de agua y las 4 cucharadas de maicena.",
      "Mezclar con un colador/batidor hasta que la maicena se integre bien y no queden grumos.",
      "Agregar las 5 cucharadas de cacao, la mantequilla derretida y el azúcar.",
      "Encender la hornilla y cocinar mezclando constantemente hasta que espese al punto deseado.",
      "Desmoldar la torta ya fría en el plato de servir y cubrir con el baño de chocolate caliente."
    ],
    tip: "El éxito de esta torta reside en el batido inicial de los huevos; cuanto más aire tengan, más esponjosa será la Matilda."
  }
];

const App: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const filteredRecipes = useMemo(() => {
    return INITIAL_RECIPES.filter(r => 
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggleComplete = (id: string) => {
    setCompletedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const Dashboard = () => (
    <div className="min-h-screen bg-black pb-12">
      {/* Search Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-light text-white tracking-tight">Hola, <span className="font-bold text-orange-500">Ernesto</span></h1>
            <p className="text-zinc-500 text-sm">¿Qué obra de arte cocinamos hoy?</p>
          </div>
          <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-900 shadow-xl">
            <ChefHat size={22} className="text-orange-500" />
          </div>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Buscar recetas..."
            className="bg-zinc-900/80 border border-zinc-800 text-white pl-12 pr-6 py-4 rounded-2xl w-full focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all backdrop-blur-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Featured Scroll */}
      <div className="px-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white uppercase tracking-widest text-[10px] opacity-60">Recetas Sugeridas</h2>
        </div>
        
        <div className="space-y-6">
          {filteredRecipes.map((recipe) => (
            <div 
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl active:scale-95 transition-transform"
            >
              {/* Main Image */}
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Badges */}
              <div className="absolute top-6 left-6 flex gap-2">
                <div className="bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                  <Star size={12} className="text-orange-500 fill-orange-500" />
                  <span className="text-[10px] font-bold text-white uppercase">{recipe.difficulty}</span>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-orange-500 font-bold text-[10px] uppercase tracking-widest mb-1 block">
                      {recipe.category}
                    </span>
                    <h3 className="text-3xl font-bold text-white leading-tight">
                      {recipe.title}
                    </h3>
                    <div className="flex gap-4 mt-3 text-white/70 text-xs">
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {recipe.prep}</span>
                      <span className="flex items-center gap-1.5"><Users size={14} /> {recipe.servings}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-black shadow-lg shadow-orange-500/20">
                    <Play size={20} fill="black" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CookingView = ({ recipe }: { recipe: Recipe }) => (
    <div className="min-h-screen bg-[#000] text-zinc-100 animate-in slide-in-from-right duration-500 pb-20">
      {/* Sticky Header Photo */}
      <div className="relative h-[45vh] w-full overflow-hidden">
        <img 
          src={recipe.image} 
          className="w-full h-full object-cover" 
          alt={recipe.title} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <button 
          onClick={() => setSelectedRecipe(null)}
          className="absolute top-8 left-6 w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="absolute bottom-8 left-8 right-8">
           <h2 className="text-5xl font-black text-white leading-none tracking-tighter mb-4">
            {recipe.title}
          </h2>
          <div className="flex gap-4">
             <span className="px-4 py-2 bg-white/10 backdrop-blur-lg rounded-2xl text-xs font-bold border border-white/5">
                {recipe.prep}
             </span>
             <span className="px-4 py-2 bg-white/10 backdrop-blur-lg rounded-2xl text-xs font-bold border border-white/5 uppercase">
                {recipe.difficulty}
             </span>
          </div>
        </div>
      </div>

      <div className="px-6 mt-10 space-y-12 max-w-2xl mx-auto">
        
        {/* Ingredients Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
              <BookOpen className="text-orange-500" size={20} />
            </div>
            <h4 className="text-2xl font-bold">Ingredientes</h4>
          </div>
          
          <div className="space-y-3">
            {recipe.ingredients.map((ing, idx) => {
              const id = `${recipe.id}-ing-${idx}`;
              return (
                <div 
                  key={idx}
                  onClick={() => toggleComplete(id)}
                  className={`flex items-center justify-between p-5 rounded-[1.5rem] transition-all border ${
                    completedItems[id] 
                      ? 'bg-zinc-900/30 border-transparent opacity-30' 
                      : 'bg-zinc-900 border-zinc-800'
                  }`}
                >
                  <span className={`text-base ${completedItems[id] ? 'line-through text-zinc-600' : 'text-zinc-200'}`}>
                    {ing.text}
                  </span>
                  <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                    completedItems[id] ? 'bg-orange-500 border-orange-500' : 'border-zinc-700'
                  }`}>
                    {completedItems[id] && <CheckCircle2 size={16} className="text-black" />}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Steps Section */}
        <section>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
              <Flame className="text-orange-500" size={20} />
            </div>
            <h4 className="text-2xl font-bold">Preparación</h4>
          </div>
          
          <div className="space-y-12 relative">
            {/* Vertical Line */}
            <div className="absolute left-[1.1rem] top-10 bottom-0 w-px bg-zinc-800" />
            
            {recipe.steps.map((step, idx) => {
              const id = `${recipe.id}-step-${idx}`;
              return (
                <div 
                  key={idx}
                  onClick={() => toggleComplete(id)}
                  className={`flex gap-6 relative transition-all ${completedItems[id] ? 'opacity-20' : ''}`}
                >
                  <div className={`z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border-2 transition-all ${
                    completedItems[id] 
                      ? 'bg-orange-500 border-orange-500 text-black' 
                      : 'bg-black border-zinc-700 text-orange-500'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className={`text-lg leading-relaxed text-zinc-300 ${completedItems[id] ? 'line-through' : ''}`}>
                      {step}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tip Section */}
        <div className="bg-zinc-900/50 p-8 rounded-[2rem] border border-orange-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Info className="text-orange-500" size={20} />
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Consejo del Chef</span>
          </div>
          <p className="text-zinc-400 italic leading-relaxed">
            "{recipe.tip}"
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500/30 selection:text-orange-500 antialiased">
      {selectedRecipe ? (
        <CookingView recipe={selectedRecipe} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default App;