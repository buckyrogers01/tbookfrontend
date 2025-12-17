import styles from "./style.module.css";
import Kainchi from "../../assets/Kainchi.jpg"

const LandingPage = () => {
  return (
    <main>
      <div className={styles.hero}>
        <div className={styles.overlay}>
          <h1>EXPLORE</h1>
          <h2>DREAM DESTINATIONS</h2>
          <p>
            Discover unforgettable journeys with trusted local guides. Trek,
            tour, explore, and experience the world your way.
          </p>
          <a href="#" className={styles.btn}>
            EXPLORE EXPERIENCES
          </a>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Who We Are</h2>

        <p>
          Travo is a global travel experience platform that brings together
          passionate travelers and trusted local guides. We believe travel
          should be authentic, safe, and unforgettable.
        </p>

        <div className={styles.experiencecontainer}>
          <div className={styles.experiencecard}>
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" />
            <div className={styles.experiencecontent}>
              <h3>Trusted Local Guides</h3>
              <p>
                We partner with verified and experienced local guides who know
                their destinations inside out.
              </p>
            </div>
          </div>

          <div className={styles.experiencecard}>
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" />
            <div className="experience-content">
              <h3>Authentic Experiences</h3>
              <p>
                Every journey on Travo is curated to offer real cultural,
                adventure, and immersive travel experiences.
              </p>
            </div>
          </div>

          <div className={styles.experiencecard}>
            <img src="https://images.unsplash.com/photo-1499696010181-8c0c5a8e1c7b" />
            <div className={styles.experiencecontent}>
              <h3>Global Community</h3>
              <p>
                Travo is building a global community of explorers who share
                stories, trust, and unforgettable memories.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.alt}>
        <h2>Experiences You Can Book</h2>
        <p>
          Choose from a wide range of activities designed for adventure,
          culture, relaxation, and unforgettable memories.
        </p>

        <div className={styles.experiencecontainer}>
          <div className={styles.experiencecard}>
            <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429" />
            <div className={styles.experiencecontent}>
              <h3>Trekking Adventures</h3>
              <p>
                Guided mountain treks, scenic trails, and nature expeditions led
                by experienced local professionals.
              </p>
            </div>
          </div>

          <div className={styles.experiencecard}>
            <img src={Kainchi} />
            <div className={styles.experiencecontent}>
              <h3>City & Heritage Tours</h3>
              <p>
                Explore iconic landmarks, cultural heritage sites, and hidden
                gems with expert local guides.
              </p>
            </div>
          </div>

          <div className={styles.experiencecard}>
            <img src="https://images.unsplash.com/photo-1508672019048-805c876b67e2" />
            <div className={styles.experiencecontent}>
              <h3>Fun & Adventure Activities</h3>
              <p>
                From water sports to desert safaris and adventure parks, enjoy
                thrilling experiences tailored for you.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contact}>
        <h2>Contact Us</h2>
        <p>Email: contact@travo.com</p>
        <p>Phone: +91 XXXXXXXXX</p>
        <p>Serving Travelers Worldwide</p>
      </div>

      <div className={styles.footer}>© 2025 Travo. All rights reserved.</div>
    </main>
  );
};

export default LandingPage;
