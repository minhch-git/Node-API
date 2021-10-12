import Bootcamp from '../src/models/Bootcamp'
import Course from '../src/models/Course'
import User from '../src/models/User'


// Connect mongodb
import mongoose from 'mongoose'
let uri = process.env.MONGO_URI
let options = {}
mongoose.connect(uri, options)
  .then(() => console.log(`Connect mongodb successfully!`))
  .catch(error => console.log(`Connect mongodb failure!`, error))


let bootcampsJson = [
  {
    "user": "6164e1d678d0c38ee89a9c4a",
    "name": "Devworks Bootcamp",
    "description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer",
    "website": "https://devworks.com",
    "phone": "(111) 111-1111",
    "email": "enroll@devworks.com",
    "address": "233 Bay State Rd Boston MA 02215",
    "careers": ["Web Development", "UI/UX", "Business"],
    "housing": true,
    "jobAssistance": true,
    "jobGuarantee": false,
    "acceptGi": true,
  },
  {
    "user": "6164e1d678d0c38ee89a9c4b",
    "name": "ModernTech Bootcamp",
    "description": "ModernTech has one goal, and that is to make you a rockstar developer and/or designer with a six figure salary. We teach both development and UI/UX",
    "website": "https://moderntech.com",
    "phone": "(222) 222-2222",
    "email": "enroll@moderntech.com",
    "address": "220 Pawtucket St, Lowell, MA 01854",
    "careers": ["Web Development", "UI/UX", "Mobile Development"],
    "housing": false,
    "jobAssistance": true,
    "jobGuarantee": false,
    "acceptGi": true,
  },
  {
    "user": "6164e1d678d0c38ee89a9c4c",
    "name": "Codemasters",
    "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science",
    "website": "https://codemasters.com",
    "phone": "(333) 333-3333",
    "email": "enroll@codemasters.com",
    "address": "85 South Prospect Street Burlington VT 05405",
    "careers": ["Web Development", "Data Science", "Business"],
    "housing": false,
    "jobAssistance": false,
    "jobGuarantee": false,
    "acceptGi": false,
  },
  {
    "user": "6164e1d678d0c38ee89a9c4d",
    "name": "Devcentral Bootcamp",
    "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in front end and full stack web development",
    "website": "https://devcentral.com",
    "phone": "(444) 444-4444",
    "email": "enroll@devcentral.com",
    "address": "45 Upper College Rd Kingston RI 02881",
    "careers": [
      "Mobile Development",
      "Web Development",
      "Data Science",
      "Business"
    ],
    "housing": false,
    "jobAssistance": true,
    "jobGuarantee": true,
    "acceptGi": true,
  }
]

let coursesJson = [
  {
    "title": "Front End Web Development",
    "description": "This course will provide you with all of the essentials to become a successful frontend web developer. You will learn to master HTML, CSS and front end JavaScript, along with tools like Git, VSCode and front end frameworks like Vue",
    "weeks": 8,
    "tuition": 8000,
    "minimumSkill": "beginner",
    "scholarshipsAvailable": true,
    "bootcamp": "6164e2a9d23a7a33066d82aa",
    "user": "6164e1d678d0c38ee89a9c4a"
  },
  {
    "title": "Full Stack Web Development",
    "description": "In this course you will learn full stack web development, first learning all about the frontend with HTML/CSS/JS/Vue and then the backend with Node.js/Express/MongoDB",
    "weeks": 12,
    "tuition": 10000,
    "minimumSkill": "intermediate",
    "scholarshipsAvailable": true,
    "bootcamp": "6164e2a9d23a7a33066d82aa",
    "user": "6164e1d678d0c38ee89a9c4a"
  },
  {
    "title": "Full Stack Web Dev",
    "description": "In this course you will learn all about the front end with HTML, CSS and JavaScript. You will master tools like Git and Webpack and also learn C# and ASP.NET with Postgres",
    "weeks": 10,
    "tuition": 12000,
    "minimumSkill": "intermediate",
    "scholarshipsAvailable": true,
    "bootcamp": "6164e2a9d23a7a33066d82ab",
    "user": "6164e1d678d0c38ee89a9c4b"
  },
  {
    "title": "UI/UX",
    "description": "In this course you will learn to create beautiful interfaces. It is a mix of design and development to create modern user experiences on both web and mobile",
    "weeks": 12,
    "tuition": 10000,
    "minimumSkill": "intermediate",
    "scholarshipsAvailable": true,
    "bootcamp": "6164e2a9d23a7a33066d82ab",
    "user": "6164e1d678d0c38ee89a9c4b"
  },
  {
    "title": "Web Design & Development",
    "description": "Get started building websites and web apps with HTML/CSS/JavaScript/PHP. We teach you",
    "weeks": 10,
    "tuition": 12000,
    "minimumSkill": "beginner",
    "scholarshipsAvailable": true,
    "bootcamp": "6164e2a9d23a7a33066d82a9",
    "user": "6164e1d678d0c38ee89a9c4c"
  },
  {
    "title": "Data Science Program",
    "description": "In this course you will learn Python for data science, machine learning and big data tools",
    "weeks": 10,
    "tuition": 9000,
    "minimumSkill": "intermediate",
    "scholarshipsAvailable": false,
    "bootcamp": "6164e2a9d23a7a33066d82a9",
    "user": "6164e1d678d0c38ee89a9c4c"
  },
  {
    "title": "Web Development",
    "description": "This course will teach you how to build high quality web applications with technologies like React, Node.js, PHP & Laravel",
    "weeks": 8,
    "tuition": 8000,
    "minimumSkill": "beginner",
    "scholarshipsAvailable": false,
    "bootcamp": "6164e2a9d23a7a33066d82a8",
    "user": "6164e1d678d0c38ee89a9c4d"
  },
  {
    "title": "Software QA",
    "description": "This course will teach you everything you need to know about quality assurance",
    "weeks": 6,
    "tuition": 5000,
    "minimumSkill": "intermediate",
    "scholarshipsAvailable": false,
    "bootcamp": "6164e2a9d23a7a33066d82a8",
    "user": "6164e1d678d0c38ee89a9c4d"
  },
  {
    "title": "IOS Development",
    "description": "Get started building mobile applications for IOS using Swift and other tools",
    "weeks": 8,
    "tuition": 6000,
    "minimumSkill": "intermediate",
    "scholarshipsAvailable": false,
    "bootcamp": "6164e2a9d23a7a33066d82a8",
    "user": "6164e1d678d0c38ee89a9c4d"
  }
]

let usersJson = [
  {
    "name": "Admin Account",
    "email": "admin@gmail.com",
    "role": "user",
    "password": "123456"
  },
  {
    "name": "Publisher Account",
    "email": "publisher@gmail.com",
    "role": "publisher",
    "password": "123456"
  },
  {
    "name": "User Account",
    "email": "user@gmail.com",
    "role": "user",
    "password": "123456"
  },
  {
    "name": "John Doe",
    "email": "john@gmail.com",
    "role": "publisher",
    "password": "123456"
  },
  {
    "name": "Kevin Smith",
    "email": "kevin@gmail.com",
    "role": "publisher",
    "password": "123456"
  },
  {
    "name": "Mary Williams",
    "email": "mary@gmail.com",
    "role": "publisher",
    "password": "123456"
  },
  {
    "name": "Sasha Ryan",
    "email": "sasha@gmail.com",
    "role": "publisher",
    "password": "123456"
  },
  {
    "name": "Greg Harris",
    "email": "greg@gmail.com",
    "role": "user",
    "password": "123456"
  },
  {
    "name": "Derek Glover",
    "email": "derek@gmail.com",
    "role": "user",
    "password": "123456"
  },
  {
    "name": "Stephanie Hanson",
    "email": "steph@gmail.com",
    "role": "user",
    "password": "123456"
  },
  {
    "name": "Jerry Wiliams",
    "email": "jerry@gmail.com",
    "role": "user",
    "password": "123456"
  },
  {
    "name": "Maggie Johnson",
    "email": "maggie@gmail.com",
    "role": "user",
    "password": "123456"
  },
  {
    "name": "Barry Dickens",
    "email": "barry@gmail.com",
    "role": "user",
    "password": "123456"
  },
  {
    "name": "Ryan Bolin",
    "email": "ryan@gmail.com",
    "role": "user",
    "password": "123456"
  },
  {
    "name": "Sara Kensing",
    "email": "sara@gmail.com",
    "role": "user",
    "password": "123456"
  }
]


const createDataForModel = async (Model, data) => {
  try {
    await Model.deleteMany()
    await Model.insertMany(data)
    return console.log(`Insert data successfully!`)
  } catch (error) {
    console.error(error)
    console.log(`Insert data failure!`)
  }
}


// createDataForModel(User, usersJson)
// createDataForModel(Bootcamp, bootcampsJson)
createDataForModel(Course, coursesJson)