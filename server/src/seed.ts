import mongoose from "mongoose";
import dotenv from "dotenv";
import College from "./models/College";
import Review from "./models/Review";
import ResearchPaper from "./models/ResearchPaper";

dotenv.config();

const seedColleges = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI ||
        process.env.MONGO_URI ||
        "mongodb://localhost:27017/collegebooking"
    );
    console.log("Connected to MongoDB");

    // Clear existing colleges
    await College.deleteMany({});
    console.log("Cleared existing colleges");

    // Sample colleges data
    const colleges = [
      {
        name: "Tech Institute",
        image:
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400",
        rating: 4.5,
        admissionDate: "Fall 2024",
        events: ["Tech Summit 2024", "Career Fair", "Hackathon", "AI Workshop"],
        researchCount: 150,
        sports: ["Basketball", "Soccer", "Tennis", "Swimming"],
        gallery: [
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400",
          "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400",
        ],
      },
      {
        name: "Business School",
        image:
          "https://images.unsplash.com/photo-1562774053-701939374585?w=400",
        rating: 4.8,
        admissionDate: "Spring 2025",
        events: ["Business Summit", "Entrepreneurship Week", "Networking Fair"],
        researchCount: 89,
        sports: ["Golf", "Tennis", "Cricket"],
        gallery: [
          "https://images.unsplash.com/photo-1562774053-701939374585?w=400",
          "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=400",
        ],
      },
      {
        name: "Arts College",
        image:
          "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
        rating: 4.2,
        admissionDate: "Fall 2024",
        events: ["Art Exhibition", "Cultural Festival", "Music Concert"],
        researchCount: 45,
        sports: ["Dance", "Yoga", "Martial Arts"],
        gallery: [
          "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
          "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=400",
        ],
      },
      {
        name: "Medical University",
        image:
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
        rating: 4.9,
        admissionDate: "Spring 2025",
        events: ["Medical Conference", "Health Camp", "Research Symposium"],
        researchCount: 234,
        sports: ["Basketball", "Volleyball", "Athletics"],
        gallery: [
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400",
        ],
      },
      {
        name: "Engineering College",
        image:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
        rating: 4.4,
        admissionDate: "Fall 2024",
        events: ["Robotics Competition", "Technical Fest", "Innovation Expo"],
        researchCount: 178,
        sports: ["Football", "Cricket", "Badminton"],
        gallery: [
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
        ],
      },
      {
        name: "Science Academy",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        rating: 4.6,
        admissionDate: "Spring 2025",
        events: ["Science Fair", "Astronomy Night", "Lab Open House"],
        researchCount: 198,
        sports: ["Chess", "Table Tennis", "Swimming"],
        gallery: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
        ],
      },
    ];

    // Insert colleges into database
    await College.insertMany(colleges);
    console.log("Sample colleges added successfully!");

    // Clear existing reviews (start with no reviews as per requirements)
    await Review.deleteMany({});
    console.log("Reviews cleared - starting with user-generated reviews only");

    // Clear existing research papers
    await ResearchPaper.deleteMany({});
    console.log("Cleared existing research papers");

    // Get college IDs for reference
    const savedColleges = await College.find({});
    const techInstitute = savedColleges.find(c => c.name === "Tech Institute");
    const businessSchool = savedColleges.find(c => c.name === "Business School");
    const medicalUniversity = savedColleges.find(c => c.name === "Medical University");
    const engineeringCollege = savedColleges.find(c => c.name === "Engineering College");
    const scienceAcademy = savedColleges.find(c => c.name === "Science Academy");

    // Sample research papers data
    const papers = [
      {
        collegeId: techInstitute!._id,
        title: "AI in Healthcare: Revolutionizing Patient Care Through Machine Learning",
        authors: ["Dr. Sarah Chen", "Prof. Michael Roberts"],
        abstract: "This paper explores the transformative applications of artificial intelligence in healthcare, focusing on predictive diagnostics and personalized treatment plans.",
        link: "https://arxiv.org/abs/2305.12345",
        category: "Artificial Intelligence",
        publishDate: new Date("2024-03-15"),
        citations: 45
      },
      {
        collegeId: techInstitute!._id,
        title: "Quantum Computing: Breaking Modern Cryptography",
        authors: ["Dr. James Wilson", "Dr. Emily Zhang"],
        abstract: "An analysis of quantum computing's potential impact on current cryptographic systems and proposed post-quantum solutions.",
        link: "https://arxiv.org/abs/2401.67890",
        category: "Quantum Computing",
        publishDate: new Date("2024-01-20"),
        citations: 78
      },
      {
        collegeId: businessSchool!._id,
        title: "Sustainable Business Models in the Digital Age",
        authors: ["Prof. Linda Martinez", "Dr. David Kim"],
        abstract: "Examining how digital transformation enables sustainable business practices and long-term value creation.",
        link: "https://doi.org/10.1177/12345678901234",
        category: "Business Strategy",
        publishDate: new Date("2024-02-10"),
        citations: 32
      },
      {
        collegeId: medicalUniversity!._id,
        title: "CRISPR Gene Editing: Ethical Implications and Clinical Applications",
        authors: ["Dr. Amanda Foster", "Prof. Robert Lee"],
        abstract: "A comprehensive review of CRISPR technology's therapeutic potential and the ethical considerations surrounding gene editing in humans.",
        link: "https://www.nature.com/articles/12345",
        category: "Biotechnology",
        publishDate: new Date("2024-04-05"),
        citations: 156
      },
      {
        collegeId: engineeringCollege!._id,
        title: "Next-Generation Battery Technologies for Electric Vehicles",
        authors: ["Dr. Raj Patel", "Prof. Maria Garcia"],
        abstract: "Investigating solid-state battery technologies and their potential to revolutionize electric vehicle range and charging infrastructure.",
        link: "https://ieeexplore.ieee.org/document/1234567",
        category: "Energy Storage",
        publishDate: new Date("2024-03-28"),
        citations: 89
      },
      {
        collegeId: engineeringCollege!._id,
        title: "Autonomous Drone Navigation in Urban Environments",
        authors: ["Dr. Chris Taylor", "Dr. Sophia Wang"],
        abstract: "Developing computer vision algorithms for safe autonomous drone navigation in complex urban settings.",
        link: "https://arxiv.org/abs/2402.34567",
        category: "Robotics",
        publishDate: new Date("2024-02-18"),
        citations: 54
      },
      {
        collegeId: scienceAcademy!._id,
        title: "Climate Change Modeling: Advanced Predictive Analytics",
        authors: ["Dr. Jennifer Brown", "Prof. Thomas Anderson"],
        abstract: "Using machine learning to improve climate change prediction models and assess environmental impact scenarios.",
        link: "https://www.science.org/article/1234567",
        category: "Climate Science",
        publishDate: new Date("2024-01-30"),
        citations: 123
      },
      {
        collegeId: techInstitute!._id,
        title: "Natural Language Processing for Mental Health Support",
        authors: ["Dr. Lisa Park", "Dr. Kevin Nguyen"],
        abstract: "Exploring how NLP and sentiment analysis can be leveraged to provide accessible mental health support through chatbots and AI assistants.",
        link: "https://aclanthology.org/2024.emnlp-main.123",
        category: "Artificial Intelligence",
        publishDate: new Date("2024-04-12"),
        citations: 28
      }
    ];

    // Insert research papers into database
    await ResearchPaper.insertMany(papers);
    console.log("Sample research papers added successfully!");

    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedColleges();
