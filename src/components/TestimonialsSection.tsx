import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import ayushImg from '@/assets/ayush.png';
import pramodImg from '@/assets/pramod.png';
import mingmaImg from '@/assets/mingma.png';
import bipinImg from '@/assets/bipin.png';

const testimonials = [
  {
    id: 1,
    name: 'Ayush Neupane',
    role: 'Software Developer',
    company: 'Tech Innovators',
    content: 'Suraj transformed our deployment process completely. What used to take hours now happens in minutes with zero downtime. His expertise in Kubernetes is unmatched.',
    image: ayushImg,
  },
  {
    id: 2,
    name: 'Pramod Gurung',
    role: 'Engineering Manager',
    company: 'CloudScale Nepal',
    content: 'Working with Suraj on our cloud infrastructure was a game-changer. He helped us reduce costs significantly while improving performance. Highly recommended!',
    image: pramodImg,
  },
  {
    id: 3,
    name: 'Mingma Sherpa',
    role: 'DevOps Lead',
    company: 'DataPrime',
    content: 'Suraj\'s approach to CI/CD automation saved our team countless hours. His documentation and knowledge transfer made adoption seamless.',
    image: mingmaImg,
  },
  {
    id: 4,
    name: 'Bipin Yogi',
    role: 'VP of Engineering',
    company: 'InnovateTech',
    content: 'The monitoring and observability stack Suraj implemented gave us visibility we never had before. Production issues are now caught before customers notice.',
    image: bipinImg,
  },
];

export const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            What People Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feedback from colleagues and clients I've had the pleasure of working with.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative glass-card rounded-2xl p-8 md:p-12">
            {/* Quote Icon */}
            <Quote className="absolute top-8 left-8 h-12 w-12 text-primary/20" />

            {/* Content */}
            <div className="relative min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1] // Custom bezier for smooth entrance
                  }}
                  className="text-center"
                >
                  <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
                    "{testimonials[current].content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-14 h-14 rounded-full overflow-hidden"
                    >
                      <img
                        src={testimonials[current].image}
                        alt={testimonials[current].name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </motion.div>
                    <div className="text-left">
                      <h4 className="font-medium text-foreground">
                        {testimonials[current].name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[current].role}, {testimonials[current].company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={prev}
                className="p-2 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
              >
                <ChevronLeft size={20} />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === current
                      ? 'bg-primary w-6'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={next}
                className="p-2 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
