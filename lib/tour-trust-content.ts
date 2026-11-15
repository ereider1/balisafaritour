export const INCLUDED_ITEMS = [
  { item: "Pickup and drop-off at all Bali locations", included: true },
  { item: "Private classic VW and driver-guide", included: true },
  { item: "Fuel", included: true },
  { item: "Bottled water", included: true },
  { item: "Entrance fees", included: false },
  { item: "Lunch", included: false },
  { item: "Full-day tour", included: true },
];

export const GOOGLE_REVIEW_URL = "https://share.google/PIifERzYttfFr24Yd";

export const HOW_IT_WORKS_STEPS = [
  ["Message us on WhatsApp", "Share your dates, pickup area and the kind of day you have in mind."],
  ["We plan your route", "We will help shape your stops into a route for your day."],
  ["We pick you up", "Meet your driver-guide and set off on your Bali tour."],
];

export const TOUR_FAQS = [
  {
    question: "Is the price per person or per car?",
    answer: "Tour prices are per person.",
  },
  {
    question: "How many people can ride in one VW?",
    answer: "A maximum of 4 guests can ride in each car.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "You can cancel anytime. If a tour cannot be completed, you will receive a full refund.",
  },
  {
    question: "Which payment methods do you accept?",
    answer: "We accept bank transfer, payment in person, and PayPal.",
  },
  {
    question: "Do you require a deposit?",
    answer: "No deposit is required for bookings of two cars or fewer.",
  },
  {
    question: "What happens during the rainy season?",
    answer: "Tours run during the rainy season, though routes may change. Cancellations and rescheduling are accepted.",
  },
  {
    question: "Can I change the route on the day?",
    answer: "Yes. Tell your driver where you would like to go—your day, your tour.",
  },
];

export function getAnsweredFAQs() {
  return TOUR_FAQS;
}
