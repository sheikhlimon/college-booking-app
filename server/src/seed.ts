import mongoose from "mongoose";
import dotenv from "dotenv";
import College from "./models/College";

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
