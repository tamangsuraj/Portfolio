import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = ['All', 'DevOps', 'Kubernetes', 'Cloud'];

const blogPosts = [
  {
    id: 1,
    title: 'Building a Production-Ready Kubernetes Cluster from Scratch',
    excerpt: 'A comprehensive guide to setting up Kubernetes with best practices for security, networking, and observability.',
    category: 'Kubernetes',
    date: 'Dec 5, 2025',
    readTime: '12 min read',
    color: 'from-primary/20 to-accent/20',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'GitOps: The Future of Infrastructure Management',
    excerpt: 'Learn how GitOps principles can transform your deployment workflow and improve team collaboration.',
    category: 'DevOps',
    date: 'Nov 28, 2025',
    readTime: '8 min read',
    color: 'from-orange-500/20 to-yellow-500/20',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Mastering Terraform: Advanced Patterns & Best Practices',
    excerpt: 'Deep dive into Terraform modules, state management, and strategies for managing complex infrastructure.',
    category: 'Cloud',
    date: 'Nov 15, 2025',
    readTime: '15 min read',
    color: 'from-purple-500/20 to-pink-500/20',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Zero-Downtime Deployments with Kubernetes',
    excerpt: 'Strategies and techniques for achieving zero-downtime deployments in Kubernetes environments.',
    category: 'Kubernetes',
    date: 'Nov 8, 2025',
    readTime: '10 min read',
    color: 'from-green-500/20 to-teal-500/20',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'Securing Your CI/CD Pipeline: A Complete Guide',
    excerpt: 'Essential security practices for protecting your CI/CD pipelines from common vulnerabilities.',
    category: 'DevOps',
    date: 'Oct 25, 2025',
    readTime: '11 min read',
    color: 'from-red-500/20 to-orange-500/20',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop&q=80',
  },
  {
    id: 6,
    title: 'Cost Optimization Strategies for AWS Infrastructure',
    excerpt: 'Practical tips and tools for reducing your AWS bill without compromising performance.',
    category: 'Cloud',
    date: 'Oct 12, 2025',
    readTime: '9 min read',
    color: 'from-blue-500/20 to-indigo-500/20',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&q=80',
  },
];

export const BlogSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredPosts = blogPosts.filter(
    (post) => activeFilter === 'All' || post.category === activeFilter
  );

  return (
    <section id="blog" className="py-24 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Blog
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            Latest Articles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and best practices from my experience in DevOps and cloud infrastructure.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? 'default' : 'outline'}
              onClick={() => setActiveFilter(category)}
              className="relative rounded-full px-6 overflow-hidden group"
            >
              {activeFilter === category && (
                <motion.div
                  layoutId="active-pill-blog"
                  className="absolute inset-0 bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-300 ${activeFilter === category ? 'text-primary-foreground' : 'group-hover:text-primary'}`}>
                {category}
              </span>
            </Button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                  delay: index * 0.05
                }}
                className="group glass-card rounded-2xl overflow-hidden hover-lift cursor-pointer border-border/40 hover:border-primary/40"
              >
                {/* Image */}
                <div className={`h-48 bg-gradient-to-br ${post.color} relative overflow-hidden`}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5 opacity-70">
                      <Calendar size={12} className="text-primary" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5 opacity-70">
                      <Clock size={12} className="text-primary" />
                      {post.readTime}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    {post.category}
                  </span>

                  <h3 className="font-heading text-lg font-bold mt-2 mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2 opacity-80">
                    {post.excerpt}
                  </p>

                  <motion.span
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight size={16} />
                  </motion.span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
