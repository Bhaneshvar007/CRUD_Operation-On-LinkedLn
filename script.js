const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

let data = {
    id: "01",
    username: "Bhaneshvar Kshirsagar",
    userImg: "https://media.licdn.com/dms/image/D4E03AQGxltbkMNHr2g/profile-displayphoto-shrink_200_200/0/1694968332366?e=2147483647&v=beta&t=y6sH1jdVmU_CtcFEv5X6MBXwZqGwH49TR7QYz84iqA0",
    profesion: "Software developer",
    connection: "500+",
    posts: [
        {
            id: "1",
            img: "https://imageio.forbes.com/specials-images/imageserve/62ea057f9f71bb80937b70bb/The-Most-In-Demand-Technical-Skills---And-How-To-Develop-Them/960x0.jpg?height=472&width=711&fit=bounds"
        },
        {
            id: "2",
            img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/6RYYfl482kuXpfD52Vg7aO/64f351d91851eb9eab19b93ce17d207f/GettyImages-1270220777.jpeg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000"
        }
    ]
};

app.get("/main", (req, res) => {
    res.render("index", { data });
});

app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    if (id === data.id) {
        data.username = req.body.username || data.username;
        data.userImg = req.body.userImg || data.userImg;
        data.profesion = req.body.profesion || data.profesion;
        data.connection = req.body.connection || data.connection;
    }
    res.redirect("/main");
});

app.post("/posts", (req, res) => {
    const newPostImg = req.body.imgUrl;
    const newPostId = (data.posts.length + 1).toString();
    data.posts.push({ id: newPostId, img: newPostImg });
    res.redirect("/main");
});

app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    data.posts = data.posts.filter(post => post.id !== id);
    res.redirect("/main");
});

app.delete("/posts", (req, res) => {
    data.posts = [];
    res.redirect("/main");
});

app.get("/main/editprofile", (req, res) => {
    res.render("editProfile", { data });
});

app.listen(5000, () => {
    console.log("Server Started");
});
