const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
















// ========================mongoose
mongoose.connect("mongodb+srv://anjaliDB:Anjali1234@cluster0.vrccx.mongodb.net/blogsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// creating a schema
const blogSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  content:{
    type:String,
    required:true,
  }
});
//  creating a model
const Blog = mongoose.model("Blog", blogSchema);





app.get("/", (req, res) => {
  res.render("home");
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const blogtitle = req.body.BlogTitle;
  const blogcontent = req.body.BlogContent;
  const blog1 = new Blog({
    title:blogtitle,
    content:blogcontent,
  });
  blog1.save();
  res.redirect("/blogs")
});

app.get("/blogs",(req,res)=>{
  Blog.find({},(err, foundblog)=>{
    if(err){
      console.log(err);
    }else{
      res.render("blogs",{
        myBlog : foundblog
      });
    }
  }); 
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server started ");
});
