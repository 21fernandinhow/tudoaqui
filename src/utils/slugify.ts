export const slugify = (text: string) => {
    return text
        .normalize('NFD')                     // Remove acentos
        .replace(/[\u0300-\u036f]/g, '')      // Remove marcas de acento
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')                 // Substitui espaços por hífens
        .replace(/[^a-z0-9-]/g, '')           // Remove tudo que não é letra, número ou hífen
        .replace(/--+/g, '-')                 // Evita múltiplos hífens seguidos
        .slice(0, 40);
}