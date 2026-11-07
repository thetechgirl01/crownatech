import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Projects from '../components/Projects';
import Workprocess from '../components/WorkProcess';
import Contact from '../components/Contact';
import Blogs from './Blogs';
import { blogsApi } from '../api/blogs';
import SEO from '../components/common/SEO';

/**
 * Home page composition. Fetches the latest 4 published blog posts
 * for the "Latest Blogs" strip near the bottom — the same Blogs
 * component is reused in embedded mode (no filters / header).
 */
const Home = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    let alive = true;
    blogsApi
      .list()
      .then((res) => {
        if (!alive) return;
        const list = (res.data || []).slice(0, 4);
        setRecentBlogs(list);
      })
      .catch(() => alive && setRecentBlogs([]));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <SEO
        title="Creative Tech Solutions For Your Digital Success"
        description="CrownaTech delivers creative & innovative web solutions to help your business succeed in the digital world."
        keywords="crownatech, crowna, tech, web dev in Nigeria, tech in nigeria, web design, web development, digital marketing, creative solutions"
      />

      <div className="px- rounded-tr-3xl rounded-tl-3xl">
        <Hero />
      </div>

      <div className="px-9 bg-gray-900/95 border border-t border-l border-r border-white/20 rounded-tr-3xl rounded-tl-3xl">
        <Services />
      </div>

      <div className="px-9 bg-white border-t border-l border-r border-white/20 rounded-tr-3xl rounded-tl-3xl">
        <About />
      </div>

      <div className="px-9 bg-gray-900/95 border-t border-l border-r border-white/20 rounded-tr-3xl rounded-tl-3xl">
        <Projects />
      </div>

      <div className="px-9 bg-black border-t border-l border-r border-white/20 rounded-tr-3xl rounded-tl-3xl">
        <Workprocess />
      </div>

      <div className="px-9 bg-[#011936] border border-white/20 rounded-tr-3xl rounded-tl-3xl">
        <Contact />
      </div>

      {recentBlogs.length > 0 && (
        <div className="px-9 bg-gray-900/95 border border-white/20 rounded-tr-3xl rounded-tl-3xl py-12">
          <h2 className="text-3xl text-white font-bold mb-6 text-center">
            Latest Blogs
          </h2>

          <Blogs blogs={recentBlogs} showFilters={false} />

          <div className="text-center mt-10">
            <Link
              to="/blogs"
              className="ct-button ct-button-primary px-6 py-3 bg-yellow-400 rounded-xl text-black font-semibold hover:bg-yellow-500 transition"
            >
              View All Blogs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
