import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Cloud, Server, GitBranch, Container } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.png';

const highlights = [
  { icon: Cloud, label: 'Cloud Architecture', desc: 'AWS, GCP, Azure' },
  { icon: Container, label: 'Containerization', desc: 'Docker, Kubernetes' },
  { icon: GitBranch, label: 'CI/CD Pipelines', desc: 'Jenkins, GitHub Actions' },
  { icon: Server, label: 'Infrastructure', desc: 'Terraform, Ansible' },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Wave Effect */}
      <div className="absolute inset-0 opacity-30">
        <svg
          className="absolute bottom-0 w-full h-64"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{ d: 'M0,320L48,304C96,288,192,256,288,234.7C384,213,480,203,576,213.3C672,224,768,256,864,266.7C960,277,1056,267,1152,250.7C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z' }}
            animate={{
              d: [
                'M0,320L48,304C96,288,192,256,288,234.7C384,213,480,203,576,213.3C672,224,768,256,864,266.7C960,277,1056,267,1152,250.7C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
                'M0,288L48,277.3C96,267,192,245,288,240C384,235,480,245,576,261.3C672,277,768,299,864,293.3C960,288,1056,256,1152,245.3C1248,235,1344,245,1392,250.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            fill="hsl(175 80% 50% / 0.05)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                style={{ transform: 'translate(20px, 20px)' }}
              />

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden glass-card">
                <div className="aspect-square bg-gradient-to-br from-secondary to-muted flex items-center justify-center p-4">
                  <img
                    src={profilePhoto}
                    alt="Suraj Tamang"
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Floating Badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl px-4 py-2 shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="text-sm font-medium text-foreground">3+ years experience</p>
                  <p className="text-xs text-muted-foreground">DevOps Engineer</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              About Me
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-6">
              Crafting Reliable Infrastructure & Automation
            </h2>

            <div className="space-y-4 text-muted-foreground mb-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              >
                I'm a DevOps Engineer passionate about building and automating scalable cloud
                infrastructure. With expertise in Kubernetes, CI/CD pipelines, and cloud platforms,
                I help teams deploy faster and more reliably.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
              >
                My approach combines technical excellence with a deep understanding of
                development workflows, ensuring that infrastructure supports rather than
                hinders innovation.
              </motion.p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.08, duration: 0.4, ease: "easeOut" }}
                  className="glass-card rounded-xl p-4 hover-lift"
                >
                  <item.icon className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium text-foreground">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
