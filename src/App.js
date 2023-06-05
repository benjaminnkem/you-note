import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Note from "./components/Note";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [titleErr, setTitleErr] = useState(false);
  const [contentErr, setContentErr] = useState(false);

  const [dataLoading, setDataLoading] = useState(true);
  const [notes, setNotes] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  async function getNotes() {
    const response = await fetch("http://localhost:8000/notes");
    const data = await response.json();

    data.sort((noteA, noteB) => {
      if (noteB.date > noteA.date) return 1;
      return -1;
    });

    setDataLoading(false);
    setNotes(data.slice(0, 8));
  }

  useEffect(() => {
    getNotes();
  }, []);

  async function createNewNote(e) {
    e.preventDefault();
    getNotes();

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

    if (response.ok) getNotes();
    setTitle("");
    setContent("");
  }

  function openNote(note) {
    setSelectedNote(note);
  }

  return (
    <>
      { selectedNote && <Note selectedNote={selectedNote} setSelectedNote={setSelectedNote}/> }
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
              {!dataLoading && notes ? (
                <>
                  <div className="note-con">
                    {notes.map((note) => (
                      <div key={note.id} className="note-child">
                        <p data-note-title>{note.title}</p>
                        <p data-note-date>
                          {new Date(note.date).getDate()}{" "}
                          {
                            ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"][
                              new Date(note.date).getMonth()
                            ]
                          }{" "}
                          {new Date(note.date).getFullYear()}
                        </p>
                        <button className="show-btn" onClick={() => openNote(note)}>
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="show-all">See all notes</button>
                </>
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
