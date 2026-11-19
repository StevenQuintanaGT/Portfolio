// All interface text lives here. To change a sentence, edit it in both
// `en` and `es`. Project cards live in src/content/projects/{en,es}/.

export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'meta.title': 'Steven Quintana — Cybersecurity · Networking · Cloud',
    'meta.description':
      'Portfolio of Steven Quintana, a final-year Information Systems Engineering student in Guatemala focused on cybersecurity, networking and cloud.',

    'nav.about': 'about',
    'nav.experience': 'experience',
    'nav.skills': 'skills',
    'nav.projects': 'projects',
    'nav.certs': 'certs',
    'nav.blog': 'blog',
    'nav.contact': 'contact',
    'nav.switch': 'Ver en español',

    'hero.role': 'Cybersecurity · Networking · Cloud',
    'hero.tagline': 'Final-year Information Systems Engineering student and computer technician based in Guatemala.',
    'hero.cta.projects': 'View projects',
    'hero.cta.contact': 'Contact',
    'hero.hello': "Hi, I'm",
    'hero.status': 'Open to internships',

    'about.heading': 'About me',
    'about.languages': 'Spanish (native) · English (intermediate)',
    'education.heading': 'Education',
    'education.degree': 'Information Systems Engineering and Computer Science',
    'education.degree.school': 'Universidad Mariano Gálvez de Guatemala · Jutiapa campus',
    'education.degree.period': '2022–Present · Final year',
    'education.accounting': 'Technical diploma in accounting with a computing focus',
    'education.technician': 'Computer technician',
    'experience.heading': 'Professional experience',
    'experience.employer': 'Municipality of Monjas, Jalapa',
    'experience.omas': 'Head of the Municipal Water and Sanitation Office (OMAS)',
    'experience.omas.period': 'March 2025–Present',
    'experience.omas.team': 'Lead a six-person team of technicians and administrative staff, plan their work and track its completion.',
    'experience.omas.service': 'Track residents’ requests and reports through resolution, and prepare official documents and reports.',
    'experience.omas.field': 'Inspect work in the field and follow up until it is complete.',
    'experience.ospm': 'Assistant at the Municipal Public Services Office (OSPM)',
    'experience.ospm.period': 'August 2024–February 2025',
    'experience.ospm.service': 'Logged and followed up on residents’ requests through resolution.',
    'experience.ospm.operations': 'Managed records, inventory and supply requests, helped prepare reports and checked work in the field.',
    'skills.heading': 'Tools I work with',
    'projects.heading': 'Things I have built',
    'projects.featured': 'Featured',
    'certs.heading': 'Certifications & training',
    'contact.heading': "Let's talk.",

    'term.hint': 'Type a command or tap one:',
    'term.label': 'Terminal command',
    'term.placeholder': 'type help',
    'term.help.title': 'Available commands:',
    'term.help.help': 'show this list',
    'term.help.whoami': 'who I am',
    'term.help.about': 'a bit about me',
    'term.help.experience': 'work experience',
    'term.help.skills': 'tools I use',
    'term.help.projects': 'things I have built',
    'term.help.certs': 'certifications & training',
    'term.help.contact': 'how to reach me',
    'term.help.lang': 'ver en español',
    'term.help.clear': 'clear the screen',
    'term.notFound': 'command not found: {cmd}. Type help to see the list.',
    'term.sudo': 'Permission denied. Nice try.',
    'term.switching': 'Switching to Spanish…',

    'about.title': 'about',
    'about.p1':
      'I’m in my final year at Universidad Mariano Gálvez de Guatemala (Jutiapa campus). My focus is cybersecurity, networking and cloud infrastructure.',
    'about.p2':
      'I work with Linux, Nmap and Docker. I use AWS and Cloudflare, and manage the DNS, email routing and hosting for this portfolio.',

    'skills.title': 'skills',
    'skills.security': 'Security & networking',
    'skills.systems': 'Systems & infrastructure',
    'skills.cloud': 'Cloud',
    'skills.ipv4': 'IPv4 subnetting',

    'projects.title': 'projects',
    'projects.problem': 'Problem',
    'projects.result': 'Result',
    'projects.tools': 'Tools',
    'projects.demo': 'Live site',
    'projects.repo': 'Source code',

    'certs.title': 'certifications',
    'certs.earned': 'Earned credentials',
    'certs.training': 'Ongoing training & scholarships',
    'certs.credly': 'View badges on Credly',
    'certs.status.done': 'earned',
    'certs.status.completed': 'completed',
    'certs.status.progress': 'in progress',
    'certs.status.preparing': 'in preparation',
    'certs.status.accepted': 'accepted',
    'certs.nse.expiry': 'Expires in November 2028',
    'certs.itn.scholarship': 'Instituto RED scholarship',
    'certs.irsi.name': 'Cybersecurity training scholarship',

    'contact.title': 'contact',
    'contact.text': 'Open to internships and labs in security and infrastructure. Email is the fastest way to reach me.',
    'contact.email': 'Send an email',

    'footer.built': 'Built with Astro · Hosted on Cloudflare Pages',

    'blog.title': 'blog',
    'blog.metaTitle': 'Blog — Steven Quintana',
    'blog.description': 'Articles, guides and write-ups on networking, infrastructure and security.',
    'blog.intro': 'Notes, guides and write-ups from what I learn about networks, infrastructure and security.',
    'blog.empty': 'No articles yet. The first one is on its way.',
    'blog.readingTime': '{n} min read',
    'blog.updated': 'Updated',
    'blog.draft': 'draft',
    'blog.back': 'Back to blog',
    'blog.tags': 'Tags',
    'blog.allPosts': 'all',
    'blog.tagTitle': 'Articles tagged',
    'blog.rss': 'RSS feed',
    'blog.lang.es': 'in Spanish',
    'blog.lang.en': 'in English',
  },
  es: {
    'meta.title': 'Steven Quintana — Ciberseguridad · Redes · Cloud',
    'meta.description':
      'Portafolio de Steven Quintana, estudiante de último año de Ingeniería en Sistemas de Información en Guatemala, enfocado en ciberseguridad, redes y cloud.',

    'nav.about': 'sobre-mí',
    'nav.experience': 'experiencia',
    'nav.skills': 'habilidades',
    'nav.projects': 'proyectos',
    'nav.certs': 'certificaciones',
    'nav.blog': 'blog',
    'nav.contact': 'contacto',
    'nav.switch': 'View in English',

    'hero.role': 'Ciberseguridad · Redes · Cloud',
    'hero.tagline': 'Estudiante de último año de Ingeniería en Sistemas de Información y técnico en computación en Guatemala.',
    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.contact': 'Contactar',
    'hero.hello': 'Hola, soy',
    'hero.status': 'Disponible para pasantías',

    'about.heading': 'Sobre mí',
    'about.languages': 'Español (nativo) · Inglés (intermedio)',
    'education.heading': 'Educación',
    'education.degree': 'Ingeniería en Sistemas de Información y Ciencias de la Computación',
    'education.degree.school': 'Universidad Mariano Gálvez de Guatemala · Campus Jutiapa',
    'education.degree.period': '2022–Actualidad · Último año',
    'education.accounting': 'Perito Contador con orientación en computación',
    'education.technician': 'Técnico en Computación',
    'experience.heading': 'Experiencia profesional',
    'experience.employer': 'Municipalidad de Monjas, Jalapa',
    'experience.omas': 'Encargado de la Oficina Municipal de Agua y Saneamiento (OMAS)',
    'experience.omas.period': 'Marzo de 2025–Actualidad',
    'experience.omas.team': 'Lidero un equipo de seis personas, entre técnicos y personal administrativo. Planifico sus actividades y doy seguimiento a su cumplimiento.',
    'experience.omas.service': 'Gestiono las solicitudes y reportes de la población hasta su resolución y preparo documentación oficial e informes.',
    'experience.omas.field': 'Verifico la calidad de los trabajos en campo y les doy seguimiento hasta su finalización.',
    'experience.ospm': 'Asistente de la Oficina de Servicios Públicos Municipales (OSPM)',
    'experience.ospm.period': 'Agosto de 2024–Febrero de 2025',
    'experience.ospm.service': 'Registré y di seguimiento a las solicitudes de los vecinos hasta su resolución.',
    'experience.ospm.operations': 'Gestioné documentación, inventarios y solicitudes de insumos, apoyé la elaboración de informes y verifiqué trabajos en campo.',
    'skills.heading': 'Herramientas con las que trabajo',
    'projects.heading': 'Lo que he construido',
    'projects.featured': 'Destacado',
    'certs.heading': 'Certificaciones y formación',
    'contact.heading': 'Hablemos.',

    'term.hint': 'Escribe un comando o toca uno:',
    'term.label': 'Comando de la terminal',
    'term.placeholder': 'escribe help',
    'term.help.title': 'Comandos disponibles:',
    'term.help.help': 'muestra esta lista',
    'term.help.whoami': 'quién soy',
    'term.help.about': 'un poco sobre mí',
    'term.help.experience': 'experiencia profesional',
    'term.help.skills': 'herramientas que uso',
    'term.help.projects': 'lo que he construido',
    'term.help.certs': 'certificaciones y formación',
    'term.help.contact': 'cómo contactarme',
    'term.help.lang': 'view in English',
    'term.help.clear': 'limpia la pantalla',
    'term.notFound': 'comando no encontrado: {cmd}. Escribe help para ver la lista.',
    'term.sudo': 'Permiso denegado. Buen intento.',
    'term.switching': 'Cambiando a inglés…',

    'about.title': 'sobre-mí',
    'about.p1':
      'Curso el último año en la Universidad Mariano Gálvez de Guatemala, Campus Jutiapa. Mi enfoque es la ciberseguridad, las redes y la infraestructura en la nube.',
    'about.p2':
      'Trabajo con Linux, Nmap y Docker. Uso AWS y Cloudflare, y administro el DNS, el enrutamiento de correo y el alojamiento de este portafolio.',

    'skills.title': 'habilidades',
    'skills.security': 'Seguridad y redes',
    'skills.systems': 'Sistemas e infraestructura',
    'skills.cloud': 'Cloud',
    'skills.ipv4': 'Subnetting IPv4',

    'projects.title': 'proyectos',
    'projects.problem': 'Problema',
    'projects.result': 'Resultado',
    'projects.tools': 'Herramientas',
    'projects.demo': 'Ver sitio',
    'projects.repo': 'Código fuente',

    'certs.title': 'certificaciones',
    'certs.earned': 'Credenciales obtenidas',
    'certs.training': 'Formación en curso y becas',
    'certs.credly': 'Ver insignias en Credly',
    'certs.status.done': 'obtenida',
    'certs.status.completed': 'completado',
    'certs.status.progress': 'en curso',
    'certs.status.preparing': 'en preparación',
    'certs.status.accepted': 'aceptada',
    'certs.nse.expiry': 'Vence en noviembre de 2028',
    'certs.itn.scholarship': 'Beca de Instituto RED',
    'certs.irsi.name': 'Beca de formación en ciberseguridad',

    'contact.title': 'contacto',
    'contact.text': 'Busco pasantías y laboratorios de seguridad e infraestructura. El correo es la forma más rápida de contactarme.',
    'contact.email': 'Enviar correo',

    'footer.built': 'Hecho con Astro · Alojado en Cloudflare Pages',

    'blog.title': 'blog',
    'blog.metaTitle': 'Blog — Steven Quintana',
    'blog.description': 'Artículos, guías y write-ups sobre redes, infraestructura y seguridad.',
    'blog.intro': 'Notas, guías y write-ups de lo que voy aprendiendo sobre redes, infraestructura y seguridad.',
    'blog.empty': 'Todavía no hay artículos. El primero viene en camino.',
    'blog.readingTime': '{n} min de lectura',
    'blog.updated': 'Actualizado',
    'blog.draft': 'borrador',
    'blog.back': 'Volver al blog',
    'blog.tags': 'Etiquetas',
    'blog.allPosts': 'todos',
    'blog.tagTitle': 'Artículos con la etiqueta',
    'blog.rss': 'Feed RSS',
    'blog.lang.es': 'en español',
    'blog.lang.en': 'en inglés',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key] ?? ui[defaultLang][key];
}

// Skills are tool names, so they are the same in both languages.
export const skills = {
  security: ['Nmap', 'Cisco Packet Tracer'],
  systems: ['Linux (Ubuntu, Fedora, Arch)', 'Windows Server', 'Bash', 'Docker', 'Git & GitHub'],
  cloud: ['Cloudflare Pages', 'Cloudflare DNS', 'Cloudflare Email Routing', 'AWS'],
} as const;

export function getExperience(lang: Lang) {
  const t = useTranslations(lang);
  return [
    {
      title: t('experience.omas'),
      period: t('experience.omas.period'),
      duties: [t('experience.omas.team'), t('experience.omas.service'), t('experience.omas.field')],
    },
    {
      title: t('experience.ospm'),
      period: t('experience.ospm.period'),
      duties: [t('experience.ospm.service'), t('experience.ospm.operations')],
    },
  ];
}

export function getCredentials(lang: Lang) {
  const t = useTranslations(lang);
  return {
    earned: [
      {
        name: 'Fortinet NSE 1 Certified in Cybersecurity',
        issuer: 'Fortinet',
        label: t('certs.status.done'),
        status: 'done',
        detail: t('certs.nse.expiry'),
      },
      {
        name: 'Fortinet Cybersecurity and Cloud Fundamentals 1.0',
        issuer: 'Fortinet',
        label: t('certs.status.completed'),
        status: 'done',
        detail: '2026',
      },
      {
        name: 'Introduction to Cybersecurity',
        issuer: 'Cisco',
        label: t('certs.status.completed'),
        status: 'done',
        detail: '2026',
      },
    ],
    training: [
      {
        name: 'CCNA 1: Introduction to Networks (ITN)',
        issuer: 'Cisco Networking Academy',
        label: t('certs.status.progress'),
        status: 'progress',
        detail: t('certs.itn.scholarship'),
      },
      {
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'AWS',
        label: t('certs.status.preparing'),
        status: 'progress',
        detail: '',
      },
      {
        name: 'CCST Cybersecurity',
        issuer: 'Cisco',
        label: t('certs.status.preparing'),
        status: 'progress',
        detail: '',
      },
      {
        name: t('certs.irsi.name'),
        issuer: 'IRSI',
        label: t('certs.status.accepted'),
        status: 'accepted',
        detail: '2027',
      },
    ],
  };
}
