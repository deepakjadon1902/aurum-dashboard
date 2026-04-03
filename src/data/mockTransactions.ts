import { Transaction } from '@/types';
import { subDays, format } from 'date-fns';

const now = new Date();
const d = (daysAgo: number) => format(subDays(now, daysAgo), 'yyyy-MM-dd');

export const mockTransactions: Transaction[] = [
  // Current month
  { id: '1', date: d(2), description: 'Monthly Salary - April', category: 'Salary', type: 'income', amount: 85000 },
  { id: '2', date: d(3), description: 'Swiggy Order - Biryani', category: 'Food', type: 'expense', amount: 350 },
  { id: '3', date: d(5), description: 'Metro Card Recharge', category: 'Transport', type: 'expense', amount: 500 },
  { id: '4', date: d(7), description: 'Netflix Subscription', category: 'Entertainment', type: 'expense', amount: 649 },
  { id: '5', date: d(8), description: 'Electricity Bill', category: 'Utilities', type: 'expense', amount: 2200 },
  { id: '6', date: d(10), description: 'Freelance - UI Design', category: 'Freelance', type: 'income', amount: 25000 },
  { id: '7', date: d(12), description: 'Amazon - Headphones', category: 'Shopping', type: 'expense', amount: 2999 },
  { id: '8', date: d(14), description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 18000 },
  { id: '9', date: d(15), description: 'Doctor Consultation', category: 'Healthcare', type: 'expense', amount: 800 },
  // 1 month ago
  { id: '10', date: d(32), description: 'Monthly Salary - March', category: 'Salary', type: 'income', amount: 85000 },
  { id: '11', date: d(34), description: 'Zomato - Pizza Night', category: 'Food', type: 'expense', amount: 580 },
  { id: '12', date: d(36), description: 'Uber Rides', category: 'Transport', type: 'expense', amount: 1200 },
  { id: '13', date: d(38), description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 18000 },
  { id: '14', date: d(40), description: 'Gym Membership', category: 'Healthcare', type: 'expense', amount: 2500 },
  { id: '15', date: d(42), description: 'Movie Tickets - PVR', category: 'Entertainment', type: 'expense', amount: 900 },
  { id: '16', date: d(44), description: 'Freelance - Web Dev', category: 'Freelance', type: 'income', amount: 30000 },
  { id: '17', date: d(46), description: 'Groceries - BigBasket', category: 'Food', type: 'expense', amount: 3200 },
  { id: '18', date: d(48), description: 'Internet Bill', category: 'Utilities', type: 'expense', amount: 999 },
  { id: '19', date: d(50), description: 'Myntra - Clothes', category: 'Shopping', type: 'expense', amount: 4500 },
  // 2 months ago
  { id: '20', date: d(62), description: 'Monthly Salary - February', category: 'Salary', type: 'income', amount: 85000 },
  { id: '21', date: d(64), description: 'SIP - Mutual Fund', category: 'Investment', type: 'expense', amount: 10000 },
  { id: '22', date: d(66), description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 18000 },
  { id: '23', date: d(68), description: 'Starbucks Coffee', category: 'Food', type: 'expense', amount: 450 },
  { id: '24', date: d(70), description: 'Auto Rickshaw', category: 'Transport', type: 'expense', amount: 180 },
  { id: '25', date: d(72), description: 'Spotify Premium', category: 'Entertainment', type: 'expense', amount: 119 },
  { id: '26', date: d(74), description: 'Flipkart - Books', category: 'Shopping', type: 'expense', amount: 1200 },
  { id: '27', date: d(76), description: 'Water Bill', category: 'Utilities', type: 'expense', amount: 400 },
  { id: '28', date: d(78), description: 'Freelance - Logo Design', category: 'Freelance', type: 'income', amount: 15000 },
  { id: '29', date: d(80), description: 'Pharmacy - Medicines', category: 'Healthcare', type: 'expense', amount: 650 },
  // 3 months ago
  { id: '30', date: d(92), description: 'Monthly Salary - January', category: 'Salary', type: 'income', amount: 85000 },
  { id: '31', date: d(94), description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 18000 },
  { id: '32', date: d(96), description: 'Swiggy - Dinner', category: 'Food', type: 'expense', amount: 420 },
  { id: '33', date: d(98), description: 'Ola Cab', category: 'Transport', type: 'expense', amount: 350 },
  { id: '34', date: d(100), description: 'Electricity Bill', category: 'Utilities', type: 'expense', amount: 1800 },
  { id: '35', date: d(102), description: 'BookMyShow - Concert', category: 'Entertainment', type: 'expense', amount: 2500 },
  { id: '36', date: d(104), description: 'Dividend Income', category: 'Investment', type: 'income', amount: 5000 },
  { id: '37', date: d(106), description: 'Decathlon - Sports', category: 'Shopping', type: 'expense', amount: 3400 },
  { id: '38', date: d(108), description: 'Eye Checkup', category: 'Healthcare', type: 'expense', amount: 1500 },
  // 4 months ago
  { id: '39', date: d(122), description: 'Monthly Salary - December', category: 'Salary', type: 'income', amount: 85000 },
  { id: '40', date: d(124), description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 18000 },
  { id: '41', date: d(126), description: 'Groceries - DMart', category: 'Food', type: 'expense', amount: 4200 },
  { id: '42', date: d(128), description: 'Rapido Bike', category: 'Transport', type: 'expense', amount: 150 },
  { id: '43', date: d(130), description: 'Freelance - App Design', category: 'Freelance', type: 'income', amount: 40000 },
  { id: '44', date: d(132), description: 'Amazon Prime', category: 'Entertainment', type: 'expense', amount: 1499 },
  { id: '45', date: d(134), description: 'Gas Bill', category: 'Utilities', type: 'expense', amount: 700 },
  { id: '46', date: d(136), description: 'Croma - Charger', category: 'Shopping', type: 'expense', amount: 1800 },
  // 5 months ago
  { id: '47', date: d(152), description: 'Monthly Salary - November', category: 'Salary', type: 'income', amount: 85000 },
  { id: '48', date: d(154), description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 18000 },
  { id: '49', date: d(156), description: 'Chai Point', category: 'Food', type: 'expense', amount: 220 },
  { id: '50', date: d(158), description: 'Bus Pass', category: 'Transport', type: 'expense', amount: 1400 },
  { id: '51', date: d(160), description: 'SIP - Mutual Fund', category: 'Investment', type: 'expense', amount: 10000 },
  { id: '52', date: d(162), description: 'Dentist Appointment', category: 'Healthcare', type: 'expense', amount: 3000 },
  { id: '53', date: d(164), description: 'Hotstar Subscription', category: 'Entertainment', type: 'expense', amount: 299 },
  { id: '54', date: d(166), description: 'Ajio - Shoes', category: 'Shopping', type: 'expense', amount: 2800 },
  { id: '55', date: d(168), description: 'Freelance - Branding', category: 'Freelance', type: 'income', amount: 20000 },
  // 6 months ago
  { id: '56', date: d(182), description: 'Monthly Salary - October', category: 'Salary', type: 'income', amount: 85000 },
  { id: '57', date: d(184), description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 18000 },
  { id: '58', date: d(186), description: 'Dominos Pizza', category: 'Food', type: 'expense', amount: 650 },
  { id: '59', date: d(188), description: 'Petrol', category: 'Transport', type: 'expense', amount: 2000 },
  { id: '60', date: d(190), description: 'WiFi Bill', category: 'Utilities', type: 'expense', amount: 999 },
];
