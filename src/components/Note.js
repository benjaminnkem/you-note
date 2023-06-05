import useNoteDate from "./FreshDate";

const Note = ({ selectedNote, setSelectedNote }) => {
  const { formattedDate } = useNoteDate(selectedNote.date);

  function closeNote() {
    setSelectedNote(null);
  }

  return (
    <>
      <div className="note-body-con">
        <div className="note-body">
          <div>
            <p data-mainnote-title>{selectedNote.title}</p>
            <p data-mainnote-content>{selectedNote.content}</p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p data-mainnote-date>{formattedDate}</p>{" "}
              <div className="note-btn-action-con">
                <button className="delete-btn">Delete</button>
                <button onClick={closeNote}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
