import type { Album } from '../types';

/**
 * 🍞 MIGAS DE PAN — Estructura de Álbumes
 *
 * Cada uno de los 6 botones en la Navbar representa un Álbum interactivo.
 * Puedes personalizar las fotos, títulos y descripciones de cada uno a continuación.
 *
 * Estructura de imágenes:
 *   - heroImage: Imagen de fondo (pantalla completa). Colócalas en public/images/heroes/
 *   - cards[0].image: Imagen miniatura para el Focused Card Slider. Colócalas en public/images/cards/
 *
 * Álbumes Disponibles:
 *   1. "Yo" (Inicio)
 *   2. "Crecer"
 *   3. "Aventura"
 *   4. "Nosotros"
 *   5. "Recap"
 *   6. "Final"
 */
export const albums: Album[] = [
  {
    id: 'yo',
    label: 'Yo',
    destinations: [
      {
        id: 'yo-embarazada',
        heroImage: '/images/heroes/Embarazada-fondo.jpg',
        title: 'La Dulce\nEspera',
        description: 'Mucho antes de mi primer respiro, ya existía un espacio lleno de planes y de una ilusión infinita por descubrir a quién me parecería.',
        cards: [
          { id: 'yo-c1', image: '/images/cards/Embarazada-card.jpg', label: 'Antes de nacer' },
        ],
      },
      {
        id: 'yo-nacimiento',
        heroImage: '/images/heroes/Naci-fondo.jpg',
        title: 'Mi Primer\nRespiro',
        description: 'El instante exacto en que dejé de ser un latido lejano para convertirme en una realidad en sus brazos. Aquí comenzó todo.',
        cards: [
          { id: 'yo-c2', image: '/images/cards/Naci-card.jpg', label: 'El día que llegué' },
        ],
      },
      {
        id: 'yo-playa',
        heroImage: '/images/heroes/Playa2-fondo.jpg',
        title: 'Días de\nSal y Arena',
        description: 'Pasábamos más tiempo en el mar que en la casa. Papá recordaba sus días de surfista en cada ola, mientras mamá disfrutaba la brisa... pero cuidando siempre que yo no me ensuciara de arena.',
        cards: [
          { id: 'yo-c5', image: '/images/cards/Playa2-card.jpg', label: 'Nuestra segunda casa' },
        ],
      },
      {
        id: 'yo-conmama',
        heroImage: '/images/heroes/Conmama-fondo.jpg',
        title: 'En sus\nBrazos',
        description: 'Mi primer refugio seguro. Esos momentos cotidianos donde el mundo se detenía y bastaba su mirada para saber que todo iba a estar bien.',
        cards: [
          { id: 'yo-c4', image: '/images/cards/Conmama-card.jpg', label: 'Mamá y yo' },
        ],
      },
      {
        id: 'yo-bautizo',
        heroImage: '/images/heroes/Bautizo-fondo.jpg',
        title: 'Luz y\nFamilia',
        description: 'Rodeada de la familia de papá en un día blanco. Entre abrazos y bendiciones, guardo con recelo la mirada de mi abuelo, uno de los pilares más importantes de mi vida.',
        cards: [
          { id: 'yo-c3', image: '/images/cards/Bautizo-card.jpg', label: 'El abrazo del abuelo' },
        ],
      },
    ],
  },
  {
    id: 'crecer',
    label: 'Crecer',
    destinations: [
      {
        id: 'crecer-pasos',
        heroImage: '/images/heroes/Creciendo-fondo.jpg',
        title: 'Paso a\nPaso',
        description: 'El tiempo empezó a correr más rápido. Entre risas, juegos y descubrimientos diarios, fui dejando atrás la primera infancia para empezar a descubrir el mundo con mis propios ojos y seguiamos yendo a la playa.',
        cards: [
          { id: 'cr-c1', image: '/images/cards/Creciendo-card.jpg', label: 'Creciendo' },
        ],
      },
      {
        id: 'crecer-camping',
        heroImage: '/images/heroes/Camping-fondo.jpg',
        title: 'Bajo las\nEstrellas',
        description: 'Nuestra conexión con la naturaleza. Armar la carpa, sentir el aire fresco de la montaña y compartir historias alrededor del fuego con quienes más amo.',
        cards: [
          { id: 'cr-c5', image: '/images/cards/Camping-card.jpg', label: 'Noches de campamento' },
        ],
      },
      {
        id: 'crecer-navidad',
        heroImage: '/images/heroes/Navidad-fondo.jpg',
        title: 'Magia de\nDiciembre',
        description: 'El aroma a pino, las luces brillantes y la ilusión de abrir los regalos en familia. La Navidad siempre ha sido el recordatorio de que el amor es el mejor refugio.',
        cards: [
          { id: 'cr-c6', image: '/images/cards/Navidad-card.jpg', label: 'Navidad en familia' },
        ],
      },
      {
        id: 'crecer-piscina',
        heroImage: '/images/heroes/Piscina-fondo.jpg',
        title: 'Juegos de\nAgua',
        description: 'Chapuzones interminables bajo el sol de la tarde. No había mejor plan que pasar horas flotando, riendo y sintiendo la absoluta libertad de ser niña.',
        cards: [
          { id: 'cr-c2', image: '/images/cards/Piscina-card.jpg', label: 'Tardes de piscina' },
        ],
      },
      {
        id: 'crecer-cierre',
        heroImage: '/images/heroes/Cierre-fondo.jpg',
        title: 'Fin de\nEtapa',
        description: 'Un día lleno de emociones encontradas. Cerrar un ciclo escolar con orgullo, sabiendo que cada final es solo el hermoso comienzo de un nuevo camino.',
        cards: [
          { id: 'cr-c7', image: '/images/cards/Cierre-card.jpg', label: 'Mi graduación' },
        ],
      },
      {
        id: 'crecer-parqueagua',
        heroImage: '/images/heroes/Parqueagua-fondo.jpg',
        title: 'Aventuras en\nel Parque',
        description: 'La emoción pura de los toboganes y el agua salpicando por todos lados. Cada visita al parque era una expedición mágica llena de risas compartidas.',
        cards: [
          { id: 'cr-c3', image: '/images/cards/Parqueagua-card.jpg', label: 'Diversión en el agua' },
        ],
      },
      {
        id: 'crecer-pijamada',
        heroImage: '/images/heroes/Pijamada-fondo.jpg',
        title: 'Noches de\nComplicidad',
        description: 'Secretos susurrados a la luz de las linternas, dulces compartidos a escondidas y risas que duraban hasta el amanecer. Mis primeras pijamadas inolvidables.',
        cards: [
          { id: 'cr-c4', image: '/images/cards/Pijamada-card.jpg', label: 'Pijamada divertida' },
        ],
      },
    ],
  },
  {
    id: 'compania',
    label: 'Compañía Inesperada',
    destinations: [
      {
        id: 'compania-intruso',
        heroImage: '/images/Llegaintruso-fondo.jpg',
        title: 'Llega un\nIntruso',
        description: 'Una presencia inesperada que cambió la dinámica de mis días. De repente, ya no estaba sola en mis aventuras.',
        cards: [
          { id: 'cp-1', image: '/images/Llegaintruso-card.jpg', label: 'El intruso' },
        ],
      },
      {
        id: 'compania-navidad',
        heroImage: '/images/nuestra1ernavidad-fondo.jpg',
        title: 'Nuestra\n1ra Navidad',
        description: 'La primera época decembrina que compartimos. Luces, sonrisas y la magia inigualable de estar juntos en estas fechas.',
        cards: [
          { id: 'cp-5', image: '/images/nuestra1ernavidad-card.jpg', label: 'Primera Navidad' },
        ],
      },
      {
        id: 'compania-negrito',
        heroImage: '/images/conelnegrito-fondo.jpg',
        title: 'Con el\nNegrito',
        description: 'Poco a poco fuimos compartiendo más momentos. Lo que empezó como una sorpresa se fue convirtiendo en una gran compañía.',
        cards: [
          { id: 'cp-2', image: '/images/conelnegrito-card.jpg', label: 'Con el negrito' },
        ],
      },
      {
        id: 'compania-plan',
        heroImage: '/images/planvacacional-fondo.jpg',
        title: 'Plan\nVacacional',
        description: 'Disfrutando juntos en el plan vacacional. Días llenos de energía, juegos y mucha diversión compartida.',
        cards: [
          { id: 'cp-3', image: '/images/planvacacional-card1.jpg', label: 'Plan vacacional' },
        ],
      },
      {
        id: 'compania-museo',
        heroImage: '/images/museomarino-fondo.jpg',
        title: 'Museo\nMarino',
        description: 'Explorando las maravillas del océano en el museo. Una experiencia fascinante descubriendo juntos el mundo submarino.',
        cards: [
          { id: 'cp-4', image: '/images/museomarino-card1.jpg', label: 'Museo marino' },
        ],
      },
      {
        id: 'compania-linda',
        heroImage: '/images/cadavezmaslinda-fondo.jpg',
        title: 'Cada Vez\nMás Linda',
        description: 'El tiempo pasa y solo nos deja mejores recuerdos. Una etapa hermosa donde la compañía se volvió incondicional.',
        cards: [
          { id: 'cp-6', image: '/images/cadavezmaslinda-card.jpg', label: 'Cada vez más linda' },
        ],
      },
    ],
  },
  {
    id: 'aventura',
    label: 'Aventura',
    destinations: [
      // BARQUISIMETO
      {
        id: 'aventura-barq-empieza',
        heroImage: '/images/barquisimeto/empieza-fondo.jpg',
        heroPosition: 'right center',
        title: 'Empieza la\nAventura',
        description: 'El comienzo de nuestro viaje a Barquisimeto. La emoción de salir a la carretera y descubrir nuevos lugares juntos.',
        cards: [
          { id: 'av-b1', image: '/images/barquisimeto/empieza-card.jpg', label: 'Comienza el viaje', objectPosition: 'right' },
        ],
      },
      {
        id: 'aventura-barq-campo',
        heroImage: '/images/barquisimeto/campo-fondo.jpg',
        title: 'Días de\nCampo',
        description: 'Respirando aire puro en el campo. Momentos de tranquilidad, rodeados de naturaleza y mucha paz.',
        cards: [
          { id: 'av-b2', image: '/images/barquisimeto/Campo-card.jpg', label: 'En el campo' },
        ],
      },
      {
        id: 'aventura-barq-paseando',
        heroImage: '/images/barquisimeto/paseando-fondo.jpg',
        heroPosition: 'right center',
        title: 'Paseando por\nLara',
        description: 'Recorriendo la capital de Lara, conociendo sus rincones y creando memorias en cada paso que dábamos.',
        cards: [
          { id: 'av-b3', image: '/images/barquisimeto/paseando-cards.jpg', label: 'Paseando', objectPosition: 'right' },
        ],
      },
      {
        id: 'aventura-barq-enrios',
        heroImage: '/images/barquisimeto/enrios-fondo.jpg',
        title: 'Tardes\nen el Río',
        description: 'Refrescándonos en las aguas de los ríos de Barquisimeto. Risas, juegos y momentos inolvidables bajo el sol.',
        cards: [
          { id: 'av-b4', image: '/images/barquisimeto/enrios-card.jpg', label: 'En el río' },
        ],
      },
      // SANTO DOMINGO
      {
        id: 'aventura-sd-llegada',
        heroImage: '/images/Santodomingo/santodomingo-fondo.jpg',
        title: 'Hola Santo\nDomingo',
        description: 'Nuestra llegada a la hermosa ciudad de Santo Domingo. Nuevas culturas, nuevos sabores y una aventura por delante.',
        cards: [
          { id: 'av-s1', image: '/images/Santodomingo/santodomingo-card.jpg', label: 'Santo Domingo' },
        ],
      },
      {
        id: 'aventura-sd-algunasfotos',
        heroImage: '/images/Santodomingo/algunasfotos-fondo.jpg',
        title: 'Captura\nMomentos',
        description: 'Fotos hermosas de nosotros en nuestro paso por la ciudad. Cada imagen guarda una historia y una sonrisa de aquellos días.',
        cards: [
          { id: 'av-s2', image: '/images/Santodomingo/algunasfotos-card.jpg', label: 'Algunas fotos' },
        ],
      },
      {
        id: 'aventura-sd-centrocomercial',
        heroImage: '/images/Santodomingo/centrocomercial-fondo.jpg',
        title: 'Tarde de\nCompras',
        description: 'Paseando por el centro comercial, viendo tiendas y disfrutando de un día relajado en la ciudad.',
        cards: [
          { id: 'av-s3', image: '/images/Santodomingo/centrocomercial-card.jpg', label: 'Centro comercial' },
        ],
      },
      {
        id: 'aventura-sd-helado',
        heroImage: '/images/Santodomingo/helado-fondo.jpg',
        title: 'El Mejor\nHelado',
        description: 'Disfrutando de un delicioso helado en familia para refrescar la tarde. Los pequeños placeres que hacen el viaje especial.',
        cards: [
          { id: 'av-s4', image: '/images/Santodomingo/helado-card.jpg', label: 'Comiendo helado' },
        ],
      },
      {
        id: 'aventura-sd-paseoisla',
        heroImage: '/images/Santodomingo/paseoisla-fondo.jpg',
        title: 'Paseo por\nla Isla',
        description: 'Explorando las maravillas de la isla. conociendo lugares, saliendo en busca de oportunidades, compartiendo, divirtiéndonos.',
        cards: [
          { id: 'av-s5', image: '/images/Santodomingo/paseoisla-card.jpg', label: 'Paseo en la isla' },
        ],
      },
      {
        id: 'aventura-sd-salidalazaro',
        heroImage: '/images/Santodomingo/salidalazaro-fondo.jpg',
        title: 'Salida con\nel negro',
        description: 'Una salida inolvidable. Compartiendo buenos momentos, conversaciones y creando recuerdos invaluables juntos.',
        cards: [
          { id: 'av-s6', image: '/images/Santodomingo/salidalazaro-card.jpg', label: 'Salida especial' },
        ],
      },
      // ESPAÑA
      {
        id: 'aventura-es-1erdia',
        heroImage: '/images/españa/1erdia-fondo.jpg',
        title: 'Primer Día\nen España',
        description: 'El comienzo de nuestra gran aventura europea. Caminando por nuevas calles, sintiendo la magia del viejo continente.',
        cards: [
          { id: 'av-e1', image: '/images/españa/1erdia-card.jpg', label: 'Primer día' },
        ],
      },
      {
        id: 'aventura-es-comiendotapas',
        heroImage: '/images/españa/comiendotapas-fondo.jpg',
        title: 'Comiendo\nTapas',
        description: 'Disfrutando de la increíble gastronomía española. Tapas, buen ambiente y una experiencia culinaria inolvidable.',
        cards: [
          { id: 'av-e2', image: '/images/españa/comiendotapas-card.jpg', label: 'De tapas' },
        ],
      },
      {
        id: 'aventura-es-jardinbotanico',
        heroImage: '/images/españa/jardinbotanico-fondo.jpg',
        title: 'Jardín\nBotánico',
        description: 'Paseando entre la flora y la tranquilidad del jardín botánico. Un oasis de paz en medio de la ciudad.',
        cards: [
          { id: 'av-e3', image: '/images/españa/jardinbotanico.card.jpg', label: 'Jardín Botánico' },
        ],
      },
      {
        id: 'aventura-es-visitanmitrabajo',
        heroImage: '/images/españa/visitanmitrabajo-fondo.jpg',
        title: 'Visita\nal Trabajo',
        description: 'Qué alegría recibir visita en el trabajo. Compartir mi día a día con las personas que más quiero no tiene precio.',
        cards: [
          { id: 'av-e4', image: '/images/españa/visitanmitrabajo-card.jpg', label: 'Visita sorpresa' },
        ],
      },
      {
        id: 'aventura-es-cumplemama',
        heroImage: '/images/españa/cumplemama-fondo.jpg',
        title: 'Cumple\nde Mamá',
        description: 'Celebrando a la mujer más importante. Un cumpleaños lleno de amor, sorpresas y alegría en tierras españolas.',
        cards: [
          { id: 'av-e5', image: '/images/españa/cumplemama-card.jpg', label: 'Cumple de mamá' },
        ],
      },
      {
        id: 'aventura-es-micumple',
        heroImage: '/images/españa/Micumple-fondo.jpg',
        title: 'Mi\nCumple',
        description: 'Celebrando otro año de vida rodeada de amor y junto a mis seres queridos despues de mucho tiempo. Un cumpleaños que siempre llevaré en el corazón.',
        cards: [
          { id: 'av-e6', image: '/images/españa/Micumple-card.jpg', label: 'Mi cumpleaños' },
        ],
      },
      {
        id: 'aventura-es-diasenfamilia',
        heroImage: '/images/españa/diasenfamilia-fondo1.jpg',
        title: 'Días en\nFamilia',
        description: 'Los mejores momentos son los que compartimos juntos. Días de turismo, anécdotas, juegos de mesa (sobre todo) y mucho amor familiar.',
        cards: [
          { id: 'av-e7', image: '/images/españa/diasenfamilia-card.jpg', label: 'Días en familia' },
        ],
      },
      {
        id: 'aventura-es-ultimosdias',
        heroImage: '/images/españa/Ultimosdias-fondo.jpg',
        title: 'Últimos\nDías',
        description: 'Aprovechando hasta el último segundo la visita de mi familia este recuerdo será inolvidable. Ellos despidiendose de España y yo de ellos con el corazón lleno de amor.',
        cards: [
          { id: 'av-e8', image: '/images/españa/Ultimosdias-card.jpg', label: 'Últimos días' },
        ],
      },
    ],
  },
  {
    id: 'final',
    label: 'Final',
    destinations: [
      {
        id: 'final-reflexion',
        heroImage: '',
        title: '¿El final?',
        description: 'Si creíste que la historia terminaba aquí, es porque nunca la entendiste del todo. Una verdadera narración no tiene fin... y menos cuando aún tienes el poder de continuarla.\n\nAsí que toma el lápiz y vuelve a diseñar tu camino; no permitas que una página en blanco decida quién eres. Dicen que hay que recordar de dónde venimos para saber a dónde vamos.',
        cards: [
          { id: 'fn-c1', image: '/images/heroes/Conmama-fondo.jpg', label: 'Un nuevo comienzo' },
        ],
      },
    ],
  },
];
