import type { Faq } from "~/components/FaqSection";

/*
 * The four service detail pages and the /services index cards, one record per
 * service. Copy is the live wording with these edits only:
 *  - em and en dashes rephrased (house rule), including the testimonial
 *    attributions' leading dash;
 *  - "tailor's" corrected to "tailors" in Nicole M.'s review;
 *  - straight quotes in Nick B.'s review rendered as curly quotes (template);
 *  - three closing CTA labels shortened so they fit the FinalCta glass panel
 *    on a 390px phone (corporate uses live's own mobile label; friends drops
 *    "Travel"; luxury drops "Private").
 * FAQ answers were closed on live and are captured by opening each question.
 */

export type ServiceIcon =
  | "calendar"
  | "sparkles"
  | "dollar"
  | "users"
  | "cube"
  | "sun"
  | "ship"
  | "briefcase";

export type ServiceImage = { src: string; alt: string };

type TitledItem = { title: string; body: string };

export type ServicePage = {
  slug: string;
  meta: { title: string; description: string };
  /** The card on /services. */
  card: { title: string; body: string; image: ServiceImage };
  hero: {
    title: string;
    /** Rendered italic; `highlight` is set in p3 between `before` and `after`. */
    subtitle: { before: string; highlight: string; after?: string };
    image: ServiceImage;
    cta: string;
  };
  statement: { title: string; body: string };
  features: {
    title: string;
    items: (TitledItem & { icon: ServiceIcon })[];
    image: ServiceImage;
    cta: string;
  };
  steps: { title: string; items: TitledItem[] };
  checklist: {
    title: string;
    items: TitledItem[];
    image: ServiceImage;
    cta: string;
  };
  story: { title: string; rows: (TitledItem & { image: ServiceImage })[] };
  testimonial?: {
    quote: string;
    name: string;
    role: string;
    image: ServiceImage;
  };
  gallery?: {
    title: string;
    body: string;
    images: [ServiceImage, ServiceImage, ServiceImage, ServiceImage];
  };
  faq: { title: string; items: Faq[] };
  finalCta: { title: string; body: string; cta: string; image: string };
};

export const SERVICES: ServicePage[] = [
  {
    slug: "corporate-travel-planning",
    meta: {
      title: "Corporate Travel Planning & Event Management | Miles & Memories",
      description:
        "Expert corporate travel planning for conferences, retreats & team events. Complimentary service that delivers flawless execution within budget. Get your free consultation.",
    },
    card: {
      title: "Corporate Travel & Events",
      body: "Transform your business events from logistical headaches into strategic wins. We handle vendor negotiations, budget oversight, and on-ground execution so your team can focus on building relationships and driving results.",
      image: {
        src: "/images/cliffside-retreat-near-the-ocean.webp",
        alt: "City skyscrapers seen from below",
      },
    },
    hero: {
      title: "Corporate Travel & Event Management That Actually Impresses",
      subtitle: {
        before:
          "Full-service planning for corporate retreats, conferences, and incentive trips. ",
        highlight: "Zero fees, maximum impact,",
        after: " and the kind of execution that makes you look like a hero.",
      },
      image: { src: "/images/beachside-resort.webp", alt: "Beachside resort" },
      cta: "Book My Free Consultation",
    },
    statement: {
      title: "Your Secret Weapon for Flawless Corporate Events",
      body: "While other companies stress about the logistics, you'll be building relationships, motivating your teams, and driving results.",
    },
    features: {
      title: "Why Executive Teams Choose Miles & Memories",
      items: [
        {
          icon: "calendar",
          title: "We Handle Everything",
          body: "Budget tracking, deadline management, vendor negotiations, attendee coordination, and all the other details that bog down teams.",
        },
        {
          icon: "sparkles",
          title: "Industry Connections = Better Everything",
          body: "Our partnerships unlock rates and perks your company can't access directly: think room upgrades, flexible cancellation policies, and VIP treatment.",
        },
        {
          icon: "dollar",
          title: "The Best Pricing & Bonus Concessions",
          body: "We negotiate group rates, secure meeting space concessions, and incorporate value-adds that would cost thousands if booked separately.",
        },
        {
          icon: "users",
          title: "A Seamless Extension of Your Team",
          body: "Already have event coordinators? Perfect. We'll be your travel specialist, handling the logistics while they focus on content and strategy.",
        },
      ],
      image: { src: "/images/miami-highrises.webp", alt: "Miami highrises" },
      cta: "Book My Free Consultation",
    },
    steps: {
      title: "What Sets Us Apart in Corporate Travel",
      items: [
        {
          title: "Zero-Cost Expertise",
          body: "Our services are 100% free to your company. We're compensated by our travel partners, giving you free access to our expertise.",
        },
        {
          title: "End-to-End Execution",
          body: "Whether it's C-suite travel preferences or dietary restrictions for 200+ attendees, we track every detail.",
        },
        {
          title: "On-Site Crisis Management",
          body: "We travel with your team to handle real-time issues: flight delays, room problems, venue changes. All so you can focus on your agenda.",
        },
      ],
    },
    checklist: {
      title: "Corporate Travel Solutions for Every Goal",
      items: [
        {
          title: "Executive Leadership Retreats",
          body: "Inspire leadership with meticulously planned retreats in exclusive, motivating destinations.",
        },
        {
          title: "Large-Scale Conferences",
          body: "From venue sourcing to attendee logistics, we ensure your event is a flawless success.",
        },
        {
          title: "High-Impact Incentive Trips",
          body: "Reward top performers with travel experiences they'll never forget, and reinforce why they want to stay with your company.",
        },
        {
          title: "VIP Client Entertainment",
          body: "Strengthen your most important relationships with perfectly orchestrated experiences that demonstrate genuine appreciation.",
        },
      ],
      image: {
        src: "/images/beautiful-hotel-lobby.webp",
        alt: "Beautiful hotel lobby",
      },
      cta: "Book My Free Consultation",
    },
    story: {
      title: "Beyond Logistics: Building Culture & Connection",
      rows: [
        {
          title: "Reward Your Top Talent",
          body: "Shared experiences are the currency of a strong company culture. An incentive trip or executive retreat is more than a reward; it's an investment in the human connection that fuels collaboration and innovation back at the office. We design itineraries to genuine team bonding, making your top talent feel truly valued and understood.",
          image: {
            src: "/images/company-team-supporting-teammate.webp",
            alt: "Company team supporting a teammate",
          },
        },
        {
          title: "Secure Your Most Valuable Relationships",
          body: "The strongest business relationships are built on genuine connection, outside the confines of a boardroom. A meticulously planned travel experience is the ultimate gesture of appreciation, demonstrating a level of care that strengthens trust and partnership. We create the perfect setting where you can connect on a human level, transforming key clients into lasting partners.",
          image: {
            src: "/images/business-man-in-suit-on-highrise-balcony.webp",
            alt: "Businessman in a suit on a highrise balcony",
          },
        },
      ],
    },
    testimonial: {
      quote:
        "After a year of working with Mandy, we couldn't be more pleased with the impact she's had on our event team. She's meticulous with every detail, streamlines the entire travel process, and even tailors individual itineraries to each traveler.",
      name: "Nicole M.",
      role: "Director of Events & Experiences, 49 Financial",
      image: { src: "/images/nicole-m-headshot.webp", alt: "Nicole M." },
    },
    faq: {
      title: "Frequently Asked Questions for Corporate Travel Management",
      items: [
        {
          q: "What is the scope of your on-site support?",
          a: "Our on-site support is comprehensive. We travel with you to act as the primary liaison with the hotel and all vendors, manage the itinerary in real-time, handle any unexpected issues, and ensure your team can remain fully present and focused on the purpose of the trip.",
        },
        {
          q: "Beyond large events, can you assist with regular business travel for our executives?",
          a: "Absolutely. We aim to be your long-term travel partner. For established corporate clients, we are happy to assist with booking flights, hotels, and travel arrangements for individual executive travel, providing the same high-touch service and support.",
        },
        {
          q: "We already have an in-house event team. How do you work with them?",
          a: "We love collaborating! We act as a specialized travel partner and extension of your team. We handle the time-consuming travel logistics, contract negotiations, and supplier management, freeing up your team to focus on the event's content, agenda, and internal stakeholders.",
        },
      ],
    },
    finalCta: {
      title: "Elevate Your Next Corporate Trip, Effortlessly.",
      body: "Let's discuss how our complimentary service can deliver results that exceed expectations while freeing up your team's valuable time.",
      cta: "Book Your Strategy Call, It's Free",
      image: "/images/airplane-on-runway-at-dusk.webp",
    },
  },

  {
    slug: "greek-life-travel-planning",
    meta: {
      title:
        "Greek Life Travel Planning | Formals, Retreats & Events | Miles & Memories",
      description:
        "Specialized Greek life travel planning for formals, retreats, and chapter events. Complimentary service that handles every detail for unforgettable group experiences.",
    },
    card: {
      title: "Greek Life Adventures",
      body: "From 20-person formals to 100+ spring break adventures, we manage every detail that makes group travel complicated. Individual payment tracking, deadline management, and custom itineraries that keep everyone happy.",
      image: {
        src: "/images/four-people-enjoying-a-sunset.webp",
        alt: "Four people enjoying the sunset",
      },
    },
    hero: {
      title: "Stress-Free Travel for Fraternity & Sorority Events",
      subtitle: {
        before:
          "We handle the planning, payments, and logistics for your chapter's biggest events. ",
        highlight: "Zero fees, zero headaches.",
      },
      image: {
        src: "/images/co-ed-greek-life-group-photo-in-the-caribbean.webp",
        alt: "Co-ed Greek life group photo in the Caribbean",
      },
      cta: "Start Planning For Free",
    },
    statement: {
      title: "Your Secret Weapon for Flawless Events",
      body: "We handle all the details so you and your chapter can focus on the fun.",
    },
    features: {
      title: "What We Plan for Greek Life",
      items: [
        {
          icon: "calendar",
          title: "Chapter Formals & Semis",
          body: "From Nashville to New Orleans, we plan unforgettable formal weekends on a per-person budget.",
        },
        {
          icon: "users",
          title: "Spring Break Trips",
          body: "We find the best all-inclusive resorts in destinations like Mexico and the DR for the ultimate chapter getaway.",
        },
        {
          icon: "sparkles",
          title: "Destination Weekends",
          body: "Looking for a unique brotherhood or sisterhood trip? We'll plan a custom weekend in an exciting city.",
        },
        {
          icon: "cube",
          title: "Alumni Reunions",
          body: "Bring your alumni together for Homecoming or a milestone reunion with professionally managed travel and events.",
        },
      ],
      image: {
        src: "/images/top-down-view-of-tropical-beach.webp",
        alt: "Top-down view of a tropical beach",
      },
      cta: "Book a Free Discovery Call",
    },
    steps: {
      title: "The Easiest Planning Process Ever",
      items: [
        {
          title: "Individual Invoicing & Plans",
          body: "No more chasing down money. Members get personalized links and pay their own invoices. Plus, we offer flexible payment plans that work with tight budgets.",
        },
        {
          title: "Personalized Info Packets",
          body: "Custom packing lists for your destination, detailed itineraries, dress codes, required forms, emergency contacts, and insider tips, all personalized for your trip.",
        },
        {
          title: "On-Site Event Support",
          body: "Planning for 100+ members? We can travel with your chapter to handle check-ins, room assignments, and any issues that come up.",
        },
      ],
    },
    checklist: {
      title: "From Big Ideas to Flawless Execution",
      items: [
        {
          title: "Venue & Hotel Selection",
          body: "We find the perfect hotels and venues that fit your budget and vibe, and we handle all the booking and negotiations.",
        },
        {
          title: "Detailed Itineraries",
          body: "We build a full schedule, from flights and transport to dinners and excursions, so everyone knows where to be and when.",
        },
        {
          title: "Clear Communication",
          body: "We keep everyone on track with reminders about deadlines for payment, forms, and any other important info.",
        },
      ],
      image: {
        src: "/images/people-getting-onto-a-yellow-bus.webp",
        alt: "People getting onto a yellow bus",
      },
      cta: "Let's Start Planning",
    },
    story: {
      title: "Legendary Events, Lifelong Friendships",
      rows: [
        {
          title: "The Ultimate Chapter Experience",
          body: "Planning a formal or spring break trip comes with huge expectations. We take the pressure off your shoulders by managing every detail, from finding the perfect resort to coordinating travel for everyone. Our goal is simple: to help you plan a seamless, unforgettable event that becomes a core memory for your chapter.",
          image: {
            src: "/images/group-of-people-holding-eachother-on-the-edge-of-a-dock.webp",
            alt: "Group of friends with their arms around each other on the edge of a dock",
          },
        },
        {
          title: "Secure Your Most Valuable Relationships",
          body: "The strongest brotherhoods and sisterhoods are built on shared experiences. When you're not worried about logistics, you can focus on what really matters: connecting with each other. We create the perfect backdrop for the inside jokes, late-night talks, and genuine fun that will strengthen your chapter for years to come.",
          image: {
            src: "/images/silouettes-of-people-jumping-in-the-air-at-sunrise.webp",
            alt: "Silhouettes of people jumping in the air at sunrise",
          },
        },
      ],
    },
    testimonial: {
      quote:
        "Mandy was absolutely incredible to work with for our senior college spring break trip to Breathless Riviera Cancun. Planning a trip for over 80 people seemed daunting at first, but she made the entire process seamless from start to finish. Her communication was top-notch: she kept us updated at every step and was quick to answer any questions we had. Mandy helped us secure a reputable resort with amazing amenities that truly made the trip unforgettable. I will definitely be using Mandy again!",
      name: "Lauren W.",
      role: "Greek Life Coordinator",
      image: { src: "/images/nicole-w-headshot.webp", alt: "Lauren W." },
    },
    gallery: {
      title: "Your Chapter's Next Legendary Trip Starts Here",
      body: "Every year, we help chapters plan the kind of trip that everyone talks about for years to come. See some of the core memories we've helped create.",
      images: [
        {
          src: "/images/2-sorority-girls-with-cocktails-on-a-breach.webp",
          alt: "Two sorority sisters with cocktails on a boat",
        },
        {
          src: "/images/fraternity-group-photo-in-fancy-hotel.webp",
          alt: "Fraternity group photo in a hotel lobby",
        },
        {
          src: "/images/sorority-group-photo-on-the-beach.webp",
          alt: "Sorority group photo on the beach",
        },
        {
          src: "/images/fraternity-group-photo-on-a-dock.webp",
          alt: "Fraternity group photo on a dock",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions for Greek Life Travel",
      items: [
        {
          q: "How do we make a trip affordable for our whole chapter?",
          a: "We specialize in this! We work with your per-person budget to find the best all-inclusive deals and venues. Plus, our individual payment plans make it easy for members to pay for the trip over time.",
        },
        {
          q: "How do you help keep our members safe?",
          a: "Your chapter's safety is our top priority. We only work with reputable resorts, transportation, and excursion companies. We also provide everyone with emergency contact info and best practices for the destination.",
        },
        {
          q: "What do you need from us to get started?",
          a: "It's simple. All we need is the \"What, Where, and When\": what kind of event you're planning, your ideal destination and dates, and your estimated budget. From there, we can hold a group video call and start building a proposal!",
        },
      ],
    },
    finalCta: {
      title: "Ready to Plan Your Chapter's Most Legendary Trip Yet?",
      body: "Tell us your vision (formal, spring break, or custom adventure) and we'll build a free proposal that shows exactly how we'll make it happen.",
      cta: "Get My Free Consultation",
      image: "/images/top-down-view-of-luxury-beachside-hotel.webp",
    },
  },

  {
    slug: "friends-group-travel-planning",
    meta: {
      title: "Family & Group Travel Planning Services | Miles & Memories",
      description:
        "Expert family reunion and group travel planning. Multi-generational trips, anniversaries & friend getaways made stress-free with our complimentary service.",
    },
    card: {
      title: "Family & Group Travel",
      body: "Real Disney experts who secure impossible reservations, cruise veterans who know which cabins to avoid, and European specialists who design itineraries that work for both teenagers and grandparents.",
      image: {
        src: "/images/family-in-the-ocean-enjoying-the-sun.webp",
        alt: "Family in the ocean enjoying the sun",
      },
    },
    hero: {
      title:
        "Family & Group Vacation Planning That Actually Brings You Together",
      subtitle: {
        before:
          "Creating lasting memories with the people you love, without the stress of planning, ",
        highlight: "all for $0 in additional fees.",
      },
      image: {
        src: "/images/family-on-the-beach.webp",
        alt: "Family on the beach",
      },
      cta: "Start Planning For Free",
    },
    statement: {
      title: "Your Partner in Memory Making",
      body: "We handle all of the details so you can focus on being present.",
    },
    features: {
      title: "Creating Your Perfect Group Getaway",
      items: [
        {
          icon: "sparkles",
          title: "Theme Park Adventures",
          body: "Disney & Universal experts who secure those impossible dining reservations, know every Skip-the-Line strategy, and have insider tips for everyone from toddlers to grandparents.",
        },
        {
          icon: "sun",
          title: "All-Inclusive Resort Perfection",
          body: "We'll compare resorts based on your group's vibe (party atmosphere vs. family-friendly, beach vs. activities, budget vs. luxury) so you end up at the perfect place.",
        },
        {
          icon: "ship",
          title: "Cruise Coordination",
          body: "From booking adjoining cabins to managing shore excursions for a large group of people with varying interests, we handle the logistics that make or break group cruise experiences.",
        },
        {
          icon: "briefcase",
          title: "Custom Overseas Tours",
          body: "Trips to Italy, custom tours of Ireland, or that Paris anniversary trip you've been dreaming about, complete with transportation, accommodations, and day-by-day itineraries.",
        },
      ],
      image: { src: "/images/disney-castle.webp", alt: "Disney castle" },
      cta: "Book a Free Discovery Call",
    },
    steps: {
      title: "How We Make Family Travel Actually Relaxing",
      items: [
        {
          title: "Personalized Itinerary",
          body: "Detailed itineraries that account for nap times, dietary restrictions, and varying energy levels, with built-in flexibility for spontaneous moments.",
        },
        {
          title: "Managed Group Payments",
          body: "Planning a group trip? We can handle individual payments and payment plans to keep things simple. No More Chasing Friends for Money!",
        },
        {
          title: "Your Personal Travel Concierge",
          body: "From the planning phase through your return home, we're available via text for real-time support and adjustments.",
        },
      ],
    },
    checklist: {
      title: "Why Families Choose Miles & Memories",
      items: [
        {
          title: "Expert Comparisons Save You Hours",
          body: "Instead of reading 847 resort reviews, we present 2-3 perfect options with honest pros and cons for your specific group.",
        },
        {
          title: "Everything Coordinated in One Place",
          body: "Flights that arrive at reasonable times, hotels that accommodate your group size, activities that work for all ages, and no need to juggle 12 different confirmation emails.",
        },
        {
          title: "Experience-Based Insider Knowledge",
          body: "Real tips from someone who's navigated Disney with three generations, knows which cruise excursions are worth it, and has learned what works (and what doesn't) the hard way.",
        },
      ],
      image: {
        src: "/images/mother-and-child-on-the-beach.webp",
        alt: "Mother and child on the beach",
      },
      cta: "Let's Start Planning",
    },
    story: {
      title: "Focus on the Moments That Matter",
      rows: [
        {
          title: "From Planner to Participant",
          body: "You're supposed to be on vacation, too. We take the logistical burden completely off your plate so you can be present for the milestone moments (the celebratory dinner, the sunset on the beach, the laughter with your kids) instead of worrying about what's next on the schedule.",
          image: {
            src: "/images/man-and-child-at-ancient-ruins.webp",
            alt: "Man and child at ancient ruins",
          },
        },
        {
          title: "Harmony for the Whole Group",
          body: "The biggest challenge of group travel is pleasing everyone. We specialize in designing custom itineraries that blend different interests, activity levels, and budgets, ensuring every member of your group feels seen and has an unforgettable time.",
          image: {
            src: "/images/universal-studios-globe.webp",
            alt: "Universal Studios globe",
          },
        },
      ],
    },
    testimonial: {
      quote:
        "Mandy helped in every aspect in a group of 22 people to get to an all inclusive north of Cancún. She recommended this place and it couldn't have been any better. Everything was on point and right on the money. She was very responsive and gave us everything we needed to have a great time. The resort was beautiful and calm and quiet. The beach was beautiful. The food/experiences were amazing as well. 10/10 in every aspect with regard to having a travel agent. I will definitely be using her from here on out.",
      name: "Nick B.",
      role: "World Traveler, Husband to Brooke",
      image: { src: "/images/heahshot-for-nick-b.webp", alt: "Nick B." },
    },
    gallery: {
      title: "See the Memories We've Helped Create",
      body: "Every trip is a chance to create a new story. Get inspired for your next adventure by seeing some of the destinations and experiences we've planned for families and friends.",
      images: [
        {
          src: "/images/couple-holding-each-other-on-a-beach.webp",
          alt: "Couple holding each other on a beach",
        },
        {
          src: "/images/two-girls-playing-on-rocks-in-front-of-a-lake-view.webp",
          alt: "Two girls playing on rocks in front of a lake view",
        },
        {
          src: "/images/man-in-front-of-beautiful-mountains-and-the-ocean.webp",
          alt: "Man in front of mountains and the ocean",
        },
        {
          src: "/images/little-boy-holds-hands-with-disney-princess.webp",
          alt: "Little boy holding hands with a Disney princess",
        },
      ],
    },
    faq: {
      title: "Your Vacation Questions Answered",
      items: [
        {
          q: "How does this process work if your services are free?",
          a: "Our planning services are always complimentary. We are compensated by our travel partners (like Disney, cruise lines, and resorts), so you get our expert, personalized service at no additional cost to your trip's budget.",
        },
        {
          q: "Why should I use you instead of booking it myself online?",
          a: "While anyone can book a hotel online, our value is in the details. We save you from hours of stressful research by providing insider knowledge, managing complex group logistics, handling all reservations, and acting as your dedicated support before and during your trip.",
        },
        {
          q: "How do you handle planning for groups with different ages and interests?",
          a: "That's our specialty! We start by understanding the needs of each traveler. From there, we design a balanced itinerary with a mix of group activities and flexible free time, ensuring the kids have their fun while the adults get their time to relax.",
        },
      ],
    },
    finalCta: {
      title: "Ready to Actually Enjoy Your Family Vacation?",
      body: "Tell us about your dream trip and we'll show you exactly how we'll make it happen: stress-free, perfectly coordinated, and designed so you can focus on your friends & family.",
      cta: "Get My Free Travel Consultation",
      image: "/images/disney-castle-distant-view-at-night.webp",
    },
  },

  {
    slug: "luxury-travel-planning",
    meta: {
      title: "Luxury Travel Planning Services | Miles & Memories",
      description:
        "Personalized luxury travel planning for honeymoons, anniversaries & special occasions. Our complimentary service creates authentic, stress-free vacation experiences.",
    },
    card: {
      title: "Luxury Experiences",
      body: "Access to experiences money alone can't buy. Private museum tours, exclusive restaurant tables, and seamless coordination from private jets to personal concierges.",
      image: {
        src: "/images/woman-enjoying-beautiful-private-oceanside-pool.webp",
        alt: "Woman in a secluded oceanside pool",
      },
    },
    hero: {
      title: "Bespoke & Luxury Travel Experiences",
      subtitle: {
        before:
          "Exclusive access, flawless execution, and experiences designed around your exact vision. ",
        highlight: "All at no cost to you.",
      },
      image: {
        src: "/images/beautiful-luxury-pool-at-pink-sunet.webp",
        alt: "Luxury pool at a pink sunset",
      },
      cta: "Design My Experience",
    },
    statement: {
      title: "Where Ordinary Luxury Ends, We Begin",
      body: "Anyone can book a five-star hotel. We create access to experiences that you can't usually get.",
    },
    features: {
      title: "Experiences Beyond Ordinary Luxury",
      items: [
        {
          icon: "sparkles",
          title: "Private Jet & Yacht Journeys",
          body: "Skip commercial travel entirely. We coordinate private jets, luxury yachts, and ground transportation that matches your standards.",
        },
        {
          icon: "sun",
          title: "Insider Europe Experiences",
          body: "Private villa access in Tuscany, exclusive wine tastings with master vintners, and restaurant reservations that take months to secure.",
        },
        {
          icon: "ship",
          title: "Expedition-Level Adventures",
          body: "African photo safaris with world-renowned guides, exclusive golf experiences, and multi-country journeys seamlessly coordinated across continents.",
        },
        {
          icon: "briefcase",
          title: "Ultra-Exclusive Concierge",
          body: "The kind of requests that require connections, not just money. We handle what other planners can't access.",
        },
      ],
      image: {
        src: "/images/beachside-pool-deck-with-chairs-looking-over-the-ocean.webp",
        alt: "Beachside pool deck with chairs looking over the ocean",
      },
      cta: "Design My Experience",
    },
    steps: {
      title: "How We Deliver the Impossible",
      items: [
        {
          title: "Vision to Reality Consultation",
          body: "We not only spend time understanding where you want to go, but how you want to feel. Every detail is designed around your personal definition of perfection.",
        },
        {
          title: "White-Glove Execution",
          body: "From private aircraft coordination to real-time itinerary adjustments, every element is managed by someone who understands what luxury travel means.",
        },
        {
          title: "24/7 Personal Concierge",
          body: "Your dedicated contact travels virtually with you, handling requests, solving problems, and ensuring seamless transitions between experiences.",
        },
      ],
    },
    checklist: {
      title: "Why High-Net-Worth Travelers Choose Us",
      items: [
        {
          title: "Access Others Cannot Provide",
          body: "Our global network opens doors to private collections, exclusive venues, and experiences that aren't available through traditional booking channels.",
        },
        {
          title: "Absolute Discretion & Privacy",
          body: "We understand that privacy isn't a luxury. It's a requirement. Every aspect of your journey is handled with complete confidentiality.",
        },
        {
          title: "Uncompromising Standards",
          body: "Every partner, venue, and service provider is personally vetted to ensure they meet the standards that define true luxury travel.",
        },
      ],
      image: {
        src: "/images/private-yacht-in-the-ocean.webp",
        alt: "Private yacht in the ocean",
      },
      cta: "Design My Experience",
    },
    story: {
      title: "Beyond Luxury: Transformation",
      rows: [
        {
          title: "Time as the Ultimate Currency",
          body: "We return months of your life by handling the intricate planning that luxury travel demands, so you can focus on anticipation rather than coordination.",
          image: {
            src: "/images/two-high-end-tanning-chairs-overlooking-red-mountain-canyon.webp",
            alt: "Two high-end lounge chairs overlooking a red mountain canyon",
          },
        },
        {
          title: "Authentic Connection in a Curated World",
          body: "True luxury isn't about the most expensive option. It's about genuine, transformative experiences. We create opportunities for authentic connection with destinations, culture, and moments that money typically can't access.",
          image: {
            src: "/images/two-people-enjoying-coffee-in-dome-house.webp",
            alt: "Two people enjoying coffee in a dome house",
          },
        },
      ],
    },
    faq: {
      title: "Your Luxury Travel Questions Answered",
      items: [
        {
          q: "Why should I use you over my credit card's concierge service?",
          a: "Concierge services are reactive: they book what you ask for. We are proactive partners. We invest time in understanding you, then leverage our expertise to design a complete, cohesive journey with details and access you may not have known were possible.",
        },
        {
          q: "How does the trip design process begin?",
          a: "It starts with a simple conversation. We'll schedule a discovery call to learn about your travel style, your vision for the trip, and your unique preferences. This initial consultation is the foundation upon which we build your entire bespoke itinerary.",
        },
        {
          q: "What kind of budgets and trip lengths do you typically work with?",
          a: "We design a wide range of luxury experiences, from long weekend getaways to complex, month-long, multi-country expeditions. The common thread is a focus on high-touch service, quality, and personalization, rather than a specific budget minimum.",
        },
      ],
    },
    finalCta: {
      title: "Ready to Experience Travel Beyond the Extraordinary?",
      body: "Let's discuss your vision. Our complimentary consultation is the first step toward a journey that redefines your expectations of what luxury travel can be.",
      cta: "Schedule My Private Consultation",
      image:
        "/images/woman-sitting-in-hammock-at-the-beach-tied-between-two-palm-.webp",
    },
  },
];

export function getService(slug: string): ServicePage | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
