import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./About.css";

const teamMembers = [
  { name: "John Carvan", image: "/placeholder.svg" },
  {
    name: "Miss Smith Ellen",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20%28110%29-7j0kbyzzJeZcQREhlt9DlDcxmlMQ0X.png",
  },
  { name: "John Carvan", image: "/placeholder.svg" },
];

function About() {
  const [currentSlide, setCurrentSlide] = useState(1);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>We are committed so that your dream comes true.</p>
          <button className="see-more-btn">See More</button>
        </div>
      </section>

      {/* Why it works Section */}
      <section className="why-it-works">
        <h2>Why it's works</h2>
        <div className="features">
          <div className="feature">
            <div className="feature-icon pink">
              <svg viewBox="0 0 24 24" className="icon">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Personalized learning</h3>
            <p>
              Students practice at their own pace, first filling in gaps in
              their understanding and then accelerating their learning.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon green">
              <svg viewBox="0 0 24 24" className="icon">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3>Trusted content</h3>
            <p>
              Created by experts, library of trusted practice and lessons covers
              math, science, and more. Always free for learners and teachers.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon coral">
              <svg viewBox="0 0 24 24" className="icon">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h3>Tools to empower teachers</h3>
            <p>
              Teachers can identify gaps in their students' understanding,
              tailor instruction, and meet the needs of every student.
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories">
        <h2>Preparing Sporties to Achieve Success</h2>

        <div className="story">
          <div className="story-content">
            <h3>Passionate Academies That Make a Difference</h3>
            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut al Ut enim ad minima veniam,
              quis nostrum exercitationem ullam corporis suscipit laboriosam,
              nisi ut al
            </p>
            <button className="view-more-btn">View More</button>
          </div>
          <div className="story-image">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20%28109%29-vzSg6HzmJ9zyeeGci8Ixhm7sVyEBnZ.png"
              alt="Student studying"
            />
          </div>
        </div>

        <div className="story reverse">
          <div className="story-content">
            <h3>Enjoy Playing with a Unique Club Experience</h3>
            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut al Ut enim ad minima veniam,
              quis nostrum exercitationem ullam corporis suscipit laboriosam,
              nisi ut al
            </p>
            <button className="view-more-btn">View More</button>
          </div>
          <div className="story-image">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20%28109%29-vzSg6HzmJ9zyeeGci8Ixhm7sVyEBnZ.png"
              alt="Student studying"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-carousel">
          <button className="carousel-btn prev" onClick={prevSlide}>
            <ChevronLeft />
          </button>

          <div className="team-members">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`team-member ${
                  index === currentSlide ? "active" : ""
                }`}
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                />
                <div className="member-name">{member.name}</div>
              </div>
            ))}
          </div>

          <button className="carousel-btn next" onClick={nextSlide}>
            <ChevronRight />
          </button>
        </div>
      </section>
    </div>
  );
}

export default About;
