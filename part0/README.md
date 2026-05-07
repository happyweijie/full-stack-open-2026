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

    Note over browser, server: [ref] Browser follows redirect and reloads the notes page.
```
