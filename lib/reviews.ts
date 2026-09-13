import { get, list, put } from "@vercel/blob";

export interface PublishedReview {
  id: string;
  q: string;
  n: string;
  c: string;
  f?: string;
  rating: number;
  createdAt: string;
}

interface StoredReview {
  name: string;
  country: string;
  rating: number;
  review: string;
  createdAt: string;
}

const REVIEW_PREFIX = "reviews/";
const MAX_REVIEW_LENGTH = 1_200;

const countryFlags: Record<string, string> = {
  au: "/flags/AU.svg",
  australia: "/flags/AU.svg",
  austria: "/flags/AT.svg",
  belgium: "/flags/BE.svg",
  brazil: "/flags/BR.svg",
  ca: "/flags/CA.svg",
  canada: "/flags/CA.svg",
  china: "/flags/CN.svg",
  denmark: "/flags/DK.svg",
  de: "/flags/DE.svg",
  germany: "/flags/DE.svg",
  finland: "/flags/FI.svg",
  fr: "/flags/FR.svg",
  france: "/flags/FR.svg",
  india: "/flags/IN.svg",
  id: "/flags/ID.svg",
  indonesia: "/flags/ID.svg",
  ie: "/flags/IE.svg",
  ireland: "/flags/IE.svg",
  it: "/flags/IT.svg",
  italy: "/flags/IT.svg",
  jp: "/flags/JP.svg",
  japan: "/flags/JP.svg",
  malaysia: "/flags/MY.svg",
  mexico: "/flags/MX.svg",
  nl: "/flags/NL.svg",
  netherlands: "/flags/NL.svg",
  nz: "/flags/NZ.svg",
  "new zealand": "/flags/NZ.svg",
  norway: "/flags/NO.svg",
  philippines: "/flags/PH.svg",
  poland: "/flags/PL.svg",
  portugal: "/flags/PT.svg",
  "south korea": "/flags/KR.svg",
  sg: "/flags/SG.svg",
  singapore: "/flags/SG.svg",
  es: "/flags/ES.svg",
  spain: "/flags/ES.svg",
  sweden: "/flags/SE.svg",
  ch: "/flags/CH.svg",
  switzerland: "/flags/CH.svg",
  taiwan: "/flags/TW.svg",
  thailand: "/flags/TH.svg",
  uk: "/flags/GB.svg",
  "united kingdom": "/flags/GB.svg",
  "united states": "/flags/US.svg",
  "united arab emirates": "/flags/AE.svg",
  usa: "/flags/US.svg",
  us: "/flags/US.svg",
  vietnam: "/flags/VN.svg",
};

function clean(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

export function flagForCountry(country: string) {
  return countryFlags[country.trim().toLowerCase()];
}

function toPublishedReview(id: string, value: StoredReview): PublishedReview | null {
  const name = clean(value.name, 80);
  const country = clean(value.country, 80) || "Bali guest";
  const review = clean(value.review, MAX_REVIEW_LENGTH);
  const rating = Number(value.rating);

  if (!name || !review || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return null;
  }

  return {
    id,
    q: review,
    n: name,
    c: country,
    f: flagForCountry(country),
    rating,
    createdAt: value.createdAt,
  };
}

export async function savePublishedReview(input: {
  name: unknown;
  country: unknown;
  rating: unknown;
  review: unknown;
}) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Review storage is not configured.");
  }

  const createdAt = new Date().toISOString();
  const id = `${Date.now()}-${crypto.randomUUID()}`;
  const stored: StoredReview = {
    name: clean(input.name, 80),
    country: clean(input.country, 80),
    rating: Number(input.rating),
    review: clean(input.review, MAX_REVIEW_LENGTH),
    createdAt,
  };
  const review = toPublishedReview(id, stored);

  if (!review) {
    throw new Error("Please provide a name, review, and valid rating.");
  }

  await put(`${REVIEW_PREFIX}${id}.json`, JSON.stringify(stored), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });

  return review;
}

export async function listPublishedReviews(): Promise<PublishedReview[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return [];
  }

  try {
    const { blobs } = await list({ prefix: REVIEW_PREFIX, limit: 50 });
    const reviews = await Promise.all(
      blobs
        .filter((blob) => blob.pathname.endsWith(".json"))
        .map(async (blob) => {
          const result = await get(blob.url, { access: "public", useCache: false });
          if (!result || result.statusCode !== 200) return null;

          const value = (await new Response(result.stream).json()) as StoredReview;
          return toPublishedReview(blob.pathname.slice(REVIEW_PREFIX.length, -5), value);
        }),
    );

    return reviews
      .filter((review): review is PublishedReview => Boolean(review))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (error) {
    console.error("Published review listing failed", error);
    return [];
  }
}
