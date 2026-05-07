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

    Note over browser, server: Load Page (same flow as prev diagram)
```

# 0.5: Single page app diagram
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    Note right of browser: Browser executes JavaScript

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON data
    deactivate server

    Note right of browser: JavaScript renders the notes
```

