'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// ==========================================
// Reusable Retro UI Components
// ==========================================

// The pink rounded header bar used on section cards
const CardHeader = ({ title, className = "" }: { title: string, className?: string }) => (
  <div className={`bg-retro-pink border-4 border-retro-dark rounded-t-[20px] py-2 px-4 text-center relative z-10 ${className}`}>
    <h2 className="font-header text-2xl md:text-3xl text-retro-pink text-stroke-retro tracking-wider">{title}</h2>
  </div>
);

// The main container for section cards (adds the bottom part and shadow)
const CardBody = ({ children, bgColor = "bg-retro-teal", className = "" }: { children: React.ReactNode, bgColor?: string, className?: string }) => (
  <div className={`border-4 border-t-0 border-retro-dark ${bgColor} rounded-b-[20px] p-4 shadow-[3px_3px_0px_0px_#1D2F38] relative -mt-[3px] z-0 ${className}`}>
    {children}
  </div>
);

// The yellow "Directions" or "Submit" button style
const RetroButton = ({ label }: { label: string }) => (
  <button className={`bg-retro-yellow border-[3px] border-retro-dark rounded-full py-1 px-4 font-bold text-retro-dark hover:bg-retro-pink transition-colors shadow-[2px_2px_0px_0px_#1D2F38]`}>
    {label}
  </button>
);

// ==========================================
// Logo Components
// ==========================================
const MainLogo = () => (
  <div className="relative z-10 -mb-14">
    <Image
      src="/logo.svg"
      alt="Happy Hour NA Logo"
      width={160}
      height={160}
      className="w-32 h-32 md:w-40 md:h-40"
      priority
    />
  </div>
);

const SmallLogo = () => (
  <Image
    src="/logo.svg"
    alt="Happy Hour NA Logo"
    width={96}
    height={96}
    className="w-24 h-24 mb-4"
  />
);

// ==========================================
// Just For Today Daily Meditation Component
// ==========================================
const DailyMeditation = () => {
  const [jftData, setJftData] = useState({
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    title: "Loading Meditation...",
    quote: "Please wait while we reflect...",
    content: ["..."],
    reflection: "Just for today, my thoughts will be on my recovery."
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJFT = async () => {
      try {
        // Use our own API route to avoid CORS issues
        const response = await fetch('/api/jft');
        const data = await response.json();

        if (data) {
          setJftData({
            date: data.date,
            title: data.title,
            quote: data.quote,
            content: data.content,
            reflection: data.reflection
          });
        }
      } catch (error) {
        console.error("Failed to fetch JFT", error);
        setJftData({
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
            title: "Daily Meditation",
            quote: "We can find meaning and purpose in our lives through recovery.",
            content: ["Unable to load today's meditation. Please visit jftna.org directly."],
            reflection: "I will stay clean and work my program today."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJFT();
  }, []);

  return (
    <section className="mb-12">
      <div className="flex justify-center">
        <CardHeader title="Just For Today" className="w-72 !rounded-b-none" />
      </div>
      <div className="border-4 border-retro-dark bg-retro-bg rounded-[25px] shadow-[3px_3px_0px_0px_#1D2F38] overflow-hidden relative -mt-[4px] z-0 max-w-4xl mx-auto">
        {loading ? (
          <div className="p-8 space-y-4">
            <div className="h-8 bg-retro-teal/30 rounded-lg animate-pulse w-1/3 mx-auto"></div>
            <div className="h-6 bg-retro-pink/30 rounded-lg animate-pulse w-2/3 mx-auto"></div>
            <div className="h-4 bg-retro-teal/30 rounded-lg animate-pulse w-3/4 mx-auto"></div>
            <div className="space-y-2 pt-4">
              <div className="h-4 bg-retro-teal/30 rounded-lg animate-pulse"></div>
              <div className="h-4 bg-retro-teal/30 rounded-lg animate-pulse"></div>
              <div className="h-4 bg-retro-teal/30 rounded-lg animate-pulse w-5/6"></div>
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-8">
            {/* Date */}
            <div className="text-center mb-4">
              <span className="inline-block bg-retro-yellow border-[3px] border-retro-dark rounded-full px-6 py-2 font-bold text-lg shadow-[2px_2px_0px_0px_#1D2F38]">
                {jftData.date}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-header text-3xl md:text-4xl text-retro-pink text-stroke-retro text-center mb-4">
              {jftData.title}
            </h3>

            {/* Quote */}
            <div className="bg-retro-teal border-[3px] border-retro-dark rounded-xl p-4 mb-6 shadow-[2px_2px_0px_0px_#1D2F38]">
              <p className="font-bold text-lg text-center italic text-retro-dark">
                &ldquo;{jftData.quote}&rdquo;
              </p>
            </div>

            {/* Content */}
            <div className="space-y-4 mb-6">
              {jftData.content.map((paragraph, index) => (
                <p key={index} className="font-bold text-lg leading-relaxed text-retro-dark">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Reflection */}
            <div className="bg-retro-pink border-[3px] border-retro-dark rounded-xl p-4 shadow-[2px_2px_0px_0px_#1D2F38]">
              <p className="font-bold text-lg text-center text-retro-dark">
                <span className="text-retro-yellow text-stroke-retro-sm">Just for today:</span> {jftData.reflection}
              </p>
            </div>

            {/* Source Attribution */}
            <div className="text-center mt-6">
              <a
                href="https://www.jftna.org/jft/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-bold text-retro-dark/70 hover:text-retro-pink transition-colors"
              >
                Source: jftna.org &bull; &copy; NA World Services, Inc.
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ==========================================
// Main Page Layout
// ==========================================
export default function Home() {
  return (
    <main className="min-h-screen pb-20 overflow-x-hidden">
      {/* --- HEADER SECTION --- */}
      <header className="relative mb-16">
        {/* Pink Stripe Background */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-12 bg-retro-pink border-y-4 border-retro-dark"></div>

        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative">
           {/* Logo positioned over the stripe */}
           <div className="md:flex-shrink-0 md:mr-8">
             <MainLogo />
           </div>

           {/* Navigation Links */}
           <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 relative z-10 mt-6 md:mt-0 pt-4 md:pt-0 w-full md:w-auto md:ml-auto">
            {['Home', 'Meetings', 'Events', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="font-header text-3xl md:text-4xl text-retro-pink text-stroke-retro hover:text-retro-yellow transition-colors">
                {item}
              </a>
            ))}
           </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-6xl">

        {/* --- BIG MEETINGS TABLE --- */}
        <section id="meetings" className="mb-16">
          {/* Centered Header */}
          <div className="flex justify-center">
            <CardHeader title="Meetings" className="w-64 !rounded-b-none" />
          </div>

          {/* Scrollable container for mobile */}
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            {/* The Table Container with thick border and rounded corners */}
            <div className="border-4 border-retro-dark bg-retro-teal rounded-[25px] shadow-[3px_3px_0px_0px_#1D2F38] overflow-hidden relative -mt-[4px] z-0 min-w-[700px]">

              {/* Grid Definition: Using explicit columns for precise control */}
              <div className="grid grid-cols-[1.5fr_2fr_2.5fr_1.5fr_2fr] font-bold text-retro-dark text-base md:text-lg leading-tight">

              {/* === Headers === */}
              {/* Note: Specific rounded corners on top-left and top-right cells */}
              <div className="bg-retro-pink p-4 border-r-4 border-b-4 border-retro-dark flex items-center justify-center rounded-tl-[20px]">Day/Time</div>
              <div className="bg-retro-pink p-4 border-r-4 border-b-4 border-retro-dark flex items-center justify-center">Meeting Name</div>
              <div className="bg-retro-pink p-4 border-r-4 border-b-4 border-retro-dark flex items-center justify-center">Location</div>
              <div className="bg-retro-pink p-4 border-r-4 border-b-4 border-retro-dark flex items-center justify-center">Format</div>
              <div className="bg-retro-yellow p-4 border-b-4 border-retro-dark flex items-center justify-center rounded-tr-[20px]">Directions</div>

              {/* === Row 1: Mon === */}
              <div className="bg-retro-pink p-4 border-r-4 border-b-4 border-retro-dark flex items-center justify-center font-extrabold">Mon.</div>
              <div className="bg-retro-teal p-4 border-r-4 border-b-4 border-retro-dark flex items-center justify-center font-extrabold">Step Study</div>
              <div className="bg-retro-teal p-3 border-r-4 border-b-4 border-retro-dark flex flex-col items-center justify-center text-base">
                <span>23 Mtnat Way,</span>
                <span>Albany, OR 356</span>
              </div>
              <div className="bg-retro-teal p-4 border-r-4 border-b-4 border-retro-dark flex items-center justify-center font-extrabold">Study</div>
              <div className="bg-retro-teal p-3 border-b-4 border-retro-dark flex items-center justify-center">
                <RetroButton label="Directions" />
              </div>

              {/* === Row 2: Tues === */}
              <div className="bg-retro-pink p-4 border-r-4 border-b-4 border-retro-dark flex items-center justify-center font-extrabold">Tues</div>
              <div className="bg-retro-teal p-4 border-r-4 border-b-4 border-retro-dark flex items-center justify-center font-extrabold">Speaker Meeting</div>
              <div className="bg-retro-teal p-3 border-r-4 border-b-4 border-retro-dark flex flex-col items-center justify-center text-base">
                <span>31 Barmar Rt.,</span>
                <span>Albany, OR 354</span>
              </div>
              <div className="bg-retro-teal p-4 border-r-4 border-b-4 border-retro-dark flex items-center justify-center font-extrabold">Study</div>
              <div className="bg-retro-teal p-3 border-b-4 border-retro-dark flex items-center justify-center">
                <RetroButton label="Directions" />
              </div>

               {/* === Row 3: Wed === */}
              <div className="bg-retro-pink p-4 border-r-4 border-b-4 border-retro-dark flex items-center justify-center font-extrabold">Wed.</div>
              <div className="bg-retro-teal p-4 border-r-4 border-b-4 border-retro-dark flex items-center justify-center font-extrabold">Speaker Meeting</div>
              <div className="bg-retro-teal p-3 border-r-4 border-b-4 border-retro-dark flex flex-col items-center justify-center text-base">
                <span>323 Rion Way,</span>
                <span>Albany, OR 363</span>
              </div>
              <div className="bg-retro-teal p-4 border-r-4 border-b-4 border-retro-dark flex items-center justify-center font-extrabold">Study</div>
              <div className="bg-retro-teal p-3 border-b-4 border-retro-dark flex items-center justify-center">
                <RetroButton label="Directions" />
              </div>

              {/* === Row 4: Thurs (No bottom borders on cells, container handles it) === */}
              {/* Specific rounded corners on bottom-left and bottom-right cells */}
              <div className="bg-retro-pink p-4 border-r-4 border-retro-dark flex items-center justify-center font-extrabold rounded-bl-[20px]">Thurs</div>
              <div className="bg-retro-teal p-4 border-r-4 border-retro-dark flex items-center justify-center font-extrabold">Happy Hour Group</div>
              <div className="bg-retro-teal p-3 border-r-4 border-retro-dark flex items-center justify-center text-base">
                <span>Albany, OR USA</span>
              </div>
              <div className="bg-retro-teal p-4 border-r-4 border-retro-dark flex items-center justify-center font-extrabold">Group</div>
              <div className="bg-retro-teal p-3 flex items-center justify-center rounded-br-[20px]">
                <RetroButton label="Directions" />
              </div>

              </div>
            </div>
          </div>
        </section>

        {/* --- JUST FOR TODAY - Daily Meditation --- */}
        <DailyMeditation />

        {/* --- BOTTOM 3-COLUMN LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* === COLUMN 1: Upcoming Events === */}
          <section id="events">
            <CardHeader title="Upcoming Events" />
            {/* Note: This card body is bg-retro-teal based on image */}
            <CardBody bgColor="bg-retro-teal">
               {/* Calendar Widget */}
               <div className="border-[3px] border-retro-dark rounded-xl overflow-hidden mb-4 text-center font-bold shadow-[2px_2px_0px_0px_#1D2F38]">
                  {/* Calendar Header */}
                  <div className="bg-retro-yellow border-b-[3px] border-retro-dark grid grid-cols-7 px-2 py-1 text-sm">
                    <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                  </div>
                  {/* Calendar Grid */}
                  <div className="bg-retro-tealDark grid grid-cols-7 p-1 gap-[2px] text-lg font-extrabold">
                     {/* Using a map for cleaner grid generation.
                         Styling specific days to match the image's highlights. */}
                     {Array.from({length: 35}).map((_, i) => {
                        // Offset starting day
                        const dayNum = i - 1;
                        let cellContent: React.ReactNode = dayNum > 0 && dayNum <= 31 ? dayNum : null;
                        let cellClass = "bg-retro-teal flex items-center justify-center h-10";

                        // Apply specific styles to match image_2.png
                        if (dayNum === 16) cellClass = "bg-retro-pink border-[3px] border-retro-dark rounded-lg flex items-center justify-center h-10 shadow-[2px_2px_0px_0px_#1D2F38]";
                        if (dayNum === 25) cellClass = "bg-retro-yellow border-[3px] border-retro-dark rounded-lg flex items-center justify-center h-10 shadow-[2px_2px_0px_0px_#1D2F38]";
                        if (dayNum === 31) cellClass = "bg-retro-bg border-[3px] border-retro-dark rounded-lg flex items-center justify-center h-10 shadow-[2px_2px_0px_0px_#1D2F38] text-retro-dark/70";

                        if (i === 0) cellContent = <span className="text-retro-dark/50">31</span>;
                        if (dayNum > 31) cellContent = <span className="text-retro-dark/50">{dayNum - 31}</span>;

                        return <div key={i} className={cellClass}>{cellContent}</div>
                     })}
                  </div>
               </div>
               {/* Legend */}
               <ul className="font-extrabold text-lg space-y-2 ml-2">
                 <li className="flex items-center"><span className="w-5 h-5 rounded-full bg-retro-pink border-[3px] border-retro-dark mr-3 shadow-[2px_2px_0px_0px_#1D2F38]"></span>Step Study</li>
                 <li className="flex items-center"><span className="w-5 h-5 rounded-full bg-retro-teal border-[3px] border-retro-dark mr-3 shadow-[2px_2px_0px_0px_#1D2F38]"></span>Speaker Meeting</li>
                 <li className="flex items-center"><span className="w-5 h-5 rounded-full bg-retro-yellow border-[3px] border-retro-dark mr-3 shadow-[2px_2px_0px_0px_#1D2F38]"></span>Happy Hour Group</li>
                 <li className="flex items-center"><span className="w-5 h-5 rounded-full bg-retro-bg border-[3px] border-retro-dark mr-3 shadow-[2px_2px_0px_0px_#1D2F38]"></span>Parently List</li>
               </ul>
            </CardBody>
          </section>

          {/* === COLUMN 2: About Us === */}
          <section id="about">
            <CardHeader title="About Us" />
            {/* Note: This card body is bg-retro-bg (beige) based on image */}
            <CardBody bgColor="bg-retro-bg" className="flex flex-col items-center text-center px-6 py-8">
               <SmallLogo />
               <p className="font-bold text-lg leading-snug">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diat eius mod tempor incididunt ut labore et dolore magna aliqua. Urt labore et dolore magna riqua. Eeim veniam, quis nostrud exercitationis labors nisi ut aliquip ex ea commodo consequat.
               </p>
            </CardBody>
          </section>

          {/* === COLUMN 3: Contact Us === */}
          <section id="contact">
              <CardHeader title="Contact Us" />
              <CardBody bgColor="bg-retro-teal">
              <form className="space-y-4 p-2">
                  <input type="text" placeholder="Name" className="w-full p-3 rounded-xl border-[3px] border-retro-dark bg-retro-bg font-bold text-lg placeholder-retro-dark focus:outline-none shadow-[2px_2px_0px_0px_#1D2F38]" />
                  <input type="email" placeholder="Email" className="w-full p-3 rounded-xl border-[3px] border-retro-dark bg-retro-bg font-bold text-lg placeholder-retro-dark focus:outline-none shadow-[2px_2px_0px_0px_#1D2F38]" />
                  <textarea rows={4} placeholder="Message" className="w-full p-3 rounded-xl border-[3px] border-retro-dark bg-retro-bg font-bold text-lg placeholder-retro-dark resize-none focus:outline-none shadow-[2px_2px_0px_0px_#1D2F38]"></textarea>
                  <div className="flex justify-center pt-2">
                  <RetroButton label="Submit" />
                  </div>
              </form>
              </CardBody>
          </section>

        </div>
      </div>
    </main>
  );
}
