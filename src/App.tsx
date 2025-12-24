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
  Filter,
  Sparkles
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
  image: string; // Sustituimos ilustración por URL de imagen digital
  ingredients: Ingredient[];
  steps: string[];
  tip: string;
  color: string; // Color temático para contrastes neón
}

// --- DATA CURADA CON TUS NUEVAS ILUSTRACIONES ---
const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'matilda',
    title: "Torta Matilda",
    category: "POSTRES",
    prep: "1h",
    servings: "10P",
    difficulty: "Fácil",
    color: "#ec4899", // Magenta Neón
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      { text: "3 Huevos / 200gr Azúcar", group: "Base" },
      { text: "100 gr Mantequilla derretida", group: "Base" },
      { text: "280 gr Harina / 100 gr Chocolate", group: "Secos" },
      { text: "250 ml Leche tibia", group: "Líquidos" },
      { text: "Cubierta: Chocolate + Maicena", group: "Topping" }
    ],
    steps: [
      "Licuar huevos hasta espumar. Añadir azúcar y batir hasta que suba.",
      "Incorporar mantequilla y leche. Batir.",
      "Tamizar harina, cacao y bicarbonato. Mezclar perfecto.",
      "Hornear a 180°C por 40 min.",
      "Hacer cobertura de maicena y cacao hasta espesar.",
      "Bañar la torta desmoldada con el chocolate caliente."
    ],
    tip: "No escatimes en el batido de los huevos, es la clave de la textura Matilda."
  },
  {
    id: 'casero',
    title: "Pan Casero",
    category: "DIARIO",
    prep: "2.5h",
    servings: "6U",
    difficulty: "Fácil",
    color: "#a855f7", // Violeta Eléctrico
    image: "https://images.unsplash.com/photo-1597079910443-60c43fc4f729?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      { text: "500 gr Harina", group: "Secos" },
      { text: "300 ml Agua tibia", group: "Líquidos" },
      { text: "15 gr Sal / 10 gr Levadura", group: "Base" },
      { text: "30-40 gr Manteca", group: "Grasas" }
    ],
    steps: [
      "Activar levadura con azúcar en agua tibia.",
      "Unir secos con líquidos e integrar la manteca.",
      "Amasar 10 min. Reposo de 30 min.",
      "Dividir en 6. Formar burritos presionando con la palma.",
      "Colocar en bandeja y hacer cortes diagonales.",
      "Leudar 1 hora y hornear a 190°C por 15 min."
    ],
    tip: "Si al presionar la huella vuelve lento, el pan pide horno inmediatamente."
  },
  {
    id: 'jamon',
    title: "Pan de Jamón",
    category: "FESTIVOS",
    prep: "4h",
    servings: "2P",
    difficulty: "Experto",
    color: "#22d3ee", // Cian Neón
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      { text: "500-800 gr Harina 000", group: "Masa" },
      { text: "260 ml Agua / 60 gr Azúcar", group: "Masa" },
      { text: "100 gr Margarina / 2 Huevos", group: "Masa" },
      { text: "10 gr Levadura / 10 gr Sal", group: "Masa" },
      { text: "1 Kg Jamón / 250 gr Panceta", group: "Relleno" },
      { text: "150 gr Aceitunas / 150 gr Pasas", group: "Relleno" }
    ],
    steps: [
      "Mezclar azúcar con agua y activar levadura.",
      "Integrar harina, huevo y sal. Amasar 10 min añadiendo margarina.",
      "Leudar 1 hora. Extender masa muy delgada (40-50cm).",
      "Colocar hilera de aceitunas en el borde y envolver.",
      "Cubrir con jamón, pasas y panceta diagonal.",
      "Enrollar, pinchar con tenedor y pintar con huevo.",
      "Hornear a 180°C por 30 min. Barnizar con caramelo y 10 min finales."
    ],
    tip: "Usa un paño de algodón fino para guardarlo en la heladera. El contraste de sabor mejora al día siguiente."
  }
];

const App: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const Dashboard = () => (
    <div className="flex flex-col h-screen bg-[#05070A] overflow-hidden">
      {/* Header - Digital High Contrast */}
      <header className="px-6 pt-16 pb-6 flex justify-between items-center bg-[#0A0E1A] border-b-4 border-indigo-500/30">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-cyan-400 shadow-[0_0_15px_#22d3ee] rounded-sm" />
          <h1 className="text-[12px] font-black tracking-[0.6em] text-white uppercase italic">CHEF ED // V.6</h1>
        </div>
        <div className="flex gap-6">
          <Search size={22} className="text-indigo-400" />
          <Filter size={22} className="text-indigo-400" />
        </div>
      </header>

      {/* Hero Bienvenida */}
      <div className="px-8 pt-12 pb-4">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={14} className="text-cyan-400" />
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest underline decoration-cyan-400 decoration-2 underline-offset-4">Project: Kitchen</span>
        </div>
        <h2 className="text-5xl font-black text-white tracking-tighter leading-[0.8]">
          EY, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">ERNESTO</span>.
        </h2>
      </div>

      {/* Lista de Recetas - BOLD DESIGN */}
      <div className="flex-1 overflow-y-auto px-6 space-y-6 mt-8 pb-24">
        {filteredRecipes.map((recipe) => (
          <div 
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="flex items-center justify-between p-6 bg-[#0A0E1A] rounded-[2rem] border-4 border-indigo-500/10 hover:border-cyan-400/50 active:scale-[0.96] transition-all duration-300 group relative overflow-hidden"
          >
            {/* Background Accent Glow */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 blur-[60px] opacity-20 transition-all group-hover:opacity-40" style={{ backgroundColor: recipe.color }} />

            <div className="flex-1 pr-4 relative z-10">
              <span className="text-[9px] font-black tracking-[0.25em] mb-2 block" style={{ color: recipe.color }}>
                {recipe.category}
              </span>
              <h3 className="text-4xl font-black text-white leading-[0.8] tracking-tighter group-hover:translate-x-1 transition-transform">
                {recipe.title}
              </h3>
              <div className="flex items-center gap-4 mt-5 text-zinc-500 text-[11px] font-black">
                <span className="flex items-center gap-1.5"><Clock size={14} /> {recipe.prep}</span>
                <span className="flex items-center gap-1.5"><Users size={14} /> {recipe.servings}</span>
              </div>
            </div>

            {/* Imagen Digital 3x3 cm (80px) */}
            <div className="relative w-20 h-20 shrink-0 bg-[#05070A] rounded-2xl border-2 border-zinc-800 group-hover:border-cyan-400 transition-colors shadow-2xl overflow-hidden">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 border-2 border-white/10 rounded-2xl pointer-events-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CookingView = ({ recipe }: { recipe: Recipe }) => {
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    return (
      <div className="h-screen bg-[#05070A] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom duration-500">
        {/* Cabecera Detalle Digital Art */}
        <div className="relative h-[35vh] shrink-0 bg-[#0A0E1A] border-b-8" style={{ borderBottomColor: recipe.color + '33' }}>
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
             <img src={recipe.image} className="w-full h-full object-cover scale-110 blur-sm" alt="" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-transparent" />
          
          <button 
            onClick={() => setSelectedRecipe(null)}
            className="absolute top-14 left-6 w-12 h-12 rounded-full bg-white/5 backdrop-blur-3xl border-2 border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="text-6xl font-black text-white leading-[0.75] tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12 pb-32">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Clock />, val: recipe.prep, label: 'TIME' },
              { icon: <Users />, val: recipe.servings, label: 'SIZE' },
              { icon: <Flame />, val: recipe.difficulty, label: 'LVL' }
            ].map((s, i) => (
              <div key={i} className="bg-[#0A0E1A] border-2 border-indigo-500/10 p-4 rounded-2xl text-center">
                <div className="flex justify-center mb-1" style={{ color: recipe.color }}>{s.icon}</div>
                <p className="text-white font-black text-sm leading-none">{s.val}</p>
                <p className="text-[8px] font-bold text-zinc-600 mt-1 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Ingredientes - Checkboxes BOLD */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center" style={{ color: recipe.color }}>
                <BookOpen size={20} />
              </div>
              <h3 className="text-lg font-black tracking-tighter uppercase text-white">REQUERIMIENTOS</h3>
            </div>
            <div className="space-y-3">
              {recipe.ingredients.map((ing, i) => (
                <div 
                  key={i} 
                  onClick={() => setChecked(prev => ({...prev, [`i-${i}`]: !prev[`i-${i}`]}))}
                  className={`flex items-center justify-between p-5 rounded-2xl transition-all border-2 ${
                    checked[`i-${i}`] 
                      ? 'bg-zinc-900 border-transparent opacity-20' 
                      : 'bg-[#0A0E1A] border-indigo-500/5 hover:border-cyan-400/40'
                  }`}
                >
                  <span className={`text-base font-bold ${checked[`i-${i}`] ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                    {ing.text}
                  </span>
                  <div className={`w-7 h-7 rounded-xl border-3 flex items-center justify-center transition-all ${
                    checked[`i-${i}`] ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'border-zinc-800'
                  }`}>
                    {checked[`i-${i}`] && <CheckCircle2 size={16} className="text-black stroke-[3px]" />}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Preparación - Trazo Grueso */}
          <section>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center" style={{ color: recipe.color }}>
                <Flame size={20} />
              </div>
              <h3 className="text-lg font-black tracking-tighter uppercase text-white">EJECUCIÓN</h3>
            </div>
            <div className="space-y-12 relative pl-6">
              <div className="absolute left-6 top-6 bottom-6 w-[4px] bg-zinc-900 rounded-full" />
              {recipe.steps.map((step, i) => (
                <div 
                  key={i} 
                  onClick={() => setChecked(prev => ({...prev, [`s-${i}`]: !prev[`s-${i}`]}))}
                  className={`relative transition-all duration-300 ${checked[`s-${i}`] ? 'opacity-20' : ''}`}
                >
                  <div className={`absolute -left-[2.35rem] top-0 w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black border-4 bg-[#05070A] z-10 transition-all ${
                    checked[`s-${i}`] ? 'border-cyan-400 text-cyan-400' : 'border-zinc-800 text-zinc-600'
                  }`}>
                    {i + 1}
                  </div>
                  <p className="text-lg leading-relaxed text-zinc-300 pl-10 font-bold">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Tip Area */}
          <div className="bg-[#0A0E1A] p-8 rounded-[2.5rem] border-4 border-indigo-500/10 mb-20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Info size={40} />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-2 block">LOG // SYSTEM TIP</span>
             <p className="text-zinc-400 text-base italic leading-relaxed font-bold">
              "{recipe.tip}"
            </p>
          </div>
        </div>

        {/* Footer Cierre */}
        <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#05070A] via-[#05070A]/90 to-transparent">
          <button 
            onClick={() => setSelectedRecipe(null)}
            className="w-full bg-indigo-600 text-white font-black py-5 rounded-3xl border-b-8 border-indigo-800 uppercase tracking-widest text-[11px] active:scale-95 active:border-b-0 transition-all shadow-[0_10px_30px_rgba(79,70,229,0.3)]"
          >
             TERMINAR PROCESO
          </button>
        </div>
      </div>
    );
  };

  // Memoización para el dashboard (evita re-renders innecesarios)
  const filteredRecipes = useMemo(() => INITIAL_RECIPES, []);

  return (
    <div className="font-sans antialiased text-white selection:bg-cyan-500 selection:text-black bg-[#05070A]">
      {selectedRecipe ? (
        <CookingView recipe={selectedRecipe} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default App;