import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { HeartOutlined, HeartFilled, DeleteOutlined } from "@ant-design/icons";
import { BsGrid, BsGridFill } from "react-icons/bs";
import { RiListCheck2 } from "react-icons/ri";
import { Empty, Select, Skeleton } from "antd";
import axiosService from "../../axiosService";
import { checkIsBlogLiked, FILTERS } from "../../helper";

const { Option } = Select;

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const filters = [FILTERS.ALL_BLOGS, FILTERS.FAVOURITES, FILTERS.YOUR_BLOGS];
  const [blogListLayout, setBlogListLayout] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(filters[0]);
  const currentUserRole = localStorage.getItem("userRole");
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const handleFavourite = async (blogId) => {
    try {
      const blogLikedRes = await axiosService.put(`/blog/likeBlog/${blogId}`);
      const blogAddedToFav = await axiosService.put(
        `/blog/addToFavourite/${blogId}`
      );
      if (blogLikedRes.status === 200 && blogAddedToFav.status === 200) {
        if (currentFilter === FILTERS.ALL_BLOGS) {
          fetchAllBlogs();
        } else if (currentFilter === FILTERS.FAVOURITES) {
          fetchFavBlogs()
        } else if (currentFilter === FILTERS.YOUR_BLOGS) {
          fetchYourBlogs()
        }
      }
    } catch (e) {
      const errorMessage = e.response?.data?.error;
      console.log(errorMessage);
    }
  };

  const handleUnFavourite = async (blogId) => {
    try {
      const blogUnLikedRes = await axiosService.put(`/blog/unlikeBlog/${blogId}`);
      const blogUnFavRes = await axiosService.put(`/blog/remove/favourites/${blogId}`);
      if (blogUnLikedRes.status === 200 && blogUnFavRes.status === 200) {
        if (currentFilter === FILTERS.ALL_BLOGS) {
          fetchAllBlogs();
        } else if (currentFilter === FILTERS.FAVOURITES) {
          fetchFavBlogs();
        } else if (currentFilter === FILTERS.YOUR_BLOGS) {
          fetchYourBlogs();
        }
      }
    } catch (e) {
      const errorMessage = e.response?.data?.error;
      console.log(errorMessage);
    }
  }

  const handleDelete = async (blogId) => {
    try {
      const blogDeleteRes = await axiosService.delete(`/blog/removeBlog/${blogId}`);
      if (blogDeleteRes.status === 200) {
        if (currentFilter === FILTERS.ALL_BLOGS) {
          fetchAllBlogs();
        } else if (currentFilter === FILTERS.FAVOURITES) {
          fetchFavBlogs()
        } else if (currentFilter === FILTERS.YOUR_BLOGS) {
          fetchYourBlogs()
        }
      }
    } catch (e) {
      const errorMessage = e.response?.data?.error;
      console.log(errorMessage);
    }
  };

  async function fetchAllBlogs() {
    try {
      const apiRes = await axiosService.get(`/blog/allBLogs`);
      if (apiRes.status === 200) {
        setBlogs(apiRes.data);
      }
    } catch (e) {
      const errorMessage = e.response?.data?.error;
      console.log(errorMessage);
    }
  }
  async function fetchYourBlogs() {
    try {
      const apiRes = await axiosService.get(`/blog/myBlogs`);
      setBlogs(apiRes.data);
    } catch (e) {
      const errorMessage = e.response?.data?.error;
      console.log(errorMessage);
    }
  }
  async function fetchFavBlogs() {
    try {
      const apiRes = await axiosService.get(`/blog/getFavouriteBlogs/`);
      setBlogs(apiRes.data);
    } catch (e) {
      const errorMessage = e.response?.data?.error;
      console.log(errorMessage);
    }
  }

  const handleFilterChange = (value) => {
    setCurrentFilter(value)
    if (value === FILTERS.ALL_BLOGS) {
      setDataLoading(true);
      fetchAllBlogs();
      setDataLoading(false);
    } else if (value === FILTERS.FAVOURITES) {
      setDataLoading(true);
      fetchFavBlogs();
      setDataLoading(false);
    } else if (value === FILTERS.YOUR_BLOGS) {
      setDataLoading(true);
      fetchYourBlogs();
      setDataLoading(false);
    }
  }

  console.log("blogs", blogs);

  return (
    <div className="home">
      <div className="home__categories">
        <div className="filter__wrapper">
          FILTER BY : &nbsp;{" "}
          <Select placeholder="Select Filter" onChange={handleFilterChange} defaultValue={filters[0]}>
            {filters &&
              filters.length !== 0 &&
              filters.map((filter, i) => (
                <Option value={filter} key={i}>
                  {filter}
                </Option>
              ))}
          </Select>
        </div>
        <div className="layout__wrapper">
          CHANGE LAYOUT :
          <div className="layout__icons--wrapper">
            {blogListLayout ? (
              <BsGrid
                className="icon"
                onClick={() => setBlogListLayout(false)}
              />
            ) : (
              <BsGridFill className="icon" />
            )}
            <RiListCheck2
              className="icon"
              onClick={() => setBlogListLayout(true)}
            />
          </div>
        </div>
      </div>

      {(dataLoading && !blogListLayout) ? (
        <div className={`box blogItem__container ${blogListLayout ? "blogs__items--list" : ""}`}>
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div className="blogItem__content_wrapper">
              <div className="blogItem__imgWrapper">
                <Skeleton.Image active={true} />
              </div>
              <div className={`blogItem__bottom ${blogListLayout ? "blogItem__right" : ""}`}>
                <Skeleton active={true} size="large" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {blogs &&
            blogs.length !== 0 ? (
            <div
              className={`box blogItem__container ${blogListLayout ? "blogs__items--list" : ""
                }`}
            >
              {blogs.map((blog) => {
                return (
                  <div
                    className={`blogItem__content_wrapper  ${blogListLayout ? "blogItem__content--list" : ""
                      }`}
                    key={`id-${blog._id}`}
                  >
                    <div className="blogItem__imgWrapper">
                      <img
                        src={blog.imageUrl}
                        alt="img"
                        className="blogItem__img"
                      />
                    </div>
                    {((blog?.createdBy?._id === currentUserId) || (currentUserRole === "admin")) && <DeleteOutlined
                      className=" blogItem__heart_icon blogItem__del_icon icon__white icon"
                      onClick={() => handleDelete(blog._id)}
                    />}
                    {checkIsBlogLiked(blog.likedBy) ? (
                      <HeartFilled
                        className="blogItem__heart_icon  red icon"
                        onClick={() => handleUnFavourite(blog._id)}
                      />
                    ) : (
                      <HeartOutlined
                        className="blogItem__heart_icon icon__white icon"
                        onClick={() => handleFavourite(blog._id)}
                      />
                    )}
                    <div
                      className={`blogItem__bottom ${blogListLayout ? "blogItem__right" : ""
                        }`}
                    >
                      <h3>{blog.title?.substring(0, 20)} ...</h3>
                      {blogListLayout && (
                        <p>{blog?.description}</p>
                      )}
                      <Link
                        className={`black__button width-max-content white__button  small__btn  ${blogListLayout ? "button-abs" : ""
                          }`}
                        to={`/view-blog/${blog._id}`}
                      >
                        VIEW BLOG
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 200,
              }}
              description={
                <h3 style={{ textAlign: 'center' }}>
                  NO DATA FOUND
                </h3>
              }
            >
            </Empty>
          )
          }
        </>
      )}


    </div>
  );
};

export default Home;
