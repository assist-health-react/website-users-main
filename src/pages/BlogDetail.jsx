import React from 'react';
import PropTypes from "prop-types";
import { motion } from 'framer-motion';
import { Button } from "../components/ui/button";
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // This would typically come from an API or database
  const blogPosts = {
    'healthcare-navigation': {
      title: "Understanding Healthcare Navigation: A Comprehensive Guide",
      image: "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/blog-1.jpg",
      author: "Dr. Rajesh Sharma",
      date: "March 15, 2024",
      category: "Healthcare",
      readTime: "5 min read",
      content: `
        <h2>Introduction to Healthcare Navigation</h2>
        <p>Healthcare navigation has become increasingly important in today's complex medical landscape. This comprehensive guide explores how healthcare navigation services can simplify your medical journey and improve your overall healthcare experience.</p>

        <h2>Why Healthcare Navigation Matters</h2>
        <p>In an increasingly complex healthcare system, having a dedicated navigator can make all the difference. Healthcare navigation services help patients:</p>
        <ul>
          <li>Understand their medical conditions and treatment options</li>
          <li>Coordinate care between multiple providers</li>
          <li>Manage appointments and follow-ups</li>
          <li>Handle insurance and billing issues</li>
          <li>Access the right care at the right time</li>
        </ul>

        <h2>Key Benefits of Healthcare Navigation</h2>
        <p>Professional healthcare navigation services offer numerous advantages:</p>
        <ul>
          <li>Reduced stress and anxiety</li>
          <li>Better health outcomes</li>
          <li>More efficient care coordination</li>
          <li>Cost savings through optimized care</li>
          <li>Improved patient satisfaction</li>
        </ul>

        <h2>How to Choose a Healthcare Navigator</h2>
        <p>When selecting a healthcare navigation service, consider:</p>
        <ul>
          <li>Experience and expertise</li>
          <li>Range of services offered</li>
          <li>Availability and accessibility</li>
          <li>Technology and tools used</li>
          <li>Cost and insurance coverage</li>
        </ul>

        <h2>The Future of Healthcare Navigation</h2>
        <p>As healthcare continues to evolve, navigation services will become even more essential. Technology integration, personalized care approaches, and expanded service offerings will shape the future of healthcare navigation.</p>
      `,
      relatedPosts: [
        {
          id: "digital-health-records",
          title: "The Importance of Digital Health Records Management",
          image: "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/blog-2.jpg"
        },
        {
          id: "preventive-care",
          title: "Preventive Care: The Key to Long-term Health",
          image: "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/blog-3.jpg"
        },
        {
          id: "family-health",
          title: "Managing Family Health: Tips and Best Practices",
          image: "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/blog-4.jpg"
        }
      ]
    }
    // Add more blog posts as needed
  };

  const post = blogPosts[id];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h2>
          <Button onClick={() => navigate('/blog')}>
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block bg-brand-blue text-white px-4 py-1 rounded-full text-sm mb-6">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-gray-600">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {post.readTime}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full rounded-xl shadow-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 pt-8 border-t"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Share2 className="w-5 h-5 mr-2 text-gray-600" />
                  <span className="text-gray-600">Share this article:</span>
                </div>
                <div className="flex gap-4">
                  <a
                    href={`https://facebook.com/share/url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-brand-blue"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-brand-blue"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://linkedin.com/shareArticle?url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-brand-blue"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Related Articles
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {post.relatedPosts.map((relatedPost, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => navigate(`/blog/${relatedPost.id}`)}
              >
                <div className="relative h-48">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {relatedPost.title}
                  </h3>
                  <Button
                    variant="link"
                    className="text-brand-blue hover:text-brand-blue/80 p-0"
                  >
                    Read More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail; 