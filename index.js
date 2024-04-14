import express from "express";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(express.static("wireframes"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Assuming your wireframes are stored in the "wireframes" directory
//const wireframesDirectory = path.join(__dirname, "wireframes");

// Sample keywords data
const keywords = {
  blog: ["blog", "post", "article"],
  portfolio: ["portfolio", "projects", "work"],
  login:["login","signin","authentication"],
  signup:["sign up"],
  music:["music","song","songs"],
  default: ["default", "generic", "basic"],
};

function getWireframeData(userInput) {
  const matchingWireframes = [];

  // Check user input against keywords
  Object.keys(keywords).forEach((category) => {
    const categoryKeywords = keywords[category];
    if (categoryKeywords.some((keyword) => userInput.includes(keyword))) {
      matchingWireframes.push(category);
    }
  });

  // Choose a wireframe based on matching keywords
  const selectedcategory = matchingWireframes.length > 0 ? matchingWireframes[0] : "default";

  // Return the path to the wireframe image
  const filePath = `/${selectedcategory}.png`;

  return filePath;
}



app.get("/", (req, res) => {
  res.render("input-index.ejs");
});

app.post("/generate", (req, res) => {
  // Get user input from the form
  const userInput = req.body.design;

  // Get wireframe image path based on user input
  const wireframeImagePath = getWireframeData(userInput);

  // Render output.ejs with wireframe image path
  console.log("Wireframe Image Path:", wireframeImagePath);


  res.render("output.ejs", { wireframeImagePath });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
