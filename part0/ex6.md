sequenceDiagram
    participant browser
    participant server

    Note right of browser: User enters a new note on the notes page and clicks Save

    Note right of browser: Form event handler adds the note to its list of notes and re-renders the page to show the new note

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
