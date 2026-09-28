const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const connectDB = require("../config/db");
const Opportunity = require("../models/Opportunity");

/**
 * 10 Real Hackathons with complete, authentic details provided by the user
 */
const updatedHackathons = [
  {
    id: "hackathon-serpapi-india-2026",
    title: "SerpApi India Hackathon 2026",
    organization: "SerpApi",
    organizer: "SerpApi",
    category: "Hackathons",
    location: "India",
    workMode: "Online",
    mode: "Online",
    deadline: "October 10, 2026, 11:59 PM IST",
    duration: "Online / asynchronous",
    fee: "Free",
    prize: "₹3 lakh+ total prize value + SerpApi credits",
    stipend: "₹3 lakh+ total prize value + SerpApi credits",
    eligibility: "Participants must be 18+ and reside in India. Solo participation or teams of up to 5.",
    description: "Build an app, AI agent, open-source integration or other project using live search data from SerpApi. Existing projects are allowed if SerpApi is meaningfully used.",
    skills: ["Python", "APIs", "AI agents", "web development", "data integration", "software development"],
    domains: ["Artificial Intelligence", "Developer Tools", "Search", "Open Source", "Data"],
    roles: ["Software Developer", "AI Engineer", "Full-Stack Developer", "Developer/Builder"],
    applicationUrl: "https://serpapi.github.io/serpapi-india-hackathon-2026/",
    source: "SerpApi",
    platform: "SerpApi Official Portal",
  },
  {
    id: "hackathon-hackyard-build-2026",
    title: "Hackyard Build 2026",
    organization: "Hackyard",
    organizer: "Hackyard",
    category: "Hackathons",
    location: "IIT Guwahati",
    workMode: "Hybrid",
    mode: "Hybrid",
    deadline: "October 10, 2026",
    duration: "24-hour physical hackathon (October 24–25, 2026)",
    fee: "Free entry",
    prize: "Partner rewards including $100 Hackyard LLM credits for every selected project; additional partner rewards and cash prizes",
    stipend: "$100 Hackyard LLM credits + partner rewards & cash prizes",
    eligibility: "Developers, designers, founders, researchers, students, operators and other builders. Solo or 2–4 people.",
    description: "A build-focused hackathon where participants start with an idea, problem or skill and turn it into a working product. There is no fixed theme.",
    skills: ["Software Development", "AI", "Product Development", "Prototyping", "Problem Solving"],
    domains: ["AI", "Software", "Startups", "Open Innovation"],
    roles: ["Developer", "Designer", "Researcher", "Founder", "Product Builder"],
    applicationUrl: "https://hackyard.org/build2026/apply",
    source: "Hackyard",
    platform: "Hackyard",
  },
  {
    id: "hackathon-indux-5-0-2026",
    title: "INDUX 5.0 – AI for Real-World Impact",
    organization: "Vikrant University, Gwalior",
    organizer: "Vikrant University, Gwalior",
    category: "Hackathons",
    location: "Gwalior, Madhya Pradesh",
    workMode: "Hybrid",
    mode: "Hybrid",
    deadline: "October 15, 2026 (Registration through Oct 1, 2026)",
    duration: "24-hour on-site final (November 2–3, 2026)",
    fee: "No fee for initial registration",
    prize: "₹2.25 lakh cash",
    stipend: "₹2.25 lakh cash",
    eligibility: "College students and young innovators from institutions in India and abroad. Team size: 2–4 members.",
    description: "International-level 24-hour AI hackathon focused on building practical AI solutions for real-world problems. Shortlisted teams attend the on-site final at Vikrant University.",
    skills: ["AI", "Machine Learning", "Software Development", "Prototyping", "Problem Solving"],
    domains: ["AI", "Healthcare", "Manufacturing", "Safety", "Sustainability", "Commerce", "Language", "Space"],
    roles: ["AI Engineer", "ML Engineer", "Software Developer", "Product Builder"],
    applicationUrl: "https://indux-5-0-2026.devpost.com/",
    source: "Devpost",
    platform: "Devpost / Vikrant University",
  },
  {
    id: "hackathon-hacxlerate-2026",
    title: "HacXLerate 2026",
    organization: "byteXL",
    organizer: "byteXL",
    category: "Hackathons",
    location: "India / participating byteXL colleges",
    workMode: "Hybrid",
    mode: "Hybrid",
    deadline: "October 5–11, 2026 (External Track: October 11, 2026)",
    duration: "Round 1: Oct 5–11, 2026",
    fee: "₹999 per team",
    prize: "Industry opportunities, certification & cash awards",
    stipend: "Cash awards & industry opportunities",
    eligibility: "Students. Students outside the byteXL partner-college network can participate through the External Track. Team size: 3–5.",
    description: "A student-focused hackathon conducted across byteXL partner colleges, with an external virtual track for students from other colleges. Top teams advance to Round 2.",
    skills: ["Software Development", "Problem Solving", "AI", "Web Development", "Prototyping"],
    domains: ["Technology", "Artificial Intelligence", "Software Engineering", "Innovation"],
    roles: ["Developer", "AI Engineer", "Software Engineer", "Product Builder"],
    applicationUrl: "https://events.bytexl.com",
    source: "byteXL",
    platform: "byteXL Events",
  },
  {
    id: "hackathon-open-source-sprint-hyderabad",
    title: "Open Source Sprint – Hyderabad",
    organization: "Beyond Experiences & Events",
    organizer: "Beyond Experiences & Events",
    category: "Hackathons",
    location: "Malla Reddy University, Hyderabad",
    workMode: "On-site",
    mode: "On-site",
    deadline: "October 10, 2026",
    duration: "24 hours (October 14–15, 2026)",
    fee: "Free",
    prize: "₹4.5 lakh+ in partner prizes and additional rewards",
    stipend: "₹4.5 lakh+ in partner prizes and rewards",
    eligibility: "College students, freshers and professionals. Team size: 2–4.",
    description: "Open-innovation open-source hackathon with no fixed track. Teams build and ship projects during a 24-hour sprint and publish their work on GitHub.",
    skills: ["Git", "Open Source", "Software Development", "AI/ML", "Cloud", "Data Engineering"],
    domains: ["Open Source", "AI", "Cloud Computing", "Data", "Software Engineering"],
    roles: ["Developer", "Data Engineer", "ML Engineer", "Open Source Contributor"],
    applicationUrl: "https://unifesto.app/event/oss-beyond",
    source: "Unifesto",
    platform: "Unifesto / Malla Reddy University",
  },
  {
    id: "hackathon-awign-physical-ai",
    title: "Awign Hackathon: Physical AI",
    organization: "Awign",
    organizer: "Awign",
    category: "Hackathons",
    location: "Bengaluru",
    workMode: "On-site",
    mode: "On-site",
    deadline: "October 10, 2026",
    duration: "October 10–11, 2026",
    fee: "Free",
    prize: "1st – MacBook; 2nd – iPhone; 3rd – AirPods",
    stipend: "1st – MacBook; 2nd – iPhone; 3rd – AirPods",
    eligibility: "Builders; solo participants are allowed. Team size: Up to 4.",
    description: "Build an AI-powered product that solves a real problem. Participants can choose the featured Physical AI track (Robotics, computer vision, smart devices, sensors, edge AI, AI for physical operations) or the open AI track.",
    skills: ["Artificial Intelligence", "Computer Vision", "Robotics", "Edge AI", "AI Agents", "Software Development"],
    domains: ["AI", "Robotics", "Computer Vision", "Physical AI"],
    roles: ["AI Engineer", "ML Engineer", "Robotics Developer", "Software Developer"],
    applicationUrl: "https://lu.ma/awign-hackathon",
    source: "Luma",
    platform: "Luma / Awign",
  },
  {
    id: "hackathon-neo4j-graph-builder-bengaluru",
    title: "NEO4J Graph Builder: Build Sprint – Bengaluru",
    organization: "Neo4j",
    organizer: "Neo4j / event organizer Rajat Gupta",
    category: "Hackathons",
    location: "Bengaluru",
    workMode: "On-site",
    mode: "On-site",
    deadline: "October 17, 2026",
    duration: "Approximately 5 hours (October 17, 2026)",
    fee: "Free",
    prize: "Exclusive Neo4j credits, swag and agentic AI perks",
    stipend: "Exclusive Neo4j credits and developer perks",
    eligibility: "Open RSVP; limited to 60 participants. The current listing does not specify a student-only restriction.",
    description: "Hands-on Graph + AI build sprint where participants use Neo4j to build knowledge graphs, explore agentic capabilities and create a working use case.",
    skills: ["Neo4j", "Graph Databases", "Knowledge Graphs", "AI", "Agentic AI"],
    domains: ["Artificial Intelligence", "Graph Technology", "Knowledge Graphs", "Data Engineering"],
    roles: ["Developer", "Data Engineer", "AI Engineer", "ML Engineer"],
    applicationUrl: "https://lu.ma/neo4j",
    source: "Luma",
    platform: "Luma / Neo4j",
  },
  {
    id: "hackathon-ctrl-space-bengaluru",
    title: "Ctrl+Space Hackathon – Bengaluru",
    organization: "ReactVision + Expo",
    organizer: "ReactVision + Expo",
    category: "Hackathons",
    location: "Bengaluru",
    workMode: "On-site",
    mode: "On-site",
    deadline: "October 18, 2026",
    duration: "October 18, 2026",
    fee: "Free",
    prize: "Developer credits, Expo & ReactVision ecosystem perks",
    stipend: "Developer credits & ecosystem perks",
    eligibility: "Developers/builders interested in React Native, AR/VR and spatial applications.",
    description: "Build an AR/VR application using React Native and Expo, with a focus on geospatial anchoring, spatial experiences and cross-platform applications.",
    skills: ["React Native", "Expo", "AR", "VR", "JavaScript", "Mobile Development"],
    domains: ["Augmented Reality", "Virtual Reality", "Mobile Development", "Spatial Computing"],
    roles: ["React Native Developer", "Mobile Developer", "AR/VR Developer"],
    applicationUrl: "https://expo.dev/",
    source: "ReactVision + Expo",
    platform: "Expo Community",
  },
  {
    id: "hackathon-next-gen-2026-bengaluru",
    title: "Next Gen Hackathon 2026 – Bengaluru",
    organization: "NextGenExpo / RAAIF",
    organizer: "NextGenExpo / RAAIF",
    category: "Hackathons",
    location: "Tripura Vasini Palace Grounds, Bengaluru",
    workMode: "On-site",
    mode: "On-site",
    deadline: "October 23, 2026, 5 PM IST",
    duration: "October 23–25, 2026",
    fee: "Free",
    prize: "₹50,000 cash",
    stipend: "₹50,000 cash",
    eligibility: "Adults meeting the event rules; not restricted to students. Team size: 2–4. Note: Participants must also complete the official NextGen Expo registration.",
    description: "National-level hackathon bringing developers, students, engineers, innovators and startups together to build technology solutions across AI/ML, Robotics, AR/VR, and IoT.",
    skills: ["AI/ML", "Robotics", "AR/VR", "IoT", "Software Development"],
    domains: ["Artificial Intelligence", "Robotics", "IoT", "AR/VR"],
    roles: ["Software Developer", "AI Engineer", "ML Engineer", "Robotics Developer"],
    applicationUrl: "https://devpost.com",
    source: "Devpost",
    platform: "Devpost / NextGenExpo",
  },
  {
    id: "hackathon-evm-capital-mumbai",
    title: "evm capital Hackathon – Mumbai Edition",
    organization: "evm capital",
    organizer: "evm capital",
    category: "Hackathons",
    location: "Mumbai",
    workMode: "On-site",
    mode: "On-site",
    deadline: "October 10, 2026",
    duration: "24 hours",
    fee: "Free (registration subject to host approval)",
    prize: "₹1 lakh prize pool + grants for top teams/bounty winners",
    stipend: "₹1 lakh prize pool + grants for top teams/bounty winners",
    eligibility: "Open to builders, founders and developers. Evaluated based on actual user adoption such as signups, downloads or paying users.",
    description: "A 24-hour hackathon focused on building or scaling products and demonstrating real-world traction. Teams are evaluated based on actual user adoption such as signups, downloads or paying users rather than presentation quality alone.",
    skills: ["Product Development", "Software Engineering", "AI", "Growth", "User Acquisition"],
    domains: ["Startups", "AI", "Product Development", "Entrepreneurship"],
    roles: ["Developer", "Product Builder", "Founder", "Growth/Product Engineer"],
    applicationUrl: "https://lu.ma/evm-capital-hackathon-mumbai-edition",
    source: "Luma",
    platform: "Luma / evm capital",
  },
];

async function updateHackathons() {
  console.log("==================================================");
  console.log("Updating 10 Curated Real Hackathons in OppurtuNest");
  console.log("==================================================\n");

  try {
    await connectDB();

    // 1. Remove existing hackathons
    const deleteResult = await Opportunity.deleteMany({ category: "Hackathons" });
    console.log(`Removed ${deleteResult.deletedCount} old hackathon records.`);

    // 2. Insert the 10 new curated hackathons
    const insertResult = await Opportunity.insertMany(updatedHackathons);
    console.log(`Inserted ${insertResult.length} new curated hackathon records.`);

    // 3. Verify total opportunities count in database
    const totalCount = await Opportunity.countDocuments();
    const hackathonCount = await Opportunity.countDocuments({ category: "Hackathons" });
    console.log(`\nFinal total opportunities in DB: ${totalCount}`);
    console.log(`Final total hackathons in DB: ${hackathonCount}`);

    console.log("\nUpdated Hackathon Summary:");
    updatedHackathons.forEach((h, i) => {
      console.log(`  #${i + 1}: ${h.title} (${h.organization}) -> AppUrl: ${h.applicationUrl}`);
    });

    console.log("\n✓ All 10 hackathon records updated successfully!");
  } catch (err) {
    console.error("Error updating hackathons:", err);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
}

updateHackathons();
