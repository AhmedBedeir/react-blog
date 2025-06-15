const containerStyle =
  "container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-24 2xl:px-32";

const badgeStyles = [
  "badge-pink",
  "badge-blue",
  "badge-purple",
  "badge-green",
  "badge-red",
  "badge-yellow",
];

function estimateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

const Categories = [
  "JavaScript",
  "CSS",
  "React",
  "Node.js",
  "Python",
  "Design",
  "Web Development",
  "Mobile",
  "DevOps",
  "Database",
  "AI/ML",
  "Other",
];

const handleResponseError = (error) => {
  if (error.response) {
    return error.response.data;
  } else if (error.request) {
    return "Network error, please try again later.";
  } else {
    return "An unexpected error occurred.";
  }
};
const testimonials = [
  {
    quote:
      "This blog has completely changed how I approach my daily routine. The articles are insightful and practical.",
    author: "Sarah Johnson",
    role: "Regular Reader",
  },
  {
    quote:
      "I've learned so much from the technical deep dives. The explanations are clear even for beginners like me.",
    author: "Michael Chen",
    role: "Developer",
  },
  {
    quote:
      "The community around this blog is amazing. The discussions add so much value to the already great content.",
    author: "Emma Davis",
    role: "Community Member",
  },
];
export {
  containerStyle,
  badgeStyles,
  handleResponseError,
  Categories,
  estimateReadTime,
  testimonials,
};
