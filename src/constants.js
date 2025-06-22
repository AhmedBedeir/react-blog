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
function timeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - new Date(date)) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}
export {
  containerStyle,
  badgeStyles,
  handleResponseError,
  Categories,
  estimateReadTime,
  testimonials,
  timeAgo,
};
