import React from "react";
import "../styles/testimonials.css";

// Star Icon SVG
const StarIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "#fbbf24" : "none"}
    stroke="#fbbf24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="star-icon"
  >
    <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" />
  </svg>
);

// Quote Icon SVG
const QuoteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="white"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="quote-icon"
  >
    <path d="M9 10h-4l3-7h2zM21 10h-4l3-7h2z" />
  </svg>
);

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      university: "Harvard University",
      country: "USA",
      flag: "🇺🇸",
      rating: 5,
      text: "The loan process was incredibly smooth! I got my education loan approved within 2 weeks. The team guided me through every step and helped me achieve my dream of studying at Harvard.",
      course: "MBA",
      loanAmount: "₹50 Lakhs",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Rahul Mehta",
      university: "University of Oxford",
      country: "UK",
      flag: "🇬🇧",
      rating: 5,
      text: "Excellent service! They helped me compare different banks and get the best interest rate. The process was transparent and hassle-free.",
      course: "MS in Computer Science",
      loanAmount: "₹40 Lakhs",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Sneha Patel",
      university: "University of Toronto",
      country: "Canada",
      flag: "🇨🇦",
      rating: 5,
      text: "I was worried about collateral requirements, but they found me a collateral-free loan option. Thank you for making my dreams come true!",
      course: "Masters in Data Science",
      loanAmount: "₹35 Lakhs",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "Arjun Singh",
      university: "Stanford University",
      country: "USA",
      flag: "🇺🇸",
      rating: 5,
      text: "Fast approval and competitive interest rates! The documentation support was exceptional and stress-free.",
      course: "PhD in Engineering",
      loanAmount: "₹60 Lakhs",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      name: "Ananya Reddy",
      university: "Australian National University",
      country: "Australia",
      flag: "🇦🇺",
      rating: 5,
      text: "The team understood my financial situation and helped me get the best loan package for my dream course in Australia!",
      course: "Masters in Business Analytics",
      loanAmount: "₹45 Lakhs",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    },
    {
      id: 6,
      name: "Vikram Kumar",
      university: "Technical University of Munich",
      country: "Germany",
      flag: "🇩🇪",
      rating: 5,
      text: "Professional service from start to finish! They helped me secure a great interest rate for my education in Germany.",
      course: "MS in Mechanical Engineering",
      loanAmount: "₹30 Lakhs",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    },
    // New testimonial 7
    {
      id: 7,
      name: "Meera Iyer",
      university: "National University of Singapore",
      country: "Singapore",
      flag: "🇸🇬",
      rating: 5,
      text: "Exceptional support team! They guided me through the entire process seamlessly. Couldn't have done it without them.",
      course: "MBA in Finance",
      loanAmount: "₹38 Lakhs",
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
    },
    // New testimonial 8
    {
      id: 8,
      name: "Rohit Das",
      university: "ETH Zurich",
      country: "Switzerland",
      flag: "🇨🇭",
      rating: 5,
      text: "Very professional and quick. I especially appreciated their honest advice on interest rates and repayment options.",
      course: "MSc in Robotics",
      loanAmount: "₹42 Lakhs",
      avatar:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop",
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="header">
          <div className="badge">
            <StarIcon filled={true} />
            <span>Student Success Stories</span>
          </div>
          <h2>What Our Students Say</h2>
          <p>
            Thousands of students have trusted us to fund their international
            education dreams — here’s what they have to say.
          </p>
        </div>

        <div className="grid">
          {testimonials.map((t, index) => (
            <div
              className="card"
              key={t.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="quote">
                <QuoteIcon />
              </div>

              <div className="stars">
                {[...Array(t.rating)].map((_, i) => (
                  <StarIcon key={i} filled={true} />
                ))}
              </div>

              <p className="text">"{t.text}"</p>

              <div className="student">
                <img className="avatar" src={t.avatar} alt={t.name} />
                <div className="info">
                  <h4>{t.name}</h4>
                  <div className="meta">
                    <span>{t.flag}</span>
                    <p>{t.university}</p>
                  </div>
                  <div className="tags">
                    <span className="tag course">{t.course}</span>
                    <span className="tag loan">{t.loanAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
