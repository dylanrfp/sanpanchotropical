export interface Villa {
  id: string;
  reservationKeyUnitId?: string;
  name: string;
  unit: string;
  tagline: string;
  designConcept: string;
  descriptionTitle?: string;
  targetAudience: string;
  capacity: string;
  size: string;
  rooms: string;
  beds: string;
  beachDistance: string;
  townProximity: string;
  walkability: string;
  specs: string[];
  highlights: string[];
  images?: string[];
  
  // New Detailed Content Layout Fields
  longDescription?: string[];
  golfCartUpsell?: {
    title: string;
    description: string[];
    buttonText: string;
  };
  amenityCategories?: {
    title: string;
    items: string[];
  }[];
  houseRules?: {
    title: string;
    description: string;
  }[];
  reviews?: {
    guestName: string;
    date: string;
    text: string;
  }[];
  mapAddress?: string;
  mapQuery?: string;
}

export interface Policy {
  id: string;
  title: string;
  details: string;
}

export const villasData: Villa[] = [
  {
    id: "villa-palmas",
    reservationKeyUnitId: "44859:0",
    name: "Villa Palmas",
    unit: "Unit #1",
    tagline: "The Beachscape Apartment",
    designConcept: "A charming, self-contained ground-level sanctuary at Villa Palmas #1, tailored for couples or solo travelers. Tucked away with completely private spaces and weekly maid service, you are just three blocks from the beach and an easy walk or fun golf cart ride from San Pancho’s local restaurants and shops.",
    descriptionTitle: "Your Private Ground-Level Escape",
    targetAudience: "Ideal for couples, solo travelers, or digital nomads seeking a stylized neighborhood footprint.",
    capacity: "2 guests maximum",
    size: "431 sq. ft. (40 m²)",
    rooms: "1 private bedroom, 1 full bathroom, and an open-concept living room layout featuring an integrated sofa bed.",
    beds: "King bed layout options available.",
    beachDistance: "Exactly 3 blocks from Playa San Francisco (approximately a 6-to-9-minute flat walk).",
    townProximity: "Situated steps (350 feet) from the absolute center of town and a 2-minute walk to the San Pancho Nayarit Market.",
    walkability: "High pedestrian access to nearby artisanal cafes, boutiques, and local shops.",
    specs: ["2 Guests", "1 Bed / 1 Bath", "AC", "Custom Kitchen", "Fast Wi-Fi", "Private Patio & Garden"],
    highlights: [
      "Fully equipped custom culinary kitchen including a full-sized refrigerator, microwave, coffee maker, and core cooking essentials.",
      "Enterprise-grade, fast complimentary Wi-Fi network.",
      "Private entrance leading to an intimate, lush tropical patio and garden terrace area with quiet views."
    ],
    longDescription: [
      "Discover an intimate coastal escape designed beautifully for couples or solo travelers. Tucked within the peaceful grounds of the estate, Villa Palmas #1 is a completely self-contained, ground-level haven offering absolute privacy with zero shared spaces.",
      "Unwind in a serene, sun-lit environment featuring a thoughtfully equipped kitchen and the effortless comfort of included weekly housekeeping. Here, you are perfectly positioned just three blocks from the ocean waves and an easy, breezy stroll from San Pancho’s finest local restaurants, boutique shops, and vibrant surf culture. After a day of exploring, return to your own quiet oasis, slide open the doors to the patio, and let the coastal air wash over you."
    ],
    golfCartUpsell: {
      title: "Add a Golf Cart Stay Extension",
      description: [
        "Make getting around even more fun and effortless.",
        "Exploring San Pancho by golf cart adds an extra layer of style and convenience to your trip. Select our \"Add Golf Cart\" upgrade feature at checkout to have your personal cart ready for your stay."
      ],
      buttonText: "Rent a cart"
    },
    amenityCategories: [
      {
        title: "Essentials & Comfort",
        items: [
          "Sleeps 2 Guests Max",
          "1 Premium Queen Bed",
          "1 Full Bathroom",
          "Bedroom Air Conditioning",
          "Cooling Ceiling Fans",
          "Fresh Linens & Towels Provided",
          "Weekly Housekeeping Service"
        ]
      },
      {
        title: "The Kitchen",
        items: [
          "Stove & Full Oven",
          "Refrigerator & Freezer",
          "Microwave & Toaster",
          "Coffee Maker",
          "Tea Kettle",
          "Full Cookware & Dinnerware"
        ]
      },
      {
        title: "Connectivity & Leisure",
        items: [
          "High-Speed Wi-Fi",
          "Smart TV",
          "Premium Streaming Services",
          "Private Outdoor Patio Seating"
        ]
      }
    ],
    houseRules: [
      {
        title: "Smoke-Free Sanctuary",
        description: "For the health and comfort of all guests, smoking is strictly prohibited inside the property. A $300 USD structural restoration fee will be applied for any violations."
      },
      {
        title: "Quiet Hours (10:00 PM – 9:00 AM)",
        description: "Please respect our local neighbors and the peaceful nature of the area. Loud music, parties, and external events are not permitted on the property."
      },
      {
        title: "Cancellation Policy",
        description: "The deposit is refundable under the following conditions: The cancellation request is made within 30 days of the deposit being received, AND the cancellation occurs more than 60 days before the scheduled arrival date. Please note that any cancellations or changes will incur a 10% administration fee."
      }
    ],
    images: [
      "/House photos/villa1_1.jpeg",
      "/House photos/villa1_2.jpeg",
      "/House photos/villa1_3.png",
      "/House photos/villa1_4.jpeg",
      "/House photos/villa1_5.jpg",
      "/House photos/villa1_6.jpg",
      "/House photos/villa1_7.png",
      "/House photos/villa1_8.jpeg",
      "/House photos/villa1_9.jpeg",
      "/House photos/villa1_10.jpeg",
      "/House photos/villa1_11.jpeg",
      "/House photos/villa1_12.jpeg",
      "/House photos/villa1_13.jpeg",
      "/House photos/villa1_14.jpeg",
      "/House photos/villa1_15.jpeg"
    ],
    reviews: [
      {
        guestName: "Joe Taylor",
        date: "APRIL 2026",
        text: "Vicky and Bob were great hosts. We stayed for three weeks and felt right at home the entire time. Bob let us know about the baby turtle release and we greatly enjoyed that. When we needed extra towels or help with figuring out the AC, Bob and Vicki were right on it. The location is very good. It’s in a quiet area about a 6-7 minute walk from downtown and the nightlife (if you can call it that, lol). The beach is about the same distance. We considered getting a golf cart, but decided everything was close enough to walk. We would definitely book the place again."
      },
      {
        guestName: "Maria Shamata",
        date: "OCTOBER 2025",
        text: "Great stay! The apartment was spotless and thoughtfully designed. It’s an easy walk to restaurants and the beach and surfspot, which I loved. The only downside is that it’s pretty dark inside with limited natural light, but overall it was comfortable and very clean."
      },
      {
        guestName: "Mike Rocksborough-Smith",
        date: "NOVEMBER 2024",
        text: "\"Vicky and Bob's villa is a great place to stay when visiting San Pancho. I would definitely return here in the future. they were very communicative and helpful before and during our stay. they let us know about local events happening as well as restaurant recommendations. The unit even came with a couple folding beach chairs and umbrella to use, so you don't have to pay for stuff on the beach. That was really helpful for us! The unit we were in was on the ground floor too, so it stayed nice and cool making for good sleeps! looking forward to being back in San Pancho!\""
      },
      {
        guestName: "Alexandra Stepniak",
        date: "APRIL 2024",
        text: "\"This is our second time back in SP in the last 4 months and we wished we stayed here the first time. Place is great! It’s nice and cool inside we never had to use the AC, ceiling fans were good enough. Kitchen has equipment you need to cook with, and left over seasoning/oil from previous travellers. There is a TV and internet was good. The town did have an internet outage, but the hosts provided us with other options (for work reasons) on co-work spaces ! Also there is a starlink cafe in town ! That we found.. more towards end of the town near highway . We would stay here again! Everything was amazing. Hosts were responsive and told us about a turtle launch too! Which was super cool to see\""
      },
      {
        guestName: "Regina Estico",
        date: "FEBRUARY 2024",
        text: "\"Vicky was absolutely amazing, responsive and flexible! It was comfortable, clean, in a great location, we had the best communication! ❤️\""
      },
      {
        guestName: "Dinah and Paul Jolicoeur",
        date: "FEBRUARY 2024",
        text: "\"Very nice, clean, spacious and well supplied apartment. It was a perfect location for the music festival we were attending as it was within easy walking distance. There is a little spot on the front porch to sit outside although no view but the alley. Part of the apartment is partially below ground level so it doesn’t have a lot of light inside although that means it’s cool. It was great for a weekend but I’d choose one of the other apartments owned by the same owner for a longer term stay if you can afford it because they are on a higher floor and there will be a rooftop patio and more light inside. This is not a complaint at all. Just information as the apartment is very well kept with nice furniture and it worked very well for our weekend stay.\""
      },
      {
        guestName: "Matt Weaver",
        date: "DECEMBER 2023",
        text: "\"This is a great spot in San Pancho. It was very walkable to everything. The place is very nice and everything was as described. I would stay again.\""
      },
      {
        guestName: "Rainer Rojas",
        date: "NOVEMBER 2023",
        text: "\"All described as noted. Clean, quiet with everything you need for staying. It included everything you need to cook and even some condiments, iron, hair dryer, wifi, etc.\""
      },
      {
        guestName: "Rosy Arellana",
        date: "OCTOBER 2023",
        text: "\"awesome place. As described. Very clean and comfortable. Hosts were very helpful. only drawback was it was rather dark with little natural light but neighborhood is blissfully quiet and porch seating area is lovely outside. everything as advertised.\""
      },
      {
        guestName: "Angelina Edgson",
        date: "MAY 2023",
        text: "Un lugar muy funcional y bien ubicado. Excelente comunicación con los anfitriones y su equipo. Siempre tuvieron una rápida y amable atención. ¡Muchas gracias!"
      },
      {
        guestName: "Rosy Arellano",
        date: "JANUARY 2023",
        text: "\"I just got back from my second two-week stay in Esperanza #1. It's a basement unit partially dug into the hillside, so the temperature inside is always perfect. I never turned on the AC or heat even once, not even a fan. It also faces away from the street, so noise is minimal. The patio out front is always shaded and perfect for breakfast or just enjoying the air. The unit itself is relatively dark, which suits me just fine as it's ideal for sleeping or napping at any hour. Not much of a view, but a quick walk around town solves that. Plenty of great local eateries and an artisanal brewery just a short walk away, as well as a well-stocked local grocery store, taqueria, other shops, plus the weekly mercado in the town plaza. Very decent kitchen with huge prep and eating counter. Comfy chair and couch in the LR area for lounging with a book or watching TV. This place is a nice little bachelor pad or flat for a couple watching their pesos. The staff are super helpful and couldn't be friendlier. Already booked 3 weeks next year.\""
      },
      {
        guestName: "Lorenzo Lowe II",
        date: "SEPTEMBER 2022",
        text: "\"Quiet and close to the main street and beach of San Pancho. This ground unit has nice AC as well as a fully stocked kitchen. would stay again\""
      },
      {
        guestName: "Joyce Thompson",
        date: "AUGUST 2022",
        text: "\"We had a fantastic time in San Pancho and at Vicky's place. Everything was as described in the listing. We arrive after midnight, the key was in the lock box, the air con was already on, the villa was ready for us to just move into. The next morning a golf cart that we had rented was waiting right outside our door, as promised. A couple of days later when we had a flat tire on the golf cart, Bob picked it up and delivered a new one to us where we were having lunch. We also got lots of interesting tips from Bob about things to see in San Pancho - we went on a bird watching tour, and attended a town hall meeting in the main square. Vicky also helped us arrange transportation to and from the Puerto Vallarta airport. Everything in the villa was working well - air con, TV, internet, kitchen appliances. The location is an 8 minute walk to the beach, quiet, easy to reach the main street, interesting birds and iguanas around to observe. We would definitely recommend this place to our friends and hope to stay again on our next trip to San Pancho!\""
      },
      {
        guestName: "Stroker Rogovin",
        date: "MARCH 2022",
        text: "\"Nice location, in a quiet neighborhood. About an 8 minute walk to the beach with a brewery and restaurants close by, so overall not bad at all. They supply beach chairs and an umbrella which is really nice, the beach doesn’t offer much shade. Well supplied kitchen and water.\""
      },
      {
        guestName: "Annie Salsman",
        date: "JANUARY 2022",
        text: "Villa Esperanza is a relaxing location, removed from the noise and bustle of town, yet just a short walk to informal taco places, casual dining, the local plaza and weekly market, the beach, shops along the main drag, you name it. The weekly rates are also extremely competitive with comparable rental options. Bob, Vicky, and their staff are the perfect hosts: warm, accommodating, and full of info about the town. Couldn't have asked for a more chill and nourishing break from winter in Boston."
      },
      {
        guestName: "Laura",
        date: "DECEMBER 2021",
        text: "\"Nice spot, private and quiet - off the main road in San Pancho but just a short walk away. Would definitely come back to this place.\""
      },
      {
        guestName: "Amy",
        date: "NOVEMBER 2021",
        text: "\"Great place to stay, conveniently located close to the beach and restaurants, while being on a quiet road. Vicky and Bob were super timely and responsive to all requests during my stay. They are well connected in the community and helpful in many ways. Highly recommend. Thank you!\""
      },
      {
        guestName: "Sarah",
        date: "OCTOBER 2021",
        text: "\"We had an amazing week at Bob and Vicky’s. The location is ideal, quiet but close to the beach. It was clean and very comfortable. We would definitely come back!\""
      },
      {
        guestName: "Guest",
        date: "MAY 2021",
        text: "“Bob and Vicky run a great little spot, could easily accommodate a couple. Lots of great communication, Bob greeted me when I arrived. They had many excellent suggestions for things to do in and around San Pancho. They space is great and stays cool through the day. Has several fans and an AC unit. The space is part of their house with a separate entrance. It feels very private with an off the street entrance. Close to the excellent cerveseria where I grabbed a beer almost nightly. I highly recommend staying here. Could not have been more pleased.”\n\n\"Vicky’s place looked exactly like the pictures. It was very clean with a nice sized bedroom in a quiet neighborhood a couple of small blocks away from the main street.\""
      },
      {
        guestName: "Guest",
        date: "FEBRUARY 2021",
        text: "“Excellent location easy walk to everywhere and the beach! And very quiet at night! The photos are very accurate for this very spacious ground floor apartment -the kitchen is very well-equipped , internet good, bed is comfy and shower water is hot!! Vicky was very responsive to all of my requests regarding the stove , extra blanket , emergency phone call . This a great deal for someone who doesn’t need a place with a view or patio It’s a perfect location and very responsive hosts”\n\n\"Lugar increíble, con excelentes servicios y atención extraordinaria\""
      }
    ],
    mapAddress: "America Latina #149, 63729 San Francisco, Nay.",
    mapQuery: "San Pancho Tropical, América Latina 149, San Francisco, Nayarit, Mexico"
  },
  {
    id: "villa-iguana",
    reservationKeyUnitId: "88740:0",
    name: "Villa Iguana",
    unit: "Unit #5",
    tagline: "Spacious San Pancho Retreat with Private Pool",
    designConcept: "A sprawling 4-bedroom, 4-bathroom home that perfectly balances absolute privacy with effortless convenience.",
    descriptionTitle: "Spacious San Pancho Retreat with Private Pool",
    targetAudience: "Designed beautifully for families and groups.",
    capacity: "8 guests maximum",
    size: "Sprawling 4-bedroom home",
    rooms: "4 Bedrooms, 4 Bathrooms",
    beds: "1 King, 1 Queen, 1 Double, 2 Twins",
    beachDistance: "Positioned just three blocks from the ocean waves.",
    townProximity: "Tucked within a lush garden setting close to the beach and local boutiques/restaurants.",
    walkability: "Three blocks from the beach and an easy walk to town.",
    specs: ["8 Guests", "4 Beds / 4 Baths", "3 Blocks to Beach", "Emerald Saltwater Pool", "4-Seater Golf Cart Included", "AC Throughout"],
    highlights: [
      "The Space: A sprawling 4-bedroom sanctuary featuring private balconies and en-suite bathrooms, ensuring total privacy for up to eight guests.",
      "The Location: Nestled in a lush, secluded garden setting that sits exactly three blocks from the beach.",
      "The Routine: Spend your mornings by your private emerald saltwater pool, and enjoy the effortless comfort of included weekly housekeeping service."
    ],
    longDescription: [
      "Discover the ultimate coastal getaway designed beautifully for families and groups. Tucked within a lush garden setting, Villa Iguana #5 is a sprawling 4-bedroom, 4-bathroom home that perfectly balances absolute privacy with effortless convenience.",
      "Unwind in your own enclosed sanctuary, take a refreshing dip in the stunning emerald saltwater pool, or cook a meal in the fully-equipped kitchen featuring stainless steel appliances. You are positioned just three blocks from the ocean waves. While the secluded beach is perfect for a quiet afternoon, the expansive comfort and cooling A/C of your private villa will always be calling you back."
    ],
    golfCartUpsell: {
      title: "Golf Cart Included!",
      description: [
        "Your stay at Villa Iguana already includes complimentary use of a premium 4-seater electric golf cart to help you effortlessly explore San Pancho.",
        "If your group needs extra mobility, you can easily rent an additional golf cart to ensure everyone can cruise to the beach or town at their own pace."
      ],
      buttonText: "Rent an Additional Cart"
    },
    amenityCategories: [
      {
        title: "Space & Sleep",
        items: [
          "Accommodates 8 Guests",
          "1 King, 1 Queen, 1 Double, 2 Twins",
          "4 Full Bathrooms",
          "Washer & Dryer"
        ]
      },
      {
        title: "Kitchen & Dining",
        items: [
          "Stainless Steel Refrigerator",
          "Stove & Full Oven",
          "Coffee Maker & Kettle",
          "Toaster & BBQ Grill"
        ]
      },
      {
        title: "Media & Climate",
        items: [
          "High-Speed Wi-Fi",
          "Smart TV with Streaming",
          "Mini-Split A/C Throughout",
          "Ceiling Fans"
        ]
      },
      {
        title: "Essential Features",
        items: [
          "Outdoor Living: Private emerald saltwater pool, fully enclosed patio, and private upper balconies",
          "Family & Convenience: Kid-friendly layout with dedicated private parking on-site"
        ]
      }
    ],
    houseRules: [
      {
        title: "Smoke-Free Sanctuary",
        description: "For the health and comfort of all guests, smoking is strictly prohibited inside the property. A $300 USD structural restoration fee will be applied for any violations."
      },
      {
        title: "Quiet Hours (10:00 PM – 9:00 AM)",
        description: "Please respect our local neighbors and the peaceful nature of the area. Loud music, parties, and external events are not permitted on the property."
      },
      {
        title: "Cancellation Policy",
        description: "The deposit is refundable under the following conditions: The cancellation request is made within 30 days of the deposit being received, AND the cancellation occurs more than 60 days before the scheduled arrival date. Please note that any cancellations or changes will incur a 10% administration fee."
      }
    ],
    images: [
      "/House photos/v5_1.png",
      "/House photos/v5_2.jpeg",
      "/House photos/v5_3.png",
      "/House photos/v5_4.jpeg",
      "/House photos/v5_5.jpeg",
      "/House photos/v5_6.jpeg",
      "/House photos/v5_7.jpeg",
      "/House photos/v5_8.jpeg",
      "/House photos/v5_9.jpeg",
      "/House photos/v5_10.jpeg",
      "/House photos/v5_11.jpeg",
      "/House photos/v5_12.jpeg",
      "/House photos/v5_13.jpeg",
      "/House photos/v5_14.jpeg",
      "/House photos/v5_15.jpeg",
      "/House photos/v5_16.jpeg",
      "/House photos/v5_17.jpeg",
      "/House photos/v5_18.jpeg",
      "/House photos/v5_19.jpeg",
      "/House photos/v5_20.jpg",
      "/House photos/v5_21.jpg",
      "/House photos/v5_22.jpeg",
      "/House photos/v5_23.jpeg",
      "/House photos/v5_24.jpeg",
      "/House photos/v5_25.jpeg",
      "/House photos/v5_26.png",
      "/House photos/v5_27.jpg",
      "/House photos/v5_28.jpeg",
      "/House photos/v5_29.jpeg",
      "/House photos/v5_30.png",
      "/House photos/v5_31.png",
      "/House photos/v5_32.png",
      "/House photos/v5_33.png",
      "/House photos/v5_34.png"
    ],
    mapAddress: "America Latina #149, 63729 San Francisco, Nay.",
    mapQuery: "20.903349,-105.4125295",
    reviews: [
      {
        guestName: "Dan Nieman",
        date: "MARCH 2026",
        text: "Bob and Vicky were incredible hosts and made our time in San Pancho incredibly special. They made some fantastic recommendations to us about restaurants and things to do with our family, that we have never known about otherwise, like watching sea turtles being released into the ocean. Their home was large enough for our two families (3 adults, 3 kids and a baby). The kitchen was large and functional and despite it being very hot and humid, the AC and ceiling fans made the home super cool all the time. We loved how close we were to town and having the golf cart made everything so easy!"
      },
      {
        guestName: "Chris Barney",
        date: "MARCH 2026",
        text: "We really enjoyed our stay at Bob & Vicky's place in San Pancho! They were gracious and responsive hosts. The house was very comfortable, and the kids loved the pool. It was an easy walk to the beach, as well as to nearby restaurants."
      },
      {
        guestName: "Peter Warrington",
        date: "DECEMBER 2025",
        text: "We loved staying at Villa Iguana! Bob was very responsive and helpful. The house was clean and had tons of room for our group of 8. The house was at the edge of town which was nice and quiet and only took a few minutes to walk to the Main Street and beach. Highly recommend!"
      },
      {
        guestName: "Janice Soderberg",
        date: "OCTOBER 2025",
        text: "Vicky and Bob were excellent and responsive hosts. Communication was fantastic. Lovely house and suitable for a family. Children loved the pool. Golf cart was super useful! Just a lovely stay all around."
      },
      {
        guestName: "Christa Fitzpatrick",
        date: "OCTOBER 2025",
        text: "Amazing. Everything was perfect. This place is a real gem! Gracias!"
      },
      {
        guestName: "Michael Proffer",
        date: "AUGUST 2025",
        text: "WOW! What a beautiful property, and such lovely hosts. Vicky and Bob went above and beyond when hosting us, quickly responding to our questions and providing TONS of wonderful recommendations. The property itself is clean, extremely well maintained, and has everything you need for a beach vacation (or staycation if you just want some peace and quiet and pooltime). We will most certainly be back, hopefully sooner rather than later!"
      },
      {
        guestName: "Angelina Gonzalez",
        date: "JULY 2025",
        text: "The villa was absolute perfection. The home is ideal for families, especially for those with young children. The golf cart was a fantastic amenity that made getting around incredibly easy. The house itself was clean, highly functional, and the layout was excellent for our larger group to feel comfortable. All AC units worked perfectly, the beds were comfortable, and the bedroom windows were well insulated which made it easy to sleep. The pool was the perfect size for our young kids who are still learning how to swim, and it was regularly cleaned and maintained. We also had the fabulous complimentary cleaning service which was an extra treat. It is very easy to walk to all of San Pancho and the Beach, while just far enough away to feel quiet and peaceful. Bob and Vicky are extremely responsive, and fantastic hosts."
      },
      {
        guestName: "Feliciano Andrede De La Rocha",
        date: "APRIL 2025",
        text: "Staying at Villa Iguana was the best decision we could make, as it is a quiet villa that is excellent for resting, just 4 blocks from the beach and 2 from where the bars and restaurants begin. This villa is great for going with family and children as the pool is very spacious and clean, the garden is large and the tables and grill on the terrace are excellent for grilling, board games and chatting all day while watching the children play. The lounge chairs in the pool area are ideal for resting and reading. Visitors should know that the sea is very rough in San Pancho and you can only swim on some occasions, which is why the pool in the villa is a great idea. The sunset in San Pancho is spectacular and everyone should go see it before going to dinner. Vicky is an excellent host who is always available to answer any questions."
      },
      {
        guestName: "Roger & Kim Schaefer",
        date: "MARCH 2025",
        text: "This was our 3rd time staying in San Pancho, but first time without an ocean view. We thought we would miss it more than we actually did. You are sooo close. We could hear the waves, and you do get a small view from the kitchen. Only steps to the heart of San Pancho and the beach but very quiet and peaceful. Vicky and her local team were wonderful and we’d be very happy to stay again. Zero regrets. Can’t wait to come back!"
      },
      {
        guestName: "Martin Hainey",
        date: "MARCH 2025",
        text: "The house is a great place to stay in San Pancho, just over 5 mins in to town to restaurants and beach., but it feels very private and secluded away from traffic and noise. You can hear the waves at night from the upstairs bedrooms, which I really nice. Our family loved staying here! Vicky and Bob are amazing hosts, nothing was too much trouble and they were available whenever we needed something."
      },
      {
        guestName: "Lynn Boatman",
        date: "NOVEMBER 2023",
        text: "We stayed about a week. This is an amazing find, easily walkable to main street and beach ( or use the fun golf cart ) but also private and spacious. The home is so charming, we loved it. Great kitchen for cooking. The backyard was so well designed for hanging out together from morning coffee to evening swims in the amazing private pool. Nature galore, we loved listening to the birds. We felt safe and comfortable. I would love to go back and stay at this home again and again."
      },
      {
        guestName: "Fernando Benito",
        date: "NOVEMBER 2023",
        text: "No sólo la casa es tal cual la descripción y las fotos, es mejor. Es un hogar... super limpio, equipped, cómodo, cálido. Es preciosa la casa, muchas gracias Vicky! Sin dudas volveremos."
      },
      {
        guestName: "Mohamed Alaouie",
        date: "APRIL 2023",
        text: "if you are looking for a place to stay in san pancho this is it... everything was perfect. clean space with plenty of lounge areas and amenities, the pool was wonderful, washer and dryer worked well, and the location is perfect. it is perfectly out of the immediate center of town so you will find peace and quiet at the house, but a short walk will have you directly in the center of san pancho where all the restaurants and shops are. the golf cart includes is just the icing on the cake, made it even more convenient to get around san pancho."
      },
      {
        guestName: "Marcia Hueftle",
        date: "FEBRUARY 2021",
        text: "My family & I stayed here in February and loved the house. Bob and Vicky are just wonderful people. So helpful and the home is beautiful. The home is decorated tastefully and the master bedroom downstairs was a plus. It was great to have a pool besides the ocean. Close enough to town that you can walk but not so close that you heard any noise."
      },
      {
        guestName: "Oliver Gindraux",
        date: "SEPTEMBER 2022",
        text: "This is such a great place to stay! Vicky & Bob were awesome hosts and made our stay so enjoyable. Even left a surfboard for us to use! The place is beautiful, roomy, comfortable and one of the best things by far is the family of iguanas that live around the property. They are so fun to watch from the beautiful pool. Kitchen was well stocked - we cooked quite a bit. Bedrooms were great. Air conditioning & fans worked perfectly. Elena & Esteban were great at keeping the house looking beautiful during our stay. The golf cart was an added bonus."
      },
      {
        guestName: "Abraham Gonza",
        date: "SEPTEMBER 2022",
        text: "The house is wonderful and in a great area. It's located a few blocks from the main party streets and but close enough to the beach that you can hear the waves crashing day and night. There's a few Iguanas that roam around the property giving it a real jungle paradise feel, that's amplified by all the geckos that you'll see and the frogs that will serenade you at night. It shows that Vicky and her husband take pride in providing a clean, well maintained property. Getting around town was made very easy with the golf cart."
      },
      {
        guestName: "Lynda Dimick",
        date: "NOVEMBER 2021",
        text: "This was a well located comfortable home with a great pool and a family of Iguanas that are fun to watch. Easy walking to town or beach but definitely take advantage of the golf cart that comes with it! Vicky was super helpful and a prompt easy communicator. The beds were all Comfortable. Great stay!"
      },
      {
        guestName: "Liz Evans",
        date: "OCTOBER 2021",
        text: "Villa iguana #5 in San Pancho was a dream come true. The house was better than the pictures. Salt water pool perfect for a quiet vacation, but walking distance to any thing you need or want. The golf cart a real treat for a quick trip to the market, a gelato, and shopping for souvenirs. The beach is a short 3-4 block walk. We will definitely add the villa to our return trip. Bob and Vicky are on WhatsApp so only a text away. Even set up Covid testing to happen right at the villa for our return to the states."
      }
    ]
  },
  {
    id: "villa-sunset",
    reservationKeyUnitId: "829:0",
    name: "Villa Sunset",
    unit: "Unit #3",
    tagline: "A Private Oasis with a Rooftop Paradise",
    descriptionTitle: "Villa Sunset",
    designConcept: "Find your relaxing retreat at Villa Sunset, located on the second floor of Villa Esperanza. Featuring a private entrance, an air-conditioned layout, and an exclusive rooftop palapa with jungle and ocean views, you are perfectly located just three blocks from the beach and two blocks from Main Street.",
    targetAudience: "Perfect for families or groups seeking a spacious, private retreat with exclusive rooftop palapa views.",
    capacity: "6 guests maximum",
    size: "Spacious 1,400 sq ft layout",
    rooms: "3 Bedrooms, 2.5 Bathrooms.",
    beds: "1 Queen, 2 Doubles, 2 Twins.",
    beachDistance: "Just three short blocks from the secluded beach.",
    townProximity: "Only two blocks from Main Street's restaurants and cafes.",
    walkability: "Highly walkable second-floor haven close to beach and town center.",
    specs: ["Max 6 Guests", "3 Beds / 2.5 Baths", "1,400 Sq Ft Oasis", "Private Entrance", "Rooftop Palapa Patio", "High Walkability"],
    longDescription: [
      "Find your relaxing retreat at Villa Sunset, located on the second floor of Villa Esperanza. Featuring a private entrance, an air-conditioned layout, and an exclusive rooftop palapa with jungle and ocean views, you are perfectly located just three blocks from the beach and two blocks from Main Street."
    ],
    golfCartUpsell: {
      title: "Add a Golf Cart Stay Extension",
      description: [
        "Make getting around even more fun and effortless.",
        "Exploring San Pancho by golf cart adds an extra layer of style and convenience to your trip. Select our \"Add Golf Cart\" upgrade feature at checkout to have your personal cart ready for your stay."
      ],
      buttonText: "Rent a cart"
    },
    highlights: [
      "A spacious 1,400 sq ft home featuring three comfortable, air-conditioned bedrooms, 2.5 bathrooms, and a fully equipped kitchen.",
      "The perfect blend of tranquility and easy access, located just three blocks from the ocean and two blocks from the center of town.",
      "Spend your days exploring the local scene, and your evenings taking in the views from your exclusive rooftop palapa, all while enjoying the ease of included weekly housekeeping."
    ],
    amenityCategories: [
      {
        title: "Space & Sleep",
        items: [
          "Accommodates 6 Guests",
          "1 Queen, 2 Doubles, 2 Twins",
          "2 Full & 1 Half Bathrooms",
          "Washer & Dryer"
        ]
      },
      {
        title: "Kitchen Comforts",
        items: [
          "Stove & Full Oven",
          "Refrigerator",
          "Coffee Maker & Kettle",
          "Fully Equipped Setup"
        ]
      },
      {
        title: "Climate & Media",
        items: [
          "Air Conditioning",
          "Ceiling Fans",
          "High-Speed Wi-Fi",
          "Smart TV with Streaming"
        ]
      },
      {
        title: "Essential Features",
        items: [
          "Outdoor Living: An entire private third-floor rooftop palapa patio and an additional private balcony",
          "Family & Convenience: A kid-friendly layout with a separate, private entrance and weekly housekeeping included"
        ]
      }
    ],
    houseRules: [
      {
        title: "Smoke-Free Sanctuary",
        description: "For the health and comfort of all guests, smoking is strictly prohibited inside the property. A $300 USD structural restoration fee will be applied for any violations."
      },
      {
        title: "Quiet Hours (10:00 PM – 9:00 AM)",
        description: "Please respect our local neighbors and the peaceful nature of the area. Loud music, parties, and external events are not permitted on the property."
      },
      {
        title: "Cancellation Policy",
        description: "The deposit is refundable under the following conditions: The cancellation request is made within 30 days of the deposit being received, AND the cancellation occurs more than 60 days before the scheduled arrival date. Please note that any cancellations or changes will incur a 10% administration fee."
      }
    ],
    images: [
      "/House photos/V3_1.jpeg",
      "/House photos/V3_2.jpeg",
      "/House photos/V3_3.jpeg",
      "/House photos/V3_4.jpg",
      "/House photos/V3_5.jpeg",
      "/House photos/V3_6.jpeg",
      "/House photos/V3_7.jpeg",
      "/House photos/V3_8.jpeg",
      "/House photos/V3_9.jpeg",
      "/House photos/V3_10.jpeg",
      "/House photos/V3_11.jpeg",
      "/House photos/V3_12.jpeg",
      "/House photos/V3_13.jpeg",
      "/House photos/V3_14.jpeg",
      "/House photos/V3_15.jpeg",
      "/House photos/V3_16.jpeg",
      "/House photos/V3_17.jpeg",
      "/House photos/V3_18.jpeg",
      "/House photos/V3_19.jpeg",
      "/House photos/V3_20.jpeg",
      "/House photos/V3_21.jpeg",
      "/House photos/V3_22.jpeg",
      "/House photos/V3_23.jpeg",
      "/House photos/V3_24.jpeg",
      "/House photos/V3_25.jpeg",
      "/House photos/V3_26.jpeg",
      "/House photos/V3_27.jpeg",
      "/House photos/V3_28.jpeg",
      "/House photos/V3_29.jpeg",
      "/House photos/V3_30.jpeg",
      "/House photos/V3_31.jpg"
    ],
    mapAddress: "America Latina #149, 63729 San Francisco, Nay.",
    mapQuery: "Villa Sunset #3, América Latina 149, San Francisco, Nayarit, Mexico",
    reviews: [
      {
        guestName: "Andrew Knecht",
        date: "APRIL 2026",
        text: "We always end up staying at this place when we return to San Pancho. We love the location, the place is fantastic and is such a cozy gem. We can’t wait to return soon!"
      },
      {
        guestName: "Leonie Uytterbroeck",
        date: "SEPTEMBER 2025",
        text: "Amazing place, very close to the beach with a lot of essentials in the houses. The host was always responsive, and very friendly. I would really recommend this place and I will come back here if I visit San Pancho again."
      },
      {
        guestName: "Rosie Dries",
        date: "JULY 2025",
        text: "This home was perfect for what we needed. Comfortable and very close to restaurants, stores, the beach, and the plaza. The hosts were very easy to communicate with and always responded quickly. I would stay here again if the opportunity arose."
      },
      {
        guestName: "Leah Adams",
        date: "NOVEMBER 2024",
        text: "Slice of Heaven in San Pancho. What is not to like about this amazing 3-bedroom condo in the heart of San Pancho? A huge rooftop deck and deck off the living room (both with views of the town and peek-a-boo ocean views) made it even extra special. A/C in all rooms, comfortable beds, and hosts who were extra gracious, communicative and helpful."
      },
      {
        guestName: "Alejandro Torres",
        date: "OCTOBER 2024",
        text: "Vicky's place is a cosy and spacious apartment with easy access to the beach a balcony and a lovely terrace on the roof, the whole place stays at refreshing 22 to 25 without having super cold spots so it's great to recover after al long day out. I would happily stay here again."
      },
      {
        guestName: "Clara Caron",
        date: "AUGUST 2024",
        text: "Staying at Vicky’s place was a very pleasant experience. From plates and spoons to chairs and umbrella for the beach was available for us. Plenty of beach towels, air conditioning in every room. Quiet area. Walkable to restaurants, beach and stores. We will definitely come back to Vicky’s villa at San Pancho."
      },
      {
        guestName: "George Hansen",
        date: "APRIL 2024",
        text: "Clean and spacious! Lovely views from balcony and roof! Close to major restaurants, shops and beach! We were very comfortable. Extra linens and towels were provided. We made good use of the laundry. It was wonderful!"
      },
      {
        guestName: "Robb & Karen",
        date: "FEBRUARY 2024",
        text: "Thank you Vicky & Bob, we truly had a very memorable stay at Villa Sunset 3. Everything was just as advertised on your website, we would also like to add the service provided by your friendly and courteous staff was impeccable."
      },
      {
        guestName: "Valerie Hawrelak",
        date: "MARCH 2023",
        text: "Hola, Thank you to Vicky and Bob and all their staff for another wonderful stay in Villa Sunset! Thank you Vicky and Elena for having the Villa ready for us for an early check in. A special thanks to Esperanza and her patience with me, as I stumbled through our conversations in Spanish. It was great being back in San Pancho and staying at Villa Sunset felt like our home away from home."
      },
      {
        guestName: "Jim Ballentine",
        date: "JANUARY 2022",
        text: "Our second stay with Vicky and Bob in beautiful San Pancho. Wonderful hosts - friendly, responsive and thoughtful. And the location is perfect."
      },
      {
        guestName: "Cheryl",
        date: "SEPTEMBER 2021",
        text: "We appreciate all the amenities provided including bottle water delivery and once a week house cleaner. Beautiful views from inside the house and the spacious rooftop. We also appreciate the host's fast response time when we had questions."
      },
      {
        guestName: "San Pancho Guest",
        date: "APRIL 2021",
        text: "Before I get into anything else feel free to stop reading right here and just book the place. Cleanliness, ease of check-in, attention to detail, amenities... all of which I would actually give beyond 5 stars. The completely private, massive rooftop palapa, equipped with its own bathroom and sink and the most incredible perspective of a pacific sunset that I have ever seen or could imagine, this villa is a spectacular value."
      },
      {
        guestName: "Alejandra",
        date: "DECEMBER 2020",
        text: "This place had everything we needed for our stay: fully stocked kitchen, beach chairs & umbrellas and space. Vicky & Robert were very communicative and available when/if we needed anything. During our stay, there was between 4 - 7 people staying and we were very comfortable. The palapa upstairs was amazing!!"
      },
      {
        guestName: "Michael",
        date: "DECEMBER 2015",
        text: "Apartment was spacious, clean and had a great second floor with a palm covering and seating area so we could be outside even when we were at home. Neighbors and neighborhood are nice, close to plaza and beach and downtown. We walked to everything."
      }
    ]
  },
  {
    id: "villa-papaya",
    reservationKeyUnitId: "832:0",
    name: "Villa Papaya",
    unit: "Unit #2",
    tagline: "A Serene First-Floor Retreat with Private Decks",
    descriptionTitle: "Villa Papaya",
    designConcept: "Find your tranquil retreat on the first floor of Villa Esperanza. Featuring a spacious, air-conditioned layout, a fully equipped kitchen, and private decks, you are perfectly located just three blocks from the beach and two blocks from Main Street. Weekly housekeeping is included.",
    targetAudience: "Perfect for small groups or families looking for a spacious, private retreat with multiple decks.",
    capacity: "4 guests maximum",
    size: "Spacious 1,800 sq ft layout",
    rooms: "2 Bedrooms, 2.5 Bathrooms.",
    beds: "1 King Bed, 2 Full Beds.",
    beachDistance: "Just a three-block stroll to the ocean.",
    townProximity: "Only two blocks from Main Street's restaurants.",
    walkability: "Highly walkable first-floor sanctuary next to Las Olas.",
    specs: ["Max 4 Guests", "2 Beds / 2.5 Baths", "1,800 Sq Ft Retreat", "Separate Private Entrance", "Private Decks & Balcony", "High Walkability"],
    longDescription: [
      "Find your tranquil retreat on the first floor of Villa Esperanza. Featuring a spacious, air-conditioned layout, a fully equipped kitchen, and private decks, you are perfectly located just three blocks from the beach and two blocks from Main Street.",
      "Weekly housekeeping is included."
    ],
    golfCartUpsell: {
      title: "Add a Golf Cart Stay Extension",
      description: [
        "Make getting around even more fun and effortless.",
        "Exploring San Pancho by golf cart adds an extra layer of style and convenience to your trip. Select our \"Add Golf Cart\" upgrade feature at checkout to have your personal cart ready for your stay."
      ],
      buttonText: "Rent a cart"
    },
    highlights: [
      "A sprawling 1,800 sq ft sanctuary featuring two comfortable bedrooms, each with an en-suite bathroom, plus an additional half bath for ultimate privacy.",
      "Ideally situated next to the exclusive Las Olas development, just a three-block stroll to the ocean and two blocks to the local dining scene.",
      "Spend your days exploring the beach, and return through your own separate entrance to unwind on your private decks."
    ],
    amenityCategories: [
      {
        title: "Space & Sleep",
        items: [
          "Accommodates 4 Guests",
          "1 King Bed, 2 Full Beds",
          "2 Full & 1 Half Bathrooms",
          "Washer & Dryer"
        ]
      },
      {
        title: "Kitchen & Dining",
        items: [
          "Stove & Full Oven",
          "Refrigerator & Dishwasher",
          "Coffee Maker & Kettle",
          "Toaster & BBQ Grill"
        ]
      },
      {
        title: "Climate & Media",
        items: [
          "Air Conditioning",
          "Ceiling Fans",
          "High-Speed Wi-Fi",
          "Smart TV with Streaming"
        ]
      },
      {
        title: "Essential Features",
        items: [
          "Outdoor Living: Private decks, a terrace, and balcony spaces perfectly arranged for unwinding in the tropical air",
          "Family & Convenience: A kid-friendly layout featuring a completely separate private entrance and weekly housekeeping included"
        ]
      }
    ],
    houseRules: [
      {
        title: "Smoke-Free Sanctuary",
        description: "For the health and comfort of all guests, smoking is strictly prohibited inside the property. A $300 USD structural restoration fee will be applied for any violations."
      },
      {
        title: "Quiet Hours (10:00 PM – 9:00 AM)",
        description: "Please respect our local neighbors and the peaceful nature of the area. Loud music, parties, and external events are not permitted on the property."
      },
      {
        title: "Cancellation Policy",
        description: "The deposit is refundable under the following conditions: The cancellation request is made within 30 days of the deposit being received, AND the cancellation occurs more than 60 days before the scheduled arrival date. Please note that any cancellations or changes will incur a 10% administration fee."
      }
    ],
    images: [
      "/House photos/V2_.jpeg",
      "/House photos/V2_1.jpeg",
      "/House photos/V2_2.jpeg",
      "/House photos/V2_3.jpeg",
      "/House photos/V2_4.jpeg",
      "/House photos/V2_5.jpeg",
      "/House photos/V2_6.jpeg",
      "/House photos/V2_7.jpeg",
      "/House photos/V2_8.jpeg",
      "/House photos/V2_9.jpeg",
      "/House photos/V2_10.jpeg",
      "/House photos/V2_11.jpeg",
      "/House photos/V2_12.jpeg",
      "/House photos/V2_13.jpeg",
      "/House photos/V2_14.jpeg",
      "/House photos/V2_15.jpeg",
      "/House photos/V2_16.jpeg",
      "/House photos/V2_17.jpeg",
      "/House photos/V2_18.jpeg",
      "/House photos/V2_19.jpeg",
      "/House photos/V2_20.jpeg",
      "/House photos/V2_21.jpeg",
      "/House photos/V2_22.jpeg",
      "/House photos/V2_23.jpeg",
      "/House photos/V2_24.jpeg",
      "/House photos/V2_25.jpeg",
      "/House photos/V2_26.jpeg",
      "/House photos/V2_27.jpeg",
      "/House photos/V2_28.jpeg"
    ],
    mapAddress: "America Latina #149, 63729 San Francisco, Nay.",
    mapQuery: "San Pancho Tropical, América Latina 149, San Francisco, Nayarit, Mexico",
    reviews: [
      {
        guestName: "Cacilia Cecile",
        date: "APRIL 2025",
        text: "Villa Papaya 2 is very nice and cozy, the kitchen offers everything you need for cooking, we felt very comfortable. The center with restaurants and shops as well as the beach are within walking distance. We particularly appreciated the drinking water dispenser and the washing machine as well as the cooling options for all rooms. We would book this place again in a heartbeat."
      }
    ]
  },
  {
    id: "villa-cocos",
    reservationKeyUnitId: "150515:0",
    name: "Villa Cocos",
    unit: "Unit #4",
    tagline: "A Modern, Stand-Alone Coastal Haven",
    descriptionTitle: "The San Pancho Retreat",
    designConcept: "Discover a peaceful, three-bedroom sanctuary offering the best of both worlds. Enjoy a modern, air-conditioned living space and a fully equipped kitchen. You are perfectly positioned just a three-block stroll from a secluded beach and two blocks from the vibrant local dining on Main Street. Step outside to your private tropical patio and settle right in, complete with the comfort of weekly housekeeping.",
    targetAudience: "Perfect for families or groups desiring highly walkable town access, privacy, and full modern comforts.",
    capacity: "5 guests maximum",
    size: "Stand-alone three-bedroom layout",
    rooms: "3 Bedrooms, 2 Bathrooms.",
    beds: "1 Queen Bed, 3 Twin Beds.",
    beachDistance: "Just a short three-block stroll to the secluded beach.",
    townProximity: "Only two blocks from Main Street's restaurants and cafes.",
    walkability: "Highly walkable sanctuary with immediate access to beach and town center.",
    specs: ["Max 5 Guests", "3 Beds / 2 Baths", "Stand-Alone Villa", "Modern Open-Concept", "Private Tropical Patio", "Quiet Residential Street"],
    longDescription: [
      "Discover a peaceful, three-bedroom sanctuary offering the best of both worlds. Enjoy a modern, air-conditioned living space and a fully equipped kitchen.",
      "You are perfectly positioned just a three-block stroll from a secluded beach and two blocks from the vibrant local dining on Main Street. Step outside to your private tropical patio and settle right in, complete with the comfort of weekly housekeeping."
    ],
    golfCartUpsell: {
      title: "Add a Golf Cart Stay Extension",
      description: [
        "Make getting around even more fun and effortless.",
        "Exploring San Pancho by golf cart adds an extra layer of style and convenience to your trip. Select our \"Add Golf Cart\" upgrade feature at checkout to have your personal cart ready for your stay."
      ],
      buttonText: "Rent a cart"
    },
    highlights: [
      "A stand-alone, open-concept home featuring three spacious air-conditioned bedrooms and two full bathrooms.",
      "A highly walkable sanctuary situated perfectly—just three blocks from the ocean and two blocks from Main Street.",
      "Spend your days effortlessly shifting between the tranquil beach and local dining, returning to a cool, private home and an intimate tropical patio."
    ],
    amenityCategories: [
      {
        title: "Space & Sleep",
        items: [
          "Accommodates 5 Guests",
          "1 Queen Bed",
          "3 Twin Beds",
          "2 Full Bathrooms"
        ]
      },
      {
        title: "Kitchen Comforts",
        items: [
          "Stove & Full Oven",
          "Refrigerator",
          "Coffee Maker & Kettle",
          "Toaster"
        ]
      },
      {
        title: "Climate & Convenience",
        items: [
          "Air Conditioning (Living & Bedrooms)",
          "Washer & Dryer",
          "Weekly Housekeeping"
        ]
      },
      {
        title: "Essential Features",
        items: [
          "Outdoor Living: A private, small tropical patio perfectly shaded for unwinding or enjoying morning coffee"
        ]
      }
    ],
    houseRules: [
      {
        title: "Smoke-Free Sanctuary",
        description: "For the health and comfort of all guests, smoking is strictly prohibited inside the property. A $300 USD structural restoration fee will be applied for any violations."
      },
      {
        title: "Quiet Hours (10:00 PM – 9:00 AM)",
        description: "Please respect our local neighbors and the peaceful nature of the area. Loud music, parties, and external events are not permitted on the property."
      },
      {
        title: "Cancellation Policy",
        description: "The deposit is refundable under the following conditions: The cancellation request is made within 30 days of the deposit being received, AND the cancellation occurs more than 60 days before the scheduled arrival date. Please note that any cancellations or changes will incur a 10% administration fee."
      }
    ],
    images: [
      "/House photos/V4_1.jpeg",
      "/House photos/V4_2.jpeg",
      "/House photos/V4_3.jpeg",
      "/House photos/V4_4.jpeg",
      "/House photos/V4_5.jpeg",
      "/House photos/V4_6.jpeg",
      "/House photos/V4_7.jpeg",
      "/House photos/V4_8.jpeg",
      "/House photos/V4_9.jpg",
      "/House photos/V4_10.jpeg",
      "/House photos/V4_11.jpeg",
      "/House photos/V4_12.jpeg",
      "/House photos/V4_13.jpeg",
      "/House photos/V4_14.jpeg",
      "/House photos/V4_15.jpeg",
      "/House photos/V4_16.jpeg",
      "/House photos/V4_17.jpeg",
      "/House photos/V4_18.jpeg",
      "/House photos/V4_19.jpeg",
      "/House photos/V4_20.png",
      "/House photos/V4_21.jpeg",
      "/House photos/V4_22.jpeg",
      "/House photos/V4_23.jpeg",
      "/House photos/V4_24.jpeg",
      "/House photos/V4_25.jpeg",
      "/House photos/V4_26.jpeg",
      "/House photos/V4_27.jpeg",
      "/House photos/V4_28.jpeg",
      "/House photos/V4_29.jpeg",
      "/House photos/V4_30.jpeg"
    ],
    mapAddress: "America Latina #149, 63729 San Francisco, Nay.",
    mapQuery: "Villa Cocos #4, América Latina 149, San Francisco, Nayarit, Mexico",
    reviews: [
      {
        guestName: "Amanda Hoffman Towlee",
        date: "JULY 2026",
        text: "Bob and Vicky were wonderful hosts. The house was exactly as shown, clean and full of what we needed. Any questions we had during our stay, they answered promptly. They were helpful with expected things (check in, instructions) and unexpected things (when we needed a clinic recommendation). I will recommend their rentals to family and friends, and will no doubt return myself!"
      },
      {
        guestName: "Erica Seville",
        date: "MAY 2026",
        text: "This is a really lovely Airbnb. Impeccably clean and well kitted out with everything you might need. A short walk to the lovely town of San Pancho. Great air-conditioning throughout. Highly recommended"
      },
      {
        guestName: "Joanne Mosellen",
        date: "DECEMBER 2025",
        text: "Amazing stay with our group of 5. Perfect walking location, immaculate home, incredibly helpful hosts! Can’t wait to come again!"
      },
      {
        guestName: "Elsie Munoz",
        date: "OCTOBER 2025",
        text: "We traveled with our 2 and 4 year old, and Vicky’s place worked great. There was a crib set up when we arrived and our kids enjoyed the little outdoor area for digging in the gravel. Vicky and Bob know everyone and were quick to provide us with information and connections- I would easily stay with them again."
      },
      {
        guestName: "Sheena Valdez",
        date: "SEPTEMBER 2025",
        text: "We didn't want to leave!! The home is perfect, the town is amazing, the people are so welcoming... it really is a hidden gem in Mexico! Bob and Vicky provided great instructions on how to get there and gave amazing recommendations on how to best experience the town. They were super professional with confirmation details and helpful tips pre-arrival. Post-arrival, the team was always reliable, quick to respond, and extremely flexible with our schedule. We rented a car, but it really isn't necessary because you can literally walk to everything you need in town. I've never experienced such great hospitality before... thank you Bob, Vicky, and team!!! We look forward to staying again! :)"
      },
      {
        guestName: "Bibiana Rios",
        date: "AUGUST 2025",
        text: "Vicky's place is highly recommended, it is nice, clean, intimate and very comfortable. It has very useful facilities such as a water filter and windows protected against insects. The location is good and safe. The kitchen is well-equipped, the beds are very comfortable and the appliances are all functional. Vicky was very friendly and attentive the whole time. We'd love to book it again for our next vacation in San Pancho"
      },
      {
        guestName: "Raena",
        date: "FEBRUARY 2025",
        text: "Thank you for the wonderful stay! Thank you Vicky and Bob for a wonderful vacation stay at Villa Cocos! From proactive communication to the beautiful villa, you made our vacation that much better. We had everything we needed in the villa, plus the location was perfect (quiet yet super walkable to the main street and beach). The villa was also very clean and having the washing machine was also super valuable. We are grateful to have been able to stay at one of your villas, and hope to come back again next year!"
      },
      {
        guestName: "Carly Mayer",
        date: "DECEMBER 2024",
        text: "We are a couple and spent 2 weeks at Vicky's place. The location cannot be beat. The size of the property was perfect. Great outdoor space in the shade. We absolutely loved spending time there. The hosts were always responsive. Kitchen was well stocked!"
      },
      {
        guestName: "David Lopez",
        date: "SEPTEMBER 2024",
        text: "Mucha disposición y atención por parte de Vicky, mucha apertura y muy amable. El lugar está muy bien ubicado en una zona céntrica de san Pancho, también muy bonito el alojamiento"
      },
      {
        guestName: "Alicia Cline",
        date: "OCTOBER 2023",
        text: "Amazing accommodations! We loved the location of the villa and Vicky and Bob were very communicative about anything we needed during our stay. We worked remotely from the villa and the internet was perfect for video calls. The villa was very comfortable and quiet. It’s located close to small markets, restaurants, and street food. There’s even a filtered water station right up the street which was great for filling up water jugs. We’d love to come back to San Pancho and stay in the villa again!"
      },
      {
        guestName: "Bobby Lewis",
        date: "SEPTEMBER 2023",
        text: "this place was fantastic! beautiful interior with an amazing outside private space. it was so close to everything including the beach and restaurants yet it was very quiet and private. 10/10 would come back."
      },
      {
        guestName: "Ann Jeffrey",
        date: "DECEMBER 2022",
        text: "This villa is a perfect location and has the best amenities our family could have hoped for during our stay! In addition to being only 3 blocks to the north beach entrance and equally close to the Mercado Indio where we could buy groceries, every room had a/c and the house had filtered water in the kitchen. It felt like a nice city apartment but tucked away in a quiet beach neighborhood. The host was extremely responsive and gracious!"
      },
      {
        guestName: "Rosario Sanchez",
        date: "OCTOBER 2022",
        text: "Mi familia y yo nos hospedamos por una semana y nos encantó el lugar de Vicky y Roberto. Es bastante amplio y está equipado para cubrir todas las necesidades de nuestra estancia. La casa es muy acogedora, muy bien ubicada a tan solo un par de calles de la playa. La comunicación con Vicky, Roberto y su equipo fue muy buena. Atendieron todas nuestras dudas y estuvieron al pendiente. Muy recomendado."
      },
      {
        guestName: "Claudia Fo",
        date: "SEPTEMBER 2022",
        text: "La villa nos encantó, es muy cómoda Y cuenta con todos los servicios, los muebles y decoración muy bonitos y cómodos, la terraza es una gran opción para un asado y el aire acondicionado un gran plus para que la estancia sea más cómoda! Para ir a la playa tienes que caminar unos 10 minutos."
      },
      {
        guestName: "Rosetti Saena",
        date: "AUGUST 2022",
        text: "We stayed from August 15-18 and really enjoyed everything about the villa. The golf cart rental came in handy for our elderly mother to enjoy the town. Thanks again Vicky and your team for the hospitality. We love the town and the wonderful people of San Pancho."
      },
      {
        guestName: "Mariano Russo",
        date: "AUGUST 2021",
        text: "El alojamiento es espectacular. Todo en orden, muy limpio y además muy cómodo. Tiene todo lo que se necesita y está planteado con inteligencia funcional, para que uno esté despreocupado. Tanto Vicky como Bob son dos grandes anfitriones que están atentos en todo momento y de un amanera muy cordial y respetuosa. La ubicación es muy cómoda porque está cerca de todo y a su vez en una zona de silencio."
      },
      {
        guestName: "Paul Hertsenberg",
        date: "MAY 2021",
        text: "Loved this Villa! Very clean and comfortable, and perfect location--can walk anywhere in town/to the beach, but far enough from the action to be very peaceful. My friend and I were in San Pancho to surf the local breaks--we'd be gone 7am-noon, grab a bite on way back to Villa, then siesta for a couple hours (Villa has AC/ceiling fans; full kitchen for lunch/snacks/cervezas). Then head into town for happy hour/dinner. Vicky was a great host--answered all my questions quickly."
      },
      {
        guestName: "Laura Burkert",
        date: "FEBRUARY 2021",
        text: "We can recommend Vicky's place. She and her husband were always very helpful. The place itself is close to the beach(5 min walking) and we didn't feel the need to have a pool at all. On the contrary, we were very lucky to have a very beautiful house which we could enjoy and where our kids could play safely. Just a small information: San Pancho itself has a really bad internet connection. In case you want to work from home it is quite difficult, even though we had most of the times internet at Vicky's place!!! The wifi comes and goes..."
      }
    ]
  },
  {
    id: "golf-cart",
    reservationKeyUnitId: "39537:0,92928:0,73936:0,49120:0,92734:0,49118:0,49119:0,39538:0",
    name: "4-Seater Golf Cart",
    unit: "Rental",
    tagline: "Explore San Pancho Effortlessly",
    descriptionTitle: "Golf Cart Rental",
    designConcept: "Explore San Pancho, Effortlessly. A personal golf cart is the perfect companion for your getaway. Whether you are driving out to the majestic Malecon, cruising past virgin beaches, or heading down Main Street for lunch, you will always travel in comfort. The best part? You will never have to worry about finding a place to park.",
    targetAudience: "Perfect for exploring the local beaches and town.",
    capacity: "4 passengers maximum",
    size: "4-Seater Electric",
    rooms: "",
    beds: "",
    beachDistance: "",
    townProximity: "",
    walkability: "",
    specs: ["4 Passengers Max", "LED Headlights", "Charger Included"],
    longDescription: [
      "Explore San Pancho, Effortlessly. A personal golf cart is the perfect companion for your getaway. Whether you are driving out to the majestic Malecon, cruising past virgin beaches, or heading down Main Street for lunch, you will always travel in comfort. The best part? You will never have to worry about finding a place to park."
    ],
    highlights: [
      "The Cart: A premium 4-seater electric cart built for town driving.",
      "The Power: Efficient battery charging from any standard 110V household outlet.",
      "The Comfort: High-back custom seats, LED headlights, and secure storage."
    ],
    images: [
      "/Golfcart_photos/gc_1.jpg",
      "/Golfcart_photos/gc_2.jpeg",
      "/Golfcart_photos/gc_3.jpeg",
      "/Golfcart_photos/gc_4.jpg",
      "/Golfcart_photos/gc_5.jpg",
      "/Golfcart_photos/gc_6.jpg",
      "/Golfcart_photos/gc_7.jpg",
      "/Golfcart_photos/gc_8.jpg",
      "/Golfcart_photos/gc_9.jpeg",
      "/Golfcart_photos/gc_10.jpeg",
      "/Golfcart_photos/gc_logo.jpeg"
    ],
    houseRules: [
      {
        title: "Drivers License Required",
        description: "All drivers must possess a valid driver's license and be at least 18 years of age."
      },
      {
        title: "Street Legal Compliance",
        description: "Only drive on designated public streets and follow all local driving laws."
      },
      {
        title: "Cancellation Policy",
        description: "The deposit is refundable under the following conditions: The cancellation request is made within 30 days of the deposit being received, AND the cancellation occurs more than 60 days before the scheduled arrival date. Please note that any cancellations or changes will incur a 10% administration fee."
      }
    ]
  }
];

export const globalPolicies: Policy[] = [
  {
    id: "check-in-out",
    title: "Check-In & Check-Out",
    details: "Check-in window starts strictly at 4:00 PM (ending at 10:00 PM). Check-out must be completed by 10:00 AM (extends to 11:00 AM for transitional cleaning blocks)."
  },
  {
    id: "noise",
    title: "Community Noise Standards",
    details: "Strict neighborhood quiet hours are observed daily between 10:00 PM and 8:00 AM to preserve town harmony."
  },
  {
    id: "events",
    title: "Event Restrictions",
    details: "No unauthorized large group gatherings, commercial parties, or external events are permitted on-site."
  },
  {
    id: "ecosystem",
    title: "Property Ecosystem Limits",
    details: "To safeguard premium linens and allergen-free interior footprints, smoking and pets are strictly prohibited inside all properties."
  },
  {
    id: "management",
    title: "Trusted Management",
    details: "Every stay is backed by a deeply trusted, local property management footprint with over 18 years of specialized hospitality roots right here in San Pancho."
  }
];
