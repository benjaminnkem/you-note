import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [titleErr, setTitleErr] = useState(false);
  const [contentErr, setContentErr] = useState(false);

  const [dataLoading, setDataLoading] = useState(true);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    async function getNotes() {
      const response = await fetch("http://localhost:8000/notes");
      const data = await response.json();

      // if(!response.ok)
      setDataLoading(false);
      setNotes(data);
    }

    getNotes();
  }, []);

  async function createNewNote(e) {
    e.preventDefault();

    if (title.length < 1) {
      setTitleErr(true);
      // setTitleErrText("Title cannot be left empty.");
      return;
    }

    setTitleErr(false);

    if (content.length < 1) {
      setContentErr(true);
      // setContentErrText("Content body cannot be left empty");
      return;
    }

    setContentErr(false);

    const noteData = { title, content, date: new Date() };
    const response = await fetch("http://localhost:8000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteData),
    });

    if (response.ok) console.log("Note Added Successfully");

    setTitle("");
    setContent("");
  }

  return (
    <>
      <div className="wrapper">
        <Navbar />
      </div>

      <main>
        <div className="inp-display wrapper">
          <div>
            <h3 className="newt-text">Create New Note</h3>
            <div className="form-container">
              <form className="note-form" onSubmit={(e) => createNewNote(e)}>
                <div className="form-holder">
                  <div>
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      id="title-input"
                      placeholder="Enter Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      style={{ outline: `${titleErr ? "1px #d71010 solid" : "none"}` }}
                    />
                  </div>
                  <div>
                    <label htmlFor="content">Content</label>
                    <textarea
                      name="content"
                      cols="30"
                      rows="10"
                      id="text-input"
                      placeholder="Write your notes here."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      style={{ outline: `${contentErr ? "1px #d71010 solid" : "none"}` }}
                    ></textarea>
                  </div>
                </div>

                <input type="submit" value="Create Note" id="create-btn" />
              </form>
            </div>
          </div>

          <div>
            <h3 className="newt-text">Recent Notes</h3>
            <div style={{ textAlign: "center" }}>{dataLoading && <div className="loading-icon"></div>}</div>
            <div className="notes-preview">
              {notes ? (
                <div className="note-con">
                  {notes.map((note) => (
                    <div key={note.id} className="note-child">
                      <p data-note-title>{note.title}</p>
                      <button className="show-btn">View</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div>There are no notes</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
