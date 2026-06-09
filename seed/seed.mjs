/**
 * Seeds Petal Beauty MK test data into Sanity.
 * Run: SANITY_TOKEN=<your-write-token> npm run seed
 */

const PROJECT_ID = 'xcj0xfwe';
const DATASET = 'production';
const TOKEN = process.env.SANITY_TOKEN;

if (!TOKEN) {
  console.error('ERROR: SANITY_TOKEN environment variable is required.');
  console.error('Get your token from: https://sanity.io/manage -> xcj0xfwe -> API -> Tokens');
  process.exit(1);
}

const mutations = [
  // ─── Site Settings (singleton) ───────────────────────────────────────────
  {
    createOrReplace: {
      _type: 'siteSettings',
      _id: 'siteSettings',
      businessName: 'Petal Beauty MK',
      tagline: 'Professional beauty treatments in Milton Keynes',
      announcement: {
        active: false,
        message: '',
      },
      about: {
        ownerName: 'Sophie Petal',
        bio: 'Passionate about beauty with 8 years experience in Milton Keynes',
      },
      contact: {
        phone: '07700 000000',
        email: 'hello@petalbeautymk.co.uk',
        address: '1 Example Street MK1 1AA',
      },
      openingHours: [
        { day: 'Monday',    open: '9am', close: '6pm', closed: false },
        { day: 'Tuesday',   open: '9am', close: '6pm', closed: false },
        { day: 'Wednesday', open: '9am', close: '6pm', closed: false },
        { day: 'Thursday',  open: '9am', close: '6pm', closed: false },
        { day: 'Friday',    open: '9am', close: '6pm', closed: false },
        { day: 'Saturday',  open: '10am', close: '5pm', closed: false },
        { day: 'Sunday',    open: '', close: '', closed: true },
      ],
      socialLinks: {
        instagram: '',
        facebook: '',
        tiktok: '',
      },
      seo: {
        title: 'Petal Beauty MK — Professional Beauty in Milton Keynes',
        description: 'Gel nails, lash extensions, facials, lip filler and more. Book your appointment at Petal Beauty MK today.',
      },
    },
  },

  // ─── Services ─────────────────────────────────────────────────────────────
  {
    createOrReplace: {
      _type: 'service',
      _id: 'service-gel-nails',
      name: 'Gel Nails',
      price: '£30',
      description: 'Long-lasting gel polish in a wide range of colours.',
      category: 'Nails',
    },
  },
  {
    createOrReplace: {
      _type: 'service',
      _id: 'service-acrylic-nails',
      name: 'Acrylic Nails',
      price: '£45',
      description: 'Full set of acrylic nails, sculpted and shaped to your preference.',
      category: 'Nails',
    },
  },
  {
    createOrReplace: {
      _type: 'service',
      _id: 'service-lash-extensions',
      name: 'Lash Extensions',
      price: '£55',
      description: 'Classic, hybrid, or volume lash sets for a stunning look.',
      category: 'Lashes & Brows',
    },
  },
  {
    createOrReplace: {
      _type: 'service',
      _id: 'service-brow-tint',
      name: 'Brow Tint',
      price: '£15',
      description: 'Define and shape your brows with a professional tint.',
      category: 'Lashes & Brows',
    },
  },
  {
    createOrReplace: {
      _type: 'service',
      _id: 'service-facial',
      name: 'Facial',
      price: '£45',
      description: 'Relaxing and revitalising facial tailored to your skin type.',
      category: 'Skin',
    },
  },
  {
    createOrReplace: {
      _type: 'service',
      _id: 'service-lip-filler',
      name: 'Lip Filler',
      price: '£120',
      description: 'Natural-looking lip enhancement performed by a certified aesthetician.',
      category: 'Aesthetics',
    },
  },

  // ─── Reviews ──────────────────────────────────────────────────────────────
  {
    createOrReplace: {
      _type: 'review',
      _id: 'review-sarah-m',
      text: 'Amazing service! Sophie made me feel so welcome and my gel nails look absolutely perfect.',
      author: 'Sarah M',
      rating: 5,
      date: '2025-03-10',
    },
  },
  {
    createOrReplace: {
      _type: 'review',
      _id: 'review-emma-t',
      text: "Best lashes I've ever had. I've been coming to Petal Beauty MK for 6 months and I wouldn't go anywhere else.",
      author: 'Emma T',
      rating: 5,
      date: '2025-04-02',
    },
  },

  // ─── Team ─────────────────────────────────────────────────────────────────
  {
    createOrReplace: {
      _type: 'teamMember',
      _id: 'team-sophie-petal',
      name: 'Sophie Petal',
      role: 'Owner & Lead Therapist',
      bio: 'Passionate about beauty with 8 years experience in Milton Keynes. Specialising in nails, lashes, and aesthetics.',
    },
  },

  // ─── Certifications ───────────────────────────────────────────────────────
  {
    createOrReplace: {
      _type: 'certification',
      _id: 'cert-nvq-beauty',
      name: 'NVQ Level 3 Beauty Therapy',
      issuer: 'VTCT',
      year: 2022,
      type: 'certification',
    },
  },
  {
    createOrReplace: {
      _type: 'certification',
      _id: 'cert-lip-filler',
      name: 'Lip Filler Certification',
      issuer: 'Aesthetics Academy',
      year: 2023,
      type: 'certification',
    },
  },

  // ─── FAQs ─────────────────────────────────────────────────────────────────
  {
    createOrReplace: {
      _type: 'faq',
      _id: 'faq-how-to-book',
      question: 'How do I book an appointment?',
      answer: 'You can book by calling us, sending us an email, or messaging us on social media. We aim to respond within a few hours.',
    },
  },
  {
    createOrReplace: {
      _type: 'faq',
      _id: 'faq-patch-test',
      question: 'Do I need a patch test before lash extensions?',
      answer: 'Yes, we recommend a patch test at least 48 hours before your first lash appointment. Please get in touch to arrange this.',
    },
  },
  {
    createOrReplace: {
      _type: 'faq',
      _id: 'faq-cancellation',
      question: 'What is your cancellation policy?',
      answer: 'We kindly ask for at least 24 hours notice for cancellations. Late cancellations may be subject to a charge.',
    },
  },
  {
    createOrReplace: {
      _type: 'faq',
      _id: 'faq-parking',
      question: 'Is there parking nearby?',
      answer: 'Yes, there is free street parking available on Example Street and the surrounding roads.',
    },
  },
];

async function seed() {
  console.log(`Seeding ${mutations.length} documents into Sanity project ${PROJECT_ID}/${DATASET}...`);

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

  const succeeded = result.results?.filter(r => r.operation !== 'none').length || 0;
  console.log(`✓ Seeded successfully. ${succeeded} documents created/updated.`);
  console.log('Documents created:');
  result.results?.forEach(r => {
    console.log(`  ${r.operation}: ${r.id}`);
  });
}

seed().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
