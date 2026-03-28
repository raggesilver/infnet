export type Skill = {
  id: string;
  name: string;
  level: "Iniciante" | "Intermediario" | "Avancado" | "Especialista";
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: number;
};

export const DEFAULT_PROFILE = {
  name: "Paulo Queiroz",
  title: "Engenheiro de Software Senior",
  bio: "Engenheiro de software com 6 anos de experiencia, incluindo 1 ano como senior. Experiencia com desenvolvimento web e mobile, focado em TypeScript, React e React Native.",
  avatar: "https://github.com/raggesilver.png",
  github: "raggesilver",
  devto: "ben",
  email: "paulo.vqueiroz@al.infnet.edu.br",
  location: "Brasil",
};

export const SKILLS: Skill[] = [
  { id: "1", name: "TypeScript", level: "Especialista" },
  { id: "2", name: "React", level: "Especialista" },
  { id: "3", name: "React Native", level: "Avancado" },
  { id: "4", name: "Node.js", level: "Avancado" },
  { id: "5", name: "Go", level: "Avancado" },
  { id: "6", name: "Python", level: "Intermediario" },
  { id: "7", name: "Docker", level: "Avancado" },
  { id: "8", name: "Git", level: "Especialista" },
  { id: "9", name: "PostgreSQL", level: "Avancado" },
  { id: "10", name: "Linux", level: "Avancado" },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "1",
    name: "Engenharia de Software",
    issuer: "Instituto Infnet",
    year: 2026,
  },
];
