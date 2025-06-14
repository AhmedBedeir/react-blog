import { useState, useEffect, useRef } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router";
const SearchInput = ({ isDark, styles }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  const searchData = async (searchQuery) => {
    try {
      const response = await api.get(`/posts?title_like=${searchQuery}`, {
        params: {
          _limit: 5,
          _sort: "createdAt",
          _order: "desc",
        },
      });
      return response.data;
    } catch (err) {
      throw new Error("Failed to fetch search results", err);
    }
  };

  // Debounced search function
  useEffect(() => {
    if (query.trim().length > 0) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const searchResults = await searchData(query);
          setResults(searchResults);
          setShowResults(true);
        } catch (error) {
          console.error("Search error:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setResults([]);
      setShowResults(false);
      setIsLoading(false);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleResultClick = (item) => {
    // setQuery(item.title);
    setShowResults(false);
    navigate(`/post/${item.id}`, {
      state: { postId: item.id, postTitle: item.title },
    });
  };

  const getTypeIcon = () => {
    return (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    );
  };

  return (
    <div
      className={`${styles}`}
      ref={searchRef}
    >
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className={`h-5 w-5 transition-colors ${
              isDark
                ? "text-gray-400 group-focus-within:text-blue-400"
                : "text-gray-400 group-focus-within:text-blue-500"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>

        <input
          type="search"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.trim() && setShowResults(true)}
          className={`w-full pl-10 pr-4 py-2.5 border rounded-xl transition-all duration-200 ${
            isDark
              ? "border-gray-700 bg-gray-800/50 focus:bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              : "border-gray-200 bg-gray-50/50 focus:bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          } focus:outline-none`}
          placeholder="Search anything..."
        />

        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-y-0 right-8 pr-3 flex items-center">
            <span className="loading loading-dots loading-md text-blue-500"></span>
          </div>
        )}

        {/* Search Results Dropdown */}
        {showResults && !isLoading && (
          <div
            className={`absolute top-full left-0 right-0 mt-2 rounded-xl border shadow-lg z-50 ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            {results.length > 0 ? (
              <div className="py-2">
                {results.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleResultClick(item)}
                    className={`w-full px-4 py-3 flex items-start space-x-3 hover:transition-colors ${
                      isDark
                        ? "hover:bg-gray-700 text-white"
                        : "hover:bg-gray-50 text-gray-900"
                    } ${
                      index !== results.length - 1
                        ? isDark
                          ? "border-b border-gray-700"
                          : "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <div
                      className={`mt-0.5 ${
                        isDark ? "text-blue-400" : "text-blue-500"
                      }`}
                    >
                      {getTypeIcon()}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{item.title}</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div
                className={`px-4 py-6 text-center text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No results found for "{query}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
