const express = require("express");
const app = express();
const fileHandler = require("fs");
const webProjects = require("./web_projects.json");
const helmet = require("helmet");

//we use the below to tell the server how to interpret incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use helmet to increase security by allowing the DNS prefetch Control
//this helps control DNS prefetching and improves user privacy
app.use(helmet.dnsPrefetchControl({ allow: true }));
//use helmet to increase security by setting the framegaurd action. 
//this prevents clickjacking attacks (hidden/invisible <iframe> containing malicious code)
app.use(helmet.frameguard({ action: "deny" }));

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

//the below specifies which port to listen to.
//either specified by the process environment or explicitly localhost:8080
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//the function below generate a unique number using the Math.random method
const uniqueId = () => {

  const newId = Math.floor(Math.random()*999999);

  return newId
}

//the route defined below simply sends a message back 
app.get("/", function (req, res) {
  fileHandler.readFile("web_projects.json", (err, data) => {
    if (err) res.send("File not found. First post to create file.");
    else
      res.send(
        `Welcome!! Navigate to http://localhost:8080/api to see your projects.`
      );
  });
});

//the route defined here reads the contents of the web_projects.json file and then
//send the total content as a response
app.get("/api", function (req, res) {
  fileHandler.readFile("web_projects.json", (err, data) => {
    if (err) res.send("File not found. First post to create file.");
    else 
      res.send({webProjects});
  });
});

//the post router below defines the title, description and url variables by requestion their respectively values
//from the body
//the id is defined by calling the uniqueID function defined above.
//the purpose of this route is to create a new project record in the json file and update it accordingly
app.post("/add", (req, res) => {

  const id = uniqueId();
  const title = req.body.title;
  const description = req.body.description;
  const url = req.body.url;

  let updateIdx = webProjects.projects.push({ id, title, description, url });

  if (updateIdx) {
    fileHandler.writeFileSync(
      "web_projects.json",
      JSON.stringify(webProjects),
      "utf-8"
    );
    res.send("Project Logged!!");
  } else {
    res.send("Oops Something went wrong. Could not add project.");
  }
});


//the delete router requests the id value from the body, and
//uses this to delete a specific record from the jdon file
app.delete("/delete", (req, res) => {
  //get id of obj to delete
  let deleteId = req.body.id; 
  let deleteObj = webProjects.projects.find((project) => project.id == deleteId); 
  //use find() to to get the obj to delete(where id = deleteId)
  let deleteIndex = webProjects.projects.indexOf(deleteObj);

  if(deleteIndex) {
    //remove obj from json array
    webProjects.projects.splice(deleteIndex, 1); 

    fileHandler.writeFileSync("web_projects.json", JSON.stringify(webProjects), "utf-8");

    res.send('Project log deleted!!');
  }else {
    res.send("Oops Something went wrong. Could not find project with ID provided.");
  }
});


//the put routers below define different paths to edit and update different object value in the json file
app.put("/edit-description", (req, res) => {
  //the id and description values are requested from the body
  let id = req.body.id;
  let newDescription = req.body.description;
  //the object in the json file to update is located by using the find method
  let updateObj = webProjects.projects.find((project) => project.id == id);

  if (!updateObj) {
    return res.status(404).send("The project wth the given ID was not found");
  }
  // below, the located object is updated with the new description  
  if (newDescription.length > 2) {
    updateObj.description = newDescription;

    fileHandler.writeFileSync(
      "web_projects.json",
      JSON.stringify(webProjects),
      "utf-8"
    );
    res.send("Project Updated!!");
  } else {
      res.send("Oops Something went wrong. Could not updated project.");
  }
});

app.put("/edit-title", (req, res) => {
  let id = req.body.id;
  let newTitle = req.body.title;
  let updateObj = webProjects.projects.find((project) => project.id == id);

  if (!updateObj)
    return res.status(404).send("The project wth the given ID was not found");

  if (newTitle.length > 2) {
    updateObj.title = newTitle;

    fileHandler.writeFileSync(
      "web_projects.json",
      JSON.stringify(webProjects),
      "utf-8"
    );

    res.send("Project Updated!!");
  } else {
    res.send("Oops Something went wrong. Could not updated project.");
  }
});

app.put("/edit-url", (req, res) => {
  let id = req.body.id;
  let newUrl = req.body.url;
  let updateObj = webProjects.projects.find((project) => project.id == id);

  if (!updateObj)
    return res.status(404).send("The project wth the given ID was not found");

  if (newUrl.length > 4) {
    updateObj.url = newUrl;

    fileHandler.writeFileSync(
      "web_projects.json",
      JSON.stringify(webProjects),
      "utf-8"
    );
    res.send("Project Updated!!");
  } else {
    res.send("Oops Something went wrong. Could not updated project.");
  }
});
