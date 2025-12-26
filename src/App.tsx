import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowLeft, 
  BookOpen, 
  Flame,
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
  image: string;
  ingredients: Ingredient[];
  steps: string[];
  tip: string;
  color: string;
}

// --- DATA CURADA (Orden: Matilda, Casero, Jamón) ---
const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'matilda',
    title: "Torta Matilda",
    category: "POSTRES",
    prep: "1h",
    servings: "10P",
    difficulty: "Fácil",
    color: "#ec4899",
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
    color: "#a855f7",
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
    color: "#22d3ee",
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
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // RESET GLOBAL Y CONFIGURACIÓN MÓVIL
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0";
    document.head.appendChild(meta);

    const style = document.createElement('style');
    style.innerHTML = `
      * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      body, html, #root { 
        width: 100%; 
        height: 100%; 
        background-color: #05070A !important;
        font-size: 16px; 
      }
      #root { display: block !important; }
      ::-webkit-scrollbar { display: none; }
    `;
    document.head.appendChild(style);
    return () => { 
      document.head.removeChild(style); 
      document.head.removeChild(meta);
    };
  }, []);

  const filteredRecipes = useMemo(() => INITIAL_RECIPES, []);

  // DASHBOARD MÓVIL
  const Dashboard = () => (
    <div className="flex flex-col min-h-screen bg-[#05070A] overflow-x-hidden">
      <header className="px-5 pt-12 pb-5 flex justify-between items-center bg-[#0A0E1A] border-b-2 border-indigo-500/20">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee] rounded-full" />
          <h1 className="text-[10px] font-black tracking-[0.4em] text-white uppercase italic">CHEF ED</h1>
        </div>
        <div className="flex gap-4">
          <Search size={20} className="text-indigo-400" />
          <Filter size={20} className="text-indigo-400" />
        </div>
      </header>

      <div className="px-6 pt-10 pb-4 text-left">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-cyan-400" />
          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Digital Cookbook</span>
        </div>
        <h2 className="text-5xl font-black text-white tracking-tighter leading-[0.85]">
          HOLA,<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 uppercase">ERNESTO</span>.
        </h2>
      </div>

      <div className="flex-1 px-5 space-y-4 mt-8 pb-32">
        {filteredRecipes.map((recipe) => (
          <div 
            key={recipe.id}
            onClick={() => {
              setSelectedRecipe(recipe);
              setChecked({});
              window.scrollTo(0,0);
            }}
            className="flex items-center justify-between p-5 bg-[#0A0E1A] rounded-[2rem] border-2 border-indigo-500/10 active:scale-[0.97] transition-all duration-200 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute -right-5 -bottom-5 w-24 h-24 blur-[40px] opacity-10" style={{ backgroundColor: recipe.color }} />

            <div className="flex-1 pr-3 relative z-10 text-left">
              <span className="text-[8px] font-black tracking-[0.2em] mb-1.5 block opacity-60" style={{ color: recipe.color }}>
                {recipe.category}
              </span>
              <h3 className="text-4xl font-black text-white leading-[0.8] tracking-tighter uppercase">
                {recipe.title}
              </h3>
              <div className="flex items-center gap-4 mt-4 text-zinc-600 text-[10px] font-bold">
                <span className="flex items-center gap-1"><Clock size={12} /> {recipe.prep}</span>
                <span className="flex items-center gap-1"><Users size={12} /> {recipe.servings}</span>
              </div>
            </div>

            <div className="relative w-14 h-14 shrink-0 bg-black rounded-xl border border-white/5 overflow-hidden">
              <img src={recipe.image} alt="" className="w-full h-full object-cover grayscale-[0.2]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // DETALLE MÓVIL
  const CookingView = ({ recipe }: { recipe: Recipe }) => (
    <div className="fixed inset-0 z-50 bg-[#05070A] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom duration-400">
      <div className="relative h-[25vh] shrink-0 bg-[#0A0E1A]">
        <img src={recipe.image} className="w-full h-full object-cover opacity-30 blur-[2px]" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] to-transparent" />
        
        <button 
          onClick={() => setSelectedRecipe(null)}
          className="absolute top-10 left-5 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="absolute bottom-4 left-6 right-6 text-left">
          <h2 className="text-5xl font-black text-white leading-[0.8] tracking-tighter uppercase">
            {recipe.title}
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10 pb-32">
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: <Clock size={14} />, val: recipe.prep, label: 'TIEMPO' },
            { icon: <Users size={14} />, val: recipe.servings, label: 'RINDE' },
            { icon: <Flame size={14} />, val: recipe.difficulty, label: 'NIVEL' }
          ].map((s, i) => (
            <div key={i} className="bg-[#0A0E1A] border border-white/5 p-3 rounded-2xl text-center">
              <div className="flex justify-center mb-1" style={{ color: recipe.color }}>{s.icon}</div>
              <p className="text-white font-black text-xs">{s.val}</p>
              <p className="text-[7px] font-bold text-zinc-700 mt-1 uppercase tracking-tighter">{s.label}</p>
            </div>
          ))}
        </div>

        <section className="text-left">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen size={16} className="text-indigo-400" />
            <h3 className="text-xs font-black tracking-widest text-zinc-500 uppercase italic">Ingredientes</h3>
          </div>
          <div className="space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <div 
                key={i} 
                onClick={() => setChecked(prev => ({...prev, [`i-${i}`]: !prev[`i-${i}`]}))}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${
                  checked[`i-${i}`] ? 'bg-zinc-900 border-transparent opacity-30' : 'bg-[#0A0E1A] border-white/5'
                }`}
              >
                <span className={`text-base font-bold flex-1 pr-3 ${checked[`i-${i}`] ? 'line-through text-zinc-600' : 'text-zinc-200'}`}>
                  {ing.text}
                </span>
                <div className={`w-6 h-6 rounded-lg border-2 shrink-0 flex items-center justify-center ${
                  checked[`i-${i}`] ? 'bg-cyan-400 border-cyan-400' : 'border-zinc-800'
                }`}>
                  {checked[`i-${i}`] && <CheckCircle2 size={14} className="text-black stroke-[3px]" />}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-left">
          <div className="flex items-center gap-2 mb-8">
            <Flame size={16} className="text-indigo-400" />
            <h3 className="text-xs font-black tracking-widest text-zinc-500 uppercase italic">Instrucciones</h3>
          </div>
          <div className="space-y-10 relative pl-4">
            <div className="absolute left-4 top-4 bottom-4 w-px bg-zinc-900" />
            {recipe.steps.map((step, i) => (
              <div key={i} onClick={() => setChecked(prev => ({...prev, [`s-${i}`]: !prev[`s-${i}`]}))} className={`relative transition-all ${checked[`s-${i}`] ? 'opacity-20' : ''}`}>
                <div className={`absolute -left-[1.25rem] top-0 w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black border-2 bg-black z-10 ${
                  checked[`s-${i}`] ? 'border-cyan-400 text-cyan-400' : 'border-zinc-800 text-zinc-600'
                }`}>
                  {i + 1}
                </div>
                <p className="text-lg leading-snug text-zinc-200 pl-8 font-bold">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-[#0A0E1A] p-6 rounded-[2rem] border border-white/5 mb-10 relative text-left">
           <span className="text-[8px] font-black uppercase tracking-[0.3em] text-cyan-500 mb-2 block">CHEF NOTE</span>
           <p className="text-zinc-400 text-sm italic font-bold">"{recipe.tip}"</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#05070A] to-transparent">
        <button 
          onClick={() => setSelectedRecipe(null)}
          className="w-full bg-indigo-600 text-white font-black py-5 rounded-3xl uppercase tracking-widest text-xs active:scale-95 transition-all shadow-2xl"
        >
           CERRAR RECETA
        </button>
      </div>
    </div>
  );

  return (
    <div className="font-sans antialiased text-white selection:bg-cyan-500 bg-[#05070A]">
      {selectedRecipe ? <CookingView recipe={selectedRecipe} /> : <Dashboard />}
    </div>
  );
};

export default App;