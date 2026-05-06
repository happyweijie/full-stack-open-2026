# 0.4: New note diagram
```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User fills up form and hits save
    browser->>server: POST exampleapp/new_note
    activate server
    server-->>browser: HTML URL Redirect to exampleapp/notes 
    deactivate server

    browser->>server: GET exampleapp/notes
    activate server
    server-->>browser: the HTML Document
    deactivate server

    browser->>server: GET exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```
