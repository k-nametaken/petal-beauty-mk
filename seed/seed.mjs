/**
 * Seeds Petal Beauty MK test data into Sanity as a single siteContent document.
 * The n8n workflow queries *[_type == "siteContent"][0] — everything lives here.
 * Run: SANITY_TOKEN=<your-write-token> npm run seed
 */

const PROJECT_ID = 'xcj0xfwe';
const DATASET = 'production';
const TOKEN = process.env.SANITY_TOKEN;

if (!TOKEN) {
  console.error('ERROR: SANITY_TOKEN environment variable is required.');
  process.exit(1);
}

const mutations = [
  {
    createOrReplace: {
      _type: 'siteContent',
      _id: 'petalBeautyMK',

      heroSection: {
        headline: 'Petal Beauty MK',
        subheading: 'Professional beauty treatments in Milton Keynes',
        ctaText: 'Book Now',
      },

      announcement: {
        text: '',
        visible: false,
      },

      aboutPage: {
        ownerName: 'Sophie Petal',
        ownerBio: 'Passionate about beauty with 8 years experience in Milton Keynes',
        yearsExperience: 8,
        mainText: 'Welcome to Petal Beauty MK, your local beauty sanctuary in Milton Keynes. We offer a range of professional treatments to help you look and feel your best. Our skilled therapists are dedicated to providing a relaxing, welcoming experience every visit.',
      },

      contactDetails: {
        phone: '07700 000000',
        email: 'hello@petalbeautymk.co.uk',
        address: '1 Example Street MK1 1AA',
        googleMapsLink: '',
      },

      openingHours: {
        monday:    '9am - 6pm',
        tuesday:   '9am - 6pm',
        wednesday: '9am - 6pm',
        thursday:  '9am - 6pm',
        friday:    '9am - 6pm',
        saturday:  '10am - 5pm',
        sunday:    'Closed',
      },

      services: [
        { name: 'Gel Nails',       price: '£30',  description: 'Long-lasting gel polish in a wide range of colours.',                              category: 'Nails',           visible: true },
        { name: 'Acrylic Nails',   price: '£45',  description: 'Full set of acrylic nails, sculpted and shaped to your preference.',               category: 'Nails',           visible: true },
        { name: 'Lash Extensions', price: '£55',  description: 'Classic, hybrid, or volume lash sets for a stunning look.',                        category: 'Lashes & Brows',  visible: true },
        { name: 'Brow Tint',       price: '£15',  description: 'Define and shape your brows with a professional tint.',                            category: 'Lashes & Brows',  visible: true },
        { name: 'Facial',          price: '£45',  description: 'Relaxing and revitalising facial tailored to your skin type.',                     category: 'Skin',            visible: true },
        { name: 'Lip Filler',      price: '£120', description: 'Natural-looking lip enhancement performed by a certified aesthetician.',           category: 'Aesthetics',      visible: true },
      ],

      reviews: [
        { text: 'Amazing service! Sophie made me feel so welcome and my gel nails look absolutely perfect.', author: 'Sarah M', rating: 5, date: '2025-03-10', visible: true },
        { text: "Best lashes I've ever had. I've been coming to Petal Beauty MK for 6 months and I wouldn't go anywhere else.", author: 'Emma T', rating: 5, date: '2025-04-02', visible: true },
      ],

      teamMembers: [
        { name: 'Sophie Petal', role: 'Owner & Lead Therapist', bio: 'Passionate about beauty with 8 years experience in Milton Keynes. Specialising in nails, lashes, and aesthetics.' },
      ],

      certifications: [
        { name: 'NVQ Level 3 Beauty Therapy', issuer: 'VTCT',               year: 2022 },
        { name: 'Lip Filler Certification',    issuer: 'Aesthetics Academy', year: 2023 },
      ],

      qualifications: [],

      awards: [],

      faqs: [
        { question: 'How do I book an appointment?',                        answer: 'You can book by calling us, sending us an email, or messaging us on social media. We aim to respond within a few hours.',                          visible: true },
        { question: 'Do I need a patch test before lash extensions?',       answer: 'Yes, we recommend a patch test at least 48 hours before your first lash appointment. Please get in touch to arrange this.',                          visible: true },
        { question: 'What is your cancellation policy?',                    answer: 'We kindly ask for at least 24 hours notice for cancellations. Late cancellations may be subject to a charge.',                                       visible: true },
        { question: 'Is there parking nearby?',                             answer: 'Yes, there is free street parking available on Example Street and the surrounding roads.',                                                            visible: true },
      ],

      galleryPhotos: [],

      socialLinks: {
        instagram: '',
        facebook: '',
        tiktok: '',
      },

      seo: {
        metaTitle: 'Petal Beauty MK — Professional Beauty in Milton Keynes',
        metaDescription: 'Gel nails, lash extensions, facials, lip filler and more. Book your appointment at Petal Beauty MK today.',
        keywords: 'beauty salon, Milton Keynes, gel nails, lash extensions, lip filler',
      },
    },
  },
];

async function seed() {
  console.log(`Seeding siteContent document into Sanity project ${PROJECT_ID}/${DATASET}...`);

  const response = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ mutations }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.error('Seed failed:', JSON.stringify(result, null, 2));
    process.exit(1);
  }

  console.log(`✓ siteContent document seeded (id: petalBeautyMK)`);
  result.results?.forEach(r => console.log(`  ${r.operation}: ${r.id}`));
}

seed().catch(err => { console.error(err); process.exit(1); });
