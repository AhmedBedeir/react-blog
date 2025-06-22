import { Link } from "react-router";
import defaultImg from "../assets/images/defaultBlogImg.webp";
import React, { useState } from "react";

const Hero = () => {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <section className="relative isolate overflow-hidden mt-35">
      {/* Futuristic grid background */}

      <div className="mx-auto lg:flex lg:items-center lg:gap-x-10 justify-between">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto ">
          {/* Tech badge */}
          <div className="mb-8 flex items-center gap-x-4">
            <div className="flex items-center gap-2 relative z-10 rounded-full bg-indigo-600/10 px-3 py-1.5 text-sm font-medium leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/30 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                />
              </svg>
              Latest in Tech
            </div>
          </div>

          {/* Main heading with tech vibe */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Decoding the{" "}
            <span className="relative whitespace-nowrap text-secondary-content">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full text-shape"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative">Future</span>
            </span>{" "}
            of Technology
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl leading-8 text-content">
            Cutting-edge tutorials, in-depth analysis, and the latest trends in
            AI, Web Development, and Cybersecurity. Stay ahead of the curve with
            our expert insights.
          </p>

          {/* CTA with tech icons */}
          <div className="mt-10 flex flex-col md:flex-row md:gap-y-0 gap-y-4 items-center gap-x-6">
            <Link
              to="/posts"
              className="group relative flex items-center gap-2 rounded-md bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Explore Articles
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
            <Link
              to="/"
              className="flex items-center text-sm font-semibold leading-6 text-content group"
            >
              <svg
                className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Join Tech Newsletter <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Tech stack logos */}
          <div className="mt-16">
            <h3 className="text-sm font-semibold text-content">FEATURED IN</h3>
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
              {[
                "React",
                "Next.js",
                "Tailwind CSS",
                "Node.js",
                "Python",
                "TensorFlow",
              ].map((tech) => (
                <div key={tech} className="flex items-center">
                  <span className="text-lg font-medium text-secondary-content  transition-colors">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech illustration placeholder - replace with your own */}
        <div className="mt-12 flex justify-center lg:mt-0 lg:flex-shrink-0 lg:justify-end lg:items-center lg:w-[420px] xl:w-[500px] relative">
          {imgLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10 rounded-lg">
              <div className="skeleton w-full h-full"></div>
            </div>
          )}
          <img
            src={defaultImg}
            alt="Tech illustration"
            width={500}
            height={400}
            className="w-full sm:max-w-sm md:max-w-md lg:max-w-full rounded-lg shadow-lg object-cover fade-in"
            onLoad={() => setImgLoading(false)}
            style={imgLoading ? { visibility: "hidden" } : {}}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
