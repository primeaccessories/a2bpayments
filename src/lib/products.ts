export type ProductCategory = 'payments' | 'finance'

export type ProductSection =
  | { kind: 'prose'; eyebrow?: string; heading: string; body: string }
  | { kind: 'cards'; eyebrow?: string; heading: string; items: { title: string; desc: string }[] }
  | { kind: 'list'; eyebrow?: string; heading: string; items: string[] }
  | { kind: 'stats'; eyebrow?: string; heading: string; items: { value: string; label: string }[] }
  | { kind: 'faq'; eyebrow?: string; heading: string; items: { q: string; a: string }[] }

export interface Product {
  slug: string
  title: string
  shortTitle: string
  category: ProductCategory
  tagline: string
  description: string
  features: string[]
  image: string
  sections: ProductSection[]
}

export const PRODUCTS: Product[] = [
  {
    slug: 'payment-terminals',
    title: 'Payment Terminals',
    shortTitle: 'Terminals',
    category: 'payments',
    tagline: 'The latest payment technology — efficient and cost-effective.',
    description:
      'Take card, contactless and mobile wallet payments anywhere you trade. Desktop, Wi-Fi and fully-mobile GPRS terminals — bespoke pricing, set up by you, supported by a UK team.',
    features: ['Built-in GPRS SIM card', 'All-day battery life', 'Easy plug-and-pay setup', 'Fast thermal printer'],
    image: '/products/terminals.png',
    sections: [
      {
        kind: 'prose',
        eyebrow: 'Technology',
        heading: 'The latest payment technology',
        body: 'We guarantee we are always up to date with the latest payment methods, ensuring that our clients have the ability to take all types of payments and are never unable to process a transaction. We understand every business is different and our bespoke pricing plans are tailor-made to ensure that card payments are not just efficient but cost-effective.',
      },
      {
        kind: 'cards',
        heading: 'Made for everywhere you trade',
        items: [
          { title: 'Built-in GPRS SIM card', desc: 'The SIM card connects to the strongest mobile network, so you can take payments anywhere.' },
          { title: 'Long-lasting battery life', desc: 'The battery lasts a day, so you can charge it overnight. In-car chargers are also available.' },
          { title: 'Easy to set up', desc: 'You can set the machine up yourself, and start taking payments as soon as it arrives.' },
          { title: 'Fast thermal printer', desc: 'Print a quick receipt for you and your customer with its fast integrated printer.' },
        ],
      },
      {
        kind: 'cards',
        eyebrow: 'How they work',
        heading: 'Three connection types',
        items: [
          { title: 'Desktop', desc: 'Terminal connected via ethernet to your router — not mobile, and perfect for countertop service.' },
          { title: 'Wi-Fi', desc: 'Connected via Wi-Fi, mobile within range, allowing table service with a range of movement.' },
          { title: 'GPRS', desc: 'Connected via a roaming SIM that connects to any available mobile network — fully mobile around the UK, perfect for clients constantly on the move or who have had Wi-Fi connectivity issues.' },
        ],
      },
      {
        kind: 'prose',
        eyebrow: 'Support',
        heading: 'Dedicated support team',
        body: 'We understand that having a good support network is fundamental, which is why we supply a personalised service — all of our clients have a dedicated account manager. One element of support is never enough, so this is backed up by a dedicated team for all customer service and technical issues. Every business is different and requires different support at different times, so all of our clients have a 24-hour helpline facilitated by our strategic partner. Three layers of support, supporting every business, 24 hours a day.',
      },
    ],
  },
  {
    slug: 'virtual-terminal',
    title: 'Virtual Terminal',
    shortTitle: 'Virtual Terminal',
    category: 'payments',
    tagline: 'Turn any internet-connected device into a payment terminal.',
    description:
      'Securely take card payments from any browser — for phone orders, subscriptions, e-commerce or professional services. No hardware required.',
    features: ['MOTO & phone orders', 'Subscription billing', 'Robust encryption', 'Works on any device'],
    image: '/products/virtual-terminal.webp',
    sections: [
      {
        kind: 'prose',
        eyebrow: 'Overview',
        heading: 'One platform, any device',
        body: 'A virtual terminal stands as an online platform enabling businesses to securely and efficiently process payments without the need for physical card terminals.',
      },
      {
        kind: 'cards',
        eyebrow: 'Use cases',
        heading: 'Built for how you sell',
        items: [
          { title: 'E-commerce retailers', desc: 'Seamlessly integrate payments into your online store, providing customers with a convenient checkout experience.' },
          { title: 'Phone order businesses', desc: 'Easily process payments for orders taken over the phone, catering to customers who prefer this method.' },
          { title: 'Subscription services', desc: 'Manage recurring payments for subscription-based businesses effortlessly, enhancing customer retention.' },
          { title: 'Professional services', desc: 'Streamline invoicing and payment collection for consultants, freelancers, and other service-based businesses.' },
        ],
      },
      {
        kind: 'cards',
        heading: 'Why a virtual terminal',
        items: [
          { title: 'Versatility', desc: 'Accept payments from various sources, including credit and debit cards, directly through your computer or mobile device.' },
          { title: 'Security', desc: 'Ensure the safety of sensitive customer data with robust encryption and compliance with industry security standards.' },
          { title: 'Convenience', desc: 'Enjoy the flexibility to process transactions anytime, anywhere, streamlining your payment workflows.' },
        ],
      },
      {
        kind: 'stats',
        eyebrow: 'By the numbers',
        heading: 'The impact',
        items: [
          { value: '20%', label: 'Increase in payment processing efficiency reported by businesses adopting virtual terminals.' },
          { value: '7.8%', label: 'Projected CAGR of the global virtual terminal market from 2022 to 2027.' },
          { value: '15%', label: 'Boost in customer satisfaction for online retailers using virtual terminals.' },
        ],
      },
    ],
  },
  {
    slug: 'epos-systems',
    title: 'E-POS Systems',
    shortTitle: 'E-POS',
    category: 'payments',
    tagline: 'Bespoke point-of-sale, designed around how you trade.',
    description:
      'Cloud-based EPOS for retail and hospitality — stock control, staff scheduling, table service, online ordering and integrated payments in one tidy system.',
    features: ['Cloud-based management', 'Stock & staff control', 'Online / QR / app orders', 'Integrated payments'],
    image: '/products/epos.webp',
    sections: [
      {
        kind: 'prose',
        eyebrow: 'Overview',
        heading: 'Electronic point of sale solutions',
        body: 'Selecting the right Electronic Point of Sale (EPOS) provider is a crucial decision for businesses seeking smooth transactions and efficient operations. At A2B Payment Solutions, we stand out as a paragon of reliability, innovation, and bespoke solutions designed to meet the distinctive needs of businesses across diverse sectors.',
      },
      {
        kind: 'list',
        eyebrow: 'Capabilities',
        heading: 'Everything in one system',
        items: [
          'Manage everything via the cloud',
          'Powerful marketing & loyalty capabilities',
          'Seating plans, split bills & delivery zones',
          'Handles all online, QR & app orders',
          'Modular and scalable to suit your business',
          'Staffing and scheduling tools',
          'Modern and user-friendly',
          'Complete stock control',
          'Full reporting suite',
          'Accounting integration',
        ],
      },
      {
        kind: 'cards',
        eyebrow: 'Why A2B',
        heading: 'Reliability, innovation, support',
        items: [
          { title: 'Versatility', desc: 'We offer an array of options, ensuring that our systems can be tailored to suit the specific requirements of businesses across various sectors.' },
          { title: 'Technology', desc: 'Stay ahead in the competitive landscape with our cutting-edge EPOS technology. Our solutions are crafted to deliver not just transactions but experiences.' },
          { title: 'Support', desc: 'Our dedicated support and customer service teams are here to assist you every step of the way.' },
        ],
      },
      {
        kind: 'cards',
        heading: 'Why choose us',
        items: [
          { title: 'Industry expertise', desc: 'With experience across a myriad of sectors, including retail, hospitality, healthcare and more, our team possesses industry-specific expertise.' },
          { title: 'Security', desc: 'Our EPOS systems incorporate state-of-the-art security features, providing you with peace of mind.' },
          { title: 'Scalability', desc: 'Our solutions are designed with scalability in mind, ensuring they can grow and adapt alongside your business.' },
        ],
      },
    ],
  },
  {
    slug: 'ecommerce',
    title: 'E-Commerce Payment Solutions',
    shortTitle: 'E-Commerce',
    category: 'payments',
    tagline: 'Accept online payments securely.',
    description:
      'Over 105 strategic partners and integrations — WooCommerce, PrestaShop, Opayo, WIX, Magento, WordPress. Slot us into your existing site, or take our MID-only service to cut transaction fees.',
    features: ['WooCommerce / Magento', 'Shopify / WIX / WordPress', 'MID-only option', 'Hosted & embedded'],
    image: '/products/ecommerce.png',
    sections: [
      {
        kind: 'prose',
        eyebrow: 'Overview',
        heading: 'Your trusted e-commerce partner',
        body: "At A2B Payment Solutions, we're your trusted partner in the ever-evolving world of e-commerce. With a network boasting over 105 strategic partners and integrations, including industry leaders like WooCommerce, PrestaShop, Opayo, WIX, Magento and WordPress, we ensure your payment processes are seamlessly integrated with the best names in the business.",
      },
      {
        kind: 'cards',
        heading: 'Why choose A2B',
        items: [
          { title: 'Extensive partnerships', desc: 'Benefit from our vast network of over 105 strategic partners, offering you a wide range of options for your e-commerce platform.' },
          { title: 'Top integrations', desc: 'Seamlessly integrate with well-known platforms like WooCommerce, PrestaShop, Opayo, WIX and WordPress, ensuring compatibility and efficiency.' },
          { title: 'Website layout optimisation', desc: 'Happy with your current website layout? We work with you to enhance and optimise your existing design for a seamless user experience.' },
          { title: 'MID-only service', desc: 'Explore our MID-only service, designed to reduce your monthly transaction fees while maintaining the highest standards of security and efficiency.' },
        ],
      },
      {
        kind: 'list',
        eyebrow: 'Integrations',
        heading: 'Works with your platform',
        items: ['WooCommerce', 'PrestaShop', 'Opayo', 'WIX', 'Magento', 'WordPress'],
      },
    ],
  },
  {
    slug: 'cash-advance',
    title: 'Cash Advance',
    shortTitle: 'Cash Advance',
    category: 'finance',
    tagline: 'Flexible finance for businesses accepting card payments.',
    description:
      'Secure up to 240% of your monthly card turnover, paid back as a percentage of each transaction. No APR. No fixed term. Pay it back as you earn.',
    features: ['Up to 240% of monthly turnover', '90% approval rate', 'No APR or hidden fees', 'No fixed term'],
    image: '/products/cash-advance.png',
    sections: [
      {
        kind: 'prose',
        eyebrow: 'Overview',
        heading: 'No APR — pay it back as you earn',
        body: 'A business cash advance is a flexible finance option for businesses accepting card payments. This allows you to secure up to 240% of your monthly card turnover, which is paid back as a percentage of each transaction. No APR. No time frame — just pay it back when you earn.',
      },
      {
        kind: 'list',
        eyebrow: 'What you get',
        heading: 'Simple, all-inclusive funding',
        items: [
          'Simple application process',
          '90% approval rate',
          'Dedicated relationship manager',
          'No security or business plans required',
          'One simple all-inclusive cost that never changes',
          'No admin fees, APRs and hidden extras',
          'No fixed term or fixed monthly payments',
        ],
      },
      {
        kind: 'faq',
        eyebrow: 'Open Banking',
        heading: 'Open Banking explained',
        items: [
          { q: 'What is Open Banking?', a: "Open banking allows financial facilitators to access customers' transaction history and volumes by connecting to their bank accounts. It enables data transfer only, with no deposit or withdrawal of funds." },
          { q: 'Is Open Banking safe?', a: 'Yes, consumers are protected. Your bank safeguards you against regulated open banking providers, which are listed on the FCA register and the open banking directory.' },
          { q: 'Are you protected?', a: 'Yes. We pride ourselves in providing safe and secure facilities for our clients, from transferring data to depositing funds. All open banking providers we use are FCA regulated and in the open banking directory, giving every consumer not just confidence but protection in every aspect.' },
        ],
      },
    ],
  },
  {
    slug: 'term-loans',
    title: 'Term Loans',
    shortTitle: 'Term Loans',
    category: 'finance',
    tagline: 'Competitive term loans, designed to meet your unique needs.',
    description:
      'A lump sum of capital with fixed monthly repayments and competitive rates. For equipment, expansion, hiring, refurbishment or debt consolidation.',
    features: ['Competitive interest rates', 'Quick & easy application', 'No hidden fees', 'Flexible loan amounts'],
    image: '/products/term-loans.png',
    sections: [
      {
        kind: 'prose',
        eyebrow: 'Overview',
        heading: 'Competitive term loans',
        body: 'Term loans are a type of business financing that provides a lump sum of capital, which is repaid over a fixed period with regular monthly payments.',
      },
      {
        kind: 'cards',
        heading: 'Why our term loans',
        items: [
          { title: 'Flexible loan amounts', desc: "Borrow the right amount for your business needs, whether you're investing in new equipment, expanding your operations, or covering unforeseen expenses." },
          { title: 'Competitive interest rates', desc: 'We offer affordable rates to keep your financing costs manageable.' },
          { title: 'Quick and easy application', desc: 'Apply online or speak with our financial specialists to get your loan processed quickly and efficiently.' },
          { title: 'No hidden fees', desc: "Transparency is our priority. You'll always know what to expect with clear terms and straightforward repayment options." },
          { title: 'Support for growth', desc: 'Use your term loan to fuel growth, from hiring new staff to launching new products or consolidating high-interest debts.' },
        ],
      },
      {
        kind: 'cards',
        eyebrow: 'Why choose A2B',
        heading: 'Funding, handled',
        items: [
          { title: 'Fast funding', desc: 'Get approved quickly and access your funds fast so you can keep your business moving forward.' },
          { title: 'Expert guidance', desc: 'Our financial specialists are here to help you navigate the loan process and find the best options for your goals.' },
          { title: 'Client-focused service', desc: 'Built on a foundation of putting our clients first, we offer personalised support and advice tailored to your business.' },
        ],
      },
    ],
  },
  {
    slug: 'revenue-based-loans',
    title: 'Revenue-Based Loans',
    shortTitle: 'Revenue Loans',
    category: 'finance',
    tagline: 'Loans that flex with your monthly revenue.',
    description:
      'Modern financing where repayments adjust to your income — affordable in quieter months, faster when business is good. Keep 100% ownership.',
    features: ['% of monthly revenue', 'No fixed monthly cost', '100% ownership retained', 'Quick capital access'],
    image: '/products/revenue-loans.png',
    sections: [
      {
        kind: 'prose',
        eyebrow: 'Overview',
        heading: 'What are revenue-based loans?',
        body: "Revenue-based loans are a modern financing solution where repayments are tied to your business's revenue. Unlike conventional loans that require fixed monthly payments, our repayment model adjusts to your income, ensuring affordability and peace of mind, even during slower months.",
      },
      {
        kind: 'cards',
        eyebrow: 'Ideal for',
        heading: 'Built for businesses like yours',
        items: [
          { title: 'E-commerce companies', desc: 'Fund inventory purchases and marketing campaigns to drive growth.' },
          { title: 'Service-based businesses', desc: 'Smooth out cash flow to cover expenses or expand your services.' },
          { title: 'Seasonal businesses', desc: 'Manage the ups and downs of seasonal revenue fluctuations with ease.' },
        ],
      },
      {
        kind: 'cards',
        heading: 'Key benefits',
        items: [
          { title: 'Flexible repayment plans', desc: 'Payments fluctuate based on your business revenue, allowing you to better manage cash flow.' },
          { title: 'Quick capital access', desc: 'We simplify the approval process, helping you get the funds you need — fast.' },
          { title: 'No fixed monthly payments', desc: 'Only pay a set percentage of your revenue, making payments easier to handle during slow periods.' },
          { title: 'Ownership retained', desc: 'Keep 100% ownership of your business while securing the funding you need to expand and grow.' },
        ],
      },
    ],
  },
]

export const productBySlug = (slug?: string) =>
  PRODUCTS.find((p) => p.slug === slug)
