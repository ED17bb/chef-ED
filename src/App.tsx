import React, { useState, useMemo } from 'react';
import {
  ChefHat,
  Search,
  Clock,
  Users,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  BookOpen,
  Flame,
  CakeSlice,
  UtensilsCrossed,
  Info,
} from 'lucide-react';

// --- ILUSTRACIONES DIGITALES (SVG) ---
const DigitalIllustrations = {
  Jamon: () => (
    <svg viewBox="0 0 200 200" className="w-24 h-24 md:w-32 md:h-32">
      <defs>
        <linearGradient id="gradJamon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f39c12" />
          <stop offset="100%" stopColor="#d35400" />
        </linearGradient>
      </defs>
      <rect
        x="40"
        y="80"
        width="120"
        height="40"
        rx="20"
        fill="url(#gradJamon)"
      />
      <path
        d="M60 85 L140 85 M60 100 L140 100 M60 115 L140 115"
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="3"
      />
      <circle cx="70" cy="100" r="8" fill="#27ae60" />
      <circle cx="100" cy="100" r="8" fill="#27ae60" />
      <circle cx="130" cy="100" r="8" fill="#27ae60" />
    </svg>
  ),
  Casero: () => (
    <svg viewBox="0 0 200 200" className="w-24 h-24 md:w-32 md:h-32">
      <path d="M50 120 Q50 60 100 60 Q150 60 150 120 Z" fill="#e67e22" />
      <path
        d="M70 75 L90 95 M110 75 L130 95"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="45" y="115" width="110" height="10" rx="5" fill="#d35400" />
    </svg>
  ),
  Matilda: () => (
    <svg viewBox="0 0 200 200" className="w-24 h-24 md:w-32 md:h-32">
      <path d="M40 130 L160 130 L150 70 L50 70 Z" fill="#3d2b1f" />
      <path d="M40 70 Q100 50 160 70 L160 85 Q100 105 40 85 Z" fill="#5d4037" />
      <path
        d="M100 40 Q105 20 120 30"
        fill="none"
        stroke="#e74c3c"
        strokeWidth="4"
      />
      <circle cx="100" cy="45" r="8" fill="#e74c3c" />
    </svg>
  ),
};

// --- DATA ---
const INITIAL_RECIPES = [
  {
    id: 'jamon',
    title: 'Pan de Jamón',
    category: 'Festivos',
    prep: '3-4 h',
    servings: '2 Panes',
    difficulty: 'Media',
    illustration: <DigitalIllustrations.Jamon />,
    ingredients: [
      { text: '500-800 gr Harina 000', group: 'Masa' },
      { text: '260 ml Agua', group: 'Masa' },
      { text: '60 gr Azúcar', group: 'Masa' },
      { text: '100 gr Margarina', group: 'Masa' },
      { text: '2 Huevos', group: 'Masa' },
      { text: '10 gr Levadura', group: 'Masa' },
      { text: '10 gr Sal', group: 'Masa' },
      { text: '150 gr Aceitunas', group: 'Relleno' },
      { text: '150 gr Pasas', group: 'Relleno' },
      { text: '1 Kg Jamón', group: 'Relleno' },
      { text: '250 gr Panceta', group: 'Relleno' },
      { text: 'Queso Crema (Opcional)', group: 'Relleno' },
    ],
    steps: [
      'Comenzar agregando el azúcar en un bol con el agua y mezclar bien.',
      'Agregar la levadura, luego incorporar 1 huevo y mezclar nuevamente.',
      'Agregar la harina (aproximadamente 500gr inicialmente) y mezclar hasta integrar.',
      'Luego de mezclar, agregar la sal.',
      'Retirar la masa y amasar en el mesón durante 10 minutos. Durante este proceso, agregar la margarina dividida en 2 partes.',
      'Se puede agregar un poco más de harina gradualmente hasta tener una masa suave y lisa que no se pegue a la mesa (el peso final será de aproximadamente 1.2kg).',
      'Dividir la masa en 2 mitades iguales.',
      'Envolver y dejar que actúe la levadura por 1 hora (o mínimo 30 min).',
      'Enharinar el mesón y extender la masa entre 40-50 cm de largo hasta que esté bien delgada.',
      'Hacer una hilera de aceitunas en el borde de la masa y envolverlas primero.',
      'Cubrir el resto con el queso crema, luego el jamón, las pasas y finalmente la panceta colocada en diagonal.',
      'Enrollar con mucha suavidad.',
      'Pintar el borde de la masa con huevo batido para asegurar que se pegue la decoración.',
      'Clavar un tenedor por todo el pan para permitir la salida del vapor durante la cocción.',
      'Llevar el pan a la bandeja y pintar toda la superficie con huevo. Dejar leudar por 1 hora adicional.',
      'Preparar el barniz: En una olla pequeña, agregar 1/4 taza de azúcar con un chorrito de agua a alta temperatura hasta lograr un color caramelo líquido poco espeso.',
      'Meter el pan al horno precalentado a 180°C por 25-30 min.',
      'Sacar el pan, pintar generosamente con el barniz de caramelo y devolver al horno por 10 min más.',
    ],
    tip: 'Conservación: Debido al jamón y queso crema, guárdalo en la heladera envuelto en tela delgada de algodón. Recalienta a 170°C antes de servir.',
  },
  {
    id: 'casero',
    title: 'Pan Casero',
    category: 'Diario',
    prep: '2-3 h',
    servings: '6 Unidades',
    difficulty: 'Baja',
    illustration: <DigitalIllustrations.Casero />,
    ingredients: [
      { text: '500 gr Harina', group: 'Secos' },
      { text: '300 ml Agua tibia', group: 'Líquidos' },
      { text: '15 gr Sal', group: 'Secos' },
      { text: '10 gr Levadura', group: 'Líquidos' },
      { text: '1/2 cucharada de Azúcar (~4g)', group: 'Líquidos' },
      { text: '30-40 gr Manteca', group: 'Grasas' },
    ],
    steps: [
      'En un bol pequeño, mezclar el agua tibia con la levadura y el azúcar para activarla.',
      'En otro bol grande, mezclar la harina con la sal de forma homogénea.',
      'Unir el contenido de ambos bols, mezclar e integrar la manteca a temperatura ambiente.',
      'Amasar enérgicamente por unos 10 minutos hasta obtener una masa elástica.',
      'Dejar reposar la masa tapada en un lugar cálido por 30 minutos.',
      'Pasado el tiempo, separar y dividir la masa en 6 partes iguales.',
      "Estirar cada parte y calcular el tamaño. Luego abollar y, con la palma de la mano, ir presionando mientras se enrolla como un 'burrito'.",
      'Colocar los panes en una bandeja apenas aceitada y, con un cuchillo afilado, hacer unos cortes diagonales decorativos.',
      'Tapar y dejar reposar por 1 hora hasta que aumenten significativamente su tamaño.',
      'Llevar al horno precalentado a 180°C-200°C por 10 a 15 minutos.',
    ],
    tip: "Para saber si está listo para el horno, usa la 'prueba de la huella'. Si presionas y la masa vuelve lento, es el momento perfecto.",
  },
  {
    id: 'matilda',
    title: 'Torta Matilda',
    category: 'Postres',
    prep: '1 h',
    servings: '10 Porciones',
    difficulty: 'Baja',
    illustration: <DigitalIllustrations.Matilda />,
    ingredients: [
      { text: '3 Huevos', group: 'Masa' },
      { text: '100 gr Mantequilla derretida', group: 'Masa' },
      { text: '200-400 gr Azúcar (según preferencia)', group: 'Masa' },
      { text: '2-3 cdas de Vainilla / 250ml Leche tibia', group: 'Masa' },
      { text: '100 gr Chocolate en polvo', group: 'Masa' },
      { text: '280 gr Harina de trigo', group: 'Masa' },
      { text: '1 cda Polvo de hornear / 1 cdita Bicarbonato', group: 'Masa' },
      { text: '1 vaso de Agua / 4 cdas Maicena', group: 'Cubierta' },
      { text: '5 cdas Cacao / 3 cdas Mantequilla', group: 'Cubierta' },
      { text: '200 gr Azúcar', group: 'Cubierta' },
    ],
    steps: [
      'Comenzar agregando a la licuadora los huevos y mezclarlos hasta que generen bastante espuma.',
      'Agregar el azúcar y volver a batir hasta que la mezcla suba de tamaño notablemente.',
      'Incorporar la mantequilla derretida, la vainilla y la leche tibia; volver a batir brevemente.',
      'Preparar los ingredientes secos con la ayuda de un colador (tamizado): agregar el cacao, la harina, una pizca de sal y la cucharadita de bicarbonato de sodio.',
      'Con cuidado, batir y mezclar todo para que se integre de forma perfecta y sin grumos.',
      'Finalmente, agregar la cucharada de polvo de hornear y seguir batiendo suavemente hasta conseguir una mezcla homogénea.',
      'Preparar un molde esparciendo mantequilla y enharinando toda su superficie.',
      'Verter la mezcla en el molde y llevar al horno precalentado a 180°C por unos 30-40 minutos (revisar con un palito hasta que esté lista).',
      'Preparación de la cubierta: En una olla con el fuego apagado, agregar 1 vaso de agua y las 4 cucharadas de maicena.',
      'Mezclar con un colador/batidor hasta que la maicena se integre bien y no queden grumos.',
      'Agregar las 5 cucharadas de cacao, la mantequilla derretida y el azúcar.',
      'Encender la hornilla y cocinar mezclando constantemente hasta que espese al punto deseado.',
      'Desmoldar la torta ya fría en el plato de servir y cubrir con el baño de chocolate caliente.',
    ],
    tip: 'El éxito de esta torta reside en el batido inicial de los huevos; cuanto más aire tengan, más esponjosa será la Matilda.',
  },
];

const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [completedItems, setCompletedItems] = useState({});

  const filteredRecipes = useMemo(() => {
    return INITIAL_RECIPES.filter(
      (r) =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggleComplete = (id) => {
    setCompletedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const Dashboard = () => (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 animate-in fade-in duration-700">
      <header className="mb-12 flex flex-col items-center text-center">
        <div className="bg-orange-500/10 p-4 rounded-3xl mb-4">
          <ChefHat className="text-orange-500 w-12 h-12" />
        </div>
        <h1 className="text-5xl font-black text-white mb-3 tracking-tight">
          Chef ED
        </h1>
        <p className="text-zinc-500 max-w-md">
          Ernesto, tu cocina digital está lista. Organiza, cocina y perfecciona
          tus platos favoritos.
        </p>

        <div className="mt-10 relative w-full max-w-md group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar en el recetario..."
            className="bg-zinc-900/50 border border-zinc-800 text-white pl-12 pr-6 py-4 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-2xl backdrop-blur-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="space-y-4">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="group relative bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-5 md:p-6 cursor-pointer hover:bg-zinc-800/60 hover:border-orange-500/30 transition-all flex items-center justify-between overflow-hidden shadow-lg"
          >
            {/* Left side: Content */}
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/80 bg-orange-500/5 px-2 py-0.5 rounded">
                  {recipe.category}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                {recipe.title}
              </h3>
              <div className="flex items-center gap-4 text-zinc-500 text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {recipe.prep}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={14} /> {recipe.servings}
                </span>
              </div>
            </div>

            {/* Right side: Illustration */}
            <div className="relative z-10 transition-transform group-hover:scale-110 duration-500">
              {recipe.illustration}
            </div>

            {/* Decorative background glow */}
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}

        {filteredRecipes.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl">
            <p className="text-zinc-600">
              No encontramos recetas con ese nombre, Ernesto.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const CookingView = ({ recipe }) => (
    <div className="min-h-screen bg-[#050505] animate-in slide-in-from-bottom duration-500 pb-20">
      {/* Header Overlay */}
      <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setSelectedRecipe(null)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-bold">Panel</span>
        </button>
        <h2 className="text-lg font-black text-white">{recipe.title}</h2>
        <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
          <ChefHat size={16} className="text-orange-500" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-10">
        {/* Meta Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Tiempo', value: recipe.prep, icon: <Clock size={16} /> },
            {
              label: 'Rinde',
              value: recipe.servings,
              icon: <Users size={16} />,
            },
            {
              label: 'Nivel',
              value: recipe.difficulty,
              icon: <Flame size={16} />,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl text-center"
            >
              <div className="text-orange-500 flex justify-center mb-1">
                {stat.icon}
              </div>
              <div className="text-[10px] text-zinc-500 uppercase font-bold mb-0.5">
                {stat.label}
              </div>
              <div className="text-white font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Ingredients */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={20} className="text-orange-500" />
              <h4 className="text-xl font-bold text-white uppercase tracking-tighter">
                Ingredientes
              </h4>
            </div>
            <div className="space-y-2">
              {recipe.ingredients.map((ing, idx) => {
                const id = `${recipe.id}-ing-${idx}`;
                return (
                  <div
                    key={idx}
                    onClick={() => toggleComplete(id)}
                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                      completedItems[id]
                        ? 'bg-zinc-900/30 border-transparent opacity-30'
                        : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-md flex-shrink-0 border flex items-center justify-center transition-colors ${
                        completedItems[id]
                          ? 'bg-orange-500 border-orange-500'
                          : 'border-zinc-700'
                      }`}
                    >
                      {completedItems[id] && (
                        <CheckCircle2 size={14} className="text-black" />
                      )}
                    </div>
                    <span
                      className={`text-sm leading-relaxed ${
                        completedItems[id]
                          ? 'line-through text-zinc-600'
                          : 'text-zinc-300'
                      }`}
                    >
                      {ing.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preparation - EXTENDED VERSION */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-6">
              <Flame size={20} className="text-orange-500" />
              <h4 className="text-xl font-bold text-white uppercase tracking-tighter">
                Modo de Preparación
              </h4>
            </div>
            <div className="space-y-8">
              {recipe.steps.map((step, idx) => {
                const id = `${recipe.id}-step-${idx}`;
                return (
                  <div
                    key={idx}
                    onClick={() => toggleComplete(id)}
                    className={`flex gap-6 group cursor-pointer transition-all ${
                      completedItems[id] ? 'opacity-20' : ''
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-all shadow-lg ${
                        completedItems[id]
                          ? 'bg-zinc-800 text-zinc-600'
                          : 'bg-gradient-to-br from-orange-500 to-orange-600 text-black'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 pt-1.5 border-b border-zinc-900 pb-6 group-last:border-0">
                      <p
                        className={`text-zinc-300 leading-relaxed text-lg ${
                          completedItems[id] ? 'line-through' : ''
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Professional Tip Section */}
            <div className="mt-16 p-8 bg-zinc-900/30 border-2 border-dashed border-zinc-800 rounded-[2rem] flex gap-4 items-start">
              <Info className="text-orange-500 shrink-0 mt-1" size={24} />
              <div>
                <h5 className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-2">
                  Consejo Senior de Chef ED
                </h5>
                <p className="text-zinc-400 text-base leading-relaxed italic">
                  "{recipe.tip}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-orange-500/30 selection:text-orange-500">
      {selectedRecipe ? <CookingView recipe={selectedRecipe} /> : <Dashboard />}
    </div>
  );
};

export default App;
