import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express from "express";


//env vars
dotenv.config();
const PORT = process.env.PORT || 9090;

//init app
const app = express();
const prisma = new PrismaClient()


//support
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// route manage
app.get("/user", async(req, res) => {
    const data = await prisma.users.findMany({
        orderBy: {createdAt: "desc"}
    })
    res.status(200).json(data)
});

app.post("/user", async(req, res) => {
    const data = await prisma.users.create({
        data: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            fullName: req.body.fullName,
            bio: req.body.bio
        }
    })
    res.status(200).json(data)
});

app.get("/student", async(req, res) => {
    const data = await prisma.student.findMany({
        include: {
            result: true,
        }
    });
    res.status(200).json(data);
});

app.post("/student", async(req, res) => {
    const data = await prisma.student.create({
        data: req.body,
    })
    res.status(200).json(data);
});

app.get("/result", async(req, res) => {
    const data = await prisma.result.findMany({
        include: {
            student: true,
        }
    });
    res.status(200).json(data);
});
app.post("/result", async(req, res) => {
    const data = await prisma.result.create({
        data: req.body
    });
    res.status(200).json(data);
});

app.get("/category", async(req, res) => {
    const data = await prisma.category.findMany();
    res.status(200).json(data);
});

app.post("/category", async(req, res) => {
    const data = await prisma.category.create({
        data: req.body,
    })
    res.status(200).json(data);
});

app.get("/product", async(req, res) => {
    const data = await prisma.product.findMany({
        include: {
            category: true,
        }
    });
    res.status(200).json(data);
});

app.post("/product", async(req, res) => {
    const data = await prisma.product.create({
        data: req.body,
    });
    res.status(200).json(data);
});


app.get("/parson", async(req, res) => {
    const data = await prisma.parsons.findMany({
        where: {name: {contains: req.query.name, mode: "insensitive"}},
        include: {
            frout: true,
        }
    });

    res.status(200).json(data);
});
app.post("/parson", async(req, res) => {
    const data = await prisma.parsons.create({
        data: req.body,
    })

    res.status(200).json(data);
});

app.get("/frout", async(req, res) => {
    const data = await prisma.frouts.findMany({
        include: {
            parson: true
        }
    });
    res.status(200).json(data);
});
app.post("/frout", async(req, res) => {
    const data = await prisma.frouts.create({
        data: req.body,
    });
    res.status(200).json(data);
})

// app.get("/parson/search", async(req, res) => {
//     const data = await prisma.parsons.findMany({
//         where: {name: {contains: req.query.name, mode: "insensitive"}},
//         include: {
//             frout: true
//         }
//     });
//     res.status(200).json(data);
// });

//server listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})