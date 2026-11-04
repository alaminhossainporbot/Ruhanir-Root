export interface OrganizationSchemaOptions {
  name: string;
  alternateName?: string;
  url: string;
  logoUrl: string;
  email: string;
  telephone: string;
  parentOrganizationUrl?: string;
  subOrganizations?: Array<{
    name: string;
    url: string;
    description: string;
  }>;
  sameAs?: string[];
}

export function buildOrganizationJsonLd(options: OrganizationSchemaOptions) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: options.name,
    url: options.url,
    logo: options.logoUrl,
    email: options.email,
    telephone: options.telephone,
  };

  if (options.alternateName) {
    schema.alternateName = options.alternateName;
  }

  if (options.sameAs && options.sameAs.length > 0) {
    schema.sameAs = options.sameAs;
  }

  if (options.parentOrganizationUrl) {
    schema.parentOrganization = {
      '@type': 'Organization',
      name: 'Ruhanir Engine',
      url: options.parentOrganizationUrl,
    };
  }

  if (options.subOrganizations && options.subOrganizations.length > 0) {
    schema.subOrganization = options.subOrganizations.map((sub) => ({
      '@type': 'Organization',
      name: sub.name,
      url: sub.url,
      description: sub.description,
    }));
  }

  return schema;
}

export function buildWebSiteJsonLd(name: string, alternateName: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    alternateName,
    url,
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildArticleJsonLd(article: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  authorName: string;
  publisherName: string;
  publisherLogoUrl: string;
  imageUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    author: {
      '@type': 'Organization',
      name: article.authorName,
      url: article.url,
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisherName,
      logo: {
        '@type': 'ImageObject',
        url: article.publisherLogoUrl,
      },
    },
    image: article.imageUrl ? [article.imageUrl] : [],
  };
}
