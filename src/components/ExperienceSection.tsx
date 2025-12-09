import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'DevOps Engineer',
    company: 'Wimslab',
    period: 'Present',
    description: [
      'Designed and maintained CI/CD pipelines using Jenkins and GitHub Actions for seamless deployments.',
      'Automated build, test, and deployment workflows with Docker and Kubernetes.',
      'Monitored and optimized cloud performance using Grafana and Prometheus to ensure high system availability.',
      'Implemented Infrastructure as Code (IaC) with Terraform to streamline and scale server provisioning.',
    ],
  },
  {
    title: 'SEO Specialist and Digital Marketer',
    company: 'Mindrisers (Internship)',
    period: '2024',
    description: [
      'Achieved top ranking record in SEO advertising the Flutter Course within 5 days of blog publication.',
      'Developed interactive themes and content strategy for the organization.',
      'Demonstrated leadership qualities while still a student.',
    ],
  },
  {
    title: 'Lead Customer Service Representative',
    company: 'Foodmandu',
    period: '2023 – 2024',
    description: [
      'Leveraged analytical skills to optimize processes and ensure data-backed solutions.',
      'Transformed QA judging strategy boosting customer satisfaction through data analysis.',
      'Motivated and guided team, fostering a collaborative and high-performing environment.',
    ],
  },
  {
    title: 'Customer Service Representative',
    company: 'Bhojdeals',
    period: '2021 – 2022',
    description: [
      'Resolved complex customer inquiries and complaints, ensuring timely and positive resolutions.',
      'Managed and motivated a team of customer service representatives.',
      'De-escalated challenging situations with empathy and professionalism.',
    ],
  },
];

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Career Journey
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            Professional Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey from customer service to DevOps engineering.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 border-4 border-background z-10" />

              {/* Content Card */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-xl p-6 hover-lift"
                >
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{exp.period}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Briefcase className="w-4 h-4" />
                    <span>{exp.company}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
