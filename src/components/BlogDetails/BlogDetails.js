import React, { useEffect, useState } from "react";
import "./blogDetails.css";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import axiosService from "../../axiosService";
import { useParams } from "react-router-dom";
import { checkIsBlogLiked } from "../../helper";

const BlogDetails = () => {
  const [blogData, setBlogData] = useState({});
  const { blogId } = useParams()
  useEffect(() => {
    fetchBlog();
  }, []);
  async function fetchBlog() {
    try {
      const apiRes = await axiosService.get(`/blog/viewBlog/${blogId}`);
      setBlogData(apiRes.data);
    } catch (e) {
      const errorMessage = e.response?.data?.error;
      console.log(errorMessage);
    }
  }
  const handleFavourite = async (blogId) => {
    try {
      const blogLikedRes = await axiosService.put(`/blog/likeBlog/${blogId}`);
      const blogAddedToFav = await axiosService.put(
        `/blog/addToFavourite/${blogId}`
      );
      if (blogLikedRes.status === 200 && blogAddedToFav.status === 200) {
        fetchBlog();
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
        fetchBlog();
      }
    } catch (e) {
      const errorMessage = e.response?.data?.error;
      console.log(errorMessage);
    }
  }
  console.log(blogData);
  return (
    <div className="blog__details">
      <div className="blog__thumbnail">
        <img src={blogData?.imageUrl} alt="" className="blog__thumbnail--img" />
        <div className="blog__info">
          <div className="blog__info--left">
            <h3 className="blog__info--title">{blogData?.title?.substring(0, 50)}</h3>
            <p className="blog__info--description">
              Created By : &nbsp; {blogData?.createdBy?.userName?.toUpperCase()} &nbsp; - &nbsp;
              Created At : &nbsp; {blogData.createdAt ? new Date(blogData?.createdAt).toLocaleString() : ''}
            </p>
          </div>
          <div className="blog__info--right">
            {checkIsBlogLiked(blogData.likedBy) ? (
              <HeartFilled className="icon blog__detail--heart red" onClick={() => handleUnFavourite(blogData._id)} />
            ) : (
              <HeartOutlined
                className="icon blog__detail--heart"
                onClick={() => handleFavourite(blogData._id)}
              />
            )}
            <span>{blogData?.likes}</span>
          </div>
        </div>
      </div>

      <p className="blog__content" dangerouslySetInnerHTML={{ __html: blogData?.blogDescription }}></p>
    </div>
  );
};

export default BlogDetails;
