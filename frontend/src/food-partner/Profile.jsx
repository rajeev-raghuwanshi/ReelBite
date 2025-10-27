import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import styles from './Profile.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

// Profile component for food partner dashboard
const Profile = ({
  // partner = {
  //   name: "Aarav Mehta",
  //   businessName: "Spice Junction",
  //   photo: "https://tse1.mm.bing.net/th/id/OIP.YYDWhSG_EwN-PgMzeZgcIgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
  // },
  // stats = {
  //   mealsAvailable: 42,
  //   customersServed: 1287
  // },
  reels = [
    {
      id: 1,
      src: "https://example.com/videos/reel1.mp4",
      thumbnail: "https://example.com/thumbnails/reel1.jpg"
    },
    {
      id: 2,
      src: "https://example.com/videos/reel2.mp4",
      thumbnail: "https://example.com/thumbnails/reel2.jpg"
    },
    {
      id: 3,
      src: "https://example.com/videos/reel3.mp4",
      thumbnail: "https://example.com/thumbnails/reel3.jpg"
    }
  ]
}) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [profile, setProfile] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  useEffect(() =>{
    axios.get(`http://localhost:3000/api/food-partner/${id}`, {withCredentials : true})
    .then(result =>{
      setProfile(result.data.foodPartner);
      console.log(result.data.foodPartner);
      console.log(result.data.foodItems);
      setFoodItems(result.data.foodItems);
    })
  }, [id])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.left}>
          <h1 className={styles.name}>{profile?.fullname || 'Partner Name'}</h1>
          <p className={styles.business}>{profile?.businessName || 'Business Name'}</p>

          <div className={styles.counters}>
            <div className={styles.card}>
              <div className={styles.cardNumber}>{profile?.mealsAvailable ?? 0}</div>
              <div className={styles.cardLabel}>Meals Available</div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardNumber}>{profile?.customersServed ?? 0}</div>
              <div className={styles.cardLabel}>Total Customers Served</div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <img src={profile?.photo || '/placeholder-profile.png'} alt="profile" className={styles.avatar} />
        </div>
      </header>

      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>Reels</h2>
        <div className={styles.grid}>
          {foodItems.map((r) => (
            <article key={r._id} className={styles.gridItem} onClick={() => navigate(`/reel/${r._id}`)}>
              {/* preview: either thumbnail image or inline video short loop */}
              {r.thumbnail ? (
                <img src={r.thumbnail} alt={`reel-${r._id}`} className={styles.thumb} />
              ) : (
                <video className={styles.thumb} src={r.video} muted loop playsInline preload="metadata" />
              )}
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

// Profile.propTypes = {
//   partner: PropTypes.object,
//   stats: PropTypes.object,
//   reels: PropTypes.array
// }

export default Profile