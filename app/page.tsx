'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import TypeWriter from "./components/TypeWriter";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 via-cyan-500/10 to-emerald-500/10 animate-gradient-slow" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl font-bold tracking-tight sm:text-6xl bg-linear-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent"
            animate={{ 
              backgroundImage: [
                "linear-gradient(to right, #22d3ee, #a855f7, #10b981)",
                "linear-gradient(to right, #10b981, #22d3ee, #a855f7)",
                "linear-gradient(to right, #a855f7, #10b981, #22d3ee)",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            BrainRot
          </motion.h1>
          <TypeWriter 
            texts={[
              "Train your brain. Enhance your memory. Stay sharp.",
              "Challenge yourself with memory exercises.",
              "Build better cognitive abilities daily.",
              "Learn, adapt, and grow stronger.",
              "Your journey to mental fitness starts here."
            ]}
            className="mt-6 text-lg leading-8 text-gray-300"
            typingSpeed={40}
            erasingSpeed={20}
            delayBetweenTexts={2500}
          />
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Memory Training Card */}
          <motion.div variants={item}>
            <Link 
              href="/features/memory-training" 
              className="group relative block rounded-2xl bg-zinc-900/80 p-6 
                       hover:bg-zinc-800/90 transition-all duration-500 
                       border border-zinc-800/50 backdrop-blur-sm
                       hover:border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                  Memory Training
                </h3>
                <p className="mt-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Challenge your recall with text and audio exercises
                </p>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-500/0 via-purple-500/0 to-cyan-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Link>
          </motion.div>

          {/* Sentence Construction Card */}
          <motion.div variants={item}>
            <Link 
              href="/features/sentence-builder" 
              className="group relative block rounded-2xl bg-zinc-900/80 p-6 
                       hover:bg-zinc-800/90 transition-all duration-500 
                       border border-zinc-800/50 backdrop-blur-sm
                       hover:border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                  Sentence Builder
                </h3>
                <p className="mt-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Arrange words to form meaningful sentences
                </p>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-purple-500/0 via-cyan-500/0 to-purple-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Link>
          </motion.div>

          {/* Visual Memory Card */}
          <motion.div variants={item}>
            <Link 
              href="/features/visual-memory" 
              className="group relative block rounded-2xl bg-zinc-900/80 p-6 
                       hover:bg-zinc-800/90 transition-all duration-500 
                       border border-zinc-800/50 backdrop-blur-sm
                       hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                  Visual Memory
                </h3>
                <p className="mt-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Test your ability to remember visual details
                </p>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-emerald-500/0 via-cyan-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Link>
          </motion.div>

          {/* Interactive Stories Card */}
          <motion.div variants={item}>
            <Link 
              href="/features/story-time" 
              className="group relative block rounded-2xl bg-zinc-900/80 p-6 
                       hover:bg-zinc-800/90 transition-all duration-500 
                       border border-zinc-800/50 backdrop-blur-sm
                       hover:border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                  Story Time
                </h3>
                <p className="mt-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Engage with interactive narratives
                </p>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-500/0 via-purple-500/0 to-cyan-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
