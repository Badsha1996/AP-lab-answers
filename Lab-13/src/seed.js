require("dotenv/config");

const prisma = require("./db");

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const users = await prisma.user.createMany({
    data: [
      {
        username: "alice",
        email: "alice@example.com",
        fullName: "Alice Johnson",
        bio: "Software Developer",
        isPrivate: false
      },
      {
        username: "bob",
        email: "bob@example.com",
        fullName: "Bob Smith",
        bio: "UI Designer",
        isPrivate: true
      },
      {
        username: "charlie",
        email: "charlie@example.com",
        fullName: "Charlie Brown",
        bio: "Photographer",
        isPrivate: false
      },
      {
        username: "david",
        email: "david@example.com",
        fullName: "David Wilson",
        bio: "Backend Developer",
        isPrivate: false
      },
      {
        username: "emma",
        email: "emma@example.com",
        fullName: "Emma Davis",
        bio: "Travel Blogger",
        isPrivate: true
      }
    ]
  });


  const posts = await prisma.post.createMany({
    data: [
      {
        imageUrl: "https://example.com/img1.jpg",
        caption: "Exploring Delhi streets",
        location: "Delhi"
      },
      {
        imageUrl: "https://example.com/img2.jpg",
        caption: "Beautiful beach day",
        location: "Goa"
      },
      {
        imageUrl: "https://example.com/img3.jpg",
        caption: "Food and travel memories",
        location: "Delhi"
      },
      {
        imageUrl: "https://example.com/img4.jpg",
        caption: "Mountain adventure",
        location: "Manali"
      },
      {
        imageUrl: "https://example.com/img5.jpg",
        caption: "Coding from cafe",
        location: "Bangalore"
      },
      {
        imageUrl: "https://example.com/img6.jpg",
        caption: "Amazing sunset view",
        location: "Goa"
      },
      {
        imageUrl: "https://example.com/img7.jpg",
        caption: "Street photography",
        location: "Mumbai"
      },
      {
        imageUrl: "https://example.com/img8.jpg",
        caption: "Weekend trip",
        location: "Delhi"
      },
      {
        imageUrl: "https://example.com/img9.jpg",
        caption: "Nature photography",
        location: "Manali"
      },
      {
        imageUrl: "https://example.com/img10.jpg",
        caption: "Learning Prisma ORM",
        location: "Bangalore"
      },
      {
        imageUrl: "https://example.com/img11.jpg",
        caption: "Travel diary",
        location: "Goa"
      },
      {
        imageUrl: "https://example.com/img12.jpg",
        caption: "Backend development",
        location: "Hyderabad"
      }
    ]
  });


  console.log("Database seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });