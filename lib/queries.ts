export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    businessName, tagline,
    announcement,
    about,
    contact,
    openingHours,
    socialLinks,
    seo
  }
`;

export const SERVICES_QUERY = `
  *[_type == "service"] | order(category asc, name asc) {
    _id, name, price, description, category
  }
`;

export const REVIEWS_QUERY = `
  *[_type == "review"] | order(_createdAt desc) {
    _id, text, author, rating, date
  }
`;

export const TEAM_QUERY = `
  *[_type == "teamMember"] | order(_createdAt asc) {
    _id, name, role, bio
  }
`;

export const CERTIFICATIONS_QUERY = `
  *[_type == "certification"] | order(year desc) {
    _id, name, issuer, year, type
  }
`;

export const AWARDS_QUERY = `
  *[_type == "award"] | order(year desc) {
    _id, name, year, description
  }
`;

export const FAQS_QUERY = `
  *[_type == "faq"] | order(_createdAt asc) {
    _id, question, answer
  }
`;

export const GALLERY_QUERY = `
  *[_type == "galleryPhoto"] | order(_createdAt asc) {
    _id, title, alt,
    "imageUrl": image.asset->url
  }
`;
