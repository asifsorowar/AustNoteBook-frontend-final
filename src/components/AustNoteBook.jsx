import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { SemipolarLoading } from "react-loadingg";
import {
  Department,
  Batch,
  Features,
  Courses,
  Notes,
  Questions,
  CrInfos,
  TeacherInfos,
  AddCourse,
  AddNote,
  AddQuestion,
  AddTeacher,
  AddCr,
  Homepage,
} from "./index";
import ProtectedRouter from "./common/ProtectedRouter";
import { getDepartments } from "./../service/departmentService";
import { getBatches } from "./../service/batchService";
import notFound from "./notFound";

class AustNoteBook extends Component {
  abortController = new AbortController();

  state = {
    departments: [],
    batches: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: departmentsObject } = await getDepartments();
    const { data: batchesObject } = await getBatches();

    const { data: departments } = departmentsObject;
    const { data: batches } = batchesObject;

    this.setState({ departments, batches, loading: false });
  }

  render() {
    if (this.state.loading) return <SemipolarLoading />;

    return (
      <>
        <main className="myContainer">
          <div className="row w-100 h-100 p-0 m-0">
            <div className="col-lg-2 col-md-2 col-2 p-0 m-0 leftContainer">
              <div className="row h-100 w-100 align-content-center justify-content-center p-0 m-0">
                <div className="w-100 h-75 p-2">
                  <Department departments={this.state.departments} />
                </div>
              </div>
            </div>
            <div className="col-lg-10 col-md-10 col-10 m-0 p-0 rightContainer mt-5">
              <Switch>
                <Route
                  path="/aust-note-book/departments"
                  component={Homepage}
                />
                <Route
                  path="/aust-note-book/:departmentId/batches"
                  render={(props) => (
                    <Batch batches={this.state.batches} {...props} />
                  )}
                />
                <Route
                  path="/aust-note-book/:batchId/features"
                  render={(props) => (
                    <Features batches={this.state.batches} {...props} />
                  )}
                />

                <ProtectedRouter
                  path="/aust-note-book/:batchId/courses/:path"
                  render={(props) => <Courses {...props} />}
                />

                <ProtectedRouter
                  path="/aust-note-book/:batchId/:courseId/notes"
                  render={(props) => <Notes {...props} />}
                />

                <ProtectedRouter
                  path="/aust-note-book/:batchId/:courseId/questions"
                  render={(props) => <Questions {...props} />}
                />

                <ProtectedRouter
                  path="/aust-note-book/:batchId/teacher_infos"
                  render={(props) => <TeacherInfos {...props} />}
                />

                <ProtectedRouter
                  path="/aust-note-book/:batchId/cr_infos"
                  render={(props) => <CrInfos {...props} />}
                />

                <ProtectedRouter
                  path="/aust-note-book/:batchId/add-course"
                  render={(props) => <AddCourse {...props} />}
                />

                <ProtectedRouter
                  path="/aust-note-book/:batchId/teacher/:teacherPath"
                  render={(props) => <AddTeacher {...props} />}
                />

                <ProtectedRouter
                  path="/aust-note-book/:batchId/cr/:crPath"
                  render={(props) => <AddCr {...props} />}
                />

                <ProtectedRouter
                  path="/aust-note-book/:batchId/:courseId/note/:notePath"
                  render={(props) => <AddNote {...props} />}
                />

                <ProtectedRouter
                  path="/aust-note-book/:batchId/:courseId/question/:questionPath"
                  render={(props) => <AddQuestion {...props} />}
                />

                <Route path="/aust-note-book/not-found" component={notFound} />
                <Redirect
                  from="/aust-note-book"
                  exact
                  to="/aust-note-book/departments"
                />
                <Redirect to="/aust-note-book/not-found" />
              </Switch>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default AustNoteBook;
