export type ProjectIcon = 'drop' | 'book' | 'bag' | 'cloud';
export type ProjectStatus = 'live' | 'progress' | 'done';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  icon: ProjectIcon;
  stack: string;
  description: string;
  facts?: string[];
  live?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: 'blood',
    name: 'BloodConnect BD',
    status: 'live',
    icon: 'drop',
    stack: 'Next.js, TypeScript, Supabase, Tailwind CSS, Vercel',
    description:
      'Connects people who need blood in an emergency with registered donors nearby. The interface is in Bangla.',
    facts: [
      'Finds donors by blood group and location',
      'Checks the 90-day donation gap',
      'Shows new requests live',
      'Lists hospitals within 6 km',
    ],
    live: 'https://blood-connet-bd.vercel.app/',
    github: 'https://github.com/tarikul29/BloodConnetBD',
  },
  {
    id: 'iqra',
    name: 'Iqra Plan',
    status: 'progress',
    icon: 'book',
    stack: 'ইকরা প্ল্যান',
    description:
      "A study app I'm building right now. It isn't ready to open yet, so there is no link. Check back soon.",
  },
  {
    id: 'shop',
    name: 'ShopHub',
    status: 'done',
    icon: 'bag',
    stack: 'Tailwind CSS 4, Vite, JavaScript',
    description: 'An online store with a product grid, product details and a shopping cart.',
    github: 'https://github.com/tarikul29/ShopHub',
  },
  {
    id: 'weather',
    name: 'Weather App',
    status: 'done',
    icon: 'cloud',
    stack: 'JavaScript, OpenWeatherMap API',
    description: 'Type a city and see its current temperature, humidity and wind speed.',
    github: 'https://github.com/tarikul29/Weather--Apps-Project',
  },
];

export interface Skill {
  name: string;
  level: number;
}

export const skills: Skill[] = [
  { name: 'HTML', level: 90 },
  { name: 'CSS', level: 85 },
  { name: 'JavaScript', level: 80 },
  { name: 'GitHub', level: 80 },
  { name: 'Vercel', level: 75 },
  { name: 'TypeScript', level: 70 },
  { name: 'Netlify', level: 70 },
  { name: 'Photoshop', level: 70 },
  { name: 'Next.js', level: 65 },
  { name: 'Supabase', level: 60 },
];

export const sections = [
  { id: 'top', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const;

export const contact = {
  email: 'tarikulislam870265@gmail.com',
  phone: '01930310320',
  phoneHref: '+8801930310320',
  github: 'https://github.com/tarikul29',
  facebook: 'https://www.facebook.com/TP.TARIKUl',
  instagram: 'https://www.instagram.com/tarikul1015/',
};

export const ticker = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Supabase',
  'Vercel',
  'GitHub',
  'Netlify',
  'Photoshop',
];

export const roles = ['fast websites', 'smooth animations', 'React apps', 'clean interfaces'];

/**
 * Testimonials: what people say about working with Tarikul.
 * Fill `quote` (2-4 sentences) and `role` (for example "Client, BloodConnect BD")
 * with what the person really told you. The section stays hidden until at least
 * one quote is filled in, and a card without a quote is skipped.
 */
export const testimonials = [
  {
    name: 'Ramim',
    role: 'Teammate',
    photo: '/images/friend-ramim.webp',
    quote:
      'Working with Tarikul is easy and productive. He takes the work seriously, listens to ideas, and delivers clean, good-looking pages on time. I would happily work with him again.',
  },
  {
    name: 'Rokon',
    role: 'Teammate',
    photo: '/images/friend-rokon.webp',
    quote:
      'Tarikul is dependable and always ready to help when something gets stuck. He cares about small details, and the interfaces he builds feel smooth and polished.',
  },
  {
    name: 'Sayem',
    role: 'Teammate',
    photo: '/images/friend-sayem.webp',
    quote:
      'I have worked with Tarikul on projects and he is calm, creative and hard-working. He explains things clearly and keeps improving the work until it looks right.',
  },
];