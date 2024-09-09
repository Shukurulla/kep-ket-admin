export default function createSlug(text) {
  return text
    .toLowerCase() // Barcha harflarni kichik harflarga o'zgartirish
    .replace(/[\s\W-]+/g, "-") // Bo'shliqlar va maxsus belgilarni tirega almashtirish
    .replace(/^-+|-+$/g, ""); // Boshida va oxirida tire bo'lsa olib tashlash
}
