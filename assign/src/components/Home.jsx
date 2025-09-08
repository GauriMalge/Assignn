import React, { useState } from "react";
import phoneImg from '../assets/Phone.png';
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.png'


const Stat = ({ icon, title, desc }) => (
  <div className="flex items-start gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
    <div className="shrink-0 h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center text-white/90">
      {icon}
    </div>
    <div>
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="text-xs text-white/70 leading-snug">{desc}</p>
    </div>
  </div>
);

const ResourceCard = ({ eyebrow, title, children, cta = "Read more" }) => (
  <article className="group grid grid-cols-1 sm:grid-cols-12 gap-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md">
    <div className="sm:col-span-7">
      <div className="text-[11px] uppercase tracking-wide text-zinc-500">{eyebrow}</div>
      <h3 className="mt-1 text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="mt-2 text-sm text-zinc-600">{children}</p>
      <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 group-hover:gap-3">
        {cta}
        <span aria-hidden>→</span>
      </button>
    </div>
    <div className="sm:col-span-5">
      <div className="aspect-[4/3] w-full rounded-xl bg-emerald-50 ring-1 ring-emerald-100 flex items-center justify-center">
        <img
          src="/images/placeholder.svg"
          alt="Resource visual"
          className="h-20 w-20 opacity-80"
        />
      </div>
    </div>
  </article>
);

export default function Home() {
  const testimonials = [
    {
      id: "paul",
      name: "Paul",
      poster: "/images/testimonial-poster.jpg",
      video: "/videos/testimonial-paul.mp4",
      youtubeId: "pKy7cNtaJ0c",
      quote:
        "I used Better three years ago for my primary residence and just now for my vacation home. Very simple process. Each time it took about two weeks to close.",
    },
    {
      id: "amanda",
      name: "Amanda",
      poster: "/images/testimonial-poster-2.jpg",
      video: "/videos/testimonial-amanda.mp4",
      youtubeId: "tF60HQo3vhU",
      quote:
        "From start to finish, the communication was clear and the steps were easy to follow.",
    },
    {
      id: "tiara",
      name: "Tiara",
      poster: "/images/testimonial-poster-3.jpg",
      video: "/videos/testimonial-tiara.mp4",
      youtubeId: "Mhkf_1o4v7s",
      quote:
        "I loved being able to compare options and close fast without surprises.",
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const active = testimonials[activeIdx];
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight text-white">
              The first
              <span className="block bg-gradient-to-r from-emerald-300 via-teal-200 via-50% to-fuchsia-300 bg-clip-text text-transparent">
                AI-powered Mortgage
              </span>
              
            </h1>
            <p className="mt-8 mx-auto max-w-4xl text-white/85 text-xl sm:text-2xl">
              Our tech unlocks lower rates, higher chances of approval, and a lightning-fast process from approval to closing. Over $100 billion funded.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <a
                href="#preapproval"
                className="inline-flex items-center rounded-full bg-emerald-400 px-8 py-4 text-lg font-semibold text-emerald-950 shadow-lg shadow-emerald-900/30 hover:bg-emerald-300"
              >
                Start my pre-approval
              </a>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 1.75a10.25 10.25 0 1 0 10.25 10.25A10.262 10.262 0 0 0 12 1.75Zm.75 5a.75.75 0 0 0-1.5 0v5c0 .199.079.39.22.53l3.5 3.5a.75.75 0 1 0 1.06-1.06L12.75 11.2Z"/>
                </svg>
                <span>3 min | No hard credit check</span>
              </div>
            </div>
          </div>

          {/* Phone mock now replaced with a full-bleed, full-width image */}
          <div className="mt-12 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <img
              src={phoneImg}
              alt="App preview"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
       

        {/* background graphic */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-24 h-48 bg-gradient-to-b from-emerald-900/0 to-emerald-900" />
      </section>

      {/* TESTIMONIAL + WHY */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* video card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-100">
                {active.youtubeId ? (
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${active.youtubeId}?rel=0&modestbranding=1`}
                    title={`${active.name} testimonial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <video className="h-full w-full object-cover" poster={active.poster} controls>
                    <source src={active.video} type="video/mp4" />
                </video>
                )}
              </div>
              <div className="px-2 pb-2 pt-3 text-sm text-zinc-700">
                “{active.quote}” — {active.name}
              </div>
              <div className="flex items-center gap-3 px-2 pb-3 text-[13px]">
                {testimonials.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`rounded-full px-4 py-2 transition ${
                      activeIdx === idx
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* why better */}
          <div className="lg:col-span-7">
            <h2 className="text-5xl sm:text-6xl lg:text-8xl font-semibold tracking-tight text-zinc-900 leading-tight">
              Find out why we’re better.
            </h2>
            <div className="mt-8">
              <a
                href="https://better.com/b/our-stories"
                className="inline-flex items-center rounded-full bg-emerald-900 px-10 py-5 text-lg font-semibold text-white shadow-sm hover:bg-emerald-800"
              >
                See all our stories
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3 text-base">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-emerald-600">
                <path d="M12 2.25l2.955 6.08 6.71.975-4.832 4.712 1.14 6.654L12 17.77l-6.973 3.9 1.14-6.654L1.335 9.305l6.71-.975L12 2.25z"/>
              </svg>
              <span className="font-medium text-zinc-700">Trustpilot</span>
              <span className="text-zinc-900 font-semibold">Excellent</span>
              <span className="text-zinc-700">4.4 out of 5</span>
            </div>

            
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-semibold text-zinc-900">Got questions?</h3>
          <p className="mt-1 text-2xl font-semibold text-zinc-900">We’ve got answers</p>

          {/* Filters */}
          <div className="mt-5 inline-flex gap-3">
            <button className="rounded-full border border-emerald-600 bg-white px-5 py-2 text-sm font-medium text-emerald-700 shadow-[inset_0_0_0_2px] shadow-emerald-600">Our products</button>
            <button className="rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-medium hover:bg-zinc-50">Calculators</button>
            <button className="rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-medium hover:bg-zinc-50">Guides & FAQs</button>
          </div>

          {/* Grid layout */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Card 1 small with image */}
            <article className="rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="text-sm font-semibold text-zinc-900">How AI Mortgage</div>
              <h4 className="mt-1 text-lg font-semibold text-zinc-900">Lending is Transforming the Home Loan Process</h4>
              <button className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-700">→</button>
              {/* <div className="mt-5 aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 border-4 border-black" /> */}
              <img src={img1} alt="" srcset="" />
            </article>

            {/* Card 2 wide spanning 2 cols */}
            <article className="lg:col-span-2 rounded-2xl border border-zinc-200 bg-white p-6 grid grid-cols-1 gap-5 sm:grid-cols-12">
              <div className="sm:col-span-7">
                <div className="text-sm font-semibold text-zinc-900">One Day Mortgage B9</div>
                <p className="mt-2 text-sm text-zinc-600 max-w-xl">
                  Kick your home loan into hyperdrive. Going from locked rate to Commitment Letter takes weeks for traditional lenders. We do it in a single day. Traditional lenders deliver a Commitment Letter in a few weeks.
                </p>
                <button className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-700">→</button>
              </div>
              <div className="sm:col-span-5">
                <div className="flex h-full items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
                  {/* <span className="text-emerald-700 font-semibold">One Day Mortgage</span> */}
                  <img src={img2} alt="" srcset="" />
            </div>
          </div>
            </article>

            {/* Card 3 large spanning 2 cols with image left */}
            <article className="lg:col-span-2 rounded-2xl border border-zinc-200 bg-white p-6 grid grid-cols-1 gap-5 sm:grid-cols-12">
              <div className="sm:col-span-6">
                {/* <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100" /> */}
                 <img src={img3} alt="" srcset="" />
              </div>
             
              <div className="sm:col-span-6">
                <div className="text-sm font-semibold text-emerald-800">Better HELOC</div>
                <h4 className="mt-1 text-lg font-semibold text-zinc-900">Your express lane to cash</h4>
                <p className="mt-2 text-sm text-zinc-600">
                  Introducing One Day HELOC A0— your express lane to getting cash from your home with our Home Equity Line of Credit.
                  Access up to 90% of your home equity and get cash in as little as 7 days.
                </p>
                <button className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-700">→</button>
          </div>
            </article>

            {/* Card 4 small with image */}
            <article className="rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="text-sm font-semibold text-zinc-900">Insurance</div>
              <button className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-700">→</button>
              {/* <div className="mt-5 aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100" /> */}
              <img src={img4} alt="" srcset="" />
            </article>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Top columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Better column */}
            <div>
              <div className="text-emerald-700 font-semibold">Better</div>
              <p className="mt-2 text-sm text-zinc-600 max-w-xs">Better is a family of companies serving all your homeownership needs.</p>
              <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                <li>
                  <span className="font-medium text-emerald-700">Better Mortgage</span>
                  <p className="text-zinc-600">Apply 100% online with expert support.</p>
                </li>
                <li>
                  <span className="font-medium text-emerald-700">Better Real Estate</span>
                  <p className="text-zinc-600">Connect with a local partner agent.</p>
                </li>
                <li>
                  <span className="font-medium text-emerald-700">Better Cover</span>
                  <p className="text-zinc-600">Shop, bundle, and save on insurance.</p>
                </li>
                <li>
                  <span className="font-medium text-emerald-700">Better Inspect</span>
                  <p className="text-zinc-600">Fast, transparent home inspections.</p>
                </li>
                <li>
                  <span className="font-medium text-emerald-700">Better Settlement Services</span>
                  <p className="text-zinc-600">Title insurance all in one place.</p>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="text-sm font-semibold">Resources</div>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-zinc-700">
                <li><a href="#" className="hover:text-zinc-900">Home affordability calculator</a></li>
                <li><a href="#" className="hover:text-zinc-900">Mortgage calculator</a></li>
                <li><a href="#" className="hover:text-zinc-900">Free mortgage calculator</a></li>
                <li><a href="#" className="hover:text-zinc-900">Mortgage calculator with taxes</a></li>
                <li><a href="#" className="hover:text-zinc-900">Mortgage calculator with PMI</a></li>
                <li><a href="#" className="hover:text-zinc-900">Rent vs buy calculator</a></li>
                <li><a href="#" className="hover:text-zinc-900">HELOC payment calculator</a></li>
                <li><a href="#" className="hover:text-zinc-900">HELOC vs cash‑out refinance</a></li>
                <li><a href="#" className="hover:text-zinc-900">Buy a home</a></li>
                <li><a href="#" className="hover:text-zinc-900">Sell a home</a></li>
                <li><a href="#" className="hover:text-zinc-900">Get home inspection</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-sm font-semibold">Company</div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li><a href="#" className="hover:text-zinc-900">About Us</a></li>
                <li><a href="#" className="hover:text-zinc-900">Careers</a></li>
                <li><a href="#" className="hover:text-zinc-900">Media</a></li>
                <li><a href="#" className="hover:text-zinc-900">Partner With Us</a></li>
                <li><a href="#" className="hover:text-zinc-900">Learning center</a></li>
                <li><a href="#" className="hover:text-zinc-900">FAQs</a></li>
                <li><a href="#" className="hover:text-zinc-900">Investor Relations</a></li>
              </ul>
            </div>

            {/* Contact / Legal */}
            <div>
              <div className="text-sm font-semibold">Contact Us</div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li><a href="mailto:hello@better.com" className="hover:text-zinc-900">hello@better.com</a></li>
                <li><a href="tel:4155238837" className="hover:text-zinc-900">415‑523‑8837</a></li>
                <li><a href="#" className="hover:text-zinc-900">FAQ</a></li>
                <li><a href="#" className="hover:text-zinc-900">Glossary</a></li>
              </ul>
              <div className="mt-6 text-sm font-semibold">Legal</div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li><a href="#" className="hover:text-zinc-900">NMLS Consumer Access</a></li>
                <li><a href="#" className="hover:text-zinc-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-zinc-900">Terms of Use</a></li>
                <li><a href="#" className="hover:text-zinc-900">Disclosures & Licensing</a></li>
                <li><a href="#" className="hover:text-zinc-900">Affiliated Business</a></li>
                <li><a href="#" className="hover:text-zinc-900">Browser Disclaimer</a></li>
              </ul>
            </div>
              </div>

          {/* Social icons */}
          <div className="mt-10 flex items-center gap-5 text-zinc-500">
            <a href="#" aria-label="Facebook" className="hover:text-zinc-700">f</a>
            <a href="#" aria-label="Twitter" className="hover:text-zinc-700">t</a>
            <a href="#" aria-label="Instagram" className="hover:text-zinc-700">in</a>
            </div>

          {/* Disclaimers */}
          <div className="mt-6 space-y-4 text-[11px] leading-relaxed text-zinc-500">
            <p>
              Better Mortgage’s One Day Mortgage promotion offers eligible customers the opportunity to receive an underwriting determination within 24 hours of rate lock. Timing is subject to customary terms and may vary by borrower and loan type. Initial underwriting approval is not a commitment to lend.
            </p>
            <p>
              Homeowners insurance policies are offered through Better Cover, LLC. Better Real Estate and Better Settlement Services are separate operating subsidiaries of Better Holdco, Inc.
            </p>
            <p>
              Information on this site does not constitute a commitment to lend and is subject to change without notice. Not available in all states. Equal Housing Lender.
            </p>
          </div>

          <div className="mt-10 border-t border-zinc-200 pt-6 text-xs text-zinc-500">
            © {new Date().getFullYear()} Better Holdco, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

