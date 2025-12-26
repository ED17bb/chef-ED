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

// --- DATA CURADA (Matilda, Casero, Jamón) ---
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
      "Colocar aceitunas en el borde y envolver.",
      "Cubrir con jamón, pasas y panceta diagonal. Enrollar.",
      "Pintar con huevo y pinchar con tenedor.",
      "Hornear a 180°C por 30 min. Barnizar y 10 min más."
    ],
    tip: "Usa un paño de algodón fino para guardarlo en la heladera. ¡Sabe mejor al día siguiente!"
  }
];

const App: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // --- ESCUDO DE ESTILOS GLOBALES (FUERZA BRUTA) ---
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0";
    document.head.appendChild(meta);

    const style = document.createElement('style');
    style.innerHTML = `
      /* Reset radical para anular index.css de Vite */
      * { margin: 0; padding: 0; box-sizing: border-box !important; -webkit-tap-highlight-color: transparent; }
      body, html, #root { 
        width: 100% !important; 
        min-height: 100vh !important; 
        background-color: #05070A !important;
        color: white !important;
        font-family: 'Inter', sans-serif, system-ui !important;
        display: block !important;
        text-align: left !important;
      }
      #root { max-width: none !important; margin: 0 !important; padding: 0 !important; }
      ::-webkit-scrollbar { display: none; }
    `;
    document.head.appendChild(style);
    return () => { 
      document.head.removeChild(style); 
      document.head.removeChild(meta);
    };
  }, []);

  const Dashboard = () => (
    <div className="flex flex-col min-h-screen bg-[#05070A] overflow-x-hidden text-left">
      {/* Header Digital */}
      <header className="px-6 pt-16 pb-6 flex justify-between items-center bg-[#0A0E1A] border-b-4 border-indigo-500/30">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-cyan-400 shadow-[0_0_15px_#22d3ee] rounded-sm" />
          <h1 className="text-[10px] font-black tracking-[0.5em] text-white/80 uppercase">CHEF ED</h1>
        </div>
        <div className="flex gap-6">
          <Search size={22} className="text-indigo-400" />
          <Filter size={22} className="text-indigo-400" />
        </div>
      </header>

      {/* Saludo Gigante */}
      <div className="px-8 pt-12 pb-4">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={14} className="text-cyan-400" />
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest underline decoration-cyan-400 decoration-2 underline-offset-4 italic">Digital Workspace</span>
        </div>
        <h2 className="text-6xl font-black text-white tracking-tighter leading-[0.8] mb-2">
          HOLA,<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-indigo-700 uppercase">ERNESTO</span>.
        </h2>
      </div>

      {/* Lista de Recetas - Titulos Grandes / Imagen 3x3 cm */}
      <div className="flex-1 px-6 space-y-6 mt-12 pb-32">
        {INITIAL_RECIPES.map((recipe) => (
          <div 
            key={recipe.id}
            onClick={() => {
              setSelectedRecipe(recipe);
              setChecked({});
              window.scrollTo(0,0);
            }}
            className="flex items-center justify-between p-6 bg-[#0A0E1A] rounded-[2.5rem] border-4 border-indigo-500/10 active:scale-[0.96] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 w-32 h-32 blur-[60px] opacity-20" style={{ backgroundColor: recipe.color }} />

            <div className="flex-1 pr-4 relative z-10">
              <span className="text-[9px] font-black tracking-[0.25em] mb-3 block" style={{ color: recipe.color }}>
                {recipe.category}
              </span>
              {/* TITULO MUCHO MÁS GRANDE QUE LA IMAGEN */}
              <h3 className="text-5xl font-black text-white leading-[0.85] tracking-tighter uppercase group-hover:text-cyan-400 transition-colors">
                {recipe.title}
              </h3>
              <div className="flex items-center gap-4 mt-6 text-zinc-600 text-[11px] font-black">
                <span className="flex items-center gap-1.5"><Clock size={14} /> {recipe.prep}</span>
                <span className="flex items-center gap-1.5"><Users size={14} /> {recipe.servings}</span>
              </div>
            </div>

            {/* IMAGEN PEQUEÑA (Efecto 3x3 cm) */}
            <div className="relative w-20 h-20 shrink-0 bg-black rounded-2xl border-2 border-white/5 overflow-hidden shadow-2xl">
              <img src={recipe.image} alt="" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CookingView = ({ recipe }: { recipe: Recipe }) => (
    <div className="fixed inset-0 z-50 bg-[#05070A] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom duration-500">
      {/* Cabecera Detalle */}
      <div className="relative h-[25vh] shrink-0 bg-[#0A0E1A] border-b-8" style={{ borderBottomColor: recipe.color + '33' }}>
        <img src={recipe.image} className="w-full h-full object-cover opacity-20 blur-sm scale-110" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] to-transparent" />
        
        <button 
          onClick={() => setSelectedRecipe(null)}
          className="absolute top-14 left-6 w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border-2 border-white/10 flex items-center justify-center text-white"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="absolute bottom-6 left-8 right-8 text-left">
          <h2 className="text-6xl font-black text-white leading-[0.8] tracking-tighter uppercase">
            {recipe.title}
          </h2>
        </div>
      </div>

      {/* Cuerpo de la Receta */}
      <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12 pb-40">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <Clock size={18} />, val: recipe.prep, label: 'TIEMPO' },
            { icon: <Users size={18} />, val: recipe.servings, label: 'RINDE' },
            { icon: <Flame size={18} />, val: recipe.difficulty, label: 'NIVEL' }
          ].map((s, i) => (
            <div key={i} className="bg-[#0A0E1A] border-2 border-white/5 p-4 rounded-3xl text-center">
              <div className="flex justify-center mb-2" style={{ color: recipe.color }}>{s.icon}</div>
              <p className="text-white font-black text-sm leading-none">{s.val}</p>
              <p className="text-[8px] font-bold text-zinc-700 mt-1 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Ingredientes con texto grande */}
        <section className="text-left">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center" style={{ color: recipe.color }}>
              <BookOpen size={20} />
            </div>
            <h3 className="text-xl font-black tracking-tighter uppercase text-white">COMPONENTES</h3>
          </div>
          <div className="space-y-3">
            {recipe.ingredients.map((ing, i) => (
              <div 
                key={i} 
                onClick={() => setChecked(prev => ({...prev, [`i-${i}`]: !prev[`i-${i}`]}))}
                className={`flex items-center justify-between p-5 rounded-[2.2rem] transition-all border-2 ${
                  checked[`i-${i}`] ? 'bg-zinc-900 border-transparent opacity-20' : 'bg-[#0A0E1A] border-white/5 shadow-xl'
                }`}
              >
                <span className={`text-xl font-bold flex-1 pr-4 ${checked[`i-${i}`] ? 'line-through text-zinc-700' : 'text-zinc-200'}`}>
                  {ing.text}
                </span>
                <div className={`w-8 h-8 rounded-xl border-4 shrink-0 flex items-center justify-center ${
                  checked[`i-${i}`] ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_15px_#22d3ee]' : 'border-zinc-800'
                }`}>
                  {checked[`i-${i}`] && <CheckCircle2 size={18} className="text-black stroke-[4px]" />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pasos con texto editorial */}
        <section className="text-left">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center" style={{ color: recipe.color }}>
              <Flame size={20} />
            </div>
            <h3 className="text-xl font-black tracking-tighter uppercase text-white">EJECUCIÓN</h3>
          </div>
          <div className="space-y-12 relative pl-6">
            <div className="absolute left-6 top-8 bottom-8 w-[4px] bg-zinc-900 rounded-full" />
            {recipe.steps.map((step, i) => (
              <div key={i} onClick={() => setChecked(prev => ({...prev, [`s-${i}`]: !prev[`s-${i}`]}))} className={`relative transition-all duration-300 ${checked[`s-${i}`] ? 'opacity-20' : ''}`}>
                <div className={`absolute -left-[2.65rem] top-0 w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-black border-4 bg-[#05070A] z-10 ${
                  checked[`s-${i}`] ? 'border-cyan-400 text-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'border-zinc-800 text-zinc-600'
                }`}>
                  {i + 1}
                </div>
                <p className="text-2xl leading-relaxed text-zinc-200 pl-10 font-black tracking-tight">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nota del Chef */}
        <div className="bg-[#0A0E1A] p-10 rounded-[3.5rem] border-4 border-white/5 mb-10 text-left">
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-4 block">CHEF NOTE // SYSTEM LOG</span>
           <p className="text-zinc-500 text-xl italic font-bold leading-relaxed">"{recipe.tip}"</p>
        </div>
      </div>

      {/* Botón Flotante */}
      <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#05070A] to-transparent">
        <button 
          onClick={() => setSelectedRecipe(null)}
          className="w-full bg-indigo-600 text-white font-black py-6 rounded-[2.5rem] border-b-8 border-indigo-900 uppercase tracking-widest text-[11px] active:scale-95 active:border-b-0 transition-all shadow-3xl"
        >
           CERRAR SESIÓN
        </button>
      </div>
    </div>
  );

  return (
    <div className="font-sans antialiased text-white selection:bg-cyan-500 selection:text-black bg-[#05070A]">
      {selectedRecipe ? <CookingView recipe={selectedRecipe} /> : <Dashboard />}
    </div>
  );
};

export default App;