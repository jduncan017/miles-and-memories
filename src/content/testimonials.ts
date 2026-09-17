/*
 * Client reviews from the live site, in the live marquee's order. Two edits
 * only: "Jacksonvile" corrected, and a dash in Krystal's review replaced with a
 * comma (house rule: no em or en dashes in copy).
 */
export type Testimonial = { quote: string; name: string; location: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Mandy was extremely helpful throughout the whole planning process. We could not have traveled with such a big group without her help! She was quick to respond with our questions and always helped us make changes when need be.",
    name: "Caroline",
    location: "Knoxville, TN",
  },
  {
    quote:
      "Mandy was literally the best!!! She was always there if we needed her! I would use her for every trip!!",
    name: "Maddie",
    location: "Knoxville, TN",
  },
  {
    quote:
      "Mandy is hands down one of my favorite people I’ve had the pleasure of talking to. Super down to earth, great recommendations, will not lead you a stray by any means, easy to get a hold of, and extremely supportive should you run into issues.",
    name: "Cssouthward",
    location: "Texas",
  },
  {
    quote:
      "All I have to say is that my wife and I had an unbelievable experience, and everything was smooth throughout the entire process working with this travel company.",
    name: "Mario",
    location: "Cornelius, NC",
  },
  {
    quote:
      "She is always there when we need her assistance. Day, night or early mornings. She is so helpful and knowledgeable.",
    name: "Colin",
    location: "Houston, TX",
  },
  {
    quote:
      "From start to finish, everything is perfect. We don’t have to think about the details. We just show up and have a great time. I am so thankful for her!",
    name: "Candice",
    location: "Jacksonville, NC",
  },
  {
    quote:
      "We have used Mandy for the last couple of years and she's amazing. Her communication is thorough, friendly and genuine. Anyone I talk to that has questions about traveling, where to go, what to see, etc., I recommend to Mandy.",
    name: "Krystal M.",
    location: "Katy, TX",
  },
  {
    quote:
      "My recent trip to Cancun was nothing short of amazing thanks to her meticulous planning and expertise. If you’re looking for a travel agent who goes above and beyond, Mandy is the one to trust. Highly recommended!",
    name: "Treeco",
    location: "Houston, TX",
  },
  {
    quote:
      "Mandy was so wonderful! She was responsive and patiently answered all of our questions. She did a great job helping us plan our itinerary and handling all of the details. I highly recommend her, You won't be disappointed!",
    name: "Pam",
    location: "Wilmington, NC",
  },
  {
    quote:
      "Mandy was amazing with helping all of our guests plan their trip for our wedding and made it so easy for everyone. She worked very hard to get our hotel rates down and advocated for us every step of the way. I cannot recommend her enough!",
    name: "Abby R.",
    location: "Hockley, TX",
  },
];
