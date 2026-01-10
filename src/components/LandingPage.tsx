/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NetworkCanvas from "./NetworkCanvas";

// Animated Flow SVG Component
function AnimatedFlowLines({ 
  direction = "down", 
  color = "#5BF731",
  paths = 3,
  delay = 0 
}: { 
  direction?: "down" | "up" | "split";
  color?: string;
  paths?: number;
  delay?: number;
}) {
  const getPathD = (index: number) => {
    if (direction === "down") {
      if (paths === 3) {
        const positions = ["M150,0 L50,45", "M150,0 L150,45", "M150,0 L250,45"];
        return positions[index] || positions[0];
      }
      return index === 0 ? "M150,0 L90,45" : "M150,0 L210,45";
    } else if (direction === "up") {
      const positions = ["M50,5 L150,45", "M150,5 L150,45", "M250,5 L150,45"];
      return positions[index] || positions[0];
    } else {
      return index === 0 ? "M90,5 L90,45" : "M210,5 L210,45";
    }
  };

  return (
    <div className="h-[50px] w-full flex justify-center overflow-visible">
      <svg
        viewBox="0 0 300 50"
        preserveAspectRatio="none"
        className="w-full max-w-[300px] h-[50px] overflow-visible"
      >
        <defs>
          <marker
            id={`arrow-${color.replace('#', '')}-${direction}`}
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill={color} />
          </marker>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {Array.from({ length: paths }).map((_, i) => (
          <path
            key={i}
            d={getPathD(i)}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            className="animated-flow-path"
            style={{ 
              animationDelay: `${delay + i * 0.15}s`,
              filter: "url(#glow)"
            }}
            markerEnd={`url(#arrow-${color.replace('#', '')}-${direction})`}
          />
        ))}
      </svg>
    </div>
  );
}

// Animated Card Component
function AnimatedCard({ 
  children, 
  delay = 0,
  hoverEffect = true,
  glowColor = "#5BF731",
  className = ""
}: { 
  children: React.ReactNode;
  delay?: number;
  hoverEffect?: boolean;
  glowColor?: string;
  className?: string;
}) {
  return (
    <div 
      className={`
        animated-card
        bg-[rgba(255,255,255,0.03)] 
        border border-[rgba(255,255,255,0.08)] 
        rounded-xl p-4
        transition-all duration-300 ease-out
        ${hoverEffect ? 'hover:scale-[1.02] hover:border-opacity-30' : ''}
        ${className}
      `}
      style={{ 
        animationDelay: `${delay}s`,
        '--glow-color': glowColor
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

// Pulsing Dot Component
function PulsingDot({ color = "#5BF731", size = 8 }: { color?: string; size?: number }) {
  return (
    <span className="relative inline-flex">
      <span 
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{ backgroundColor: color }}
      />
      <span 
        className="relative inline-flex rounded-full"
        style={{ backgroundColor: color, width: size, height: size }}
      />
    </span>
  );
}

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("active");
          const id = element.getAttribute('data-reveal-id');
          if (id) {
            setIsVisible(prev => ({ ...prev, [id]: true }));
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", reveal);
    reveal();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", reveal);
    };
  }, []);

  return (
    <>
      <NetworkCanvas />

      <nav className="fixed top-0 left-0 right-0 z-1000 px-8 md:px-16 py-4 md:py-6 flex justify-between items-center bg-[rgba(5,5,5,0.8)] backdrop-blur-[20px] border-b border-[rgba(91,247,49,0.1)]">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <span className="font-bold text-2xl tracking-tight">rigorus</span>
        </div>
        <ul className="hidden md:flex gap-12 list-none">
          <li>
            <a
              href="#modes"
              className="text-[rgba(255,255,255,0.7)] no-underline text-[0.95rem] font-medium transition-colors hover:text-[#5BF731]"
            >
              Modes
            </a>
          </li>
          <li>
            <a
              href="#capabilities"
              className="text-[rgba(255,255,255,0.7)] no-underline text-[0.95rem] font-medium transition-colors hover:text-[#5BF731]"
            >
              Capabilities
            </a>
          </li>
        </ul>
        <Link
          href="/dashboard"
          className="bg-[#5BF731] text-[#050505] px-6 md:px-8 py-3 md:py-3.5 rounded-full no-underline font-semibold text-[0.9rem] md:text-[0.95rem] transition-all hover:translate-y-[-2px] hover:shadow-[0_10px_40px_rgba(91,247,49,0.3)]"
        >
          Get Early Access
        </Link>
      </nav>

      <main className="relative z-1">
        {/* Hero Section */}
        <section
          className="min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-8 pt-32 pb-16 relative"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <span className="inline-flex items-center gap-3 px-5 py-2 mb-8 text-[0.85rem] text-[#5BF731] bg-[rgba(91,247,49,0.03)] backdrop-blur-[10px] border border-[rgba(91,247,49,0.15)] rounded-2xl animate-fadeInUp">
            <PulsingDot color="#5BF731" size={8} />
            AI-Powered Decision Making
          </span>

          <h1 className="font-[Instrument_Serif] text-[clamp(3rem,10vw,8rem)] font-normal leading-[1.05] mb-6 tracking-[-0.03em] opacity-0 animate-fadeInUp animation-delay-100 animation-fill-forwards">
            Stop thinking <span className="text-[#5BF731] italic">alone.</span>
          </h1>

          <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] text-[rgba(255,255,255,0.7)] max-w-[600px] mb-12 font-normal opacity-0 animate-fadeInUp animation-delay-200 animation-fill-forwards">
            Pressure-test your startup&apos;s decisions with an AI board of
            directors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fadeInUp animation-delay-300 animation-fill-forwards">
            <Link
              href="/dashboard"
              className="bg-[#5BF731] text-[#050505] px-8 py-3.5 rounded-full no-underline font-semibold text-[0.95rem] transition-all hover:translate-y-[-2px] hover:shadow-[0_10px_40px_rgba(91,247,49,0.3)]"
            >
              Start Free Trial
            </Link>
            <a
              href="#modes"
              className="bg-transparent border border-[#5BF731] text-[#5BF731] px-8 py-3.5 rounded-full no-underline font-semibold text-[0.95rem] transition-all hover:bg-[#5BF731] hover:text-[#050505]"
            >
              See How It Works
            </a>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[rgba(255,255,255,0.4)] text-[0.8rem] animate-bounce">
            <svg
              className="w-6 h-6 stroke-[rgba(255,255,255,0.4)]"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </section>

        {/* Modes Intro */}
        <section id="modes" className="py-20 md:py-32 px-6 md:px-16 max-w-[1400px] mx-auto">
          <div className="text-center mb-16 md:mb-20 reveal" data-reveal-id="modes-intro">
            <span className="text-[#5BF731] text-[0.85rem] font-semibold uppercase tracking-[0.15em] mb-4 block">
              Thinking Modes
            </span>
            <h2 className="font-[Instrument_Serif] text-[clamp(2rem,5vw,4rem)] font-normal mb-6 tracking-[-0.02em]">
              Three ways to pressure-test your ideas
            </h2>
            <p className="text-[rgba(255,255,255,0.7)] max-w-[600px] mx-auto text-[1rem] md:text-[1.1rem]">
              Each mode is designed to surface blind spots and strengthen your
              decision-making through rigorous AI-powered analysis.
            </p>
          </div>
        </section>

        {/* Mode 1: Multimodel Perspective */}
        <section className="py-16 md:py-24 px-6 md:px-16 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-center reveal" data-reveal-id="mode-1">
            <div>
              <span className="font-[Instrument_Serif] text-[3rem] md:text-[4rem] text-[#5BF731] opacity-20 block leading-none mb-4">
                01
              </span>
              <h3 className="font-[Instrument_Serif] text-[clamp(1.8rem,4vw,3rem)] font-normal mb-6 tracking-[-0.02em]">
                Multimodel Perspective
              </h3>
              <p className="text-[rgba(255,255,255,0.7)] text-[1rem] md:text-[1.15rem] leading-[1.8] mb-8">
                Pose the same question to multiple AI models simultaneously and
                discover where they agree—and crucially, where they don&apos;t.
              </p>
              <ul className="list-none">
                {[
                  "Question posed to multiple models",
                  "Each model provides unique perspective",
                  "Synthesizer identifies consensus & divergence",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-[rgba(255,255,255,0.4)] text-[0.95rem] md:text-[1rem] mb-3 pl-7 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:rounded-full before:bg-[#5BF731]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Interactive Visualization - Mode 1 */}
            <div className="visualization-container bg-[rgba(10,10,10,0.6)] backdrop-blur-[30px] border border-[rgba(91,247,49,0.2)] rounded-3xl p-6 md:p-10 min-h-[500px] flex items-center justify-center relative overflow-hidden group">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(91,247,49,0.08),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="w-full flex flex-col gap-3 relative z-10">
                {/* Question Bubble */}
                <div className="question-bubble bg-[rgba(91,247,49,0.1)] border border-[rgba(91,247,49,0.3)] rounded-xl p-5 text-center relative overflow-hidden group/q hover:border-[rgba(91,247,49,0.5)] transition-all duration-300">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(91,247,49,0.05),transparent)] -translate-x-full group-hover/q:translate-x-full transition-transform duration-1000" />
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <PulsingDot color="#5BF731" size={6} />
                    <span className="text-[0.7rem] uppercase tracking-wider text-[#5BF731] font-semibold">
                      Your Question
                    </span>
                  </div>
                  <p className="text-[0.95rem] text-white font-medium">
                    &quot;Should we expand to Europe?&quot;
                  </p>
                </div>

                {/* Animated Flow Lines Down */}
                <AnimatedFlowLines direction="down" color="#5BF731" paths={3} delay={0.2} />

                {/* Model Responses */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: "GPT-4", response: "Yes, but start with UK...", icon: "🤖" },
                    { name: "Claude", response: "Consider GDPR costs first...", icon: "🧠" },
                    { name: "Gemini", response: "Germany has highest TAM...", icon: "✨" },
                  ].map((model, i) => (
                    <AnimatedCard key={i} delay={0.3 + i * 0.1} glowColor="#5BF731">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{model.icon}</span>
                        <span className="text-[0.75rem] font-bold text-[#5BF731] uppercase tracking-wide">
                          {model.name}
                        </span>
                      </div>
                      <p className="text-[0.8rem] text-[rgba(255,255,255,0.7)] leading-relaxed">
                        &quot;{model.response}&quot;
                      </p>
                    </AnimatedCard>
                  ))}
                </div>

                {/* Animated Flow Lines Up */}
                <AnimatedFlowLines direction="up" color="#5BF731" paths={3} delay={0.6} />

                {/* Synthesis Box */}
                <div className="synthesis-box bg-[linear-gradient(135deg,rgba(91,247,49,0.15),rgba(91,247,49,0.02))] border border-[rgba(91,247,49,0.3)] rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[linear-gradient(90deg,transparent,#5BF731,transparent)] animate-shimmer" />
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">⚡</span>
                    <span className="text-[0.8rem] font-bold text-[#5BF731] uppercase tracking-wider">
                      Synthesis
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[rgba(91,247,49,0.1)] p-4 rounded-lg border border-[rgba(91,247,49,0.2)] hover:border-[rgba(91,247,49,0.4)] transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#5BF731]" />
                        <span className="text-[0.65rem] uppercase tracking-wider text-[#5BF731] font-semibold">
                          Consensus
                        </span>
                      </div>
                      <p className="text-[0.85rem] text-[rgba(255,255,255,0.8)]">
                        Europe viable, timing is key
                      </p>
                    </div>
                    <div className="bg-[rgba(247,49,76,0.1)] p-4 rounded-lg border border-[rgba(247,49,76,0.2)] hover:border-[rgba(247,49,76,0.4)] transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#F7314C]" />
                        <span className="text-[0.65rem] uppercase tracking-wider text-[#F7314C] font-semibold">
                          Divergence
                        </span>
                      </div>
                      <p className="text-[0.85rem] text-[rgba(255,255,255,0.8)]">
                        Entry market selection
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mode 2: Critique Chain */}
        <section className="py-16 md:py-24 px-6 md:px-16 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center reveal" data-reveal-id="mode-2">
            {/* Interactive Visualization - Mode 2 */}
            <div className="visualization-container bg-[rgba(10,10,10,0.6)] backdrop-blur-[30px] border border-[rgba(247,49,76,0.2)] rounded-3xl p-6 md:p-10 min-h-[500px] flex items-center justify-center relative overflow-hidden group order-2 lg:order-1">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(247,49,76,0.06),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="w-full flex flex-col gap-3 relative z-10">
                {/* Primary Response */}
                <div className="primary-response bg-[rgba(91,247,49,0.1)] border border-[rgba(91,247,49,0.3)] rounded-xl p-5 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[linear-gradient(90deg,transparent,#5BF731,transparent)] animate-shimmer" />
                  <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-wider text-[#050505] bg-[#5BF731] px-3 py-1.5 rounded-full mb-3">
                    <span>🧠</span>
                    Claude 3.5
                  </span>
                  <span className="text-[0.7rem] uppercase tracking-wider text-[#5BF731] block mb-2 opacity-70 font-medium">
                    Primary Analysis
                  </span>
                  <p className="text-[0.95rem] text-white font-medium">
                    &quot;Freemium model will maximize growth...&quot;
                  </p>
                </div>

                {/* Flow Lines Down (Red) */}
                <AnimatedFlowLines direction="down" color="#F7314C" paths={3} delay={0.2} />

                {/* Critiques */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { model: "GPT-4", dimension: "Financial", critique: "CAC may exceed LTV...", icon: "💰" },
                    { model: "Gemini", dimension: "Strategic", critique: "Devalues premium tier...", icon: "🎯" },
                    { model: "Llama 3", dimension: "Operational", critique: "Support costs scale...", icon: "⚙️" },
                  ].map((item, i) => (
                    <AnimatedCard 
                      key={i} 
                      delay={0.3 + i * 0.1} 
                      glowColor="#F7314C"
                      className="border-t-2 border-t-[#F7314C]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold uppercase tracking-wider text-[#050505] bg-[#F7314C] px-2 py-1 rounded">
                          {item.model}
                        </span>
                        <span className="text-base">{item.icon}</span>
                      </div>
                      <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.4)] block mb-2">
                        {item.dimension}
                      </span>
                      <p className="text-[0.8rem] text-[rgba(255,255,255,0.7)] leading-relaxed">
                        &quot;{item.critique}&quot;
                      </p>
                    </AnimatedCard>
                  ))}
                </div>

                {/* Flow Lines Up (Green) */}
                <AnimatedFlowLines direction="up" color="#5BF731" paths={3} delay={0.6} />

                {/* Key Insights */}
                <div className="insights-box bg-[linear-gradient(135deg,rgba(91,247,49,0.15),rgba(91,247,49,0.02))] border border-[rgba(91,247,49,0.3)] rounded-xl p-5 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[linear-gradient(90deg,transparent,#5BF731,transparent)] animate-shimmer" />
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-xl">⚡</span>
                    <span className="text-[0.8rem] font-bold text-[#5BF731] uppercase tracking-wider">
                      Key Insights
                    </span>
                  </div>
                  <p className="text-[0.95rem] text-white font-medium">
                    Consider usage-based pricing as alternative
                  </p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="font-[Instrument_Serif] text-[3rem] md:text-[4rem] text-[#5BF731] opacity-20 block leading-none mb-4">
                02
              </span>
              <h3 className="font-[Instrument_Serif] text-[clamp(1.8rem,4vw,3rem)] font-normal mb-6 tracking-[-0.02em]">
                Critique Chain
              </h3>
              <p className="text-[rgba(255,255,255,0.7)] text-[1rem] md:text-[1.15rem] leading-[1.8] mb-8">
                Get a primary perspective, then let multiple AI critics
                stress-test it from every angle before synthesis.
              </p>
              <ul className="list-none">
                {[
                  "Primary model provides initial perspective",
                  "Multiple models critique systematically",
                  "Key insights synthesized across dimensions",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-[rgba(255,255,255,0.4)] text-[0.95rem] md:text-[1rem] mb-3 pl-7 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:rounded-full before:bg-[#5BF731]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Mode 3: Pre-Mortem */}
        <section className="py-16 md:py-24 px-6 md:px-16 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-center reveal" data-reveal-id="mode-3">
            <div>
              <span className="font-[Instrument_Serif] text-[3rem] md:text-[4rem] text-[#5BF731] opacity-20 block leading-none mb-4">
                03
              </span>
              <h3 className="font-[Instrument_Serif] text-[clamp(1.8rem,4vw,3rem)] font-normal mb-6 tracking-[-0.02em]">
                Pre-Mortem
              </h3>
              <p className="text-[rgba(255,255,255,0.7)] text-[1rem] md:text-[1.15rem] leading-[1.8] mb-8">
                Imagine your plan has already failed. Identify every way it
                could go wrong, then build your corrective playbook.
              </p>
              <ul className="list-none">
                {[
                  "Two models identify failure scenarios",
                  "Two models propose corrective actions",
                  "Complete risk mitigation strategy",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-[rgba(255,255,255,0.4)] text-[0.95rem] md:text-[1rem] mb-3 pl-7 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:rounded-full before:bg-[#5BF731]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Interactive Visualization - Mode 3 */}
            <div className="visualization-container bg-[rgba(10,10,10,0.6)] backdrop-blur-[30px] border border-[rgba(91,247,49,0.2)] rounded-3xl p-6 md:p-10 min-h-[550px] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(247,49,76,0.05),transparent_40%),radial-gradient(circle_at_50%_70%,rgba(49,168,247,0.05),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="w-full flex flex-col gap-3 relative z-10">
                {/* Plan Question */}
                <div className="plan-bubble bg-[rgba(91,247,49,0.1)] border border-[rgba(91,247,49,0.3)] rounded-xl p-4 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[linear-gradient(90deg,transparent,#5BF731,transparent)] animate-shimmer" />
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg">📋</span>
                    <span className="text-[0.7rem] uppercase tracking-wider text-[#5BF731] font-semibold">
                      Your Plan
                    </span>
                  </div>
                  <p className="text-[0.95rem] text-white font-medium">
                    &quot;Launch enterprise tier in Q2&quot;
                  </p>
                </div>

                {/* Flow to Red Team */}
                <AnimatedFlowLines direction="down" color="#F7314C" paths={2} delay={0.2} />

                {/* Red Team */}
                <div className="red-team">
                  <div className="flex items-center justify-center gap-2 mb-3 px-4 py-2.5 rounded-lg bg-[rgba(247,49,76,0.15)] border border-[rgba(247,49,76,0.3)]">
                    <span className="text-lg">🔴</span>
                    <span className="text-[0.75rem] font-bold uppercase tracking-wider text-[#F7314C]">
                      Red Team — Failure Analysis
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { model: "GPT-4", risks: [
                        { level: "High", text: "Key hire leaves at launch" },
                        { level: "Med", text: "Sales team not trained" }
                      ]},
                      { model: "Claude", risks: [
                        { level: "High", text: "Infrastructure can't scale" },
                        { level: "Med", text: "Competitor undercuts price" }
                      ]}
                    ].map((item, i) => (
                      <AnimatedCard 
                        key={i} 
                        delay={0.3 + i * 0.1} 
                        glowColor="#F7314C"
                        className="border-t-2 border-t-[#F7314C]"
                      >
                        <span className="inline-block text-[0.6rem] font-bold uppercase tracking-wider text-[#050505] bg-[#F7314C] px-2 py-1 rounded mb-3">
                          {item.model}
                        </span>
                        <div className="flex flex-col gap-2">
                          {item.risks.map((risk, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <span className={`text-[0.55rem] font-bold uppercase px-2 py-0.5 rounded shrink-0 mt-0.5 ${
                                risk.level === 'High' 
                                  ? 'bg-[rgba(247,49,76,0.25)] text-[#F7314C]' 
                                  : 'bg-[rgba(247,198,49,0.25)] text-[#F7C631]'
                              }`}>
                                {risk.level}
                              </span>
                              <p className="text-[0.75rem] text-[rgba(255,255,255,0.7)] leading-tight">
                                {risk.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </AnimatedCard>
                    ))}
                  </div>
                </div>

                {/* Flow to Blue Team */}
                <AnimatedFlowLines direction="split" color="#31A8F7" paths={2} delay={0.5} />

                {/* Blue Team */}
                <div className="blue-team">
                  <div className="flex items-center justify-center gap-2 mb-3 px-4 py-2.5 rounded-lg bg-[rgba(49,168,247,0.15)] border border-[rgba(49,168,247,0.3)]">
                    <span className="text-lg">🔵</span>
                    <span className="text-[0.75rem] font-bold uppercase tracking-wider text-[#31A8F7]">
                      Blue Team — Corrective Actions
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { model: "Gemini", actions: [
                        "Document & cross-train team",
                        "Run sales enablement bootcamp"
                      ]},
                      { model: "Llama 3", actions: [
                        "Load test at 10x capacity",
                        "Build moat via integrations"
                      ]}
                    ].map((item, i) => (
                      <AnimatedCard 
                        key={i} 
                        delay={0.6 + i * 0.1} 
                        glowColor="#31A8F7"
                        className="border-t-2 border-t-[#31A8F7]"
                      >
                        <span className="inline-block text-[0.6rem] font-bold uppercase tracking-wider text-[#050505] bg-[#31A8F7] px-2 py-1 rounded mb-3">
                          {item.model}
                        </span>
                        <div className="flex flex-col gap-2">
                          {item.actions.map((action, j) => (
                            <p key={j} className="text-[0.75rem] text-[#5BF731] leading-tight flex items-start gap-2">
                              <span className="text-[#5BF731]">✓</span>
                              {action}
                            </p>
                          ))}
                        </div>
                      </AnimatedCard>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section
          id="capabilities"
          className="py-20 md:py-32 px-6 md:px-16 max-w-[1400px] mx-auto"
        >
          <div className="text-center mb-16 md:mb-20 reveal" data-reveal-id="capabilities">
            <span className="text-[#5BF731] text-[0.85rem] font-semibold uppercase tracking-[0.15em] mb-4 block">
              Capabilities
            </span>
            <h2 className="font-[Instrument_Serif] text-[clamp(2rem,5vw,4rem)] font-normal mb-6 tracking-[-0.02em]">
              Built for serious thinkers
            </h2>
            <p className="text-[rgba(255,255,255,0.7)] max-w-[600px] mx-auto text-[1rem] md:text-[1.1rem]">
              The infrastructure you need to make decisions with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "Multiple Models",
                desc: "One-click access to all the best AI models. GPT-4, Claude, Gemini, and more orchestrated together for comprehensive analysis.",
                icon: "🤖"
              },
              {
                title: "Persistent Context",
                desc: "Your context is retained across all models, enabling deeper understanding and more coherent decision-making over time.",
                icon: "🧠"
              },
              {
                title: "Multi-Turn Conversations",
                desc: "Go deep. Follow threads, ask follow-ups, and explore nuances across extended conversations with your AI board.",
                icon: "💬"
              },
              {
                title: "Project Oriented",
                desc: "Context maintained at the project level. Run multiple parallel discussions while keeping deep context for each initiative.",
                icon: "📁"
              },
            ].map((cap, i) => (
              <div
                key={i}
                className="capability-card bg-[rgba(255,255,255,0.02)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8 flex gap-5 transition-all duration-300 hover:border-[rgba(91,247,49,0.3)] hover:bg-[rgba(91,247,49,0.02)] group reveal"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 min-w-14 rounded-xl bg-[rgba(91,247,49,0.1)] flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-[rgba(91,247,49,0.2)] transition-all duration-300">
                  {cap.icon}
                </div>
                <div>
                  <h3 className="text-[1.2rem] mb-2 font-semibold text-white group-hover:text-[#5BF731] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-[rgba(255,255,255,0.6)] text-[0.95rem] leading-[1.7]">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-28 md:py-40 px-6 md:px-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[radial-gradient(circle,rgba(91,247,49,0.12),transparent_60%)] pointer-events-none animate-pulse-slow" />
          <h2 className="font-[Instrument_Serif] text-[clamp(2rem,5vw,4.5rem)] mb-6 relative reveal">
            Ready to think <span className="text-[#5BF731] italic">better?</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.7)] text-[1.1rem] md:text-[1.25rem] mb-10 relative reveal">
            Join founders who think rigorously.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-[#5BF731] text-[#050505] px-10 py-4 rounded-full no-underline font-bold text-[1rem] transition-all hover:translate-y-[-3px] hover:shadow-[0_15px_50px_rgba(91,247,49,0.4)] reveal"
          >
            Get Early Access
          </Link>
        </section>
      </main>

      <footer className="py-10 md:py-12 px-6 md:px-16 border-t border-[rgba(91,247,49,0.1)] flex flex-col md:flex-row justify-between items-center gap-4 relative z-1">
        <p className="text-[rgba(255,255,255,0.4)] text-[0.9rem]">
          © 2026 Rigorus. All rights reserved.
        </p>
        <div className="flex gap-6 md:gap-8">
          <a
            href="#"
            className="text-[rgba(255,255,255,0.6)] no-underline text-[0.9rem] transition-colors hover:text-[#5BF731]"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-[rgba(255,255,255,0.6)] no-underline text-[0.9rem] transition-colors hover:text-[#5BF731]"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-[rgba(255,255,255,0.6)] no-underline text-[0.9rem] transition-colors hover:text-[#5BF731]"
          >
            Contact
          </a>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes flowPath {
          0% {
            stroke-dashoffset: 100;
            opacity: 0;
          }
          30% {
            opacity: 0.8;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.05); }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        .animated-flow-path {
          stroke-dasharray: 8 6;
          stroke-dashoffset: 100;
          animation: flowPath 1.2s ease-out forwards;
          filter: drop-shadow(0 0 4px currentColor);
        }

        .animated-card {
          opacity: 0;
          transform: translateY(15px);
          animation: fadeInUp 0.5s ease-out forwards;
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal.active .animated-card,
        .reveal.active .animated-flow-path {
          animation-play-state: running;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-fill-forwards {
          animation-fill-mode: forwards;
        }

        .visualization-container:hover .animated-flow-path {
          filter: drop-shadow(0 0 8px currentColor);
        }
      `}</style>
    </>
  );
}
