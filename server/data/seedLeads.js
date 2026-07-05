import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Won", "Lost"];
const EMPLOYEES = [
  "Rahul Sharma", "Priya Nair", "Amit Verma", "Sneha Iyer",
  "Kiran Patel", "Meera Joshi", "Arjun Menon", "Divya Rao",
];
const COURSES = [
  "Full Stack Development", "Data Science", "Digital Marketing",
  "UI/UX Design", "Cloud Computing", "Cybersecurity", "Machine Learning",
  "Business Analytics",
];
const SOURCES = [
  "Website", "Referral", "Social Media", "Cold Call", "Email Campaign",
  "Walk-in", "Advertisement",
];
const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad",
  "Pune", "Kolkata", "Ahmedabad",
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const leadsData = [
  { name: "Aarav Kumar", mobile: "9876543210", email: "aarav.kumar@email.com" },
  { name: "Priya Sharma", mobile: "9123456789", email: "priya.sharma@email.com" },
  { name: "Rahul Gupta", mobile: "8765432109", email: "rahul.gupta@email.com" },
  { name: "Sneha Patel", mobile: "7654321098", email: "sneha.patel@email.com" },
  { name: "Vikram Singh", mobile: "9988776655", email: "vikram.singh@email.com" },
  { name: "Ananya Nair", mobile: "8877665544", email: "ananya.nair@email.com" },
  { name: "Rohan Mehta", mobile: "7766554433", email: "rohan.mehta@email.com" },
  { name: "Pooja Iyer", mobile: "9900112233", email: "pooja.iyer@email.com" },
  { name: "Arjun Das", mobile: "8800223344", email: "arjun.das@email.com" },
  { name: "Kavya Reddy", mobile: "7700334455", email: "kavya.reddy@email.com" },
  { name: "Suresh Rao", mobile: "9876001122", email: "suresh.rao@email.com" },
  { name: "Meera Joshi", mobile: "8765112233", email: "meera.joshi@email.com" },
  { name: "Aditya Verma", mobile: "7654223344", email: "aditya.verma@email.com" },
  { name: "Divya Pillai", mobile: "9988334455", email: "divya.pillai@email.com" },
  { name: "Karan Shah", mobile: "8877445566", email: "karan.shah@email.com" },
  { name: "Neha Bose", mobile: "7766556677", email: "neha.bose@email.com" },
  { name: "Manish Tiwari", mobile: "9900667788", email: "manish.tiwari@email.com" },
  { name: "Ritu Mishra", mobile: "8800778899", email: "ritu.mishra@email.com" },
  { name: "Sanjay Agarwal", mobile: "7700889900", email: "sanjay.agarwal@email.com" },
  { name: "Lakshmi Krishnan", mobile: "9876112233", email: "lakshmi.krishnan@email.com" },
  { name: "Deepak Chauhan", mobile: "8765223344", email: "deepak.chauhan@email.com" },
  { name: "Shilpa Menon", mobile: "7654334455", email: "shilpa.menon@email.com" },
  { name: "Vivek Pandey", mobile: "9988445566", email: "vivek.pandey@email.com" },
  { name: "Asha Desai", mobile: "8877556677", email: "asha.desai@email.com" },
  { name: "Nikhil Thakur", mobile: "7766667788", email: "nikhil.thakur@email.com" },
  { name: "Swati Saxena", mobile: "9900778899", email: "swati.saxena@email.com" },
  { name: "Rajesh Patil", mobile: "8800889900", email: "rajesh.patil@email.com" },
  { name: "Geeta Nambiar", mobile: "7700990011", email: "geeta.nambiar@email.com" },
  { name: "Harish Shetty", mobile: "9876223344", email: "harish.shetty@email.com" },
  { name: "Fatima Khan", mobile: "8765334455", email: "fatima.khan@email.com" },
];

const noteTemplates = [
  "Interested in weekend batches.",
  "Requested a brochure via email.",
  "Follow-up call scheduled for next week.",
  "Demo session completed — very interested.",
  "Asked for EMI options.",
  "Wants online mode only.",
  "Referred by a friend.",
  "Needs manager approval before enrolling.",
];

const seedLeads = async () => {
  try {
    await mongoose.connect(process.env.mongo_URI);
    console.log("Connected to MongoDB.");

    const { default: Lead } = await import("../modal/LeadModal.js");

    // Remove existing leads
    await Lead.deleteMany({});
    console.log("Cleared existing leads.");

    const startDate = new Date("2024-01-01");
    const endDate = new Date();

    const leads = leadsData.map((base) => {
      const numNotes = Math.floor(Math.random() * 3);
      const notes = Array.from({ length: numNotes }, () => ({
        note: randomFrom(noteTemplates),
        createdBy: randomFrom(EMPLOYEES),
        createdDate: randomDate(startDate, endDate),
      }));

      return {
        ...base,
        address: `${Math.floor(Math.random() * 500) + 1}, ${randomFrom(CITIES)}`,
        courseInterested: randomFrom(COURSES),
        leadSource: randomFrom(SOURCES),
        status: randomFrom(LEAD_STATUSES),
        assignedEmployee: randomFrom(EMPLOYEES),
        createdDate: randomDate(startDate, endDate),
        notes,
      };
    });

    await Lead.insertMany(leads);
    console.log(`✅ Seeded ${leads.length} leads successfully.`);
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedLeads();
