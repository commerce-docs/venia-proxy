const DEFAULT_CATEGORY_LEVEL = "2";
const CATEGORIES_QUERY = `
  query ProductCategories($categoryLevel: String!) {
    categories(filters: { parent_id: { eq: $categoryLevel } }, currentPage: 1) {
      total_count
      items {
        uid
        level
        name
        path
        image
        children_count
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
`;

// Build the API endpoint
const buildApiEndpoint = (mode, hostname) => {
  const protocol = mode === "production" ? "https" : "http";
  return `${protocol}://${hostname}:3002`;
};

// Fetch product categories from venia.magento.com
const fetchCategories = async (categoryLevel = DEFAULT_CATEGORY_LEVEL) => {
  const { MODE: mode } = import.meta.env;
  const { hostname } = window.location;

  const apiEndpoint = buildApiEndpoint(mode, hostname);

  console.log(`🚀 Running in ${mode} mode on ${apiEndpoint}`);

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "X-Custom-Hostname": hostname,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: CATEGORIES_QUERY,
        variables: { categoryLevel },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data?.categories?.items;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export default fetchCategories;
