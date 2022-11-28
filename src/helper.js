export const CSS_HELPER = {
  input: { margin: "25px 0", color: "grey" },
  button: { width: "100%", margin: "10px 0px", height: "45px" },
  blackButton: { backgroundColor: "#000", color: "#ffff" },
  createButton: { margin: "3rem auto" }
}

export const checkIsBlogLiked = (likedByArr) => {
  const currentUserId = localStorage.getItem("userId");
  if (
    likedByArr &&
    currentUserId &&
    likedByArr.length !== 0 &&
    likedByArr.includes(currentUserId)
  ) {
    return true;
  }
  return false;
};

export const FILTERS = {
  ALL_BLOGS: "All Blogs",
  FAVOURITES: "Favourites",
  YOUR_BLOGS: "Your Blogs"
}

export const BASE_API_URL = `http://3.134.99.57/v1`;