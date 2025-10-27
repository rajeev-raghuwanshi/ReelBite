import ReelsFeed from '../components/ReelsFeed'

import { useEffect, useState } from "react";
import axios from "axios";
// import ReelsFeed from "./ReelsFeed";

const ReelsPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getFood = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/food", {
          withCredentials: true,
        });
        console.log("Fetched food items:", res.data.foodItem);
        setVideos(res.data.foodItem); // ✅ updates state, triggers re-render
      } catch (err) {
        console.error("Error fetching food:", err);
      }
    };
    getFood();
  }, []);

  return <ReelsFeed videos={videos} />;
};

export default ReelsPage;
