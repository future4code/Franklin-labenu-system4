import app from "./app";
import changeClassModule from "./endpoint/class/changeClassModule";
import createClass from "./endpoint/class/createClass";
import getActiveClass from "./endpoint/class/getActiveClass";
import changeStudentClass from "./endpoint/student/changeStudentClass";
import createStudent from "./endpoint/student/createStudent";
import getStudentByName from "./endpoint/student/getStudentByName";

app.post("/class", createClass);
app.get("/class/active", getActiveClass);
app.put("/class/:id/module", changeClassModule);

app.post("/student", createStudent);
app.get("/student/name", getStudentByName);
app.put("/student/:id/class", changeStudentClass);
