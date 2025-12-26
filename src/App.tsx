import React, { useState, useEffect } from 'react';
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

// --- DATA TOTALMENTE DETALLADA (Orden: Matilda, Casero, Jamón) ---
const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'matilda',
    title: "Torta Matilda",
    category: "POSTRES",
    prep: "1h",
    servings: "10P",
    difficulty: "Fácil",
    color: "#ec4899",
    image: "Torta matilda.jpeg", 
    ingredients: [
      { text: "3 Huevos", group: "Masa" },
      { text: "100 gr Mantequilla derretida (4 cdas)", group: "Masa" },
      { text: "200-400 gr Azúcar (según preferencia)", group: "Masa" },
      { text: "2-3 cdas de Vainilla", group: "Masa" },
      { text: "250 ml Leche tibia (1 taza)", group: "Masa" },
      { text: "100 gr Chocolate en polvo (1 taza)", group: "Masa" },
      { text: "280 gr Harina de trigo (2 tazas)", group: "Masa" },
      { text: "1 cda Polvo de hornear", group: "Masa" },
      { text: "1 cdita Bicarbonato de sodio", group: "Masa" },
      { text: "1 pizca de Sal", group: "Masa" },
      { text: "1 vaso de Agua", group: "Cubierta" },
      { text: "4 cdas soperas de Maicena", group: "Cubierta" },
      { text: "5 cdas Cacao en polvo", group: "Cubierta" },
      { text: "3 cdas Mantequilla derretida", group: "Cubierta" },
      { text: "200 gr Azúcar (1 taza)", group: "Cubierta" }
    ],
    steps: [
      "Comenzar agregando a la licuadora los huevos y mezclarlos hasta que generen bastante espuma.",
      "Agregar el azúcar y volver a batir hasta que la mezcla suba de tamaño notablemente.",
      "Incorporar la mantequilla derretida, la vainilla y la leche tibia; volver a batir brevemente para integrar.",
      "Preparar los ingredientes secos con la ayuda de un colador (tamizado): agregar el cacao, la harina, la pizca de sal y la cucharadita de bicarbonato de sodio.",
      "Con mucho cuidado, batir y mezclar todo de forma manual o a baja velocidad para que se integre de forma perfecta y sin grumos.",
      "Finalmente, agregar la cucharada de polvo de hornear y seguir batiendo suavemente hasta conseguir una masa homogénea.",
      "Preparar un molde esparciendo mantequilla y enharinando toda su superficie.",
      "Verter la mezcla en el molde y llevar al horno precalentado a 180°C por unos 30-40 minutos (revisar con un palito hasta que salga seco).",
      "Preparación de la cubierta: En una olla con el fuego todavía APAGADO, agregar el vaso de agua y las 4 cucharadas de maicena.",
      "Mezclar con un colador o batidor de mano hasta que la maicena se integre bien y no queden grumos.",
      "Agregar las 5 cucharadas de cacao, la mantequilla derretida y el azúcar.",
      "Encender la hornilla a fuego medio y cocinar mezclando constantemente hasta que espese al punto deseado y brille.",
      "Desmoldar la torta ya fría en el plato de servir y cubrir generosamente con el baño de chocolate caliente."
    ],
    tip: "El éxito de esta torta reside en el batido inicial de los huevos; cuanto más aire tengan, más esponjosa será la Matilda."
  },
  {
    id: 'casero',
    title: "Pan Casero",
    category: "DIARIO",
    prep: "2.5h",
    servings: "6U",
    difficulty: "Fácil",
    color: "#a855f7",
    image: "Pan casero.jpeg",
    ingredients: [
      { text: "500 gr Harina de trigo", group: "Base" },
      { text: "300 ml Agua tibia", group: "Base" },
      { text: "15 gr Sal", group: "Base" },
      { text: "10 gr Levadura seca", group: "Base" },
      { text: "1/2 cucharada de Azúcar (~4g)", group: "Base" },
      { text: "30-40 gr Manteca", group: "Grasas" }
    ],
    steps: [
      "En un bol pequeño, mezclar el agua tibia con la levadura y el azúcar para activarla hasta que espume.",
      "En otro bol grande, mezclar la harina con la sal de forma homogénea.",
      "Unir el contenido de ambos bols, mezclar e integrar la manteca a temperatura ambiente.",
      "Retirar la masa al mesón y amasar enérgicamente por unos 10 minutos hasta obtener una masa elástica y suave.",
      "Dejar reposar la masa en un bol aceitado y tapada en un lugar cálido por 30 minutos.",
      "Pasado el tiempo, desgasificar ligeramente y dividir la masa en 6 partes iguales.",
      "Estirar cada parte, abollar y, con la palma de la mano, ir presionando mientras se enrolla como un 'burrito' para dar tensión.",
      "Colocar los panes en una bandeja apenas aceitada y, con un cuchillo afilado, hacer unos cortes diagonales decorativos.",
      "Tapar con un paño y dejar reposar por 1 hora hasta que aumenten significativamente su tamaño (duplicar).",
      "Llevar al horno precalentado a 180°C-200°C por 10 a 15 minutos hasta que estén dorados."
    ],
    tip: "Para saber si está listo para el horno, usa la 'prueba de la huella'. Si presionas y la masa vuelve lento, es el momento perfecto."
  },
  {
    id: 'jamon',
    title: "Pan de Jamón",
    category: "FESTIVOS",
    prep: "4h",
    servings: "2P",
    difficulty: "Experto",
    color: "#22d3ee",
    image: "Pan de jamon.jpeg",
    ingredients: [
      { text: "500-800 gr Harina 000", group: "Masa" },
      { text: "260 ml Agua", group: "Masa" },
      { text: "60 gr Azúcar", group: "Masa" },
      { text: "100 gr Margarina", group: "Masa" },
      { text: "2 Huevos", group: "Masa" },
      { text: "10 gr Levadura", group: "Masa" },
      { text: "10 gr Sal", group: "Masa" },
      { text: "1 Kg Jamón ahumado", group: "Relleno" },
      { text: "250 gr Panceta (Tocineta)", group: "Relleno" },
      { text: "150 gr Aceitunas rellenas", group: "Relleno" },
      { text: "150 gr Pasas", group: "Relleno" },
      { text: "Queso Crema (Opcional)", group: "Relleno" }
    ],
    steps: [
      "Comenzar agregando el azúcar en un bol con el agua y mezclar bien.",
      "Agregar la levadura, luego incorporar 1 huevo y mezclar nuevamente.",
      "Agregar la harina (aproximadamente 500gr inicialmente) y mezclar hasta integrar la masa base.",
      "Luego de mezclar los primeros ingredientes, agregar la sal.",
      "Retirar la masa y amasar en el mesón durante 10 minutos. Durante este proceso, agregar la margarina dividida en 2 partes.",
      "Agregar un poco más de harina gradualmente hasta tener una masa suave y lisa que no se pegue a la mesa (el peso final será de aproximadamente 1.2kg).",
      "Dividir la masa en 2 mitades iguales para hacer dos panes.",
      "Envolver en film o paño y dejar que actúe la levadura por 1 hora (o mínimo 30 min) en un lugar cálido.",
      "Enharinar el mesón y extender la masa entre 40-50 cm de largo hasta que esté bien delgada.",
      "Hacer una hilera de aceitunas en el borde de la masa y envolverlas primero para que queden en el centro.",
      "Cubrir el resto con el queso crema (opcional), luego el jamón, las pasas y finalmente la panceta colocada en diagonal.",
      "Enrollar con mucha suavidad de forma compacta.",
      "Pintar el borde final con huevo batido para asegurar que se pegue bien y no se abra.",
      "Clavar un tenedor por todo el pan de forma profunda para permitir la salida del vapor durante la cocción.",
      "Llevar el pan a la bandeja y pintar toda la superficie con huevo. Dejar leudar por 1 hora adicional.",
      "Preparar el barniz: En una olla pequeña, agregar 1/4 taza de azúcar con un chorrito de agua a alta temperatura hasta lograr un color caramelo líquido poco espeso.",
      "Meter el pan al horno precalentado a 180°C por 25-30 min.",
      "Sacar el pan, pintar generosamente con el barniz de caramelo y devolver al horno por 10 min más hasta que esté oscuro y brillante."
    ],
    tip: "Conservación: Debido al jamón, guárdalo en la heladera envuelto en tela delgada de algodón. Recalienta a 170°C para que la masa recupere su frescura."
  }
];

const App: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // --- ESCUDO DE ESTILOS GLOBALES ---
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0";
    document.head.appendChild(meta);

    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box !important; -webkit-tap-highlight-color: transparent; }
      body, html, #root { 
        width: 100% !important; 
        min-height: 100vh !important; 
        background-color: #05070A !important;
        color: white !important;
        font-family: 'Inter', sans-serif !important;
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#05070A', width: '100%' }}>
      {/* Header */}
      <header style={{ padding: '60px 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0A0E1A', borderBottom: '4px solid rgba(99, 102, 241, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#22d3ee', boxShadow: '0 0 15px #22d3ee' }} />
          <h1 style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.5em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>CHEF ED</h1>
        </div>
        <div style={{ display: 'flex', gap: '24px', color: '#818cf8' }}>
          <Search size={22} />
          <Filter size={22} />
        </div>
      </header>

      {/* Saludo Ernesto */}
      <div style={{ padding: '48px 32px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Sparkles size={14} color="#22d3ee" />
          <span style={{ fontSize: '10px', fontWeight: 900, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Digital Workspace</span>
        </div>
        <h2 style={{ fontSize: '64px', fontWeight: 900, color: 'white', letterSpacing: '-0.05em', lineHeight: '0.8', marginBottom: '8px' }}>
          HOLA,<br/>
          <span style={{ background: 'linear-gradient(to right, #22d3ee, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textTransform: 'uppercase' }}>
            ERNESTO</span>.
        </h2>
      </div>

      {/* Lista de Recetas */}
      <div style={{ flex: 1, padding: '0 24px 120px', display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '32px' }}>
        {INITIAL_RECIPES.map((recipe) => (
          <div 
            key={recipe.id}
            onClick={() => { setSelectedRecipe(recipe); setChecked({}); window.scrollTo(0,0); }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '24px', 
              backgroundColor: '#0A0E1A', 
              borderRadius: '40px', 
              border: '4px solid rgba(129, 140, 248, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ flex: 1, paddingRight: '16px', position: 'relative', zIndex: 10 }}>
              <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.25em', marginBottom: '12px', display: 'block', color: recipe.color }}>
                {recipe.category}
              </span>
              <h3 style={{ fontSize: '48px', fontWeight: 900, color: 'white', lineHeight: '0.85', letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
                {recipe.title}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px', color: '#444', fontSize: '11px', fontWeight: 900 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {recipe.prep}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={14} /> {recipe.servings}</span>
              </div>
            </div>

            {/* IMAGEN DE 3x3 cm (80px) */}
            <div style={{ 
              width: '80px', 
              height: '80px', 
              flexShrink: 0, 
              backgroundColor: '#111', 
              borderRadius: '24px', 
              border: '2px solid rgba(255,255,255,0.05)', 
              overflow: 'hidden' 
            }}>
              <img 
                src={recipe.image} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                alt={recipe.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.style.backgroundColor = recipe.color + '33';
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CookingView = ({ recipe }: { recipe: Recipe }) => (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: '#05070A', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: '25vh', flexShrink: 0, backgroundColor: '#0A0E1A', borderBottom: `8px solid ${recipe.color}33` }}>
        <img src={recipe.image} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, filter: 'blur(4px) scale(1.1)' }} alt="" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #05070A, transparent)' }} />
        
        <button 
          onClick={() => setSelectedRecipe(null)}
          style={{ position: 'absolute', top: '56px', left: '24px', width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <ArrowLeft size={24} />
        </button>

        <div style={{ position: 'absolute', bottom: '24px', left: '32px', right: '32px' }}>
          <h2 style={{ fontSize: '56px', fontWeight: 900, color: 'white', lineHeight: '0.8', letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
            {recipe.title}
          </h2>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '40px 32px 160px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '48px' }}>
          {[
            { icon: <Clock size={18} />, val: recipe.prep, label: 'TIEMPO' },
            { icon: <Users size={18} />, val: recipe.servings, label: 'SIZE' },
            { icon: <Flame size={18} />, val: recipe.difficulty, label: 'LVL' }
          ].map((s, i) => (
            <div key={i} style={{ backgroundColor: '#0A0E1A', border: '2px solid rgba(255,255,255,0.05)', padding: '16px', borderRadius: '24px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px', color: recipe.color }}>{s.icon}</div>
              <p style={{ color: 'white', fontWeight: 900, fontSize: '14px' }}>{s.val}</p>
              <p style={{ fontSize: '8px', fontWeight: 700, color: '#444', marginTop: '4px', letterSpacing: '0.1em' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(129, 140, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: recipe.color }}>
              <BookOpen size={20} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>COMPONENTES</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recipe.ingredients.map((ing, i) => (
              <div 
                key={i} 
                onClick={() => setChecked(prev => ({...prev, [`i-${i}`]: !prev[`i-${i}`]}))}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', 
                  borderRadius: '32px', border: '2px solid rgba(255,255,255,0.05)', backgroundColor: '#0A0E1A',
                  opacity: checked[`i-${i}`] ? 0.2 : 1
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: 900, flex: 1, paddingRight: '16px', textDecoration: checked[`i-${i}`] ? 'line-through' : 'none' }}>{ing.text}</span>
                <div style={{ width: '32px', height: '32px', borderRadius: '12px', border: '4px solid #222', backgroundColor: checked[`i-${i}`] ? '#22d3ee' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {checked[`i-${i}`] && <CheckCircle2 size={18} color="black" strokeWidth={4} />}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(129, 140, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: recipe.color }}>
              <Flame size={20} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>EJECUCIÓN</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', position: 'relative', paddingLeft: '24px' }}>
            <div style={{ position: 'absolute', left: '24px', top: '32px', bottom: '32px', width: '4px', backgroundColor: '#111', borderRadius: '2px' }} />
            {recipe.steps.map((step, i) => (
              <div key={i} onClick={() => setChecked(prev => ({...prev, [`s-${i}`]: !prev[`s-${i}`]}))} style={{ position: 'relative', opacity: checked[`s-${i}`] ? 0.2 : 1 }}>
                <div style={{ position: 'absolute', left: '-42px', top: '0', width: '40px', height: '40px', borderRadius: '16px', border: '4px solid #111', backgroundColor: '#05070A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: checked[`s-${i}`] ? '#22d3ee' : '#444' }}>
                  {i + 1}
                </div>
                <p style={{ fontSize: '24px', fontWeight: 900, lineHeight: '1.2', paddingLeft: '40px', letterSpacing: '-0.02em' }}>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ backgroundColor: '#0A0E1A', padding: '40px', borderRadius: '56px', border: '4px solid rgba(255,255,255,0.05)', textAlign: 'left' }}>
           <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: '#22d3ee', marginBottom: '16px', display: 'block' }}>CHEF NOTE // LOG</span>
           <p style={{ color: '#555', fontSize: '20px', fontStyle: 'italic', fontWeight: 900, lineHeight: '1.4' }}>"{recipe.tip}"</p>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '32px', background: 'linear-gradient(to top, #05070A, transparent)' }}>
        <button 
          onClick={() => setSelectedRecipe(null)}
          style={{ width: '100%', backgroundColor: '#4f46e5', color: 'white', fontWeight: 900, padding: '24px', borderRadius: '40px', border: 'none', borderBottom: '8px solid #312e81', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '11px' }}
        >
           REGRESAR
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#05070A', color: 'white', minHeight: '100vh' }}>
      {selectedRecipe ? <CookingView recipe={selectedRecipe} /> : <Dashboard />}
    </div>
  );
};

export default App;