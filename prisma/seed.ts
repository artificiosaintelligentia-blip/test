import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Seed specialties
  const specialties = [
    {
      name: 'Medium',
      description: 'Contact met overledenen en spirituele begeleiding door ervaren mediums.',
      color: 'bg-violet-100 text-violet-800',
      count: 0,
      tags: ['Overledenen', 'Spiritueel', 'Contact'],
    },
    {
      name: 'Tarot & Kaartleggingen',
      description: 'Inzicht in je toekomst en huidige situatie door ervaren tarotlezers en kaartleggers.',
      color: 'bg-emerald-100 text-emerald-800',
      count: 0,
      tags: ['Tarot', 'Kaarten', 'Voorspelling'],
    },
    {
      name: 'Life coaching',
      description: 'Persoonlijke ontwikkeling en doelen bereiken met professionele life coaches.',
      color: 'bg-indigo-100 text-indigo-800',
      count: 0,
      tags: ['Doelen', 'Groei', 'Motivatie'],
    },
    {
      name: 'Liefde & Relatie',
      description: 'Relatieproblemen, liefdesverdriet of op zoek naar de ware? Krijg inzicht in je liefdesleven.',
      color: 'bg-pink-100 text-pink-800',
      count: 0,
      tags: ['Liefde', 'Relaties', 'Zielsverwant'],
    },
    {
      name: 'Spiritualiteit',
      description: 'Spirituele begeleiding en ontwikkeling. Ontdek je spirituele pad en innerlijke wijsheid.',
      color: 'bg-violet-100 text-violet-800',
      count: 0,
      tags: ['Spiritueel', 'Meditatie', 'Bewustzijn'],
    },
  ];

  console.log('📋 Seeding specialties...');
  for (const specialty of specialties) {
    await prisma.specialty.upsert({
      where: { name: specialty.name },
      update: specialty,
      create: specialty,
    });
  }

  // Seed admin users
  const adminUsers = [
    {
      email: 'admin@topmediumvisie.nl',
      name: 'Admin User',
      role: 'ADMIN',
      walletBalance: 0,
    },
    {
      email: 'support@topmediumvisie.nl',
      name: 'Support Team',
      role: 'ADMIN',
      walletBalance: 0,
    },
  ];

  console.log('👑 Seeding admin users...');
  for (const admin of adminUsers) {
    await prisma.user.upsert({
      where: { email: admin.email },
      update: admin,
      create: admin,
    });
  }

  // Seed demo users
  const demoUsers = [
    {
      email: 'jan.janssen@example.com',
      name: 'Jan Janssen',
      role: 'USER',
      walletBalance: 2000, // €20.00
    },
    {
      email: 'maria.peters@example.com',
      name: 'Maria Peters',
      role: 'USER',
      walletBalance: 2000,
    },
    {
      email: 'peter.de.vries@example.com',
      name: 'Peter de Vries',
      role: 'USER',
      walletBalance: 2000,
    },
    {
      email: 'anna.bakker@example.com',
      name: 'Anna Bakker',
      role: 'USER',
      walletBalance: 2000,
    },
    {
      email: 'thomas.smit@example.com',
      name: 'Thomas Smit',
      role: 'USER',
      walletBalance: 2000,
    },
    {
      email: 'linda.van.dijk@example.com',
      name: 'Linda van Dijk',
      role: 'USER',
      walletBalance: 2000,
    },
    {
      email: 'robert.jansen@example.com',
      name: 'Robert Jansen',
      role: 'USER',
      walletBalance: 2000,
    },
    {
      email: 'sophie.mulder@example.com',
      name: 'Sophie Mulder',
      role: 'USER',
      walletBalance: 2000,
    },
    {
      email: 'david.visser@example.com',
      name: 'David Visser',
      role: 'USER',
      walletBalance: 2000,
    },
    {
      email: 'emma.de.jong@example.com',
      name: 'Emma de Jong',
      role: 'USER',
      walletBalance: 2000,
    },
  ];

  console.log('👥 Seeding demo users...');
  for (const user of demoUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }

  // Seed demo consultants
  const consultants = [
    {
      email: 'maria.vandenberg@topmediumvisie.nl',
      name: 'Maria van der Berg',
      specialty: 'Medium & Helderziende',
      rating: 4.8,
      reviewCount: 156,
      pricePerMin: 2.50,
      availability: 'online',
      languages: ['Nederlands', 'English'],
      experience: '15+ jaar',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Welkom bij mijn profiel! Ik ben Maria, een ervaren medium en helderziende met meer dan 15 jaar ervaring in het begeleiden van mensen op hun spirituele pad. Mijn gave ontdekte ik al op jonge leeftijd en sindsdien help ik mensen bij het vinden van antwoorden op hun levensvragen.',
      location: 'Amsterdam, Nederland',
      responseTime: 'Binnen 2 uur',
      totalSessions: 1247,
      repeatClients: 89,
      certifications: ['Gecertificeerd Medium', 'Tarot Master', 'Reiki Level II'],
      workingHours: 'Ma-Vr: 09:00-21:00, Za-Zo: 10:00-18:00',
      services: ['CALL', 'CHAT', 'MESSAGE', 'APPOINTMENT'],
      specialtyNames: ['Medium', 'Tarot & Kaartleggingen'],
    },
    {
      email: 'david.klaasen@topmediumvisie.nl',
      name: 'David Klaasen',
      specialty: 'Life Coach & Spiritueel Adviseur',
      rating: 4.9,
      reviewCount: 203,
      pricePerMin: 3.00,
      availability: 'busy',
      languages: ['Nederlands'],
      experience: '12+ jaar',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Professionele life coach die je helpt bij persoonlijke groei en het vinden van je levensdoel. Met meer dan 12 jaar ervaring begeleid ik mensen naar een bewuster en gelukkiger leven.',
      location: 'Utrecht, Nederland',
      responseTime: 'Binnen 1 uur',
      totalSessions: 892,
      repeatClients: 92,
      certifications: ['Certified Life Coach', 'NLP Practitioner'],
      workingHours: 'Ma-Vr: 10:00-20:00',
      services: ['CALL', 'MESSAGE'],
      specialtyNames: ['Life coaching', 'Spiritualiteit'],
    },
    {
      email: 'sophie.janssen@topmediumvisie.nl',
      name: 'Sophie Janssen',
      specialty: 'Tarotlezer & Energetisch Therapeut',
      rating: 4.7,
      reviewCount: 89,
      pricePerMin: 2.25,
      availability: 'online',
      languages: ['Nederlands', 'English', 'Français'],
      experience: '8+ jaar',
      image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Intuïtieve tarotlezer en energetisch therapeut. Helpt bij het vinden van antwoorden en energetische balans. Gespecialiseerd in liefde, carrière en spirituele groei.',
      location: 'Den Haag, Nederland',
      responseTime: 'Binnen 3 uur',
      totalSessions: 456,
      repeatClients: 78,
      certifications: ['Tarot Master', 'Reiki Master'],
      workingHours: 'Ma-Za: 09:00-22:00',
      services: ['CALL', 'CHAT', 'MESSAGE'],
      specialtyNames: ['Tarot & Kaartleggingen', 'Spiritualiteit'],
    },
    {
      email: 'emma.bakker@topmediumvisie.nl',
      name: 'Emma Bakker',
      specialty: 'Heldervoelend Medium & Reiki Master',
      rating: 4.9,
      reviewCount: 267,
      pricePerMin: 3.25,
      availability: 'online',
      languages: ['Nederlands', 'English'],
      experience: '18+ jaar',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Heldervoelend medium en Reiki Master. Biedt healing en inzicht door energetische verbindingen. Gespecialiseerd in contact met overledenen en spirituele genezing.',
      location: 'Rotterdam, Nederland',
      responseTime: 'Binnen 1 uur',
      totalSessions: 1856,
      repeatClients: 94,
      certifications: ['Heldervoelend Medium', 'Reiki Master', 'Chakra Healing'],
      workingHours: 'Ma-Zo: 08:00-20:00',
      services: ['CALL', 'CHAT', 'MESSAGE', 'APPOINTMENT'],
      specialtyNames: ['Medium', 'Spiritualiteit'],
    },
    {
      email: 'thomas.vermeer@topmediumvisie.nl',
      name: 'Thomas Vermeer',
      specialty: 'Relatietherapeut & Spiritueel Coach',
      rating: 4.6,
      reviewCount: 124,
      pricePerMin: 2.75,
      availability: 'offline',
      languages: ['Nederlands', 'English'],
      experience: '10+ jaar',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Relatietherapeut en spiritueel coach die je begeleidt naar meer bewustzijn en innerlijke vrede. Gespecialiseerd in relatieproblemen en persoonlijke groei.',
      location: 'Eindhoven, Nederland',
      responseTime: 'Binnen 4 uur',
      totalSessions: 678,
      repeatClients: 85,
      certifications: ['Relatietherapeut', 'Spiritueel Coach'],
      workingHours: 'Ma-Vr: 09:00-17:00',
      services: ['CALL', 'APPOINTMENT'],
      specialtyNames: ['Liefde & Relatie', 'Life coaching'],
    },
  ];

  console.log('🔮 Seeding demo consultants...');
  for (const consultantData of consultants) {
    // First create or get the user
    const user = await prisma.user.upsert({
      where: { email: consultantData.email },
      update: {
        name: consultantData.name,
        role: 'CONSULTANT',
      },
      create: {
        email: consultantData.email,
        name: consultantData.name,
        role: 'CONSULTANT',
        walletBalance: 0,
      },
    });

    // Then create or update the consultant
    const consultant = await prisma.consultant.upsert({
      where: { email: consultantData.email },
      update: {
        name: consultantData.name,
        specialty: consultantData.specialty,
        rating: consultantData.rating,
        reviewCount: consultantData.reviewCount,
        pricePerMin: consultantData.pricePerMin,
        availability: consultantData.availability,
        languages: consultantData.languages,
        experience: consultantData.experience,
        image: consultantData.image,
        bio: consultantData.bio,
        location: consultantData.location,
        responseTime: consultantData.responseTime,
        totalSessions: consultantData.totalSessions,
        repeatClients: consultantData.repeatClients,
        certifications: consultantData.certifications,
        workingHours: consultantData.workingHours,
        services: consultantData.services,
        isVerified: true,
        isActive: true,
      },
      create: {
        userId: user.id,
        email: consultantData.email,
        name: consultantData.name,
        specialty: consultantData.specialty,
        rating: consultantData.rating,
        reviewCount: consultantData.reviewCount,
        pricePerMin: consultantData.pricePerMin,
        availability: consultantData.availability,
        languages: consultantData.languages,
        experience: consultantData.experience,
        image: consultantData.image,
        bio: consultantData.bio,
        location: consultantData.location,
        responseTime: consultantData.responseTime,
        totalSessions: consultantData.totalSessions,
        repeatClients: consultantData.repeatClients,
        certifications: consultantData.certifications,
        workingHours: consultantData.workingHours,
        services: consultantData.services,
        isVerified: true,
        isActive: true,
      },
    });

    // Link consultant to specialties
    for (const specialtyName of consultantData.specialtyNames) {
      const specialty = await prisma.specialty.findUnique({
        where: { name: specialtyName },
      });

      if (specialty) {
        await prisma.consultantSpecialty.upsert({
          where: {
            consultantId_specialtyId: {
              consultantId: consultant.id,
              specialtyId: specialty.id,
            },
          },
          update: {},
          create: {
            consultantId: consultant.id,
            specialtyId: specialty.id,
            isPrimary: consultantData.specialtyNames.indexOf(specialtyName) === 0,
          },
        });

        // Update specialty count
        await prisma.specialty.update({
          where: { id: specialty.id },
          data: {
            count: {
              increment: 1,
            },
          },
        });
      }
    }
  }

  // Seed demo blog posts
  const blogPosts = [
    {
      slug: 'wat-is-een-medium',
      title: 'Wat is een medium en hoe werkt het?',
      content: 'Een medium is iemand die contact kan maken met overledenen en spirituele entiteiten. In deze uitgebreide gids leggen we uit hoe mediumschap werkt, wat je kunt verwachten van een reading, en hoe je een betrouwbaar medium kunt herkennen.\n\nMediumschap is een gave die sommige mensen van nature bezitten, terwijl anderen het kunnen ontwikkelen door training en oefening. Een medium fungeert als een brug tussen onze fysieke wereld en de spirituele wereld.',
      excerpt: 'Ontdek wat een medium doet en hoe spirituele communicatie werkt.',
      image: 'https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Medium', 'Spiritualiteit', 'Overledenen'],
      published: true,
      featured: true,
      publishedAt: new Date('2024-01-15'),
    },
    {
      slug: 'tarot-kaarten-uitleg',
      title: 'Tarot kaarten: Een complete gids voor beginners',
      content: 'Tarot kaarten zijn een krachtig hulpmiddel voor zelfinzicht en toekomstvoorspelling. Deze gids behandelt de geschiedenis van tarot, de betekenis van de verschillende kaarten, en hoe je je eerste reading kunt interpreteren.\n\nHet tarotdeck bestaat uit 78 kaarten, verdeeld in de Grote Arcana (22 kaarten) en de Kleine Arcana (56 kaarten). Elke kaart heeft zijn eigen symboliek en betekenis.',
      excerpt: 'Leer alles over tarot kaarten en hoe je ze kunt gebruiken.',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Tarot', 'Kaartlegging', 'Voorspelling'],
      published: true,
      featured: false,
      publishedAt: new Date('2024-01-10'),
    },
    {
      slug: 'chakras-uitleg-gids',
      title: 'De 7 Chakras: Jouw energiecentra in balans',
      content: 'Chakras zijn energiecentra in ons lichaam die invloed hebben op ons fysieke, emotionele en spirituele welzijn. Leer hoe je je chakras kunt balanceren voor optimale gezondheid en spirituele groei.\n\nDe zeven hoofdchakras lopen van de basis van je ruggengraat tot de kruin van je hoofd. Elk chakra heeft zijn eigen kleur, element en eigenschappen.',
      excerpt: 'Ontdek hoe chakras werken en hoe je ze in balans houdt.',
      image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Chakras', 'Energie', 'Healing'],
      published: true,
      featured: true,
      publishedAt: new Date('2024-01-08'),
    },
    {
      slug: 'liefde-en-relaties-spiritueel',
      title: 'Spirituele kijk op liefde en relaties',
      content: 'Liefde is een van de krachtigste energieën in het universum. Ontdek hoe spiritualiteit je kan helpen bij het vinden van je zielsverwant en het verdiepen van bestaande relaties.\n\nVanuit spiritueel perspectief zijn relaties leermomenten die ons helpen groeien en evolueren. Elke relatie brengt lessen met zich mee.',
      excerpt: 'Hoe spiritualiteit je liefdesleven kan verrijken.',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Liefde', 'Relaties', 'Zielsverwant'],
      published: true,
      featured: false,
      publishedAt: new Date('2024-01-05'),
    },
    {
      slug: 'meditatie-voor-beginners',
      title: 'Meditatie voor beginners: Je eerste stappen',
      content: 'Meditatie is een krachtige praktijk voor innerlijke rust en spirituele groei. Deze gids helpt je om te beginnen met mediteren, ook als je nog nooit eerder hebt gemediteerd.\n\nMeditatie hoeft niet ingewikkeld te zijn. Begin met slechts 5 minuten per dag en bouw langzaam op.',
      excerpt: 'Leer hoe je kunt beginnen met mediteren.',
      image: 'https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Meditatie', 'Mindfulness', 'Spiritualiteit'],
      published: true,
      featured: false,
      publishedAt: new Date('2024-01-03'),
    },
    {
      slug: 'dromen-betekenis-interpretatie',
      title: 'Dromen interpreteren: Wat proberen ze je te vertellen?',
      content: 'Dromen zijn vensters naar ons onderbewustzijn en kunnen belangrijke boodschappen bevatten. Leer hoe je je dromen kunt interpreteren en wat verschillende symbolen betekenen.\n\nDromen kunnen voorspellend zijn, helend werken, of ons inzicht geven in onze diepste gedachten en gevoelens.',
      excerpt: 'Ontdek de verborgen betekenissen in je dromen.',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Dromen', 'Interpretatie', 'Onderbewustzijn'],
      published: true,
      featured: false,
      publishedAt: new Date('2024-01-01'),
    },
    {
      slug: 'astrologie-sterrenbeelden-gids',
      title: 'Astrologie: Hoe sterrenbeelden je leven beïnvloeden',
      content: 'Astrologie is de studie van hoe hemellichamen ons leven beïnvloeden. Ontdek wat je sterrenbeeld over je zegt en hoe je deze kennis kunt gebruiken voor persoonlijke groei.\n\nJe sterrenbeeld is slechts het begin - je volledige geboortehoroscoop bevat veel meer informatie over je persoonlijkheid en levenspad.',
      excerpt: 'Leer hoe astrologie je kan helpen jezelf beter te begrijpen.',
      image: 'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Astrologie', 'Sterrenbeelden', 'Horoscoop'],
      published: true,
      featured: true,
      publishedAt: new Date('2023-12-28'),
    },
    {
      slug: 'reiki-healing-energie',
      title: 'Reiki: De kracht van universele levensenergie',
      content: 'Reiki is een Japanse healingtechniek die werkt met universele levensenergie. Ontdek hoe Reiki kan helpen bij fysieke, emotionele en spirituele genezing.\n\nReiki betekent letterlijk "universele levensenergie" en kan door iedereen geleerd worden. Het is een zachte maar krachtige healingmethode.',
      excerpt: 'Alles wat je moet weten over Reiki healing.',
      image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Reiki', 'Healing', 'Energie'],
      published: true,
      featured: false,
      publishedAt: new Date('2023-12-25'),
    },
    {
      slug: 'spirituele-ontwikkeling-tips',
      title: '10 Tips voor spirituele ontwikkeling',
      content: 'Spirituele ontwikkeling is een levenslange reis van groei en zelfontwikkeling. Deze praktische tips helpen je om je spirituele pad te verdiepen en meer bewustzijn te ontwikkelen.\n\nSpirituele groei gebeurt niet van de ene dag op de andere, maar is een geleidelijk proces van bewustwording en transformatie.',
      excerpt: 'Praktische tips om je spirituele groei te versnellen.',
      image: 'https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Spiritualiteit', 'Ontwikkeling', 'Groei'],
      published: true,
      featured: false,
      publishedAt: new Date('2023-12-20'),
    },
    {
      slug: 'intuïtie-ontwikkelen-oefeningen',
      title: 'Je intuïtie ontwikkelen: Oefeningen en technieken',
      content: 'Intuïtie is een natuurlijke gave die iedereen bezit, maar die vaak onderontwikkeld blijft. Leer hoe je je intuïtieve vermogens kunt versterken met praktische oefeningen.\n\nJe intuïtie is als een spier - hoe meer je het gebruikt, hoe sterker het wordt. Begin met kleine oefeningen en bouw langzaam op.',
      excerpt: 'Praktische oefeningen om je intuïtie te versterken.',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Intuïtie', 'Ontwikkeling', 'Oefeningen'],
      published: false,
      featured: false,
      publishedAt: null,
    },
  ];

  console.log('📝 Seeding demo blog posts...');
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log('✅ Seed completed successfully!');
  
  // Print summary
  const counts = await Promise.all([
    prisma.user.count(),
    prisma.consultant.count(),
    prisma.specialty.count(),
    prisma.blogPost.count(),
  ]);

  console.log('\n📊 Database Summary:');
  console.log(`👥 Users: ${counts[0]}`);
  console.log(`🔮 Consultants: ${counts[1]}`);
  console.log(`📋 Specialties: ${counts[2]}`);
  console.log(`📝 Blog Posts: ${counts[3]}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });