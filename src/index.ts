import app from "./app";
import changeClassModule from "./endpoints/class/changeClassModule";
import createClass from "./endpoints/class/createClass";
import getActiveClass from "./endpoints/class/getActiveClass";
import changeStudentClass from "./endpoints/student/changeStudentClass";
import createStudent from "./endpoints/student/createStudent";
import getStudentByName from "./endpoints/student/getStudentByName";
import changeTeacherClass from "./endpoints/teacher/changeTeacherClass";
import createTeacher from "./endpoints/teacher/createTeacher";
import getAllTeachers from "./endpoints/teacher/getAllTeachers";

app.post("/class", createClass);
app.get("/class/active", getActiveClass);
app.put("/class/:id/module", changeClassModule);

app.post("/student", createStudent);
app.get("/student/name", getStudentByName);
app.put("/student/:id/class", changeStudentClass);

app.post("/teacher", createTeacher);
app.get("/teachers", getAllTeachers);
app.put("/teacher/:id/class", changeTeacherClass);