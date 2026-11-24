export const PRODUCTS = [
  // ==========================================
  // RAIL 1: HEAVYWEIGHT HOODIES
  // ==========================================
  {
    id: 'hoodie-atheist-grey',
    code: '01 / 04',
    name: 'Heavyweight Graphic Hoodie',
    tagline: "THANK GOD I'M AN ATHEIST",
    category: 'hoodies',
    categoryName: 'Hoodies',
    price: 4999,
    originalPrice: 5999,
    rating: 4.9,
    reviewsCount: 128,
    isNew: true,
    isTrending: true,
    description: 'Constructed from custom-developed 480GSM loopback French terry cotton. Engineered with exaggerated drop shoulders, a double-layered hood without drawstrings for architectural structure, and our signature 2027 typographic print.',
    details: [
      { label: 'Material', value: '100% Organic French Terry Cotton (480 GSM)' },
      { label: 'Fit', value: 'Oversized Boxy Silhouette, dropped shoulders' },
      { label: 'Finishing', value: 'Vintage enzyme wash with distressed ribbing' },
      { label: 'Origin', value: 'Crafted in Portugal' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      {
        id: 'heather-grey',
        name: 'Heather Ash Grey',
        hex: '#9A9CA1',
        frontImage: '/garments/hoodie-grey.webp',
        backImage: '/garments/hoodie-grey.webp',
      },
      {
        id: 'midnight-black',
        name: 'Midnight Obsidian',
        hex: '#161616',
        frontImage: '/garments/hoodie-black.webp',
        backImage: '/garments/hoodie-black.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'dark-walnut'
  },
  {
    id: 'hoodie-obsidian-core',
    code: '02 / 04',
    name: 'Monolith Raw-Seam Hoodie',
    tagline: 'HEAVY WEIGHT OBSIDIAN',
    category: 'hoodies',
    categoryName: 'Hoodies',
    price: 4999,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 210,
    isNew: false,
    isTrending: true,
    description: 'The definitive luxury basic. Clean silhouette with concealed side welt pockets, seamless hem, and tonal embroidered micro-monogram on the left wrist cuff.',
    details: [
      { label: 'Material', value: '100% Suvin Cotton (500 GSM)' },
      { label: 'Fit', value: 'True boxy fit with structured hood' },
      { label: 'Details', value: 'Concealed YKK zippered side pockets' },
      { label: 'Origin', value: 'Crafted in Japan' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      {
        id: 'pitch-black',
        name: 'Pitch Black',
        hex: '#141414',
        frontImage: '/garments/hoodie-black.webp',
        backImage: '/garments/hoodie-black.webp',
      },
      {
        id: 'charcoal-mineral',
        name: 'Mineral Graphite',
        hex: '#373A3C',
        frontImage: '/garments/hoodie-grey.webp',
        backImage: '/garments/hoodie-grey.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'dark-walnut'
  },
  {
    id: 'pullover-oat-sand',
    code: '03 / 04',
    name: 'Architectural Oat Hoodie',
    tagline: 'BRUSHED FLEECE LUXURY',
    category: 'hoodies',
    categoryName: 'Hoodies',
    price: 5499,
    originalPrice: 6299,
    rating: 4.7,
    reviewsCount: 78,
    isNew: true,
    isTrending: false,
    description: 'Features a sculpted kimono sleeve construction that eliminates shoulder seams for uninterrupted drape. Ultra-soft brushed interior with thermal retention.',
    details: [
      { label: 'Material', value: '80% Supima Cotton, 20% Cashmere blend' },
      { label: 'Sleeve', value: 'One-piece raglan ergonomic cut' },
      { label: 'Origin', value: 'Crafted in Portugal' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['M', 'L', 'XL'],
    colors: [
      {
        id: 'oat-milk',
        name: 'Raw Oat Milk',
        hex: '#E5DFD3',
        frontImage: '/garments/pullover-oat.webp',
        backImage: '/garments/pullover-oat.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'natural-oak'
  },
  {
    id: 'sweatshirt-plus-moss',
    code: '04 / 04',
    name: 'Sweatshirt Plus — Forest Wash',
    tagline: 'ESSENTIAL MINIMALIST CREW',
    category: 'hoodies',
    categoryName: 'Hoodies',
    price: 4499,
    originalPrice: 4999,
    rating: 4.8,
    reviewsCount: 94,
    isNew: true,
    isTrending: false,
    description: 'A relaxed crewneck sweater sculpted with reverse flatlock stitching and reinforced collar binding. Finished with pigment garment dye for a subtle patina.',
    details: [
      { label: 'Material', value: '440 GSM Organic Loopback Cotton' },
      { label: 'Fit', value: 'Relaxed athletic drape' },
      { label: 'Origin', value: 'Crafted in Italy' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      {
        id: 'deep-moss',
        name: 'Deep Pine Moss',
        hex: '#2E3D34',
        frontImage: '/garments/sweatshirt-moss.webp',
        backImage: '/garments/sweatshirt-moss.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'natural-oak'
  },

  // ==========================================
  // RAIL 2: LADIES TOPS
  // ==========================================
  {
    id: 'ladies-knit-cream',
    code: '01 / 04',
    name: 'Asymmetric Ribbed Knit Top',
    tagline: 'SCULPTED OFF-SHOULDER',
    category: 'ladies-tops',
    categoryName: 'Ladies Tops',
    price: 3499,
    originalPrice: 3999,
    rating: 4.9,
    reviewsCount: 64,
    isNew: true,
    isTrending: true,
    description: 'Fine-gauge Italian merino and viscose blend knitted in a flattering asymmetric off-shoulder silhouette. Soft ribbed texture hugs with effortless fluidity.',
    details: [
      { label: 'Material', value: '70% Extra-Fine Merino, 30% Silk Viscose' },
      { label: 'Neckline', value: 'Asymmetric draped off-shoulder fold' },
      { label: 'Origin', value: 'Crafted in Milan, Italy' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    availableSizes: ['XS', 'S', 'M', 'L'],
    colors: [
      {
        id: 'ivory-cream',
        name: 'Ivory Cream',
        hex: '#F3EFE6',
        frontImage: '/garments/ladies-knit-cream.webp',
        backImage: '/garments/ladies-knit-cream.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'natural-oak'
  },
  {
    id: 'ladies-corset-black',
    code: '02 / 04',
    name: 'Structured Atelier Corset Top',
    tagline: 'ARCHITECTURAL BONED SILHOUETTE',
    category: 'ladies-tops',
    categoryName: 'Ladies Tops',
    price: 4299,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 112,
    isNew: true,
    isTrending: true,
    description: 'Precision-tailored cropped corset top featuring clean vertical princess seams, concealed rear zip closure, and flexible matte boning for sculptural support.',
    details: [
      { label: 'Material', value: 'Japanese Double-Weave Triacetate' },
      { label: 'Structure', value: 'Internal flexible couture boning' },
      { label: 'Origin', value: 'Crafted in Paris, France' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    availableSizes: ['XS', 'S', 'M', 'L'],
    colors: [
      {
        id: 'onyx-black',
        name: 'Onyx Black',
        hex: '#141414',
        frontImage: '/garments/ladies-corset-black.webp',
        backImage: '/garments/ladies-corset-black.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'dark-walnut'
  },
  {
    id: 'ladies-silk-champagne',
    code: '03 / 04',
    name: 'Champagne Silk Draped Blouse',
    tagline: '100% MULBERRY SILK SATIN',
    category: 'ladies-tops',
    categoryName: 'Ladies Tops',
    price: 5799,
    originalPrice: 6499,
    rating: 4.8,
    reviewsCount: 53,
    isNew: true,
    isTrending: false,
    description: 'Cut on the bias from heavy 22-momme mulberry silk satin. Features a liquid cowl neckline and elongated French-cuff sleeves for luminous evening drape.',
    details: [
      { label: 'Material', value: '100% 22-Momme Mulberry Silk' },
      { label: 'Cut', value: 'Bias-cut fluid cowl drape' },
      { label: 'Origin', value: 'Crafted in Como, Italy' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    availableSizes: ['S', 'M', 'L'],
    colors: [
      {
        id: 'champagne-gold',
        name: 'Champagne Satin',
        hex: '#E6D6BE',
        frontImage: '/garments/ladies-silk-champagne.webp',
        backImage: '/garments/ladies-silk-champagne.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'natural-oak'
  },
  {
    id: 'ladies-halter-sage',
    code: '04 / 04',
    name: 'Sculpted Halter Neck Top',
    tagline: 'MINIMALIST SAGE JERSEY',
    category: 'ladies-tops',
    categoryName: 'Ladies Tops',
    price: 2499,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 41,
    isNew: false,
    isTrending: true,
    description: 'Clean high-neck halter top engineered from double-layered modal-elastane compact jersey with raw clean-cut edges and seamless neckline finishing.',
    details: [
      { label: 'Material', value: 'Double-layer Modal Compact Jersey' },
      { label: 'Fit', value: 'Second-skin contoured fit' },
      { label: 'Origin', value: 'Crafted in Portugal' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    availableSizes: ['XS', 'S', 'M', 'L'],
    colors: [
      {
        id: 'sage-olive',
        name: 'Sage Olive',
        hex: '#6E7967',
        frontImage: '/garments/ladies-halter-sage.webp',
        backImage: '/garments/ladies-halter-sage.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'dark-walnut'
  },

  // ==========================================
  // RAIL 3: BAGGY JEANS & DENIM
  // ==========================================
  {
    id: 'jeans-lightwash',
    code: '01 / 04',
    name: 'Vintage Wash Baggy Denim',
    tagline: '14OZ JAPANESE WIDE-LEG',
    category: 'baggy-jeans',
    categoryName: 'Baggy Jeans',
    price: 4999,
    originalPrice: 5799,
    rating: 4.9,
    reviewsCount: 156,
    isNew: true,
    isTrending: true,
    description: 'Relaxed wide-leg skate silhouette washed with ozone enzymes for an authentic 90s vintage patina. Cut with generous thigh volume and subtle hem stacking.',
    details: [
      { label: 'Denim', value: '14oz Kurabo Mills Japanese Cotton' },
      { label: 'Fit', value: 'Ultra-baggy wide leg' },
      { label: 'Hardware', value: 'Brushed silver custom tack buttons' },
      { label: 'Origin', value: 'Crafted in Okayama, Japan' }
    ],
    sizes: ['28', '30', '32', '34'],
    availableSizes: ['28', '30', '32', '34'],
    colors: [
      {
        id: 'vintage-blue',
        name: 'Vintage Light Wash',
        hex: '#8AA7C4',
        frontImage: '/garments/jeans-lightwash.webp',
        backImage: '/garments/jeans-lightwash.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'natural-oak'
  },
  {
    id: 'jeans-indigo',
    code: '02 / 04',
    name: 'Raw Indigo Selvedge Baggy Jeans',
    tagline: 'UNWASHED 15OZ SELVEDGE',
    category: 'baggy-jeans',
    categoryName: 'Baggy Jeans',
    price: 5999,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 89,
    isNew: true,
    isTrending: true,
    description: 'Deep unwashed indigo rope-dyed selvedge denim with contrast tobacco stitching. Designed to mold and crease uniquely to the wearer over time.',
    details: [
      { label: 'Denim', value: '15oz Red-Line Selvedge Denim' },
      { label: 'Fit', value: 'Wide straight architectural cut' },
      { label: 'Origin', value: 'Crafted in Japan' }
    ],
    sizes: ['28', '30', '32', '34'],
    availableSizes: ['28', '30', '32', '34'],
    colors: [
      {
        id: 'raw-indigo',
        name: 'Raw Indigo',
        hex: '#1E2A44',
        frontImage: '/garments/jeans-indigo.webp',
        backImage: '/garments/jeans-indigo.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'dark-walnut'
  },
  {
    id: 'jeans-charcoal',
    code: '03 / 04',
    name: 'Charcoal Carpenter Baggy Jeans',
    tagline: 'DOUBLE-KNEE WORKWEAR DENIM',
    category: 'baggy-jeans',
    categoryName: 'Baggy Jeans',
    price: 5499,
    originalPrice: 6499,
    rating: 4.8,
    reviewsCount: 74,
    isNew: true,
    isTrending: false,
    description: 'Heavyweight washed charcoal denim reinforced with tonal double-knee panels, utility hammer loop, and triple-needle felled seams.',
    details: [
      { label: 'Denim', value: '14.5oz Washed Bull Denim' },
      { label: 'Details', value: 'Reinforced double-knee & utility pockets' },
      { label: 'Origin', value: 'Crafted in Los Angeles' }
    ],
    sizes: ['28', '30', '32', '34'],
    availableSizes: ['30', '32', '34'],
    colors: [
      {
        id: 'washed-charcoal',
        name: 'Washed Charcoal',
        hex: '#3A3B3E',
        frontImage: '/garments/jeans-charcoal.webp',
        backImage: '/garments/jeans-charcoal.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'dark-walnut'
  },
  {
    id: 'jeans-ecru',
    code: '04 / 04',
    name: 'Ecru Natural Skate Baggy Jeans',
    tagline: 'UNBLEACHED ORGANIC COTTON',
    category: 'baggy-jeans',
    categoryName: 'Baggy Jeans',
    price: 4699,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 62,
    isNew: false,
    isTrending: true,
    description: 'Cut from unbleached natural ecru organic twill retaining subtle cotton seed flecks. Effortless relaxed drape with clean tonal stitching.',
    details: [
      { label: 'Denim', value: '13.5oz Unbleached Organic Cotton' },
      { label: 'Fit', value: 'Relaxed wide-leg skate fit' },
      { label: 'Origin', value: 'Crafted in Portugal' }
    ],
    sizes: ['28', '30', '32', '34'],
    availableSizes: ['28', '30', '32', '34'],
    colors: [
      {
        id: 'ecru-white',
        name: 'Natural Ecru',
        hex: '#EDEAE0',
        frontImage: '/garments/jeans-ecru.webp',
        backImage: '/garments/jeans-ecru.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'natural-oak'
  },

  // ==========================================
  // RAIL 4: MEN'S FORMAL SHIRTS
  // ==========================================
  {
    id: 'shirt-white-poplin',
    code: '01 / 04',
    name: 'Optic White Italian Poplin Shirt',
    tagline: 'THOMAS MASON 2-PLY COTTON',
    category: 'formal-shirts',
    categoryName: 'Formal Shirts',
    price: 4199,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 142,
    isNew: true,
    isTrending: true,
    description: 'Tailored from crisp 120/2 Italian Thomas Mason cotton poplin with mother-of-pearl buttons, single-needle 22-stitches-per-inch tailoring, and a structured spread collar.',
    details: [
      { label: 'Fabric', value: '100% Italian 2-Ply Cotton Poplin' },
      { label: 'Buttons', value: 'Australian Mother-of-Pearl' },
      { label: 'Collar', value: 'Semi-spread structured collar' },
      { label: 'Origin', value: 'Crafted in Milan, Italy' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      {
        id: 'optic-white',
        name: 'Optic White',
        hex: '#FAFAFA',
        frontImage: '/garments/shirt-white.webp',
        backImage: '/garments/shirt-white.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'natural-oak'
  },
  {
    id: 'shirt-skyblue-oxford',
    code: '02 / 04',
    name: 'Sky Blue Tailored Oxford Shirt',
    tagline: 'MERCERIZED LONG-STAPLE COTTON',
    category: 'formal-shirts',
    categoryName: 'Formal Shirts',
    price: 4299,
    originalPrice: 4799,
    rating: 4.9,
    reviewsCount: 98,
    isNew: true,
    isTrending: false,
    description: 'Refined dress Oxford woven from mercerized Egyptian cotton for a subtle lustrous finish and breathable all-day crispness.',
    details: [
      { label: 'Fabric', value: 'Mercerized Royal Oxford Cotton' },
      { label: 'Fit', value: 'Modern tailored silhouette' },
      { label: 'Origin', value: 'Crafted in Italy' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      {
        id: 'sky-blue',
        name: 'Sky Blue',
        hex: '#A7C6E6',
        frontImage: '/garments/shirt-skyblue.webp',
        backImage: '/garments/shirt-skyblue.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'natural-oak'
  },
  {
    id: 'shirt-pinstripe-charcoal',
    code: '03 / 04',
    name: 'Charcoal Pinstripe Silk-Blend Shirt',
    tagline: 'MICRO-STRIPE EVENING TAILORING',
    category: 'formal-shirts',
    categoryName: 'Formal Shirts',
    price: 5499,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 67,
    isNew: true,
    isTrending: true,
    description: 'Cut from a fluid silk-cotton twill woven with razor-thin tonal pinstripes. Designed for sharp suiting or untucked architectural evening wear.',
    details: [
      { label: 'Fabric', value: '65% Giza Cotton, 35% Mulberry Silk' },
      { label: 'Buttons', value: 'Smoked Trocas Shell' },
      { label: 'Origin', value: 'Crafted in Como, Italy' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      {
        id: 'charcoal-stripe',
        name: 'Charcoal Pinstripe',
        hex: '#3A3B3F',
        frontImage: '/garments/shirt-pinstripe.webp',
        backImage: '/garments/shirt-pinstripe.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'dark-walnut'
  },
  {
    id: 'shirt-black-obsidian',
    code: '04 / 04',
    name: 'Midnight Obsidian Dress Shirt',
    tagline: 'CONCEALED PLACKET FORMAL',
    category: 'formal-shirts',
    categoryName: 'Formal Shirts',
    price: 4699,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 84,
    isNew: false,
    isTrending: true,
    description: 'Deep jet-black formal shirt with matte tonal buttons, crisp double-stitched cuffs, and wrinkle-resistant compact poplin finish.',
    details: [
      { label: 'Fabric', value: '100% Compact Satin-Finish Cotton' },
      { label: 'Fit', value: 'Tailored architectural cut' },
      { label: 'Origin', value: 'Crafted in Portugal' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      {
        id: 'obsidian-black',
        name: 'Obsidian Black',
        hex: '#141414',
        frontImage: '/garments/shirt-black.webp',
        backImage: '/garments/shirt-black.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'dark-walnut'
  },

  // ==========================================
  // ADDITIONAL ATELIER CAPSULE PIECES
  // ==========================================
  {
    id: 'outerwear-bomber-carbon',
    code: '01 / 04',
    name: 'Carbon Wool Modular Bomber',
    tagline: 'THERMO TECH INSULATED',
    category: 'streetwear',
    categoryName: 'Streetwear',
    price: 8999,
    originalPrice: 9999,
    rating: 4.9,
    reviewsCount: 62,
    isNew: true,
    isTrending: true,
    description: 'A contemporary reinterpretation of the MA-1 silhouette in water-resistant dense wool melton. Featuring magnetized utility storm flaps and internal harness straps.',
    details: [
      { label: 'Shell', value: '100% Virgin Melton Wool (Weatherized)' },
      { label: 'Lining', value: 'Cupro with Primaloft Gold Insulation' },
      { label: 'Origin', value: 'Crafted in Germany' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['S', 'M', 'L'],
    colors: [
      {
        id: 'carbon-black',
        name: 'Carbon Black',
        hex: '#1B1C1E',
        frontImage: '/garments/bomber-black.webp',
        backImage: '/garments/bomber-black.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'dark-walnut'
  },
  {
    id: 'tshirt-box-monolith',
    code: '02 / 04',
    name: 'Structural Heavyweight Tee',
    tagline: '310GSM RAW JERSEY',
    category: 'streetwear',
    categoryName: 'Streetwear',
    price: 2199,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 312,
    isNew: false,
    isTrending: true,
    description: 'The foundation of the 2027 capsule wardrobe. Stiff, architectural drape that stays crisp throughout the day. Custom tight ribbed collar that never sags.',
    details: [
      { label: 'Material', value: '100% GOTS Certified Carded Cotton' },
      { label: 'Weight', value: '310 GSM Ultra-Dense Knit' },
      { label: 'Origin', value: 'Crafted in Los Angeles' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      {
        id: 'chalk-white',
        name: 'Pure Chalk White',
        hex: '#F5F5F3',
        frontImage: '/garments/tee-white.webp',
        backImage: '/garments/tee-white.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'natural-oak'
  },
  {
    id: 'trousers-pleated-charcoal',
    code: '03 / 04',
    name: 'Wide-Leg Pleated Trousers',
    tagline: 'TAILORED RELAXED DRAPE',
    category: 'streetwear',
    categoryName: 'Streetwear',
    price: 5899,
    originalPrice: 6699,
    rating: 4.9,
    reviewsCount: 88,
    isNew: true,
    isTrending: false,
    description: 'Double reverse pleats flowing into a generous, fluid wide-leg silhouette. Elasticized internal waistband system for effortless comfort with sharp tailoring.',
    details: [
      { label: 'Material', value: 'Tropical Wool & Tencel blend' },
      { label: 'Rise', value: 'High rise with double forward pleats' },
      { label: 'Origin', value: 'Crafted in Italy' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['S', 'M', 'L'],
    colors: [
      {
        id: 'charcoal-wool',
        name: 'Charcoal Shadow',
        hex: '#2B2C30',
        frontImage: '/garments/trousers-charcoal.webp',
        backImage: '/garments/trousers-charcoal.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'dark-walnut'
  },
  {
    id: 'accessory-crossbody-leather',
    code: '04 / 04',
    name: 'Modular Monolith Leather Sling',
    tagline: 'FULL GRAIN SCULPTURAL ACCENT',
    category: 'streetwear',
    categoryName: 'Streetwear',
    price: 4499,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 145,
    isNew: false,
    isTrending: true,
    description: 'Sculpted from vegetable-tanned French calf leather with beveled raw edges. Features FIDLOCK magnetic quick-release buckle and microfiber device compartment.',
    details: [
      { label: 'Leather', value: '1.8mm Full-grain vegetable tanned calf' },
      { label: 'Buckle', value: 'FIDLOCK V-Buckle magnetic clasp' },
      { label: 'Origin', value: 'Handmade in Florence, Italy' }
    ],
    sizes: ['ONE SIZE'],
    availableSizes: ['ONE SIZE'],
    colors: [
      {
        id: 'nero-black',
        name: 'Nero Black',
        hex: '#111111',
        frontImage: '/garments/sling-black.webp',
        backImage: '/garments/sling-black.webp',
      }
    ],
    defaultColorIndex: 0,
    hangerTone: 'natural-oak'
  }
];
