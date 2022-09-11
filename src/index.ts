import app from "./app";
import changeClassModule from "./endpoint/changeClassModule";
import createClass from "./endpoint/createClass";
import getActiveClass from "./endpoint/getActiveClass";

app.post("/class", createClass);
app.get("/class/active", getActiveClass);
app.put("/class/:id/module", changeClassModule);