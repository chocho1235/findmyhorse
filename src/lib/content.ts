import { BookOpen, CheckCircle, Users, Scale, AlertCircle, Clock, Heart, Stethoscope } from 'lucide-react';

export const allLearningTopics = [
  {
    id: "returns-and-refunds",
    title: "Returns & Refunds",
    description: "Understanding when you can return a horse and how to navigate the process",
    readTime: "15 min read",
    difficulty: "Beginner",
    icon: CheckCircle,
    color: "bg-green-100 text-green-800",
    featured: true,
    path: "/learn/returns",
  },
  {
    id: "contract-essentials",
    title: "Contract Essentials",
    description: "What every horse sale contract should include to protect both parties",
    readTime: "20 min read",
    difficulty: "Beginner",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    featured: true,
    path: "/learn/contracts",
  },
  {
    id: "dispute-resolution",
    title: "Dispute Resolution",
    description: "Steps to take when things go wrong with a horse purchase",
    readTime: "25 min read",
    difficulty: "Intermediate",
    icon: Scale,
    color: "bg-purple-100 text-purple-800",
    featured: false,
    path: "/learn/disputes",
  },
  {
    id: "pre-purchase-exams",
    title: "Pre-Purchase Exams",
    description: "Legal considerations for veterinary examinations before buying",
    readTime: "12 min read",
    difficulty: "Beginner",
    icon: AlertCircle,
    color: "bg-orange-100 text-orange-800",
    featured: false,
    path: "#",
  },
  {
    id: "trial-periods",
    title: "Trial Periods",
    description: "How to structure and protect yourself during horse trial periods",
    readTime: "18 min read",
    difficulty: "Intermediate",
    icon: Clock,
    color: "bg-indigo-100 text-indigo-800",
    featured: false,
    path: "#",
  },
  {
    id: "uk-consumer-rights",
    title: "UK Consumer Rights Act",
    description: "Deep dive into the Consumer Rights Act 2015 for horse purchases",
    readTime: "22 min read",
    difficulty: "Advanced",
    icon: Users,
    color: "bg-red-100 text-red-800",
    featured: false,
    path: "#",
  },
  {
    id: "gastric-ulcers",
    title: "Gastric Ulcers",
    description: "Legal implications of gastric ulcers in horse sales and returns",
    readTime: "15 min read",
    difficulty: "Intermediate",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    featured: false,
    path: "/learn/health/gastric-ulcers",
  },
  {
    id: "kissing-spine",
    title: "Kissing Spine",
    description: "Understanding legal rights when kissing spine is discovered after purchase",
    readTime: "18 min read",
    difficulty: "Intermediate",
    icon: Stethoscope,
    color: "bg-teal-100 text-teal-800",
    featured: false,
    path: "/learn/health/kissing-spine",
  },
  {
    id: "lameness-issues",
    title: "Lameness Issues",
    description: "Legal framework for handling lameness-related disputes",
    readTime: "20 min read",
    difficulty: "Intermediate",
    icon: Stethoscope,
    color: "bg-amber-100 text-amber-800",
    featured: false,
    path: "/learn/health/lameness",
  }
]; 