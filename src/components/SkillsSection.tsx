import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { name: 'Docker', level: 90, category: 'Containerization' },
  { name: 'Kubernetes', level: 85, category: 'Container Orchestration' },
  { name: 'Jenkins', level: 88, category: 'CI/CD' },
  { name: 'GitHub Actions', level: 85, category: 'CI/CD' },
  { name: 'Terraform', level: 82, category: 'Infrastructure as Code' },
  { name: 'AWS', level: 80, category: 'Cloud Platform' },
  { name: 'Python', level: 78, category: 'Programming' },
  { name: 'SQL', level: 75, category: 'Data & Analytics' },
];

const tools = [
  { name: 'Docker', icon: '🐳' },
  { name: 'Kubernetes', icon: '⎈' },
  { name: 'Jenkins', icon: '🔧' },
  { name: 'GitHub Actions', icon: '🔄' },
  { name: 'Grafana', icon: '📊' },
  { name: 'Prometheus', icon: '🔥' },
  { name: 'Python', icon: '🐍' },
  { name: 'JavaScript', icon: '⚡' },
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Skills & Expertise
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            Technical Proficiency
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive set of tools and technologies I use to build and maintain
            robust cloud infrastructure.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Skills Bars */}
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({skill.category})
                    </span>
                  </div>
                  <span className="text-sm text-primary font-medium">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, hsl(175 80% 50%) 0%, hsl(200 80% 50%) 100%)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tools Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-heading text-xl font-semibold mb-6 text-foreground">
              Tools & Technologies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card rounded-xl p-4 text-center cursor-pointer hover-lift"
                >
                  <span className="text-3xl mb-2 block">{tool.icon}</span>
                  <span className="text-sm font-medium text-foreground">{tool.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 p-6 glass-card rounded-xl"
            >
              <h4 className="font-medium text-foreground mb-3">Education</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  BSc (Hons) Computing - Herald College Kathmandu (2021-2025)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Digital Marketing Course - Mindrisers Institute (2024)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Science Stream - Herald Secondary School (3.25 GPA)
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
