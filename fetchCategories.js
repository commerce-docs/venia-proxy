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

// Fetch product categories from venia.magento.com
const fetchCategories = async (categoryLevel = '2') => {

  const { hostname } = window.location;
  const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT;
 
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
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
