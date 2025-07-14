import { departments } from "../assets/mock/departments.json";
import { positions } from "../assets/mock/positions.json";

const generateRandomEmail = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "example.com"];

  const nameLength = Math.floor(Math.random() * 6) + 5; // 5–10 characters
  const name = Array.from({ length: nameLength }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

  const domain = domains[Math.floor(Math.random() * domains.length)];

  return `${name}@${domain}`;
};

function getRandomDate(startYear = 1970) {
  const endYear = new Date().getFullYear();

  const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const month = Math.floor(Math.random() * 12) + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  const day = Math.floor(Math.random() * daysInMonth) + 1;

  const yyyy = year.toString();
  const mm = month.toString().padStart(2, "0");
  const dd = day.toString().padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

export const createMockEmployees = () => {
  const names = ["Ayrton", "Niki", "Michael", "Charles", "Carlos", "Fernando", "Kimi", "Lewis", "Max", "Sebastian"];
  const surnames = [
    "Senna",
    "Lauda",
    "Schumacher",
    "Leclerc",
    "Sainz",
    "Alonso",
    "Raikkonnen",
    "Hamilton",
    "Verstappen",
    "Vettel",
  ];

  return Array.from({ length: 25 }).map((_, i) => {
    const nameIndex = Math.floor(Math.random() * names.length);
    const surnameIndex = Math.floor(Math.random() * surnames.length);
    const positionIndex = Math.floor(Math.random() * positions.length);
    const departmentIndex = Math.floor(Math.random() * departments.length);
    const randomNumber = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join("");

    return {
      id: i,
      firstname: names[nameIndex],
      surname: surnames[surnameIndex],
      position: positions[positionIndex],
      department: departments[departmentIndex],
      email: generateRandomEmail(),
      phone: "5".concat(randomNumber),
      dateOfEmployment: getRandomDate(2020),
      dateOfBirth: getRandomDate(),
    };
  });
};
