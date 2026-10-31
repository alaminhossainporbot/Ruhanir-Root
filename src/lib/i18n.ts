import { en } from '@/content/en';
import { bn } from '@/content/bn';

export type Lang = 'bn' | 'en';

export const languages: Lang[] = ['bn', 'en'];

export const defaultLang: Lang = 'bn';

export function getContent(lang: Lang) {
  return lang === 'en' ? en : bn;
}

export function isValidLang(lang: string): lang is Lang {
  return lang === 'bn' || lang === 'en';
}
