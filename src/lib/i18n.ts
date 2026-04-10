export type Lang = "en" | "es";

export const SUPPORTED_LANGS: Lang[] = ["en", "es"];

export function isValidLang(lang: string): lang is Lang {
  return SUPPORTED_LANGS.includes(lang as Lang);
}

const translations = {
  en: {
    searchBlogByTopic: "Search blog by topic",
    articles: "Articles",
    noPosts: "No blog posts found.",
    allPosts: "All posts",
    readMore: "Read more",
    searchResults: "Search results",
    searchResultsFor: "Search results for",
    articlesFound: "articles",
    articleFound: "article",
    found: "found",
    in: "in",
    filterByTopic: "Filter by topic",
    noArticlesFound: "No articles found. Try a different search term.",
    topics: "Topics",
    browseAllTopics: "Browse all",
    topicsLabel: "topics",
    postsAbout: "Posts about",
    postNotFound: "Post Not Found",
    postNotFoundMessage: "The blog post you're looking for doesn't exist.",
    backToHome: "Back to home",
    backArrow: "Back arrow",
    showAll: "Show all",
    searchPlaceholder: "Search articles...",
    clear: "Clear",
    relatedArticles: "Related Articles",
    noPostsIcon: "No posts icon",
  },
  es: {
    searchBlogByTopic: "Buscar blog por tema",
    articles: "Artículos",
    noPosts: "No se encontraron artículos del blog.",
    allPosts: "Todos los artículos",
    readMore: "Leer más",
    searchResults: "Resultados de búsqueda",
    searchResultsFor: "Resultados de búsqueda para",
    articlesFound: "artículos",
    articleFound: "artículo",
    found: "encontrados",
    in: "en",
    filterByTopic: "Filtrar por tema",
    noArticlesFound:
      "No se encontraron artículos. Intenta con otro término de búsqueda.",
    topics: "Temas",
    browseAllTopics: "Explora los",
    topicsLabel: "temas",
    postsAbout: "Artículos sobre",
    postNotFound: "Artículo No Encontrado",
    postNotFoundMessage: "El artículo que buscas no existe.",
    backToHome: "Volver al inicio",
    backArrow: "Flecha atrás",
    showAll: "Ver todos",
    searchPlaceholder: "Buscar artículos...",
    clear: "Borrar",
    relatedArticles: "Artículos relacionados",
    noPostsIcon: "No posts icon",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key];
}
